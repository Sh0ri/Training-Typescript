'use strict';
import cheerio from 'cheerio';
//import pSettle from 'p-settle';
import * as request from 'request-promise';


//test consts
 const headers = { 
     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
     'Content-Type' : 'application/x-www-form-urlencoded' 
 };
 
//const test_url:string = "https://u.gg/lol/profile/euw1/sh0ri/overview";
const test_url:string = "https://old.reddit.com/r/leagueoflegends/";
async function test_function(_url:string):Promise<void>{
    try {
        var result:string = await scrape_profile(test_url);
        console.log("result" + result);
    }
    catch(err) {
        console.log('Error : ', err.message);
    }
}

async function scrape_profile(url:string):Promise<string>{

    return new Promise((resolve, reject) => {
        request.get({url:url,headers:headers}, function(error:any, response:any, html:string) {
            if(!error){
                console.log("response : " + response);
                var $:any = cheerio.load(html);

                var pseudo:string = $('#thing_t3_d5t3uf > div.entry.unvoted > div.top-matter > p.title > a').text();
                console.log(pseudo);
                resolve(pseudo);
            }
            else
                reject(error.toString());
        });
    });
    

    // await request.get(url)
    // .then((body)=>{response = JSON.parse(body);})
    // .catch((err) => {response = {"origin": err.toString() };});
    
    //return response;
}


//console.log(test_function(test_url));
test_function(test_url);

module.exports = {
	test_function : test_function,
};