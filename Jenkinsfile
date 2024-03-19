def maxWorkspaces = 2


pipeline {

    agent any
    

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

        
        stage('Install Kubectl') {
            steps {


                    withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {
                            sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'  
                            sh 'chmod u+x ./kubectl'  
                            sh './kubectl get nodes'
                            sh './kubectl get all'
                            sh './kubectl apply -f express-api/kubernetes/deployment.yaml'
                            sh './kubectl apply -f ui-app/kubernetes/deployment.yaml'

                            sleep 15
                            sh './kubectl apply -f cypress-tests/kubernetes/job.yaml'

                            sh "./kubectl exec -n jenkins jenkins-7c578f9b5d-2hkwg -- cat /var/jenkins_home/jobs/cypress-e2e/branches/main/builds/19/archive/cypress-tests/cypress/reports/html/index.html > report.html"
                                    
                            archiveArtifacts artifacts: 'report.html', onlyIfSuccessful: true
            } 
                
            }
        }




        




        



        
        
    }
}