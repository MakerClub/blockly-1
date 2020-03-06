pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'if [[ "$BRANCH_NAME" != "beta" ]]; then false; fi'
                echo 'Building'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing new config'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
    options{
        buildDiscarder(
            logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '5')
        )
        disableConcurrentBuilds()
    }
}
