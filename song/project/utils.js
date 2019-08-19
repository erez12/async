const faker = require('faker');

module.exports = {
    getSongJson: function (url, callback){
        setTimeout(function (){
            callback([{
                url: '/path_to_part1',
                part: 1
            },{
                url: '/path_to_part3',
                part: 2
            },{
                url: '/path_to_part2',
                part: 3
            }])
        }, 1000);
    },
    getParagraph: function (url, callback){
        setTimeout(function (){
            callback(faker.lorem.paragraph())
        }, 1000);
    }
}