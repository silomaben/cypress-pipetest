#!/usr/bin/env groovy
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