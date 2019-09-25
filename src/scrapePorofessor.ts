"use strict"

// imports
import { IChampionCard, IChampionCardsList } from "./scrapper"

export const getAllCardsInfo = (): IChampionCardsList => {
    // validators
    const isNull = (elem: any): elem is null => (null === elem)
    const isElement = (elem: any): elem is Element => (elem instanceof Element)
    // selector consts
    const ALLIES_ROW_SELECTOR = "#liveContent > div.site-content.site-content-bg > ul:nth-child(3) > li > div"
    const OPPONENTS_ROW_SELECTOR = "#liveContent > div.site-content.site-content-bg > ul:nth-child(5) > li > div"

    const getInfoFromCard = (elem: Element, teamColor: string): (IChampionCard|null) => {
        // selector consts
        const PSEUDO_SELECTOR = `div.cardHeader.${teamColor} > a`
        const CHAMPION_NAME_SELECTOR = "div.cardBody > div.championsBoxContainer > div > div.imgFlex > div.imgColumn-champion > img"
        const CHAMPION_WINRATE_SELECTOR = "div.cardBody > div.championsBoxContainer > div > div.imgFlex > div.txt > div.title.oneLiner"
        const TOTAL_WINRATE_SELECTOR = "div.cardBody > div.box.rankingsBox.canExpand > div.imgFlex > div.txt > div.content > div.oneLiner > span"
        const CURRENT_GAME_ROLE_SELECTOR = "div.cardBody > div.box.rolesBox.canExpand > div.imgFlex > div.txt > div.title"
        const MAIN_ROLE_SELECTOR = "div.cardBody > div.box.rolesBox.canExpand > div.imgFlex > div.txt > div.content > div > span"

        let championWinrate: number = 0
        let championGamesNb: number = 0

        // team
        const team: string = teamColor

        // pseudo
        const pseudoElement = elem.querySelector(PSEUDO_SELECTOR)
        const pseudo = (isElement(pseudoElement) && !isNull(pseudoElement.textContent)) ? pseudoElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim() : ""
        console.log("pseudo : " + pseudo)

        // championName
        const championNameElement = elem.querySelector(CHAMPION_NAME_SELECTOR)
        const titleAttributeElement = (isElement(championNameElement) && !isNull(championNameElement)) ? championNameElement.getAttribute("title") : null
        const championName = (!isNull(titleAttributeElement)) ? titleAttributeElement : ""
        console.log("champion name : " + championName)

        // championWinrate
        const championWinrateElement = elem.querySelector(CHAMPION_WINRATE_SELECTOR)
        let championWinrateAndNbGames: string
        if (!isElement(championWinrateElement) || isNull(championWinrateElement.textContent)) {
            championWinrate = 0
            championGamesNb = 0
            championWinrateAndNbGames = ""
        } else {
            championWinrateAndNbGames = championWinrateElement.textContent.replace(/\D/g, "").trim()
            championWinrate = +championWinrateAndNbGames.substr(0, 2)
            championGamesNb = 0
            if (championWinrate === 1) {
                championWinrate = 0
                championGamesNb = 1
            } else { championGamesNb = +championWinrateAndNbGames.substr(2) }
        }
        console.log(championWinrate)

        // totalWinrate
        const totalWinrateElement = elem.querySelector(TOTAL_WINRATE_SELECTOR)
        const totalWinrate: number = (isElement(totalWinrateElement) && !isNull(totalWinrateElement.textContent)) ? +totalWinrateElement.textContent.replace(/\D/g, "").trim() : 0
        console.log(totalWinrate)

        // currentGameRole
        const currentGameRoleElement = elem.querySelector(CURRENT_GAME_ROLE_SELECTOR)
        const currentGameRole: string = (isElement(currentGameRoleElement) && !isNull(currentGameRoleElement.textContent)) ? currentGameRoleElement.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().split(" ")[0] : ""
        console.log(currentGameRole)

        // mainRole
        const mainRoleElement = elem.querySelector(MAIN_ROLE_SELECTOR)
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

    const allies = Array.from(document.querySelectorAll(ALLIES_ROW_SELECTOR))
    .map((elem) => getInfoFromCard(elem, "blue"))
    .filter((card: IChampionCard|null): card is IChampionCard => card !== null)
    console.log("allies : " + allies.length)

    const opponents = Array.from(document.querySelectorAll(OPPONENTS_ROW_SELECTOR))
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
