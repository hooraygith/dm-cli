## install
?> 用法和`npm install`一样，多了额外的镜像地址https://registry.npm.taobao.org
```shell
dm install [依赖包名]
- 例如：dm install vue@2.3.4 --save-dev
```

## update
!> 依赖中以`git+ssh`方式引入的依赖无法判断是否过期，所以每次都会重新下载
```shell
dm update
- 利用`npm outdated`检测过期的依赖，`npm i`来安装依赖
```

## lint
!> 格式化文件仅支持`.js` `.scss` `.vue` 不包括`.min.js`
```shell
dm lint [-S -source] [-C, --commit]
- [-S -source] 格式化目录下的文件，默认为`src`
  例如：
  dm lint -S test //格式化`test`文件夹
- [-C, --commit] 格式化git 暂存区的文件，用于`git hook`提交
  例如：
  dm lint -C //格式化git暂存区的文件
```

## tag
```shell
dm tag [command]
- clear [-A -all] [exp_name]
  例如：
  dm tag clear -A //删除本地所有tag
  dm tag clear 1.0 //删除以`1.0`开头的所有tag
- fetch
  获取服务器最新tag到本地
  例如：
    dm tag fetch
- push [tag]
  提交tag到服务器
  例如：
    dm tag push 1.0.0 //提交tag`1.0.0`到服务器
```

## start
?> 启动服务，启动之前会先执行`dm compile-pre ${env}`
```shell
dm start [env]
- [env]默认为`dev-server`
- 首先读取server配置 `${_DIR}/build/server.config.json` 获取host、post
- 然后读取webpack配置 `${_DIR}/build/webpack.config.${env}.js`
- 启动
```

## build
!> 执行构建命令，主要用于主项目打包，输出html和引导js
```shell
dm build [envs]
- 循环envs数组，对每一项env分别执行
  `dm compile-pre ${env}`
  `dm compile ${env}`
  `dm compile-post ${env}`
  例如：dm build dev pd //构建dev、pd环境的代码
```

## pack
!> 执行打包命令，主要用于非主项目打包，输出js
```shell
dm pack [newVersion] [envs...]
- [newVersion] 同 npm version [major | minor | patch | premajor | preminor | prepatch | prerelease]
- [envs...] 默认 dev pd
- 内部执行顺序
  - `dm update` 更新依赖
  - `dm lint` 格式化
  - `dm tag fetch` 获取服务器最新的tag
  - `npm --no-git-tag-version version ${newVersion}` 修改package.json输出本次打包版本号`version`
  - `dm build ${envs.join(' ')}` 构建代码
  - `git add -A` 添加到暂存区
  - `git commit -m '${version.replace('v', '')}' -n` commit提交信息
  - `git tag ${version}` 创建本次打包tag
  - `git push origin ${version}` 提交tag到服务器
  - `git symbolic-ref --short -q HEAD` 获得当前分支 `branch`
  - `git push origin ${branch}` 提交分支到服务器
- 例如：
  dm pack major //如果打包前版本号为1.0.0，输出版本号 2.0.0
  dm pack minor //如果打包前版本号为1.0.0，输出版本号 1.1.0
  dm pack patch //如果打包前版本号为1.0.0，输出版本号 1.0.1
  dm pack premajor //如果打包前版本号为1.0.0，输出版本号 2.0.0-0
  dm pack premajor //如果打包前版本号为2.0.0-0，输出版本号 3.0.0-0
  dm pack preminor //如果打包前版本号为1.0.0，输出版本号 1.1.0-0
  dm pack preminor //如果打包前版本号为1.1.0-0，输出版本号 1.2.0-0
  dm pack prepatch //如果打包前版本号为1.0.0，输出版本号 1.0.1-0
  dm pack prepatch //如果打包前版本号为1.0.1-0，输出版本号 1.0.2-0
  dm pack prerelease //如果打包前版本号为1.0.0，输出版本号 1.0.1-0
  dm pack prerelease //如果打包前版本号为1.0.1-0，输出版本号 1.0.1-1
```

## compile-pre
```shell
dm compile-pre [env]
- 执行文件 `${_DIR}/build/compile-pre.js ${env}`
```

## compile
```shell
dm compile [env]
- 执行文件 `${_DIR}/build/webpack.config.${env}.js`
```

## compile-post
```shell
dm compile-post [env]
- 执行文件 `${_DIR}/build/compile-pre.js ${env}`
```

