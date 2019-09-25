"use strict"

// imports
import * as typeGuards from "./scrapper"

// tslint:disable-next-line: no-any
const getRunesForOpponent = (runesDataStr: string): typeGuards.IRune|null => {
    // consts
    const isNull = (elem: any): elem is null => (null === elem)

    // const UGGURL = `https://typeGuards.gg/lol/champions/${champion}/build?opp=${opponent}`;
    const RUNES_TREE_SELECTOR = "#content > div > div > div.champion-profile-page > div > div._grid-1._grid-columns > div.grid-block.runes > div.grid-block-content > div"
    const PRIMARY_TREE_SELECTOR = " > div:nth-child(1) > div > div"
    const SECONDARY_TREE_SELECTOR = " > div:nth-child(2) > div.flex-center > div"

    const getKeystonesRow = (runesRowElement: Element): (typeGuards.IKeystonesRow) => {
        const runesArray = Array.from(runesRowElement.children).map((elem) => getRune(elem))
        const runesNotNull: typeGuards.IRune[] = runesArray.filter((x): x is typeGuards.IRune => x !== null)
        const result: typeGuards.IKeystonesRow = {keystones: runesNotNull}
        return result
    }
    const getRunesRow = (runesRowElement: Element): (typeGuards.IRunesRow) => {
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
    const getMainPerk = (mainPerkElement: Element): typeGuards.IMainPerk => {
        // img
        const imgSrcElement = mainPerkElement.children[0].getAttribute("src")
        const imgSrc: string = !isNull(imgSrcElement) ? imgSrcElement : ""
        // id
        const idElement = mainPerkElement.children[0].getAttribute("alt")
        const id: number = !isNull(idElement) ? +idElement : 0
        // name
        const nameElement = mainPerkElement.children[1].children[0].textContent
        const name: string = !isNull(nameElement) ? nameElement : ""
        // shortDesc
        const shortDescElement = mainPerkElement.children[1].children[1].textContent
        const shortDesc: string = !isNull(shortDescElement) ? shortDescElement : ""

        const result: typeGuards.IMainPerk = {
            id,
            name,
            imgSrc,
            shortDesc,
        }
        return result
    }
    const getRunesTree = (mainPerk: typeGuards.IMainPerk, keystonesRow: typeGuards.IKeystonesRow|null, runesRows: typeGuards.IRunesRow[]): (typeGuards.IPrimaryRunesTree | typeGuards.ISecondaryRunesTree) => {
        const result = !isNull(keystonesRow) ? {mainPerk, keystonesRow, runesRows} : {mainPerk, runesRows}
        return result
    }
    const getTree = (selector: string): (typeGuards.IPrimaryRunesTree | typeGuards.ISecondaryRunesTree | null) => {
        const TreeElement = document.querySelector(`${RUNES_TREE_SELECTOR}${selector}`)
        const TreeRowsElement = !isNull(TreeElement) ? Array.from(TreeElement.children) : null

        const mainPerk = !isNull(TreeRowsElement) ? getMainPerk(TreeRowsElement[0]) : null
        const keystonesRow = !isNull(TreeRowsElement) ? getKeystonesRow(TreeRowsElement[1]) : null
        const RunesRow = getRunesRows(TreeRowsElement)

        return !isNull(mainPerk) ? getRunesTree(mainPerk, keystonesRow, RunesRow) : null
    }
    const getRunesRows = (treeRowsElement: (Element[] | null)): typeGuards.IRunesRow[] => {
        const firstRow = !isNull(treeRowsElement) ? getRunesRow(treeRowsElement[2]) : null
        const secondRow = !isNull(treeRowsElement) ? getRunesRow(treeRowsElement[3]) : null
        const thirdRow = !isNull(treeRowsElement) ? getRunesRow(treeRowsElement[4]) : null
        return [firstRow, secondRow, thirdRow].filter((x): x is typeGuards.IRunesRow => x !== null)
    }

    const primaryTree = getTree(PRIMARY_TREE_SELECTOR)
    const secondaryTree = getTree(SECONDARY_TREE_SELECTOR)

    console.log(`PRIMARY TREE : ${JSON.stringify(primaryTree)}`)
    console.log(`SECONDARY TREE : ${JSON.stringify(secondaryTree)}`)
    // const runeTest = !isNull(elemTest) ? getRune( elemTest ) : null
    // stats runes
    // const getstatsRunesTree = (selector:string) : (typeGuards.IStatsRunesTree | void) => {};
    // const getStatsRunesRow = (selector:string) : (typeGuards.IStatsRunesRow | void) => {};
    return null

}

// const getBuild = ():typeGuards.IBuild|void => {}
export default getRunesForOpponent
