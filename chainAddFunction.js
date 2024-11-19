/**
 * 连续调用
 *
 * 与curry函数不太一样
 * curry函数，处理的是固定参数长度的函数，
 * 超过长度的参数不被处理或者直接报错
 *
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

/*
 * 返回值始终是一个函数，根据最后调用情况，
 *   有参数的话，与之前的叠加，使用闭包
 *   没有参数的话，返回之前参数的和
 *
 * 额外自定义了valueOf和toString函数
 */
function sumEmpty(x) {
  let ans = x;

  function func(y) {
    return y === undefined ? ans : ((ans += y), func);
  }

  func.toString = func.valueOf = function () {
    return ans;
  };

  return func;
}

const addTwo = sumEmpty(2);
console.log(addTwo(2)(3)());

function sum(x) {
  // helper 是一次性的，后面返回的都是f函数
  // f函数 也是类似的 有传参数就叠加，没有传参数，就返回总值
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

console.log(sum(1)(2)());
