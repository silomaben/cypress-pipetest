def maxWorkspaces = 2


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

        stage('Cleanup Workspace') {
            steps {
                script {
                    def workspaces = sh(script: 'ls -d /var/jenkins_home/workspace/*', returnStdout: true).trim().split('\n')

                    if (workspaces.size() > maxWorkspaces) {
                        def oldestWorkspace = workspaces[0]
                        for (int i = 1; i < workspaces.size(); i++) {
                            def workspace = workspaces[i]
                            def oldestTime = sh(script: "stat -c '%Y' $oldestWorkspace", returnStdout: true).trim().toLong()
                            def currentTime = sh(script: "stat -c '%Y' $workspace", returnStdout: true).trim().toLong()

                            if (currentTime < oldestTime) {
                                oldestWorkspace = workspace
                                oldestTime = currentTime
                            }
                        }

                        sh "rm -rf $oldestWorkspace"
                        echo "Deleted oldest workspace: $oldestWorkspace"
                    }
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
          sh './kubectl apply -f cypress-tests/kubernetes/job.yaml'
            } 
                
            }
        }

        



        
        
    }
}