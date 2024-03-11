pipeline {
    agent any

   tools {
     nodejs "node"
   }

    stages {
        stage('Checkout') {
            steps {
                // Checks out your Vue.js project from a source control management system like Git
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                // Use Node's package manager to install dependencies
                script {
                    sh 'npm install'
                }
            }
        }



        stage('Build') {
            steps {
                // Build your Vue.js application for production
                script {
                    sh 'npm run build'
                }
            }
        }
        // Adding a Docker build stage
                stage('Build Docker Image') {
                    steps {
                      script {
                        docker.build("muhohoweb/hello")
                      }

                    }
                }

        // Optional: Add additional stages for deployment if needed
        stage('Deploy') {
            steps {
                // Deployment steps go here
                // For example, you could use SCP or SSH to transfer build artifacts to a server
                echo 'Deploying application...'
                // sh 'scp -r dist/ user@your-server:path/to/deploy'
            }
        }
    }

    post {
        always {
            // Clean up workspace after build/test/deploy
            cleanWs()
        }
        success {
            // Actions to take if pipeline succeeds
            echo 'Build and Test Stages Successful!'
        }
        failure {
            // Actions to take if pipeline fails
            echo 'An error has occurred.'
        }
    }
}
