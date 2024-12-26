/**
 * 深度克隆一个对象，只克隆对象自身的属性
 * @param {any} obj - 要克隆的对象
 * @returns {any} - 克隆后的新对象
 */
function deepClone(obj) {
    // 处理基础类型和 null
    // 如果不是对象类型或是 null，直接返回原值
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 创建新的容器
    // 如果是数组则创建空数组，否则创建空对象
    const newObj = Array.isArray(obj) ? [] : {};
    
    // 遍历对象的所有可枚举属性
    for (const key in obj) {
        // 只处理对象自身的属性，忽略原型链上的属性
        if (Object.hasOwn(obj, key)) {
            const value = obj[key];
            
            // 如果属性值是函数，将其绑定到新对象
            if (typeof value === 'function') {
                newObj[key] = value.bind(newObj);
            } else {
                // 递归克隆对象的属性值
                newObj[key] = deepClone(value);
            }
        }
    }

    return newObj;
}


const obj = { a: 1, b: 2, c: [1, 2, 3], d: function () { } }
obj.a = undefined;

const obj2 = deepClone(obj);
obj2.a = 2;
obj2.b = 3;
obj2.c = [];

console.log(obj);
console.log(obj2);


class Test {
    constructor() {
        this.a = 1;
        this.b = 2;
    }

    // c() {
    //     console.log('c');
    // }
}

Test.prototype.d = 1;

const obj3 = new Test();

console.log(deepClone(obj3).d);
