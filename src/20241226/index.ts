// typescript 不可变类型：实现深度不可变

interface Obj {
    a: number;
    b: string;
    c: {
        d: boolean;
    }
}

let obj: Readonly<Obj> = {
    a: 1,
    b: '2',
    c: {
        d: true
    }
}

// Cannot assign to 'a' because it is a read-only property.
// obj.a = 2;

// Readonly 浅不可变 所以可以修改
obj.c.d = false;

// 深度不可变
// 第一步： 实现官方的Readonly
type DeepReadonly2<T> = {
    readonly [K in keyof T]: T[K]
}

let obj2: DeepReadonly2<Obj> = {
    a: 1,
    b: '2',
    c: {
        d: true
    }
}

// 和Readonly相同的报错：Cannot assign to 'a' because it is a read-only property.
// obj2.a = 3;

// 和Readonly相同深度不可变失效
// obj2.c.d = false;

// 第二步： DeepReadonly3<T[K]>递归每一个
type DeepReadonly3<T> = {
    readonly [K in keyof T]: DeepReadonly3<T[K]>
}

let obj3: DeepReadonly3<Obj> = {
    a: 1,
    b: '2',
    c: {
        d: true
    }
}

// 实现深度不可变类型约束
// obj3.a = 3;
// obj3.c.d = false;

// 第3步：完善类型约束，限制类型属性类型只能是string或者symbol

// 因为 let obj3: DeepReadonly3<string> = '123'; 也合法但是没有意义
type DeepReadonly4<T extends Record<string|symbol, any>> = {
    readonly [K in keyof T]: DeepReadonly4<T[K]>
}



/*************/
// 总结
// 1、Readonly 浅不可变
// 2、实现深度不可变
/*************/