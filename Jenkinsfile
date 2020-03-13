pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'if [[ "$BRANCH_NAME" != "master" ]]; then false; fi'
                echo 'Building'
                sh "npm install"
                sh "cp config/Config.js.live app/components/Config.js"
                sh "ln -sf ../Blockly_master/ blockly"
                sh "npm run build"
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
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws s3 sync public --region us-west-2 s3://invent.makerclub.org/ --cache-control max-age=600"
                sh "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY} aws cloudfront create-invalidation --distribution-id E13ILULTB607EK --paths '/*'"
            }
        }
    }
}
