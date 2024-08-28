/**
 * add(1)(2)(3); // == 6
 * add(1)(2)(3)(4); //  == 10
 * add(1)(2)(3)(4)(5); // == 15
 *
 * add(1); // == 1
 *
 * var addTwo = add(2);
 * addTwo; // == 2
 * addTwo + 5; // == 7
 * addTwo(3); // == 5
 * addTwo(3)(5); // == 10
 *
 */

/**
 * 涉及的知识点
 *
 * bind函数的用法
 *  第一个参数 决定this 后续的参数传递给下一次调用
 *
 *
 *  对象做类型转换时
 *  toString valueOf的优先级
 *  根据上下文，
 *
 *  期望转换成字符串时，先调toString,
 *  toString返回值不可用或不是一个原始值时再调用valueOf
 *
 *  期望转换成数字时，先调valueOf
 *  valueOf返回值不可用或不是一个原始值时，再调toString
 *
 */

function sum(x) {
  function helper(y, x) {
    if (x === undefined) {
      return y;
    }
    const sum = y + x;

    const f = helper.bind(null, sum);

    f.toString = function () {
      return '' + sum;
    };

    f.valueOf = function () {
      return sum;
    };
    return f;
  }
  return helper(x, 0);
}

console.log(sum(1)(2) + 4);

function sumEmpty(x) {
  let temp = x;

  function func(y) {
    return y === undefined ? temp : ((temp += y), func);
  }

  func.toString = func.valueOf = function () {
    return temp;
  };

  return func;
}

const addTwo = sumEmpty(2);

console.log(+addTwo(2));
