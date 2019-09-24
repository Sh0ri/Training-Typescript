"use strict";

// imports
import { IChampionCard, IChampionCardsList } from "./scrapper"

export const getAllCardsInfo = (): IChampionCardsList => {
    const isNull = (elem: any): elem is null => (null === elem)
    const isElement = (elem: any): elem is Element => (elem instanceof Element)

    const getInfoFromCard = (elem: Element, teamColor: string): (IChampionCard|null) => {
        // let pseudo:string = "";
        // let team:string="";
        // let championName:string="";
        let championWinrate: number = 0
        let championGamesNb: number = 0
        // let totalWinrate:number=0;
        // let currentGameRole:string="";
        // let mainRole:string="";

        // team
        const team: string = teamColor

        // pseudo
        const pseudoElement = elem.querySelector(`div.cardHeader.${teamColor} > a`) // previously elem.querySelector("div.cardHeader." + teamColor + " > a");
        const pseudo = (isElement(pseudoElement) && !isNull(pseudoElement.textContent)) ? pseudoElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim() : ""
        console.log("pseudo : " + pseudo)

        // championName
        const championNameElement = elem.querySelector("div.cardBody > div.championsBoxContainer > div > div.imgFlex > div.imgColumn-champion > img")
        const titleAttributeElement = (isElement(championNameElement) && !isNull(championNameElement)) ? championNameElement.getAttribute("title") : null
        const championName = (!isNull(titleAttributeElement)) ? titleAttributeElement : ""
        console.log("champion name : " + championName)

        // championWinrate
        const championWinrateElement = elem.querySelector("div.cardBody > div.championsBoxContainer > div > div.imgFlex > div.txt > div.title.oneLiner")
        let championWinrateAndNbGames: string
        if (!isElement(championWinrateElement) || isNull(championWinrateElement.textContent)) {
            championWinrate = 0
            championGamesNb = 0
            championWinrateAndNbGames = ""
        } else {
            championWinrateAndNbGames = championWinrateElement.textContent.replace(/\D/g,"").trim()
            championWinrate = +championWinrateAndNbGames.substr(0, 2)
            championGamesNb = 0
            if (championWinrate == 1) {
                championWinrate = 0
                championGamesNb = 1
            } else { championGamesNb = +championWinrateAndNbGames.substr(2); }
        }
        console.log(championWinrate)

        // totalWinrate
        const totalWinrateElement = elem.querySelector("div.cardBody > div.box.rankingsBox.canExpand > div.imgFlex > div.txt > div.content > div.oneLiner > span")
        const totalWinrate: number = (isElement(totalWinrateElement) && !isNull(totalWinrateElement.textContent)) ? +totalWinrateElement.textContent.replace(/\D/g, '').trim() : 0
        console.log(totalWinrate)

        // currentGameRole A MODIFIER
        const currentGameRoleElement = elem.querySelector("div.cardBody > div.box.rolesBox.canExpand > div.imgFlex > div.txt > div.title")
        const currentGameRole: string = (isElement(currentGameRoleElement) && !isNull(currentGameRoleElement.textContent)) ? currentGameRoleElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().split(" ")[0] : ""
        console.log(currentGameRole)

        // mainRole
        const mainRoleElement = elem.querySelector("div.cardBody > div.box.rolesBox.canExpand > div.imgFlex > div.txt > div.content > div > span")
        const mainRole: string = (isElement(mainRoleElement) && !isNull(mainRoleElement.textContent)) ? mainRoleElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim() : ""
        console.log(mainRole)

        const result: IChampionCard = {
            team,
            pseudo,
            championName,
            championWinrate,
            championGamesNb,
            totalWinrate,
            currentGameRole,
            mainRole,
        }

        return result
    }

    // A AMELIORER

    const allies = Array.from(document.querySelectorAll("#liveContent > div.site-content.site-content-bg > ul:nth-child(3) > li > div"))
    .map((elem) => getInfoFromCard(elem, "blue"))
    .filter((card: IChampionCard|null): card is IChampionCard => card !== null)
    console.log("allies : " + allies.length)

    const opponents = Array.from(document.querySelectorAll("#liveContent > div.site-content.site-content-bg > ul:nth-child(5) > li > div"))
    .map((elem) => getInfoFromCard(elem, "red"))
    .filter((card: IChampionCard|null): card is IChampionCard => card !== null)
    console.log("opp : " + opponents.length)

    return allies.concat(opponents)

}

export const getAlliedTeamColor = (pseudo: string, everybody: IChampionCardsList): string => {
    const perso: IChampionCard|undefined = everybody.find((card) => {
        return card.pseudo === pseudo
    })
    return (perso !== undefined) ? perso.team : ""
}
export default getAllCardsInfo
