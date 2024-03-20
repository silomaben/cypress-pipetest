pipeline {
    agent any
    tools {
        nodejs 'node21'
    }
    
    stages {
        stage('Delete Index HTML') {
            steps {
                script {
                    // Delete the index.html file
                    sh 'rm -f /var/jenkins_home/html/index.html'
                }
            }
        }
        
        stage('Install Kubectl') {
            steps {
                script {
                    waitForIndexHtml()
                    
                    // Continue with other steps after index.html exists
                    withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'SECRET_TOKEN', namespace: 'default', serverUrl: 'https://192.168.49.2:8443']]) {
                        // Your existing kubectl commands go here
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                        sh 'chmod u+x ./kubectl'
                        sh './kubectl get nodes'
                        sh './kubectl get all'
                        sh './kubectl apply -f express-api/kubernetes/deployment.yaml'
                        sh './kubectl apply -f ui-app/kubernetes/deployment.yaml'
                        // sleep 15
                        sh './kubectl apply -f cypress-tests/kubernetes/job.yaml'
                        sh "./kubectl exec -n jenkins $podName -- cat /var/jenkins_home/html/index.html > report.html"
                        archiveArtifacts artifacts: 'report.html', onlyIfSuccessful: true
                    }
                }
            }
        }

        // Other stages...
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
    return fileExists(filePath).isFile()
}
