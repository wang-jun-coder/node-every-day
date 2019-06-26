namespace TypeCompatibilityNameSpace {

  // ts 类型兼容基于结构子类型
  interface Named {
    name: string;
  }
  class Person {
    name: string
  }
  let p: Named;
  p = new Person();
  // p = {}; // Property 'name' is missing in type '{}' but required in type 'Named'

  // 基本规则: 如果x要兼容y，那么y至少具有与x相同的属性
  let x: Named;
  let y = {
    name: 'alice',
    location: 'seattle'
  }
  x = y;
  function greet(n: Named): void {
    console.log(`hello ${n.name}`);
  } 
  greet(y);

  // 比较两个函数
  let f1:(a: number) => 0;
  let f2:(a: number, s: string) => 0;
  // f1 的参数列表,在f2 中都能找到对应类型的参数
  f2 = f1;
  // f2 的参数 s 在 f1 中找不到对应类型参数, 所以报错
  //f1 = f2; // 不能将类型“(a: number, s: string) => 0”分配给类型“(a: number) => 0“
  
  // 如:
  let items = [1, 2, 3];
  items.forEach((item, index, array) => console.log(item));
  items.forEach((item) => console.log(item));
  // 返回值
  let f3 = () => ({name: 'alice'});
  let f4 = () => ({name: 'alice', location: 'seattle'});
  f3 = f4;
  // f4 返回值需要一个 location 属性, f3 返回值没有
  //f4 = f3; // 不能将类型“() => { name: string; }”分配给类型“() => { name: string; location: string; }”。Property 'location' is missing in type '{ name: string; }' but required in type '{ name: string; location: string; }'


  // 函数参数双向协变





}