pipeline {
  agent any
  environment {
      name = 'azayak-admin'
      branch = 'main'
      credentialsId = 'A2ayak'
      gitUrl = 'https://github.com/A2ayak/azayak-admin.git'
  }
  stages {
      stage('同步代码') {
          steps {
               checkout scm
          }
      }

      stage('安装依赖') {  
          steps {
            //    sh 'rm -rf $WORKSPACE/node_modules'
            //    sh 'cp -raf /data/vue-node-modules/azayak-admin/node_modules $WORKSPACE/'
               sh 'npm install'
          }
      }

      stage('VUE编译') {
          steps {
               sh 'npm run build:simple'
          }
      }

      // stage('部署到nginx') {
      //     steps {
      //          sh 'ssh'
      //     }
      // }
  }
}