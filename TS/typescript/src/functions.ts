

// functions
// named function
function add(x:number, y:number):number {
    return x+y;
}
// anonymous
let myAdd = function (x: number, y: number):number {
    return x+y;
};
let z = 100;
function addToZ(x: number, y: number):number {
    return x+y+z;
}


// 函数类型
// 函数类型包括参数类型 和 返回值类型, 参数仅匹配类型,不匹配变量名
let myAdd1:(x:number, z:number)=>number = function (x:number, y:number):number {
    return x+y;
};
// 没有返回值需指定 void
let printMsg:(msg:string)=>void = function (msg:string):void {
    console.log(msg);
};


// 可选参数和默认参数, 使用?表示
// 可选参数必须跟在参数后面
// 可选参数可以设置默认值(当没有传递此参数或者传递 undefined 时), 此时也标记此参数为可选参数
// function buildName(firstName:string, lastName:string = 'smith):string {
function buildName(firstName:string, lastName?:string):string {
    if (lastName) return `${firstName} ${lastName}`;
    return firstName;
}
let result1 = buildName('bob');
let result2 = buildName('bob', 'adams');
// let result3 = buildName('bob', 'adams', 'sr.'); // Expected 1-2 arguments, but got 3.
// console.log(`${result1}\n${result2}`);

// 剩余参数, 会被当做个数不限制的可选参数
function buildName1(firstName: string, ...restOfNames: string[]):string {
    return `${firstName} ${restOfNames.join(' ')}`;
}
let buildName1Func:(firstName:string, ...rest:string[])=>string = buildName;


// this and arrow function
// js 中 this 的值, 在调用时才会被指定
// 箭头函数能保存函数创建时的 this 值, 而不是调用值
let deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
        return ()=> {
            let pickedCard = Math.floor(Math.random()*52);
            let pickedSuit = Math.floor(pickedCard/13);
            return {suit: this.suits[pickedSuit], card: pickedCard%13};
        }
    }
};
let cardPicker = deck.createCardPicker();
let pickCard = cardPicker();
console.log(`card: ${pickCard.card} of ${pickCard.suit}`);

// this 参数, 这是一个假参数, 出现在参数列表最前方
function f(this: void) {
    // 确保 this 不可用
    // this.a = 'a'; // Property 'a' does not exist on type 'void'.
}
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this:Deck):()=>Card;
}
let deck1:Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker:function (this: Deck) {
        return ()=>{
            let pickedCard = Math.floor(Math.random()*52);
            let pickedSuit = Math.floor(pickedCard/13);
            return {suit: this.suits[pickedSuit], card: pickedCard%13};
        }
    }
};

// 回调函数中的 this
interface UIElement {
    addClickListener(onClick:(this:void, e:Event) => void):void;
}
class Event {
    constructor(public type:string){};
}
class Handler {
    info: string = '';
    onClickBad(this:Handler, e:Event) {
        this.info = e.type;
    }
    onClickGood(this: void, e:Event) {
        console.log(`on click`);
    }
    onClickGoodWithThis = (e:Event) => {
        this.info = e.type;
        console.log(this.info);
    };

}
let h = new Handler();
let uiElement:UIElement = {
    addClickListener(onClick:(this:void, e:Event)=>void):void{
        setTimeout(() => {
            onClick(new Event('click'));
        });
    }
};
// uiElement.addClickListener(h.onClickBad); // Argument of type '(this: Handler, e: Event) => void' is not assignable to parameter of type '(this: void, e: Event) => void'. The 'this' types of each signature are incompatible. Type 'void' is not assignable to type 'Handler'.
uiElement.addClickListener(h.onClickGood);
uiElement.addClickListener(h.onClickGoodWithThis);


// 重载
let suits =  ['hearts', 'spades', 'clubs', 'diamonds'];
// 重载对象 重载数字
function pickCard2(x: { suit: string; card: number }[]):number;
function pickCard2(x: number) :{suit: string; card: number};
function pickCard2(x:any):any {
    if (typeof x === 'object') {
        return Math.floor(Math.random() * x.length);
    } else if (typeof x === 'number') {
        let pickSuit = Math.floor(x/13);
        return {suit:suits[pickSuit], card: x%13};
    }
}
let myDeck = [{suit:'diamonds', card:2}, {suit:'spades', card:10}, {suit:'hearts', card:4}];
let pickCard21 = myDeck[pickCard2(myDeck)];
let pickCard22 = pickCard2(15);
console.log(pickCard21);
console.log(pickCard22);
//let pickCard23 = pickCard2('xx'); // Argument of type '"xx"' is not assignable to parameter of type 'number'.
//let pickCard24 = pickCard2([{suit:'diamonds'}]); // Argument of type '{ suit: string; }[]' is not assignable to parameter of type 'number'.


export default {};
