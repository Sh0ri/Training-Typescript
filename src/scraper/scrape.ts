'use strict';
//import cheerio from 'cheerio';
//import pSettle from 'p-settle';
//import request from 'request';

//test consts
// const headers = { 
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
//     'Content-Type' : 'application/x-www-form-urlencoded' 
// };
const test_url:string = "https://u.gg/lol/profile/euw1/sh0ri/overview";

async function test_function(_url:string):Promise<void>{
    try {
        console.log("HELLO");
    }
    catch(err) {
        console.log('Error : ', err.message);
    }
}


console.log(test_function(test_url));

module.exports = {
	test_function : test_function,
};