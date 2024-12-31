---
date: 2022-08-23
category: 手写合集
tags:
  - javascript
---

# 手写 JS 浅拷贝与深拷贝

## 概述

引用类型的赋值会导致它们的内存地址都指向同一个位置，如下所示：

```js
const obj1 = {
  data: {},
  count: 18
};
const obj2 = obj1;

console.log(obj1 === obj2); // true
console.log(obj1.data === obj2.data); // true
```

这样带来的问题是：如果直接修改`obj1`对象中的属性，`obj2`也会随之发生变化，两个对象会变得相互影响，在实际开发过程中我们应该尽量避免类似的情况发生，否则会出现一些难以预料的问题。

```js
const obj1 = {
  data: {},
  count: 18
};
const obj2 = obj1;

console.log(obj1 === obj2); // true
console.log(obj1.data === obj2.data); // true
obj1.count = 10;
console.log(obj2); // { data: {}, count: 10 }
```

通常的解决方法是使用浅拷贝或深拷贝的形式，那么浅拷贝与深拷贝有什么区别呢？

- 浅拷贝只进行一层复制，深层次的引用类型还是共享内存地址，原对象和拷贝对象还是会互相影响。
- 深拷贝就是无限层级拷贝，深拷贝后的原对象不会和拷贝对象互相影响。

通俗的讲就拿上面的例子来说，浅拷贝不会拷贝 `obj1.data` ，`obj1.data === obj2.data`还是为`true`的，因为它们的`data`属性还是指向同一块内存地址。而深拷贝无论引用类型的层级有多深都会保存在一新的内存地址中。这样 `obj1.data === obj2.data` 就为 false 了。

## 实现浅拷贝

### **[对象]** 使用`Object.assign`方法浅拷贝对象

```js
const newObj = Object.assign({}, oldObj);
console.log(newObj === oldObj); // false
console.log(newObj.name === oldObj.name); // true
```

### **[对象]** 扩展运算符的方法浅拷贝对象

```js
const oldObj = {
  data: {},
  count: 18
};
const newObj = { ...oldObj };

console.log(newObj === oldObj); // false
console.log(newObj.name === oldObj.name); // true
```

### **[数组]** 使用`slice`和`concat`方法浅拷贝数组

- 使用 `slice` 方法实现：

```js
const oldArr = ['abc', 'cba', { name: 'jack' }];
const newArr = oldArr.slice();
console.log(newArr === oldArr); // false
console.log(newArr[2].name === oldArr[2].name); // true
```

- 使用 `concat` 方法实现:

```js
const oldArr = ['abc', 'cba', { name: 'jack' }];
const newArr = [].concat(oldArr);
console.log(newArr === oldArr); // false
console.log(newArr[2].name === oldArr[2].name); // true
```

### **[数组]** 数组的静态方法 `Array.from` 浅拷贝数组

```js
const oldArr = ['abc', 'cba', { name: 'jack' }];
const newArr = Array.from(oldArr);

console.log(newArr === oldArr); // false
console.log(newArr[2].name === oldArr[2].name); // true
```

### **[数组]** 扩展运算符浅拷贝数组

```js
const oldArr = ['abc', 'cba', { name: 'jack' }];
const newArr = [...oldArr];

console.log(newArr === oldArr); // false
console.log(newArr[2].name === oldArr[2].name); // true
```

## 实现深拷贝

接下来就是重头戏了，实现一下深拷贝，深拷贝相比较浅拷贝而言要复杂很多，需要考虑多种情况，因为处理逻辑比较多，所以这里专门封装了一个函数，具体请看下面的实现过程：

- [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)构造函数，可以实例化出一个 `WeakMap` 对象，而这个对象是一组键/值对的集合，其中的键是弱引用的，如果没有其他变量引用这个对象，那么 [GC](https://developer.mozilla.org/zh-CN/docs/Glossary/Garbage_collection) 将回收该对象。而且其键必须是对象，值可以是任意的。
- 静态方法 [Reflect.ownKeys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) 返回一个由目标对象自身的属性键组成的数组。该方法支持获取 [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 类型的 `key`。

```js
function deepClone(target, hash = new WeakMap()) {
  // 额外开辟一个存储空间WeakMap来存储当前对象
  if (target === null || target === undefined)
    return target; // 如果是 null 或 undefined 就不进行拷贝操作
  if (target instanceof Date)
    return new Date(target); // 处理Date对象
  if (target instanceof RegExp)
    return new RegExp(target); // 处理正则对象

  if (typeof target !== 'object')
    return target; // 处理原始类型和函数 不需要深拷贝，直接返回

  // 是引用类型的话就要进行深拷贝
  if (hash.get(target))
    return hash.get(target); // 当需要拷贝当前对象时，先去存储空间中找，如果有的话直接返回
  const cloneTarget = new target.constructor(); // 创建一个新的克隆对象或克隆数组
  hash.set(target, cloneTarget); // 如果存储空间中没有就存进 hash 里

  // 这里我们其实可以选择使用 Object.keys(target) 静态方法获取到该对象中的每一个key
  // 但问题是若对象中存在Symbol类型的key，就遍历不到这个属性了
  // 所以我们改用Reflect.ownKeys()方法获取到对象中的每一个key，该方法支持获取Symbol类型的key
  Reflect.ownKeys(target).forEach(key => {
    // 引入 Reflect.ownKeys，处理 Symbol 作为键名的情况
    cloneTarget[key] = deepClone(target[key], hash); // 遍历拿到key之后递归拷贝每一层
  });
  return cloneTarget; // 返回克隆出来的对象
}
```

之后我们测试一下这个方法

```js
const obj = {
  age: 18,
  arr: [1, 2, 3],
  data: {
    banner: [],
    info: {}
  },
  date: new Date(),
  reg: /abc/,
  foo() {}
};
const bar = Symbol('name');
obj[bar] = { a: 'aaa', b: 'bbb' };

const newObj = deepClone(obj);
console.log(obj.data === newObj.data); // false
console.log(obj.data.banner === newObj.data.banner); // false
console.log(obj[bar] === newObj[bar]); // false
```

## 总结

以上就是深拷贝的具体实现方法了，其实还不算特别完善，还缺少一些构造函数实例的类型判断，例如`HTMLElement`等，当然你也可以继续在我这个方法的基础之上加入更多边界情况的判断，方法的主体思路是不变的。其中涉及到很多概念，但是弄懂的原理之后实现的难度其实并不大。
