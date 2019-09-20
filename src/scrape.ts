'use strick'

import puppeteer from 'puppeteer';
import getAllCardsInfo from './scrapePorofessor';
//import { IChampionCard, IChampionCardsList } from './scrapper';
//import { isElement, isNull } from '../lib-typeGuards';

//const url1:string = "https://u.gg/lol/profile/euw1/";
//const url2:string = "/overview";
//const selectorTeamAllies = "#liveContent > div.site-content.site-content-bg > ul:nth-child(3) > li > div";
//const selectorTeamOpponents = "#liveContent > div.site-content.site-content-bg > ul:nth-child(5) > li > div";

async function getCompositions(porofessorUrl:string,pseudo:string){
    //#liveContent > div.site-content.site-content-bg > ul:nth-child(3) > li > div => allies
    //#liveContent > div.site-content.site-content-bg > ul:nth-child(5) > li > div => opponents
    const browser = await puppeteer.launch({ headless: false });
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

//const selectPseudo1 = "#liveContent > div.site-content.site-content-bg > ul:nth-child(3) > li > div > div.cardHeader.blue > a";
//chaque div apres li c'est une card
//const selectPerso1 = "#liveContent > div.site-content.site-content-bg > ul:nth-child(3) > li > div > div.cardBody > div.championsBoxContainer > div > div.imgFlex > div.imgColumn-champion > img";
//const selectElo = "#content > div > div > div.summoner-profile_content-container > div > div > div.summoner-profile_overview__side > div.grid-block.rank-block > div.grid-block-content > div > div:nth-child(1) > div > div.rank-text > strong";
//const porofessorUrl = "https://porofessor.gg/live/euw/";//+pseudo

// async function scrape_profile(pseudo:string):Promise<string>{

//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto(url1+pseudo+url2);

//     await page.click("#qcCmpButtons > button:nth-child(2)");

//     const strongPseudo:string = await page.evaluate(() => {
//         const elem = document.querySelector('#content > div > div > div.summoner-profile_header-container > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div.summoner-name > strong');
//         //TypeGuards
//         const isElement = function (elem:any) { return (elem instanceof HTMLElement); };
//         const isNull = (elem: any): elem is null => (elem === null);

//         if(isElement(elem) && !isNull(elem)) {
//             return elem.innerHTML;
//         }
//         else
//             return "";
//     });
//     return strongPseudo;
// }

// async function getCompsAndElo(pseudo:string):Promise<string>{

//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto(porofessorUrl+pseudo);

//     return "";
// }

//scrape_profile("Sh0ri");
