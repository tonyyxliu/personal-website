'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};




/* -----------------------------------------
 * !!! Settings for Multi-Page React-APP !!!
 * ----------------------------------------- */
const glob = require('glob');
//这里获取所有的入口文件生成对象对应所有的路径
function getEntries(globPath) {
  const files = glob.sync(globPath),
    entries = {};

  // /* add the original src/index.js into the entry array */
  // const originalFile = glob.sync('src/index.js');
  // originalFile.forEach(function(filepath) {
  //   const split = filepath.split('/');
  //   const name = split[split.length - 2];
  //   entries[name] = './' + filepath;
  // });
  

  files.forEach(function(filepath) {
    const split = filepath.split('/');
    const name = split[split.length - 2];
    entries[name] = './' + filepath;
  });


  return entries;
}
const entries = getEntries('src/pages/**/index.js');

//这里将入口对象转为路径数组
function getIndexJs() {
  const indexJsList = [];
  Object.keys(entries).forEach((name) => {
      const indexjs = resolveModule(resolveApp, `src/pages/${name}/index`)
      indexJsList.push({
        name,
        path: indexjs
      });

    // if (name != "src") {
    //   const indexjs = resolveModule(resolveApp, `src/pages/${name}/index`);
    //   indexJsList.push({
    //     name,
    //     path: indexjs
    //   });
    // }
    // else {
    //   indexJsList.push({
    //     name,
    //     path: resolveModule(resolveApp, 'src/index'),
    //   })
    // }
  })

  return indexJsList;
}
const indexJsList = getIndexJs();






// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  // appIndexJs: resolveModule(resolveApp, 'src/index'),
  appIndexJs: indexJsList, // +++++++++++++
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
  entries // +++++++++++++
};



module.exports.moduleFileExtensions = moduleFileExtensions;
