'use strict';

//imports
//import puppeteer from 'puppeteer';
import { IChampionCard, IChampionCardsList } from './scrapper';
//import * as tGuards from '../lib-typeGuards';



const getAllCardsInfo = ():IChampionCardsList => {
    const isNull = (elem: any): elem is null => (null === elem);
    const isElement = (elem: any): elem is Element => (elem instanceof Element);
    //const isString = (elem: any): elem is String => (elem instanceof String);

    const getInfoFromCard = (elem:Element,teamColor:string) :(IChampionCard|null)=> {
        let pseudo:string = "";
        let team:string="";
        let championName:string="";
        let championWinrate:number=0;
        let championGamesNb:number=0;
        let totalWinrate:number=0;
        let currentGameRole:string="";
        let mainRole:string="";

        //team
        team = teamColor;

        //pseudo
        const pseudoElement = elem.querySelector("div.cardHeader." + teamColor + " > a");
        if(!isElement(pseudoElement) || isNull(pseudoElement.textContent)) pseudo = "";
        else pseudo = pseudoElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim();
        console.log("pseudo : " + pseudo);

        //championName
        const championNameElement = elem.querySelector("div.cardBody > div.championsBoxContainer > div > div.imgFlex > div.imgColumn-champion > img");
        let titleAttributeElement;
        if(isElement(championNameElement) && !isNull(championNameElement)) titleAttributeElement =  championNameElement.getAttribute("title");
        else titleAttributeElement = null;

        if(isNull(titleAttributeElement)) championName = "";
        else championName = titleAttributeElement;
        console.log("champion name : " + championName);
        
        //championWinrate
        const championWinrateElement = elem.querySelector("div.cardBody > div.championsBoxContainer > div > div.imgFlex > div.txt > div.title.oneLiner");
        let championWinrateAndNbGames: string;
        if(!isElement(championWinrateElement) || isNull(championWinrateElement.textContent)) {
            championWinrate = 0;
            championGamesNb = 0;
            championWinrateAndNbGames = "";
        }
        else {
            championWinrateAndNbGames = championWinrateElement.textContent.replace(/\D/g,'').trim();
            championWinrate = +championWinrateAndNbGames.substr(0,2);
            championGamesNb = 0;
            if(championWinrate==1) {
                championWinrate = 0;
                championGamesNb=1;
            }
            else championGamesNb = +championWinrateAndNbGames.substr(2);
        }
        
        console.log(championWinrate);
    
        //totalWinrate
        const totalWinrateElement = elem.querySelector("div.cardBody > div.box.rankingsBox.canExpand > div.imgFlex > div.txt > div.content > div.oneLiner > span");
        if(!isElement(totalWinrateElement) || isNull(totalWinrateElement.textContent)) totalWinrate = 0;
        else totalWinrate = +totalWinrateElement.textContent.replace(/\D/g,'').trim();
        console.log(totalWinrate);
    
        //currentGameRole A MODIFIER
        const currentGameRoleElement = elem.querySelector("div.cardBody > div.box.rolesBox.canExpand > div.imgFlex > div.txt > div.title");
        if(!isElement(currentGameRoleElement) || isNull(currentGameRoleElement.textContent)) currentGameRole = "";
        else currentGameRole = currentGameRoleElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().split(" ")[0];
        console.log(currentGameRole);
    
        //mainRole
        const mainRoleElement = elem.querySelector("div.cardBody > div.box.rolesBox.canExpand > div.imgFlex > div.txt > div.content > div > span");
        if(!isElement(mainRoleElement) || isNull(mainRoleElement.textContent)) mainRole = "";
        else mainRole = mainRoleElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim();
        console.log(mainRole);
    
        const result: IChampionCard = {
            team,
            pseudo,
            championName,
            championWinrate,
            championGamesNb,
            totalWinrate,
            currentGameRole,
            mainRole
        };
        
        return result;
    }

    const allies = Array.from(document.querySelectorAll("#liveContent > div.site-content.site-content-bg > ul:nth-child(3) > li > div"))
    .map(elem => getInfoFromCard(elem,"blue"))
    .filter((card:IChampionCard|null): card is IChampionCard => card !== null);
    console.log("allies : " + allies.length);

    const opponents = Array.from(document.querySelectorAll("#liveContent > div.site-content.site-content-bg > ul:nth-child(5) > li > div"))
    .map(elem => getInfoFromCard(elem,"red"))
    .filter((card:IChampionCard|null): card is IChampionCard => card !== null);
    console.log("opp : " + opponents.length);

    return allies.concat(opponents);

}
     
export default getAllCardsInfo;
