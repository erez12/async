
# Functions In JS

#### A. First Class citizen
They are considered a primitive type just like Number, String, Boolean. Functions are special case of objects

```javascript
function foo(){
    console.log('foo')
}

foo.abc = 1;
foo();
console.log(foo.abc)
```

2. We use functions as one of the ways to create Objects
```javascript
function Animal(sound){
    this.sound = sound
}

let cat = new Animal("mow");
```

3. We can assign functions to variables
```javascript
let foo = function (){
    console.log("foo")
}
```

4. We can pass functions around
```javascript
function foo(){
    console.log("foo")
}
function goo(action){
    console.log("goo")
    action()
}

goo(foo);
```

5. Functions can be named or unnamed.
```javascript
let arr = [1,2,3,4,5,6,7,8,9]

// anonymous
let evens = arr.filter(function (val){
    return val % 2 === 0
})

// Named
function isEven(x) {
    return x % 2 === 0
}

let evens = arr.filter(isEven)
```
</br></br>

#### B. IFFI - Immediately invoked function

```javascript
(function a(x){
    console.log(x);
}());
```
The main use of this is to create an isolated scope.
We can use it to create a singletons
```javascript
var a = (function (){
    return {
        b: 123
    }
}())

console.log(a.b);
```
</br></br>

#### C. Closure -
A closure is the combination of a function and the lexical environment within which that function was declared. WTF ???

1. basic
```javascript
function init() {
    var name = 'Mozilla'; // name is a local variable created by init
    function displayName() {
        // displayName() is the inner function, a closure
        // use variable declared in the parent function
        alert(name);
    }
    displayName();
}
init();
```
2. Emulating private methods
```javascript
function Counter(){
    let _count = 0;
    return {
        increment: function() {
            _count++;
        },
        decrement: function() {
            _count--;
        },
        value: function() {
            return _count;
        }
    }
}
let c = Counter();
c._count // undefined as its not in the scope of c
```
</br></br>

#### D. High Order Functions

This term is coming from the world of Functional Programing and refers to a function which receives a function as an argument or returns a function as output.
(*) we are not necessarily talking here about callback


1. forEach: this is a method to iterate over a collection of elements.
```javascript
let arr = [1,2,3,4]
// Iterative
for(let i =0; i < arr.length; i++){
    console.log(i)
}
// FP
arr.forEach(function (currentValue, index){
    console.log(currentValue);
})
```

2. transformers:
```javascript
// Map
const arr1 = [1, 2, 3];
const arr2 = arr1.map(function(item) {
    return item * 2;
});
console.log(arr2);
```
```javascript
// Filter
const persons = [
    { name: 'Peter', age: 16 },
    { name: 'Mark', age: 18 },
    { name: 'John', age: 27 },
    { name: 'Jane', age: 14 },
    { name: 'Tony', age: 24}
];
const fullAge = persons.filter(person => person.age >= 18);
console.log(fullAge);
```
```javascript
// Reduce
const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
});

console.log(sum);
```
3. Function which returns a function

Lets create a function which adds 1 to a number
```javascript
function add1(x){
    return x + 1;
}
```
Our add1 function is good but it has 2 things backed into it - Addition (the operation) and the value 1 making it specific. Lets assume we now need to create a function which adds 2 to a number. We will need to create an additional function with same body but only use 2.
What we really want is to have some factory method which creates addition functions.

```javascript
function adder(x){
    return function (y){
        return x + y
    }
}

// Now we can use this function
let add1 = adder(1)
let add2 = adder(2)

console.log(add1(2)) // 3
console.log(add2(2)) // 4

```
Fix scoping issues
```html
<button>click1</button>
<button>click2</button>
<button>click3</button>
<button>click4</button>

<script>
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(){
            alert(i); // What will be printed when we click on the 3rd button ?
        })
    }
</script>
```

Fix
```javascript
var buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", (function(num){
        return function (){
            alert(num);
        }
    }(i)))
}
// * This can also be fixed by replacing var with let which is the common usecase these days
```
</br></br>

#### E. Functions as callbacks
```javascript
function makeRequest(url, callback){
    ...
}

makeRequest('http://google.com' , function (result){
    console.log(result);
});
```
</br></br>

#### F. Thunk
A thunk is a subroutine used to inject an additional calculation into another subroutine:
```javascript
function add(x, y){
    return x + y;
}

var thank = function (){
    return add(10, 15);
}

thunk(); // 25
```
</br>
Ok, what ?? why is this good ?
Though this doesn't seem like much but what we created is a container which encapsulate
specific
state. When we call thunk over and over again it will popup out the same value.
We now can pass our container around the program and any time we want its value we just
invoke our thunk.

<h6>Async Thunk</h6>

This is where things become interesting. What is an async thunk - its same thing but we just
need to pass in some callback to get out the underlining value.
```javascript
function asyncAdd(x, y, callback) {
    setTimeout(function (){
        callback( x + y );
    }, 1000);
}

var thunk = function (callback) {
    asyncAdd(10, 15, callback);
}

thunk(function (sum) {
    console.log(sum); // 25
})
```
What's important to note here is that from the caller perspective, he doesn't know nor does he care how this value is calculated. This value can be fetched from the server or can be returned immediately. The caller just doesn't care.
```javascript
// usersDAL.js
let usersCache = null;
thunk = function (callback){
    if (usersCache) {
        return callback(usersCache);
    }

    // This is an expensive operation
    getUsersFromDB(function (users) {
        usersCache = users;
        callback(usersCache);
    });
}

// We export our caching thunk
module.export.getUsers = thunk;
```
By wrapping our function around this state we removed the time factor from
our flow and our wrapper is now time independent. Whenever you pass it a callback it will
eventually give you the value (with error handling ignored for the sake of the argument).
The caller doesn't care if the value is here now or when it will be here. He will use it in
exactly the same way.

Does this sound like something we already have ?
Well yes, a Promise is a time independent wrapper around a value. It just has more stuff
and API around this exact concept.
</br>
We can use multiple thunks
```javascript
const { getUsers } = require('/usersUtil');
const { getHolidays } = require('/calenderUtil'); // list of dates and holidays for this year

app.get('/birthdayOnHoliday/:userId', function (req, res) {
    getUsers(function (users) {
        getHolidays(function (holidays) {
            let { birthday } = users.find(byId);
            let holidayOnDate = holidays[birthday];
            res.send(
                holidayOnDate ? `User birthday is on ${holidayOnDate} holiday` : 'no holiday on this date');
        })
    });
});
```

Important note here is that both getUsers and getHolidays are lazy. They don't do any work until we actually use
them.

We can even create some utility to run multiple thunks
```javascript
function runThunks(thunkList, callback){
    let results = [];

    for(let i = 0; i < thunkList.length; i++){
        // note that we use let here to bind i value per iteration
        thunkList[i](function (value){
            results[i] = value;
            respondCounter++
            if (respondCounter >= i) {
                callback(results);
            }
        });
    }
}


app.get('/birthdayOnHoliday/:userId', function (req, res) {
    runThunks([getUsers, getHolidays], function( [ users, holidays] ){
        let { birthday } = users.find(byId);
            let holidayOnDate = holidays[birthday];
            res.send(
                holidayOnDate ? `User birthday is on ${holidayOnDate} holiday` : 'no holiday on this date');
    });
});
```
