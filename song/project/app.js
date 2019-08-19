// const utils = require('./utils');

// function getSongSerial(songJsonUrl, callback) {
//     utils.getSongJson(songJsonUrl, function (songJson){
//         var result = "";
//         var i = 0;

//         function makeRequest(str) {
//             if (str){
//                 result += str;
//             }
//             if (i >= songJson.length){
//                 callback(result)
//                 return;
//             }

//             getParagraph(songJson[i].url, makeRequest);
//             i++;
//         }
//         makeRequest();
//     })
// }

// function getSongParalel(songJsonUrl, callback) {
//     utils.getSongJson(songJsonUrl, function (songJson){
//         var arr = []
//         var respondCounter = 0;
//         for(let i = 0; i < songJson; i++){
//             getParagraph(songJson[i].url, function (paragraph){
//                 arr[i] = paragraph;
//                 respondCounter++
//                 if (respondCounter >= i) {
//                     callback(arr.join());
//                 }
//             })
//         }

//     })
// }
// function main(){
//     getSong('http://google.com', function (res){
//         console.log(res);
//     })
// }

// main();


let a = Promise.resolve(8);

a.then((val) => console.log(val))
a.then((val) => console.log(val))

