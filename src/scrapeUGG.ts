"use strict"

// imports
import * as typeGuards from "./scrapper"

// tslint:disable-next-line: no-any
const getRunesForOpponent = (runesDataStr: string): typeGuards.IRune|null => {
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

        if (runeData === undefined) { return null }
        return getRuneFromData(runeData, isActive)
    }
    const getRuneFromData = (runeData: (typeGuards.IRune), isActive: boolean): (typeGuards.IRune) => {
        const result: typeGuards.IRune = {
            id: runeData.id,
            name: runeData.name,
            majorChangePatchVersion: runeData.majorChangePatchVersion,
            tooltip: runeData.tooltip,
            shortDesc: runeData.shortDesc,
            longDesc: runeData.longDesc,
            iconPath: runeData.iconPath,
            endOfGameStatDescs: runeData.endOfGameStatDescs,
            isActive,
        }

        return result
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
    // const getstatsRunesTree = (selector:string) : (typeGuards.IStatsRunesTree | void) => {};
    // const getStatsRunesRow = (selector:string) : (typeGuards.IStatsRunesRow | void) => {};
    return null

}

// const getBuild = ():typeGuards.IBuild|void => {}
export default getRunesForOpponent
