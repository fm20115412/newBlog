### 1. 在github上新建一个仓库。
### 2. 在已有项目的根目录下执行
```
✨1. 将本地项目初始化为git项目
git init

✨2. 将本地仓库连接到远程仓库
git remote add origin git@github.com:fm20115412/test.git (1中的仓库名)

✨3. 将origin主机下的master分支的代码同步下来
git pull origin master --allow-unrelated-histories

注意如果这里执行git pull origin master会报错，这是因为git发现本地仓库跟你远程仓库没有相同的地方，是用于提醒你这两个仓库可能不是同一个仓库，如果确实需要提交，则执行git pull origin master --allow-unrelated-histories,加了这个后缀会允许不相关的历史版本进行合并。

✨4. 将本地修改提交到远程仓库

git add .
git commit -m 'message'
git push --set-upstream origin master

注意：这里如果只执行git push会报错 The current branch master has no upstream branch.
```