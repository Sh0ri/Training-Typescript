'use strick'

import puppeteer from 'puppeteer';
import { isElement } from '../typeGuards';


const url1:string = "https://u.gg/lol/profile/euw1/";
const url2:string = "/overview";

async function scrape_profile(pseudo:string):Promise<string>{

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url1+pseudo+url2);

    await page.click("#qcCmpButtons > button:nth-child(2)");

    const strong_pseudo:string = await page.evaluate(() => {
        let elem = document.querySelector('#content > div > div > div.summoner-profile_header-container > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div.summoner-name > strong');
        //C'est ici que ça bug
        if(isElement(elem))
        {
            return elem.toString();
        }
        else return "";
    });

    return strong_pseudo;


/*
        let elem:HTMLElement|null = document.querySelector('#content > div > div > div.summoner-profile_header-container > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div.summoner-name > strong');
        console.log("le strong pseudo");
        if(isHTMLElement(elem)) {
            console.log(elem.innerText);
            return elem.innerText;
        }
        else return "error";
    });
    browser.close()

    return strong_pseudo;*/
}

scrape_profile("Sh0ri").then(value => console.log(value));
