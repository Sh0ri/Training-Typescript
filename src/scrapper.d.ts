export interface IChampionCard {
    team:string;
    pseudo: string;
    championName : string;
    championWinrate: number;
    championGamesNb: number;
    totalWinrate: number;
    currentGameRole:string;
    mainRole : string;
}
export interface IChampionCardsList extends Array<IChampionCard> { }