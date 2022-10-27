import log from "./helper/utils.js";
import e from "./helper/dom.js";

const bindEventLogin = () => {
  let button = e("#id-button-login");
  let box = e(".grammy-box");

  button.addEventListener("click", (event) => {
    box.classList.add("pink");
    log("hello world");
  });
};

const bindEvents = () => {
  bindEventLogin();
};

const __main = () => {
  bindEvents();
};

__main();
