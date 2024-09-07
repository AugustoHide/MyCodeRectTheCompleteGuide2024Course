//Primitives Types
let age: number = 24;
age = 12;

let userName: string = "Augusto";

let isInstructor: boolean = false;

// let hobbies: null;
// hobbies = 12;

console.log(
  "number, strings and booleans are the main primitive type. Because null cannot be used to assign values"
);

// Complex Types + Type Alias

let hobbies: string[];
hobbies = ["Sports", "Cooking", "Love"];

type Person = {
  name: string;
  age: number;
};

let person: Person;
// person = {isEmployed: true};
person = {
  name: "Augusto",
  age: 27,
};

let people: Person[];

console.log(
  "Type Alias: Quando vamos utilizar um mesmo tipo, geralmente complexo, com definições de array ou obj pré-definidas, podemos usar type alias para definir esta estrutura do tipo que deverá ser usado e simplificar o usso somente passando o nome do tipo para a váriável que irá utilizar o lias. Como usado no exemplo anterior."
);

// Type Inference + Type Union
let course: string | number = "React The Coplete Guide";
course = 1234;
console.log(
  "Type inference: o próprio TS faz intuitivamente a tuipagem mesmo que eu não especifique diretamente\nOu seja, não da para mudar de tipo dinamicamente como no JS normal."
);
console.log(
  "Union Type: quando definimos variáveis que precisam de mais de um tipo, usamos union types, que permite usar mais de um tipo numa mesma váriável."
);

// Functions

function add(a: number, b: number) {
  return a + b;
}

function printEx(value: any) {
  console.log(value);
}

console.log(
  "Functions + Types: nós temos de indicar o tipo nos parâmetros. Mas a sáido só precisaremos indicar se precisarmos, pq o TS já faz o type inference. Quando a função não retorna nada, ela será do tipo void"
);

//Generics

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, 0);
// updatedArray[0].split('');

const stringArray = insertAtBeginning(["a", "b", "c"], "s");
stringArray[0].split("");

console.log(
  "Generics: Quando não sabemos definir qual tipo deverá passar por uma função, tanto nos parâmetros como no valor de retorno, podemos usar generics para definir um padrão genérico de tipo.\n   Ao definirmos um generic, podemos defnir que m confunto de funções, variáveis e retorno poderão ter somente tipo iguais. Idependente de qual seja, o tipo generics determina que, ao ser definido o mesmo generics, deve-se ter o mesmo tipo. Podemos então ter liberdade para definir este tipo dinamicamente."
);
