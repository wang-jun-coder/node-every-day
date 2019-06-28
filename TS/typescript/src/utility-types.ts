namespace UtilityTypesNameSpace {
  // 一些常用的实用工具类型

  // Partial<T>, 构造类型 T, 并将其所有属性设置为可选
  interface Todo {
    title: string;
    description: string;
  }
  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>):Todo {
    return {
      ...todo,
      ...fieldsToUpdate
    }
  }
  const todo1 = {
    title: 'this is todo1 title',
    description: 'this is todo1 description'
  }
  const todo2 = updateTodo(todo1, {
    description: 'this is new todo description',
  });

  // Readonly<T>, 构造类型 T, 并设置所有属性只读
  const todo3: Readonly<Todo> = {
    title: 'todo3',
    description: 'todo3 desc'
  }
  //todo3.title = 'xx'; // Cannot assign to 'title' because it is a read-only property.ts(2540)
  // 声明冻结对象的属性为只读
  declare function freeze<T>(obj: T): Readonly<T>;

  // Record<K, T>, 构造一个类型, 属性名的类型为 K, 属性值类型为 T
  interface PageInfo {
    title: string;
  } 
  type Page = 'home' | 'about' | 'contact';
  const x: Record<Page, PageInfo> = {
    about: {title:'about'},
    home: {title: 'home'},
    contact: {title: 'contact'}
  }

  // Pick<T, K>, 从 T 类型中选出部分属性 K 构造新类型
  type TodoPreview = Pick<Todo, 'title'>;
  const todo: TodoPreview = {
    title: 'this is pick title',
    // desc: '' //   对象文字可以只指定已知属性，并且“desc”不在类型“Pick<Todo, "title">”中。ts(2322)
  }

  // Exclude<T, U>,  从 T 中剔除所有可以赋值给 U 的属性, 
  type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // type T0 = "b" | "c"
  type T1 = Exclude<string | number | (()=>void), Function>; // type T1 = string | number

  // Extract<T, U>, 从 T 中提取可以赋值给 U 的类型, 然后构造一个新类型
  type T2 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // type T2 = "a"
  type T3 = Extract<string | number | (() => void), Function>; //type T3 = () => void

  // NonNullable<T>, 剔除 null 和 undefined
  type T4 = NonNullable<string | null | number>; // type T4 = string | number
  type T5 = NonNullable<string[] | null | undefined>; // type T5 = string[]

  // ReturnType<T>, 根据函数类型 T 返回值构造一个类型
  type T6 = ReturnType<()=>string>; // type T6 = string
  type T7 = ReturnType<(s: string) =>void>; // type T7 = void
  type T8 = ReturnType<<T>()=>T>; // type T8 = unknown
  type T9 = ReturnType<<T extends U, U extends number[]>()=>T>; // type T9 = number[]
  type T10 = ReturnType<typeof updateTodo>; // type T10 = {title: string;description: string;}
  type T11 = ReturnType<any>; // type T11 = any
  type T12 = ReturnType<never>; // type T12 = never
  // type T13 = ReturnType<Function>; // 类型“Function”不满足约束“(...args: any) => any”。
  // type T14 = ReturnType<string>; // 类型“Function”不满足约束“(...args: any) => any”。

  // InstanceType<T>, 由构造函数类型 T 返回一个实例类型
  class C {
    x=0;
    y=0;
  }
  type T15 = InstanceType<typeof C>; // type T15 = C
  type T16 = InstanceType<any>; // type T16 = any
  type T17 = InstanceType<never>; // type T17 = never
  // type T18 = InstanceType<string>; // 类型“string”不满足约束“new (...args: any) => any”。ts(2344)
  // type T19 = InstanceType<Function>; // 类型“string”不满足约束“new (...args: any) => any”。ts(2344)

  // Required<T>, 构造一个类型, 使类型所有属性都为必选
  interface Props {
    a?:number;
    b?:number;
  }

  const obj1: Props = {a :5};
  //const obj2: Required<Props> = {a: 1} // const obj2: Required<Props>


  // ThisType<T>, 做为上下文的this类型的一个标记
  type ObjectDescriptor<D, M> = {
    data?:D;
    methods?: M & ThisType<D & M>;
  }
  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D&M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    return {
      ...data,
      ...methods
    } as D&M;
  }
  let obj3 = makeObject({
    data:{x:0, y:0},
    methods: {
      moveBy(dx: number, dy:number) {
        this.x += dx;
        this.y += dy;
      }
    }
  })

  obj3.x = 10;
  obj3.y = 10;
  obj3.moveBy(10, 10);



}