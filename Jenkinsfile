pipeline {
    agent any
    
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: '5')
    }
    
    environment {
        jenkinsPod = ''
        cypressPod = ''
        logs = ''
        deploy = false
    }

    stages {
        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'main',
                        credentialsId: '9e708a8d-c1d1-4a8a-9632-3b31ad932908',
                        url: 'https://github.com/silomaben/cypress-pipetest.git'
                }
            }
        }


        stage('Start Pods for Testing') {
            steps {
                script {
                     withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {                      
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                        sh 'chmod u+x ./kubectl'

                        sh 'rm -f /var/jenkins_home/html/index.html' 

                        sh './kubectl apply -f express-api/kubernetes'
                        sh './kubectl apply -f ui-app/kubernetes'
                        sh './kubectl apply -f cypress-tests/kubernetes/job.yaml'

                    }
                }
            }
        }

        stage('Get Pod Names') {
            steps {
                script {
                     withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {                      
                        jenkinsPod = sh(script: './kubectl get pods -n jenkins -l app=jenkins -o jsonpath="{.items[0].metadata.name}"', returnStdout: true).trim()
                        echo "Found pod name: $jenkinsPod"
                        cypressPod = sh(script: "./kubectl get pods -n jenkins -l job-name=e2e-test-app-job -o jsonpath='{.items[0].metadata.name}'", returnStdout: true).trim()
                        echo "Found Cypress pod name: $cypressPod"
                    }
                }
            }
        }

        stage('Wait for tests to run and report generation') {
            steps {
                script {

                    withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {
                    waitForReport()
                    sh "./kubectl exec -n jenkins $jenkinsPod -- cat /var/jenkins_home/html/index.html > report_build_${env.BUILD_NUMBER}.html"
                    archiveArtifacts artifacts: 'report.html', onlyIfSuccessful: true
                    }
                }
            }
        }
        

        stage('Deciding deployment and stopping testing pods') {
            steps {
                script {
                    withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {

                        // Run kubectl logs command and store the output
                        logs = sh(script: "./kubectl logs -n jenkins $cypressPod -c e2e-test-app", returnStdout: true).trim()

                        // Check if the text "all specs passed" is present in the logs
                        if (logs.contains("all specs passed")) {
                            echo "Specs passed: true \n Proceeding to deployment"
                            deploy = true
                        } else {
                            echo "some tests failed...Check the report for issues \n Deployment aborted"
                        }

                        //kill the created pods and service.

                        sh "./kubectl delete -n jenkins deployment express-app"
                        sh "./kubectl delete -n jenkins deployment ui-app"
                        sh "./kubectl delete -n jenkins job e2e-test-app-job"
                        sh "./kubectl delete -n jenkins service ui-app"
                        sh "./kubectl delete -n jenkins service express-app-service"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if(deploy==true){
                        echo "Niiice!!! Deploying ATQ now."
                    } else {
                        echo "Deploying aborted. Check and resolve the failing test and try again!"
                    }
                }
            }
        }

    }
}

def waitForReport() {
    timeout(time: 5, unit: 'MINUTES') {
        script {
            def counter = 0 
            while (!fileExists('/var/jenkins_home/html/index.html')) {
                counter++ 
                echo "Waiting for index.html file to exist... (Attempt ${counter})"
                sleep 10 
            }
        }
    }
}


def fileExists(filePath) {
    return sh(script: "[ -f '$filePath' ]", returnStatus: true) == 0
}