const path = require("path");
const pack = require("../src/index");

const log = console.log.bind(console);

// 实现一个简单的插件
const BundleSizePlugin = {
  afterBundle: (bundleCode) => {
    console.log(`🍉 Bundle size: ${bundleCode.length} bytes`);
  },
};

const __main = () => {
  // 获取 index.js 的绝对路径
  let entry = require.resolve("./src/index");
  // log('entry', entry)
  // log('path', path.resolve(__dirname, './dist'))
  let output = require.resolve("./dist/bundle");
  // log('output', output)
  pack(entry, output, [BundleSizePlugin]);
};

if (require.main === module) {
  __main();
}
