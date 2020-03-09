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
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws s3 cp blockly_compressed.js  --region us-west-2 s3://stage.invent.makerclub.org/blockly --cache-control max-age=600"
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws s3 cp blocks_compressed.js  --region us-west-2 s3://stage.invent.makerclub.org/blockly --cache-control max-age=600"
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws s3 cp python_compressed.js  --region us-west-2 s3://stage.invent.makerclub.org/blockly --cache-control max-age=600"
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws cloudfront create-invalidation --distribution-id E13ILULTB607EK --paths '/*'"
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
