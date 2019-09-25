//porofessor
export interface IChampionCard {
    team: string,
    pseudo: string,
    championName : string,
    championWinrate: number,
    championGamesNb: number,
    totalWinrate: number,
    currentGameRole: string,
    mainRole : string,
}
export interface IChampionCardsList extends Array<IChampionCard> { }

//u.gg
export interface IRune {
    id: number,
    name: string,
    majorChangePatchVersion: string,
    tooltip: string,
    shortDesc: string,
    longDesc: string,
    iconPath: string,
    endOfGameStatDescs: string[],
    isActive: boolean,
}

export interface IStatsRune {
    name: string,
    imageUrl: string,
    description: string,
    isActive: boolean,
    id: number,
}

export interface IKeystonesRow {
    keystones: IRune[],
}
export interface IRunesRow {
    runes: IRune[],
}
export interface IStatsRunesRow {
    runes: IStatsRune[],
}
export interface IPrimaryRunesTree {
    mainPerk: IMainPerk,
    keyStoneRow: IKeystonesRow, //1
    runesRows: IRunesRow[], //3
}
export interface ISecondaryRunesTree {
    mainPerk: IMainPerk,
    runesRows: IRunesRow[], //3
}
export interface IStatsRunesTree {
    runesRows: IStatsRunesRow[] //3
}

export interface ITotalRunes {
    primaryRunesTree: IPrimaryRunesTree,
    secondaryRunesTree: ISecondaryRunesTree,
    statsRunesTree: IStatsRunesTree,
}
export interface IMainPerk {
    id: number,
    name: string,
    imgSrc: string,
    shortDesc: string,
}

//build
export interface IItem {
    imageUrl: string,
    name: string,
    description: string,
    id: number,
}
export interface IStep {
    itemNumber: number,
    stepName: string,
    description: string,
    items: IItem[],
    isCore: boolean,
}
export interface IBuild {
    steps: IStep[],
}
