"use strick"

import puppeteer from "puppeteer";
import {getAllCardsInfo, getAlliedTeamColor} from "./scrapePorofessor";
import runesData from "../static/riot-data/runes/runes.json";
import getRunesForOpponent from "./scrapeUGG";

const getCompositions = async (porofessorUrl: string, pseudo: string) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    try {
        await page.goto(porofessorUrl + pseudo)
        await page.waitFor("#liveContent > div.site-content.site-content-bg > ul:nth-child(5) > li:nth-child(5) > div")
        const everybody = await page.evaluate(getAllCardsInfo)
        console.log(everybody)

        const alliedTeamColor = getAlliedTeamColor(pseudo, everybody)
        console.log("Allied team color : ", alliedTeamColor)

        await page.goto("https://u.gg/lol/champions/shen/build")
        await page.click("#qcCmpButtons > button:nth-child(2)")
        await page.waitForSelector("#content > div:nth-child(1) > div > div.champion-profile-page > div > div._grid-1._grid-columns > div.grid-block.runes > div.grid-block-content > div > div:nth-child(1) > div > div > div.primary-perk.keystones.path-keystones > div.perk.perk-active > img")
        const runes = await page.evaluate(getRunesForOpponent, JSON.stringify(runesData))
        console.log(runes)

    } catch (error) {
        console.log(error)
    }

    return ""
}
// Trymario Selmoh
getCompositions("https://porofessor.gg/live/euw/", "zigjaz")

