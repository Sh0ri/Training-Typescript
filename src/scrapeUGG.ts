"use strict"

// imports
import * as U from "./scrapper"

// tslint:disable-next-line: no-any
const getRunesForOpponent = (runesDataStr: string): string => {
    // consts
    const isNull = (elem: any): elem is null => (null === elem)

    // const UGGURL = `https://u.gg/lol/champions/${champion}/build?opp=${opponent}`;
    const RUNESTREESELECTOR = "#content > div > div > div.champion-profile-page > div > div._grid-1._grid-columns > div.grid-block.runes > div.grid-block-content > div"
    const KEYSTONESROW = " > div:nth-child(1) > div > div > div.primary-perk.keystones.path-keystones"
    // runes
    // const getPrimaryTree = () :(U.IPrimaryRunesTree|void)=> {};
    // const getSecondaryTree = () :(U.ISecondaryRunesTree|void)=> {};
    // const getKeystonesRow = (selector:string) : (U.IKeystonesRow | void) => {};
    // const getRunesRow = (selector:string) : (U.IRunesRow | void) => {};
    const getRune = (elem: Element): (U.IRune | undefined) => {

        const isActiveElement = elem.getAttribute("class")
        const isActive = !isNull(isActiveElement) ? (isActiveElement.includes("active") ? true : false) : false
        const imgElement = elem.children[0]
        const idElement = !isNull(imgElement) ? imgElement.getAttribute("alt") : null
        const id: number = !isNull(idElement) ? +idElement : 0
        const runesData: U.IRune[] = JSON.parse(runesDataStr)
        let runeResult = runesData.find((r) => r.id === id)
        runeResult !== undefined && (runeResult.isActive = isActive)
        return runeResult
    }
    const keystonesRow = Array.from(document.querySelectorAll(`${RUNESTREESELECTOR}${KEYSTONESROW} > div `)).map((elem) => getRune(elem))
    console.log(`KEY : ${JSON.stringify(keystonesRow)}`)
    // const runeTest = !isNull(elemTest) ? getRune( elemTest ) : null
    // stats runes
    // const getstatsRunesTree = (selector:string) : (U.IStatsRunesTree | void) => {};
    // const getStatsRunesRow = (selector:string) : (U.IStatsRunesRow | void) => {};
    return ""

}

// const getBuild = ():U.IBuild|void => {}
export default getRunesForOpponent
