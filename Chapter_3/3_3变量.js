// 变量
// js中的变量是松散类型的,可以存储任何类型的数据
// 变量声明关键字 var, let, const

// 1.var关键字
var message; //声明但不赋值
var name = "123"; // 声明且赋值
var num1 = 1, // 声明多个变量
  num2 = 2;
// 1.1.var 声明作用域
// var 声明的变量在函数中则为函数的局部变量,在全局时则为全局变量,且在全局作用域中var声明的变量会被作为全局对象(浏览器中为window)的属性
function test1() {
  var message1 = "hi";
}
test1();
try {
  console.log(message1);
} catch (err) {
  console.log(
    "因为message在函数内部进行的声明,所以为函数test的局部变量,在函数之外获取message的值时会报错"
  );
}

// 1.2.隐式全局变量
// 去掉var关键字, 然后再执行一次test2,message2就成为了全局变量, 不推荐这样使用, 且在严格模式下会报错
function test2() {
  message2 = "global message";
}
test2();
console.log(message2); //global message

// 1.3.var声明提升
// 使用var定义的变量,会自动提升至作用域的顶部
function foo() {
  console.log(age);
  var age = 18;
}
foo(); // 不会报错, 打印undefined
/**
 * 上面foo函数等价与
 * function foo() {
 *  var age;
 *  console.log(age)
 *  age = 18
 * }
 */
// 因为var声明的变量存在声明提升, 因此可以多次声明同一个变量
function foo2() {
  var age = 11;
  var age = 12;
  var age = 13;
  console.log(age);
}
foo(); // 13

// 2let声明
// let时es6中增加的变量声明方式
// 2.1.let声明的作用域为块级作用域即一对大括号之中{}(注意这里大括号需除开表示对象的大括号), 与var的作用域为函数作用域不同
if (true) {
  var name = "Matt";
  console.log(name);
}
console.log(name); // Matt
if (true) {
  let age = 26;
  console.log(age);
}
try {
  console.log(age); // ReferenceError
} catch (err) {
  console.log("因为let声明的作用域为块级作用域,因此此时读取age变量时,会报错ReferenceError");
}

// 2.2暂时性死区
// 从作用域顶部到使用let声明变量的那段区间, 关于声明的变量来说就是暂时性死区. 在暂时性死区中无法对该变量进行任何读取或赋值等操作, 因此let 声明的变量不存在变量提升
// 因此在暂时性死区中, 无法重复声明同一变量
(() => {
  console.log(name); // undefined
  var name = "Matt";
  try {
    console.log(age); // ReferenceError
    let age = 23;
  } catch (err) {
    console.log("因为暂时性死区,因此无法在声明age之前,对age变量执行读值操作");
  }
})();

// 2.3.全局声明
// let在全局作用域中进行变量声明时,不会将变量作为全局对象的属性. 因此与var有所不同
var name = "var声明的全局变量";
console.log(window.name); // 'var声明的全局变量'
let age = 23;
console.log(window.age); // undefined

// 2.4 for循环中使用let声明
// 以前for循环中使用var声明的现象
for (var i = 0; i < 5; i++) {}
// 相当于{ var i = 0; i++ } { var i = 1; i++ } { var i = 2; i++ } ... { var i = 4; i++ }
console.log(i); // 5
// for循环中使用let
for (let ind = 0; ind < 5; ind++) {}
// 相当于{ let i = 0; i++ } { let i = 1; i++ } { let i = 2; i++ } ... { let i = 4; i++ }
try {
  console.log(ind); // ReferenceError
} catch (err) {
  console.log("报错");
}

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(ind);
  });
}
// 会输出 5,5,5,5,5
for (let ind = 0; ind < 5; ind++) {
  setTimeout(() => {
    console.log(ind);
  });
}
// 会输出0,1,2,3,4

// 3.const声明
// 与let大致相似,唯一不同就是使用const声明的变量无法被重新赋值
const AGE = 26;
try {
  AGE = 22;
} catch (err) {
  console.log("会报错, const声明的变量无法被重新赋值");
}
// const不允许重复声明
// const的作用域也是块级作用域
// const只限制指向的变量的引用, 当声明的变量是一个对象时,改变对象的属性并不违反const的限制
const person = {};
person.name = "Matt";
