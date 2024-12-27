(function(modules) {
    const require = (id) => {
        let [fn, mapping] = modules[id]

        const localRequire = (name) => {
            return require(mapping[name])
        }

        const localModule = {
            exports: {

            }
        }

        fn(localRequire, localModule, localModule.exports)

        return localModule.exports
    }

    require(1)
})({
1: [
    function(require, module, exports) {
        let {log,add} = require("../helper/utils.js")
let e = require("../helper/dom.js").default
const bindEventLogin = () => { let button = e("#id-button-login")
let box = e(".box")
log("fuck xigua")
log("🍉")
button.addEventListener("click",(event) => { box.classList.add("pink") }) }
const bindEvents = () => { bindEventLogin() }
const __main = () => { log("多文件打包测试")
log("多参数引入",add(1,3))
bindEvents() }
__main()
    },
    {"../helper/utils.js":2,"../helper/dom.js":3}
],
    
2: [
    function(require, module, exports) {
        const log = console.log.bind(console)
const add = (a,b) => { return a+b+1 }
exports.log = log
exports.add = add
    },
    {}
],
    
3: [
    function(require, module, exports) {
        const e = (selector) => document.querySelector(selector)
exports['default'] = e
    },
    {}
],
    })