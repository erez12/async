// // Iterators

// // 1. Simple case
// const arrayOfNumbers = [1, 2, 3];

// let iterator = arrayOfNumbers[Symbol.iterator]();
// let item = iterator.next();
// while(!item.done) {
//   console.log(item.value);
//   item = iterator.next(); // 1, 2, 3
// }

// // 2. Using for...of
// const iterator = arrayOfNumbers[Symbol.iterator];
// console.log(iterator); // a function here

// for(let number of arrayOfNumbers) {
//   console.log(number); // 1, 2, 3
// }

// // 3. Using Iteration protocol
// class Student{
//     constructor(name){
//         this._name = name;
//     }

//     get name() { return this._name }
// }
// class StudentsGroup{
//     constructor(){
//         this._students = []
//     }
//     addStudent(student){
//         this._students.push(student);
//     }
//     [Symbol.iterator](){
//         let iterationIndex = 0;
//         return {
//             next: () => {
//                 if (iterationIndex < this._students.length){
//                     let currentValue = this._students[iterationIndex]
//                     iterationIndex++;
//                     return { value: currentValue, done:false };
//                 }

//                 return { done: true };
//             }
//         }
//     }
// }

// let myClass = new StudentsGroup();
// myClass.addStudent(new Student('john'));
// myClass.addStudent(new Student('jaime'));
// myClass.addStudent(new Student('george'));
// for(let s of myClass) {
//     console.log(s.name);
// }



// // Generators
// // 1. Basic
// function* basicGenerator() {
//     console.log('Basic Generator Start...');

//     yield 1;

//     console.log('Basic Generator End...');
// }

// let a = basicGenerator();

// console.log('1:', a);
// console.log('2:', a.next());
// console.log('3:', a.next());
// console.log('4:', a.next());

// // 2. Input to generator
// function* valuedGenerator() {
//     console.log('Valued Generator Start...');

//     let val = yield 1;
//     console.log('Valued Generator got', val);
//     console.log('Valued Generator End...');
// }

// let a = valuedGenerator();

// let fromGenerator = a.next();
// a.next(fromGenerator.value + 1);


// 3. Why is this good for ?
// 3.1 A simple way to create an iterator
// class StudentsGroup{
//     constructor(){
//         this._students = [{name: 'john'}, {name: 'jaime'}, {name: 'george'}]
//     }
//     addStudent(student){
//         this._students.push(student);
//     }
//     *generator(){
//         let iterationIndex = 0;
//         while(iterationIndex < this._students.length){
//             yield this._students[iterationIndex++]
//         }
//     }
// }

// let myClass = new StudentsGroup();
// for(let s of myClass.generator()) {
//     console.log(s.name);
// }

// 3.2 Output a sequence of numbers
// a. basic linear
function* linerSequence(n0, d){
    while(true) {
        yield n0;
        n0 = n0 + d;
    }
}


for(let n of linerSequence(0,1) ) {
    console.log(n);
}

// b. range
function* ns(init, n){
    let index = init;
    while(index <= n)
        yield index++;
}
let range = (n) => [...ns(0, n)];