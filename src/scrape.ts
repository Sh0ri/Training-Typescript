'use strick'

import puppeteer from 'puppeteer';
import getAllCardsInfo from './scrapePorofessor';

async function getCompositions(porofessorUrl:string,pseudo:string){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(porofessorUrl+pseudo);
        await page.waitFor('#liveContent > div.site-content.site-content-bg > ul:nth-child(5) > li:nth-child(5) > div');
        const everybody = await page.evaluate(getAllCardsInfo);
        console.log(everybody);
    } catch (error) {
        console.log(error);
    }
    

    
    return "";
}

getCompositions("https://porofessor.gg/live/euw/","TheCaptain Shiva");

//const championBuildUrl1 = "https://u.gg/lol/champions/";
//const championBuildUrl2 = "/build";
//const opponentParam = "?opp=";//+perso

