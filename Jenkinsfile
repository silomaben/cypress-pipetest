pipeline {
    agent any
    tools {
        nodejs 'node21'
    }
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: '5')
    }
    
    // Define podName variable at the pipeline level
    environment {
        podName = ''
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
        stage('Get Pod Name') {
            steps {
                script {
                     withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {
                    // Assign the value to the pipeline-level podName variable
                    podName = sh(script: './kubectl get pods -n jenkins -l app=jenkins -o jsonpath="{.items[0].metadata.name}"', returnStdout: true).trim()
                    echo "Found pod name: $podName"
                    // You can use 'podName' further in your pipeline
                    }
                }
            }
        }
        stage('Install Kubectl') {
            steps {
                script {
                    withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                        sh 'chmod u+x ./kubectl'
                        sh './kubectl get nodes'
                        sh './kubectl get all'
                        sh 'rm -f /var/jenkins_home/html/index.html'
                        sh './kubectl apply -f express-api/kubernetes/deployment.yaml'
                        sh './kubectl apply -f ui-app/kubernetes/deployment.yaml'
                        // sleep 15
                        sh './kubectl apply -f cypress-tests/kubernetes/job.yaml'

                        waitForIndexHtml()
                        sh "./kubectl exec -n jenkins $podName -- cat /var/jenkins_home/html/index.html > report.html"
                        archiveArtifacts artifacts: 'report.html', onlyIfSuccessful: true
                    }
                }
            }
        }
    }
}

def waitForIndexHtml() {
    timeout(time: 5, unit: 'MINUTES') {
        // Loop until the index.html file exists or timeout occurs
        while (!fileExists('/var/jenkins_home/html/index.html')) {
            echo 'Waiting for index.html file to exist...'
            sleep 10 // Wait for 10 seconds before checking again
        }
    }
}

def fileExists(filePath) {
    def file = new File(filePath)
    return file.exists()
}
