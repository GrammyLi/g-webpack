const g = require("./src/lib/g-webpack");

const __main = () => {
  let entry = require.resolve("./src/index");
  g(entry);
};

if (require.main === module) {
  __main();
}
