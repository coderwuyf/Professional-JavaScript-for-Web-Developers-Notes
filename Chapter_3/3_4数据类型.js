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

// 4.Boolean
// 布尔类型的字面值只有两个 true 与false
// 其他类型转换成布尔类型的转化规则
// 只有以下值转换成布尔类型的值时会成为false, 别的都是true
// ""/0/NaN/null/undefined
// if等流程控制语句会自动执行其他类型到布尔类型的转换
{
  let message = "Hello world";
  if (message) {
    console.log("Value is true");
  }
}

// 5.Number
// 十进制
{
  let intNum = 55; // 整数
}
// 八进制, 以0作为开头, 严格模式下会报语法错误(ES5或ES6中八进制可以用0o前缀)
{
  let octalNum1 = 070;
  let octalNum2 = 079; // 因为八进制最大值为7, 因此这是个无效的八进制数
  let octalNum3 = 08; // 因为八进制最大值为7, 因此这是个无效的八进制数
  let octalNum4 = 0o123; // 有效八进制数
}
// 十六进制 0x开头(x小写,前缀区分大小写), 最大值为f/F(不区分大小写)
{
  let hexNum1 = 0xa;
  let hexNum2 = 0x1f;
}
// 八进制和十六进制创建的数值,在计算操作中都会被转换成十进制
{
  let num = 070 + 0x12; // 56 + 18 = 74
  console.log(num);
}

// 浮点类型值
// 小数点后必须至少由一个数字, 整数部分为零时可以省略, 但不推荐
{
  let floatNum1 = 1.1;
  let floatNum2 = 0.1;
  let floatNum3 = 0.1;
}
// 浮点类型值的存储空间时整型的两倍, 因此在小数点后面没有数字或为零的时候,会被自动转换成整型
{
  let floatNum1 = 1; // 1
  let floatNum2 = 10.0; // 10
}
// 对于非常大或非常小的数,推荐使用科学计数法
// 科学计数法: 一个整数或浮点数跟上一个e再跟上一个10的多少次幂
// ECMA会将小数点后至少包含6个零的浮点值转换成科学计数法
{
  let floatNum1 = 3.12e7; // 3.12 * 10的7次方
  let floatNum2 = 3.12e-7; // 3.12 * 10的-7次方
  console.log(0.0000005); // 5e-7
}
//浮点值的精度最高为17位小数,远不如整数精确.
// 因为使用的是IEEE754数值,因此导致0.1 + 0.2 !== 0.3
{
  console.log(0.1 + 0.2); // 0.300_000_000_000_000_04

  // 解决办法, 借助Number的API, Math.EPSILON
  function equal(num1, num2) {
    return Math.abs(num1 - num2) < Number.EPSILON;
  }
  console.log(equal(0.1 + 0.2, 0.3));
}

// 值的范围
// 最小值为 Number.MIN_VALUE => 5e-324
// 最大值为 Number.MAX_VALUE => 1.797_693_134_862_315_7e+308
// 小于最小值时为-Infinity, 无法参与计算
// 大于最大值时为Infinity, 无法参与计算
// 判断一个数是否在最小值和最大值之间, 可以使用isInfinite()函数, true表示是一个有限数, false表示无限数
// Number.NEGATIVE_INFINITY 可以得到正Infinity
// Number.POSITIVE_INFINITY 可以得到负Infinity
{
  console.log(Number.MIN_VALUE === 5e-324); // true
  console.log(Number.MAX_VALUE === 1.7976931348623157e308); // true
  const num1 = 1.7976931348623157e308;
  const num2 = 1.7976931348623157e308 * 2;
  console.log(isFinite(num1)); // true
  console.log(isFinite(num2)); // false
  console.log(Number.NEGATIVE_INFINITY); // -Infinity
  console.log(Number.POSITIVE_INFINITY); // Infinity
}

// NaN
// not a number
// 表示本来要返回数值的操作失败了
// -0, 0, +0这三个任意两个相除都返回NaN
// 非零数正数除以0为Infinity, 非零负数除以0为-Infinity(这里的0包括有符号0与无符号0)
// NaN的特性:
// 涉及NaN的操作始终返回NaN
// NaN不等于任何值, 包括NaN本身
// 可以通过isNaN()来判断一个值是否是NaN. 该函数会尝试将目标值转换成数值类型, 任何无法转换为数值的值都会导致isNaN()返回true
{
  console.log(0 / 0); // NaN
  console.log(0 / -0); // NaN
  console.log(5 / 0); // Infinity
  console.log(-5 / 0); // -Infinity
  console.log(NaN == NaN); // false
  console.log(isNaN(NaN)); // true
}
