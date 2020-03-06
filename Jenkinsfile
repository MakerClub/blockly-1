pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
        
        
    }
    stages {
        stage('Build') {
            steps {
                sh 'if [[ "$BRANCH_NAME" != "stage" ]]; then false; fi'
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
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws s3 cp --region us-west-2 blockly_compressed.js s3://stage.invent.makerclub.org/blockly/blockly_compressed.js --cache-control max-age=600"
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws s3 cp --region us-west-2 blocks_compressed.js s3://stage.invent.makerclub.org/blockly/blocks_compressed.js --cache-control max-age=600"
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws s3 cp --region us-west-2 python_compressed.js s3://stage.invent.makerclub.org/blockly/python_compressed.js --cache-control max-age=600"
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws cloudfront create-invalidation --distribution-id E3LH9ODC843DBX --paths '/*'"
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
