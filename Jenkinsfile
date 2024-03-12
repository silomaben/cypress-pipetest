pipeline {

    agent any
    
    stages {

        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'main',
                        credentialsId: '9e708a8d-c1d1-4a8a-9632-3b31ad932908',
                        url: 'https://github.com/silomaben/atq-tests-demo.git'
                }
            }
        }


        stage('Install Kubectl') {
            steps {
                script {
                    sh '''  
                        curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" &&
                        mv kubectl /usr/local/bin/kubectl &&
                        chmod +x /usr/local/bin/kubectl &&
                        kubectl
                    '''
                }
            }
        }

        

        stage('Deploy API') {
            steps {
                script {
                    sh 'kubectl apply -f express-api/kubernetes/deployment.yaml'
                }
            }
        }

        stage('Deploy UI') {
            steps {
                script {
                    sh 'kubectl apply -f ui-app/kubernetes/deployment.yaml'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    sh 'kubectl apply -f cypress-tests/kubernetes/job.yaml'
                }
            }
        }


        
        
    }
}