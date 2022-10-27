

1. 通过入口，找到对应依赖图 

```js
let graph = {
    '/Users/xxxxx/src/index.js': {
        id: 1,
        dependencies: {
            './helper/utils.js': '/Users/xxxxx/src/helper/utils.js',
            './helper/dom.js': '/xxxx/src/helper/dom.js'
        }
    },
}


{ './helper/utils.js': 2, './helper/dom.js': 3 }
```