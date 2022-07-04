// 数据类型
// js中的数据类型大体分两类,基本数据类型和引用数据类型
// js中的数据类型总共有8种(最新的ECMA标准中新增BigInt基本类型)
// 如何记忆? 2个S,2个N,2个B,1个U,1个O
// String, Symbol, Number, Null, Boolean, BigInt, Undefined, Obejct
// 其中前七个都是基本数据类型, 只有Object是引用类型

// 1.typeof 操作符
// typeof 会返回8中字符串结果
// 与js的数据类型不完全对应
// 分别是
// 'string', 'symbol', 'number', 'boolean', 'bigint', 'undefined', 'object'(返回这个值时表示目标值可能是对象也可能是null), 'functoin'

// 2.Undefined类型
// 当声明了一个变量但没给变量赋值时,那么就相当于给变量赋值了undefined
{
  let message;
  console.log(message == undefined); // true
}
// 显式的给变量赋值undefined(不推荐, 因为undefined本身就是用来用来区别赋值为null的变量和未初始化的变量)
{
  let message = undefined;
  console.log(message == undefined); // true
}
// 未初始化与未声明的变量是有区别的
{
  let message;
  console.log(message); // undefined
  try {
    console.log(age); // ReferenceError
  } catch (err) {
    console.log("age变量是没有定义过的");
  }
}
// 对于未声明的变量只能执行一个操作就是typeof
{
  let message;
  console.log(typeof message); // undefined
  console.log(typeof age); // undefined
}
// 对于这种情况, 建议在声明变量的同时进行初始化, 这样就能在typeof返回undefined时,判断出变量是未声明的

// 3.Null
// Null类型与Undefined一样,只有一个值null
// null表示一个空对象指针, 因此typeof null === 'object'
{
  let car = null;
  console.log(typeof car); // 'object'
}
