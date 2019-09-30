"use strict"

// imports
import {IRune, IStatsRune, IKeystonesRow, IRunesRow, IStatsRunesRow, IPrimaryRunesTree, ISecondaryRunesTree, IStatsRunesTree, ITotalRunes, IMainPerk, IItem, IStep, IBuild} from "./scrapper"

// tslint:disable-next-line: no-any
const getRunesForOpponent = (runesDataStr: string, statsRunesDataStr: string): typeGuards.IRune|null => {
    // consts
    const isNull = (elem: any): elem is null => (null === elem)

    // const UGGURL = `https://typeGuards.gg/lol/champions/${champion}/build?opp=${opponent}`;
    const RUNES_TREE_SELECTOR = "#content > div > div > div.champion-profile-page > div > div._grid-1._grid-columns > div.grid-block.runes > div.grid-block-content > div"
    const PRIMARY_TREE_SELECTOR = " > div:nth-child(1) > div > div"
    const SECONDARY_TREE_SELECTOR = " > div:nth-child(2) > div.flex-center > div"

    const getKeystonesRow = (runesRowElement: Element): IKeystonesRow => {
        const runesArray = Array.from(runesRowElement.children).map((elem) => getRune(elem))
        const runesNotNull = runesArray.filter((x): x is IRune => x !== null)
        const result = {keystones: runesNotNull}
        return result
    }
    const getRunesRow = (runesRowElement: Element): IRunesRow => {
        const runesArray = Array.from(runesRowElement.children).map((elem) => getRune(elem))
        const runesNotNull = runesArray.filter((x): x is IRune => x !== null)
        const result = {runes: runesNotNull}
        return result
    }
    const getRune = (elem: Element): (IRune | null) => {

        const isActiveElement = elem.getAttribute("class")
        const isActive = !isNull(isActiveElement) ? isActiveElement === "perk perk-active" : false
        const imgElement = elem.children[0]
        const idElement = !isNull(imgElement) ? imgElement.getAttribute("alt") : null
        const id = !isNull(idElement) ? +idElement : 0
        const allRunesData: IRune[] = JSON.parse(runesDataStr)
        const runeData = allRunesData.find((r) => r.id === id)
        const completeRune = (typeof runeData !== "undefined") ? {...runeData, isActive} : null
        return completeRune
    }
    const getMainPerk = (mainPerkElement: Element): IMainPerk => {
        // img
        const imgSrcElement = mainPerkElement.children[0].getAttribute("src")
        const imgSrc = !isNull(imgSrcElement) ? imgSrcElement : ""
        // id
        const idElement = mainPerkElement.children[0].getAttribute("alt")
        const id = !isNull(idElement) ? +idElement : 0
        // name
        const nameElement = mainPerkElement.children[1].children[0].textContent
        const name = !isNull(nameElement) ? nameElement : ""
        // shortDesc
        const shortDescElement = mainPerkElement.children[1].children[1].textContent
        const shortDesc = !isNull(shortDescElement) ? shortDescElement : ""

        const result = {
            id,
            name,
            imgSrc,
            shortDesc,
        }
        return result
    }
    const getRunesTree = (mainPerk: IMainPerk, keystonesRow: IKeystonesRow|null, runesRows: IRunesRow[]): (IPrimaryRunesTree | ISecondaryRunesTree) => {
        const result = !isNull(keystonesRow) ? {mainPerk, keystonesRow, runesRows} : {mainPerk, runesRows}
        return result
    }
    const getTree = (selector: string): (IPrimaryRunesTree | ISecondaryRunesTree | null) => {
        const TreeElement = document.querySelector(`${RUNES_TREE_SELECTOR}${selector}`)
        const TreeRowsElement = !isNull(TreeElement) ? Array.from(TreeElement.children) : null

        const mainPerk = !isNull(TreeRowsElement) ? getMainPerk(TreeRowsElement[0]) : null
        const keystonesRow = !isNull(TreeRowsElement) ? getKeystonesRow(TreeRowsElement[1]) : null
        const RunesRow = getRunesRows(TreeRowsElement)

        return !isNull(mainPerk) ? getRunesTree(mainPerk, keystonesRow, RunesRow) : null
    }
    const getRunesRows = (treeRowsElement: (Element[] | null)): IRunesRow[] => {
        const firstRow = !isNull(treeRowsElement) ? getRunesRow(treeRowsElement[2]) : null
        const secondRow = !isNull(treeRowsElement) ? getRunesRow(treeRowsElement[3]) : null
        const thirdRow = !isNull(treeRowsElement) ? getRunesRow(treeRowsElement[4]) : null
        return [firstRow, secondRow, thirdRow].filter((x): x is IRunesRow => x !== null)
    }

    const primaryTree = getTree(PRIMARY_TREE_SELECTOR)
    const secondaryTree = getTree(SECONDARY_TREE_SELECTOR)

    console.log(`PRIMARY TREE : ${JSON.stringify(primaryTree)}`)
    console.log(`SECONDARY TREE : ${JSON.stringify(secondaryTree)}`)
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
