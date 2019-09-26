"use strict"

// imports
import * as typeGuards from "./scrapper"

// tslint:disable-next-line: no-any
const getRunesForOpponent = (runesDataStr: string, statsRunesDataStr: string): typeGuards.IRune|null => {
    // consts
    const isNull = (elem: any): elem is null => (null === elem)

    // const UGGURL = `https://typeGuards.gg/lol/champions/${champion}/build?opp=${opponent}`;
    const RUNES_TREE_SELECTOR = "#content > div > div > div.champion-profile-page > div > div._grid-1._grid-columns > div.grid-block.runes > div.grid-block-content > div"
    const KEYSTONES_ROW = " > div:nth-child(1) > div > div > div.primary-perk.keystones.path-keystones"
    const PRIMARY_TREE_SELECTOR = " > div:nth-child(1) > div > div"
    const exemple = " > div:nth-child(1) > div > div > div.primary-perk.perks.path-perk-1"
    // runes
    // const getPrimaryTree = () :(typeGuards.IPrimaryRunesTree|void)=> {};
    // const getSecondaryTree = () :(typeGuards.ISecondaryRunesTree|void)=> {};

    const getKeystonesRow = (runesRowElement: Element): (typeGuards.IKeystonesRow) => {
        const runesArray = Array.from(runesRowElement.children).map((elem) => getRune(elem))
        const runesNotNull: typeGuards.IRune[] = runesArray.filter((x): x is typeGuards.IRune => x !== null)
        const result: typeGuards.IKeystonesRow = {keystones: runesNotNull}
        return result
    }
    const getRunesRow = (runesRowElement: Element) : (typeGuards.IRunesRow) => {
        const runesArray = Array.from(runesRowElement.children).map((elem) => getRune(elem))
        const runesNotNull: typeGuards.IRune[] = runesArray.filter((x): x is typeGuards.IRune => x !== null)
        const result: typeGuards.IRunesRow = {runes: runesNotNull}
        return result
    }
    const getRune = (elem: Element): (typeGuards.IRune | null) => {

        const isActiveElement = elem.getAttribute("class")
        const isActive = !isNull(isActiveElement) ? isActiveElement === "perk perk-active" : false
        const imgElement = elem.children[0]
        const idElement = !isNull(imgElement) ? imgElement.getAttribute("alt") : null
        const id: number = !isNull(idElement) ? +idElement : 0
        const allRunesData: typeGuards.IRune[] = JSON.parse(runesDataStr)
        const runeData = allRunesData.find((r) => r.id === id)
        const completeRune = (typeof runeData !== "undefined") ? {...runeData, isActive} : null
        return completeRune
    }

    // TEST HERE

    const primaryTreeElement = document.querySelector(`${RUNES_TREE_SELECTOR}${PRIMARY_TREE_SELECTOR}`)
    const primaryTreeRowsElement = !isNull(primaryTreeElement) ? Array.from(primaryTreeElement.children) : null

    // test keystones
    const keystonesRow = !isNull(primaryTreeRowsElement) ? getKeystonesRow(primaryTreeRowsElement[1]) : null
    // test runesrow
    const firstPrimaryRow = !isNull(primaryTreeRowsElement) ? getRunesRow(primaryTreeRowsElement[2]) : null
    const secondPrimaryRow = !isNull(primaryTreeRowsElement) ? getRunesRow(primaryTreeRowsElement[3]) : null
    const thirdPrimaryRow = !isNull(primaryTreeRowsElement) ? getRunesRow(primaryTreeRowsElement[4]) : null

    console.log(`KEYSTONES : ${JSON.stringify(keystonesRow)}`)
    console.log(`RUNESROW 1 : ${JSON.stringify(firstPrimaryRow)}`)
    console.log(`RUNESROW 2 : ${JSON.stringify(secondPrimaryRow)}`)
    console.log(`RUNESROW 3 : ${JSON.stringify(thirdPrimaryRow)}`)
    // const runeTest = !isNull(elemTest) ? getRune( elemTest ) : null
    // stats runes
    const STATS_RUNES_SELECTOR = " > div:nth-child(2) > div.stat-shards-container"
    const getStatsRune = (statsRunesElement: Element): (typeGuards.IStatsRune | null) => {
        // isActive
        const isActiveElement = statsRunesElement.getAttribute("class")
        const isActive = !isNull(isActiveElement) ? isActiveElement === "shard shard-active" : false
        // img
        const imgSrcElement = statsRunesElement.children[0].getAttribute("src")
        const imgSrc: string = !isNull(imgSrcElement) ? imgSrcElement : ""
        // statsRune
        const allStatsRunesData: typeGuards.IStatsRune[] = JSON.parse(statsRunesDataStr)
        const statsRuneData = allStatsRunesData.find((r) => r.imageUrl === imgSrc)
        const completeRune = (typeof statsRuneData !== "undefined") ? {...statsRuneData, isActive} : null
        return completeRune
    }
    const getstatsRunesRow = (statsRunesRowElement: Element): (typeGuards.IStatsRunesRow) => {
        const statsRunesArray = Array.from(statsRunesRowElement.children).map((elem) => getStatsRune(elem))
        const statsRunesRowNotNull: typeGuards.IStatsRune[] = statsRunesArray.filter((x): x is typeGuards.IStatsRune => x !== null)
        const result: typeGuards.IStatsRunesRow = {statsRunes: statsRunesRowNotNull}
        return result
    }
    const getstatsRunesTree = (): (typeGuards.IStatsRunesTree | null) => {
        // hello
        const statsRunesTreeElement = document.querySelector(`${RUNES_TREE_SELECTOR}${STATS_RUNES_SELECTOR}`)
        const statsRunesTreeRowsElement = !isNull(statsRunesTreeElement) ? Array.from(statsRunesTreeElement.children) : null
        const statsrunesRows = !isNull(statsRunesTreeRowsElement) ? statsRunesTreeRowsElement.map((elem) => getstatsRunesRow(elem)) : null

        return !isNull(statsrunesRows) ? {statsrunesRows} : null

    }
    // const getStatsRunesRow = (selector:string) : (typeGuards.IStatsRunesRow | void) => {};
    return null

}

// const getBuild = ():typeGuards.IBuild|void => {}
export default getRunesForOpponent
