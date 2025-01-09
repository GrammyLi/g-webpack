const { log } = require("./utils");

const codeGeneration = (node) => {
  // Program节点 (Program)：
  // 对应整个代码块。遍历 body 数组（代码块中的所有语句）并递归生成每一部分的代码。
  if (node.type === "Program") {
    let body = node.body;
    let c = body.map((b) => codeGeneration(b)).join("\n");
    // log('c', c)
    return c;
  } else if (node.type === "VariableDeclaration") {
    // 变量声明 (VariableDeclaration)：
    // 生成像 let x = 10; 或 const y = 'hello'; 的代码。
    // 赋值类型
    let kind = node.kind;
    // 变量名
    let declarations = codeGeneration(node.declarations[0]);
    let c = `${kind} ${declarations}`;
    return c;
  } else if (node.type === "VariableDeclarator") {
    // 变量定义 (VariableDeclarator)：
    // 用于生成单个变量的声明及赋值语句。
    // 变量名
    let id = codeGeneration(node.id);
    let c = id;
    // 初始值
    // let init = codeGeneration(node.init)
    if (node.init) {
      let init = codeGeneration(node.init);
      c += ` = ${init}`;
    }
    // let c = `${id} = ${init}`
    return c;
  } else if (node.type === "Identifier") {
    // 标识符 (Identifier)：
    // 生成变量名（比如 x 或 y）。
    return node.name;
  } else if (node.type === "Literal") {
    // 字面量 (Literal)：
    // 生成常量值，比如数字、字符串等。
    return node.raw;
  } else if (node.type === "ImportDeclaration") {
    //  导入语句 (ImportDeclaration)：
    // 处理 import 语句，支持 require 模块导入，支持 default 和命名导入。
    let specifiers = node.specifiers.map((s) => codeGeneration(s));
    let source = codeGeneration(node.source);
    // let c = `import ${specifiers} from ${source}`
    // return c
    // 引入多个变量
    if (specifiers.length > 1) {
      let c = `let {${specifiers.join(",")}} = require(${source})`;
      return c;
    } else {
      let c = `let ${specifiers} = require(${source}).default`;
      return c;
    }
  } else if (node.type === "ImportDefaultSpecifier") {
    let local = codeGeneration(node.local);
    return local;
  } else if (node.type === "ImportSpecifier") {
    let local = codeGeneration(node.local);
    return local;
  } else if (node.type === "ArrowFunctionExpression") {
    //箭头函数 (ArrowFunctionExpression)：
    // 处理箭头函数语法，生成类似 const fn = (x, y) => { return x + y; }; 的代码。
    let params = node.params.map((p) => codeGeneration(p)).join(",");
    let body = codeGeneration(node.body);

    if (node.body.type === "BlockStatement") {
      //  块语句 (BlockStatement)：
      // 生成包含多个语句的代码块，类似 { ... } 代码块。
      let c = `(${params}) => { ${body} }`;
      return c;
    } else if (node.body.type === "CallExpression") {
      //  调用表达式 (CallExpression)：
      // 生成函数调用语法，比如 foo(bar, baz)。
      let c = `(${params}) => ${body}`;
      return c;
    }
  } else if (node.type === "BlockStatement") {
    let body = node.body.map((b) => codeGeneration(b)).join("\n");
    return body;
  } else if (node.type === "CallExpression") {
    let callee = codeGeneration(node.callee);
    let arguments = node.arguments.map((a) => codeGeneration(a)).join(",");
    let c = `${callee}(${arguments})`;
    return c;
  } else if (node.type === "ExpressionStatement") {
    let expression = codeGeneration(node.expression);
    return expression;
  } else if (node.type === "MemberExpression") {
    // 成员表达式 (MemberExpression)：
    // 生成对象属性访问语法，如 obj.property 或 obj['property']。
    let object = codeGeneration(node.object);
    let property = codeGeneration(node.property);
    let c = `${object}.${property}`;
    return c;
  } else if (node.type === "ExportDefaultDeclaration") {
    // 默认导出 (ExportDefaultDeclaration)：
    // 生成 export default 语句，转换为 exports['default'] = ...。
    let declaration = codeGeneration(node.declaration);
    // let c = `export default ${declaration}`
    let c = `exports['default'] = ${declaration}`;
    return c;
  } else if (node.type === "ExportNamedDeclaration") {
    // 命名导出 (ExportNamedDeclaration)：
    // 生成 export { foo, bar } 语句，转换为 exports.foo = foo; exports.bar = bar; 等。
    let specifiers = node.specifiers.map((s) => codeGeneration(s));

    // let c = `export { ${specifiers} }`
    // let c = `exports = { ${specifiers} }`
    let c = [];
    for (let i = 0; i < specifiers.length; i++) {
      let param = specifiers[i];
      c.push(`exports.${param} = ${param}`);
    }
    c = c.join("\n");
    return c;
  } else if (node.type === "ExportSpecifier") {
    let exported = codeGeneration(node.exported);
    return exported;
  } else if (node.type === "ReturnStatement") {
    //     返回语句 (ReturnStatement)：
    // 生成 return 语句，例如 return x;
    let argument = codeGeneration(node.argument);
    let c = `return ${argument}`;
    return c;
  } else if (node.type === "BinaryExpression") {
    // 二元表达式 (BinaryExpression)：
    // 生成加法、减法、乘法等二元操作符的表达式代码，如 x + y、a - b 等。
    let left = codeGeneration(node.left);
    let right = codeGeneration(node.right);
    let operator = node.operator;
    let c = `${left}${operator}${right}`;
    return c;
  } else {
    console.log("错误 node", node);
    throw Error;
  }
};

module.exports = codeGeneration;
