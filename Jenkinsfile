#!/usr/bin/env groovy
pipeline {

    agent any
    
    stages {

        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'main',
                        credentialsId: 'Credential ID',
                        url: 'https://github.com/username/repository.git'
                }
            }
        }

         stage('Build UI, API, and Cypress') {
            steps {
                script {
                  sh "/kaniko/executor -f `pwd`/ui-app/Dockerfile -c `pwd`/ui-app --cache=true --destination=silomaben/ui-app:v1"

                    sh "/kaniko/executor -f `pwd`/express-api/Dockerfile -c `pwd`/express-api/ --cache=true --destination=silomaben/ui-app:v1"

                    sh "/kaniko/executor -f `pwd`/cypress-tests/Dockerfile -c `pwd`/cypress-tests --cache=true --destination=silomaben/ui-app:v1"
                }
            }
        }


    }
}