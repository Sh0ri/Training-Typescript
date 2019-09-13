'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("request");
//test consts
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded'
};
const test_url = "https://u.gg/lol/profile/euw1/sh0ri/overview";


function test(url) {
    return new Promise((resolve, reject) => {
        request_1.default({ url: url, headers: headers }, function (error, response, html) {
            console.log("im here");
            if (!error)
                resolve(html.body);
            else
                reject("error");
        });
    });
}
console.log(test(test_url));
module.exports = {
    test: test,
};
//# sourceMappingURL=scrape.js.map