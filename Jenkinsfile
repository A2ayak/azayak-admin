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
               git branch: '$branch', url: '$gitUrl'
          }
      }

      stage('复制依赖') {  
          steps {
            //    sh 'rm -rf $WORKSPACE/node_modules'
            //    sh 'cp -raf /data/vue-node-modules/azayak-admin/node_modules $WORKSPACE/'
               sh 'pnpm install'
          }
      }

      stage('VUE编译') {
          steps {
               sh 'pnpm run build:simple'
          }
      }

      // stage('部署到nginx') {
      //     steps {
      //          sh 'ssh'
      //     }
      // }
  }
}