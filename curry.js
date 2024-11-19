/**
 * 函数柯里化
 * @param 参数是一个函数，这个函数接受【固定数量的参数】
 * @return 返回值  中间函数或者结果值
 *    当参数不够的时候，返回的是一个中间函数, 递归调用自身
 *    当参数全的话，返回最终计算结果
 *
 * 函数柯里化更多的是在讲一个需要传递【固定数量参数】的函数，
 * 转换成可以分步接受【单个参数】的函数
 * 每一步固化一个参数
 *
 * 与chainAddFunction有点不同；
 * chainAddFunction 接受不固定长度的参数，在最后空调用的时候计算结果值
 * 柯里化只处理固定长度的参数
 * */

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log('???', curriedSum(1, 2, 3, 4));
