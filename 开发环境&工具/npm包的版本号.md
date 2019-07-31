在我们安装一个包时，会在package.json文件里面添加该包的版本信息。
```
"prop-types": "^15.7.2"
```
In the version above, the major version is 15, the minor version is 7, and the patch version is 2.

The idea is if you’re a library author and you had a breaking change, you’d increment the major version. If you had a new, non-breaking feature, you’d increment the minor version. For everything else, you’d increment the patch version.

So why is this important? We want to avoid having our app break because we installed the wrong version of a package. npm gives us some tools to prevent this.

`"prop-types": "^15.7.2"`:What the ^ does is it instructs npm to install the newest version of the package with the same major version. So for example, if the prop-types package released v15.8.0, when we ran npm install on our project, we’d get that new version. However, if there was a breaking change and prop-types released v16.0.0, only the newest v15.X.X version would be installed and not the breaking v16.0.0 version.

`"prop-types": "~15.7.2"`:If instead, you wanted to have both the major and minor version match, you’d use ~.Now, if v16.0.0 or v15.8.0 came out, neither would be installed. However, if v15.7.3 came out, it would be installed since its the newest version where both the major and minor versions match.

`"prop-types": "15.7.2"`:Finally, if you wanted to only download the exact version of what’s listed in your package.json file, you’d list only the version number.Now, only v15.7.2 will ever be installed.

