/* // import { apiKey } from "./util.js";

// import apiKey from "./util.js";
import { default as apiKey, whatever1, whatever2 } from "./util.js";

// import * as util from "./util.js";

// console.log(util.default, util.whatever1, util.whatever2);
console.log(apiKey, whatever1, whatever2);
 */

/* console.log(
  "Hello there!! This is a string value. But it is not stored in a variale"
);
const userMessage = "Hello There!!";
console.log(userMessage, userMessage); */

/* console.log("Hello " + "World!!!", 10 + 2); */

/* function createGreeting(userName, message = "Hello ") {
  console.log(`${message} ${userName}`);
}
createGreeting("Max");
createGreeting("Max", "Why!!");
createGreeting("Daniel", "Eaiiiiiii"); */

/* export default () => {
  console.log("Arrow functions are good for nameless functions.");
}; */

/* const user = {
  name: "Augusto",
  age: 29,
  getAge() {
    console.log(`${this.name} you have ${this.age} years old`);
  },
};
user.getAge();

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getAge() {
    console.log(`${this.name} you have ${this.age} years old`);
  }
}

const user1 = new User("Daniel", 20);
user1.getAge(); */

/* const hobbies = ["meditation", "Music", "Films"];

const indexMusic = hobbies.findIndex((hob) => hob === "Music");
const indexedHobbies = hobbies.map((hob) => hob + "!!!");
const objHobbies = hobbies.map((hob) => ({ hobbie: hob }));
console.log(hobbies, indexMusic, indexedHobbies, objHobbies); */

/* const [firstName, middleName, lastName] = ["Augusto", "Hide", "Sakihama"];
console.log(firstName);
console.log(lastName);

const user = {
  name: "Augusto",
  age: 29,
};

const { name: first, age } = user;
console.log(first, age);

const hobbies = ["meditation", "Music", "Films"];
const hobbiesMore = [...hobbies, "Walking"];
console.log(hobbiesMore);

const extendedUser = {
  isAdm: true,
  ...user,
};
console.log(extendedUser);
 */

/* const greeter = function (greetFunction) {
  greetFunction();
};
greeter(() => console.log("Hi here"));
 */

/* function init() {
  function greet() {
    console.log("greet inside init");
  }
  greet();
}
init(); */
