// 内网Jenkinsfile示例
pipeline {
  agent any
  options {
      // 保持构建的最大个数，超过最大构建数后会丢弃以前的构建
      buildDiscarder(logRotator(numToKeepStr: '15'))
  }
  // 自定义变量，在流水线中使用$符号作为前缀即可（如$BRANCH）
  environment {
      BRANCH = 'main'
      GITURL = 'https://github.com/A2ayak/azayak-admin.git'
      NODE_MODULES_PATH = '/vue3_dep'
      DEV_SERVER = '192.168.88.88'
  }
  stages {
      stage('同步代码') {
          steps {
               checkout scm
          }
      }

      stage('安装依赖') {  
          steps {
            // 1.内网部署有npm私服的话，可以直接npm/pnpm install
               sh 'pnpm install'
            // 2.复制依赖，使用docker部署但没挂载外部volume的情况下，注意想办法把依赖放入docker容器内，或考虑动态添加volume
            //    sh 'rm -rf $WORKSPACE/node_modules'
            //    sh 'cp -raf /var/jenkins_home/$NODE_MODULES_PATH $WORKSPACE/azayak-admin'
          }
      }

      stage('VUE编译') {
          steps {
               sh 'pnpm run build:simple'
               // 1.打war包
               // sh 'cd ./dist && jar -cvf dist.war ./*'
               // 2.打tar包，注意到 -C 参数后面需要指定目录路径，而且路径末尾包含一个点号.，表示压缩当前目录下的所有内容，不包含目录本身。
               sh 'cd ./dist && tar -czvf dist.tar -C ./dist .'
          }
      }

      stage('部署到开发环境') {
          steps {
               sh "scp -P 9090 -r -p $WORKSPACE/azayak-admin/dist/dist.war root@$DEV_SERVER:/home/nginx/html"
               sh "ssh -p 9090 root@$DEV_SERVER 'tar -zxvf /home/nginx/html/dist.tar'"
          }
      }
  }
}