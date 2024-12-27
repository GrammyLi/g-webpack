// import log from '../helper/utils.js'
// import e from '../helper/dom.js'
// const a = (b) => {
//     log('fuck', b)
// }
// a(1)
import { log, add } from "../helper/utils.js";
import e from "../helper/dom.js";

const bindEventLogin = () => {
  let button = e("#id-button-login");
  let box = e(".box");
  log("fuck xigua")
  log("🍉")
  button.addEventListener("click", (event) => {
    box.classList.add("pink");
  });
};

const bindEvents = () => {
  bindEventLogin();
};

const __main = () => {
  log("多文件打包测试");
  log("多参数引入", add(1, 3));
  bindEvents();
};

__main();
