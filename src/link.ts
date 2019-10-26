import itemsData from "../static/riot-data/runes/items.json"
import {IItem, ITemporaryBuild, IBuild, IPosition} from "./scrapper"
import looksSame from "looks-same"
import fs from "fs"
import puppeteer from "puppeteer"

const itemIconsPath = "../static/riot-data/items-icons"
const tempIconPath = "../temp.png"

const generateItems = async (page: puppeteer.Page, temporaryBuild: (ITemporaryBuild | null)): (Promise<(IBuild|null)>) => {
    // validators
    const isNull = (elem: any): elem is null => (null === elem)
    if (isNull(temporaryBuild)) { return null}

    const build = temporaryBuild.steps.map(async (step) => {
        const stepItems = step.itemsPositions.map(async (itemPosition) => {
            await getItemIconFromUGG(itemPosition, page)
            return getItemFromIcon()
        })
    })

    return null
}
const getItemIconFromUGG = async (itemPosition: IPosition, page: puppeteer.Page): Promise<Buffer> => {
    return page.screenshot({
        path: "./temp.png",
        clip: {
            x: itemPosition.left,
            y: itemPosition.top,
            width: itemPosition.width,
            height: itemPosition.height,
        },
    })
}
const getItemFromIcon = async (): Promise<IItem|null> => {
    // this function returns an IItem based on UGG screenshots with the looks-same module
    const uGGItem = fs.readFileSync(tempIconPath)
    let goodImage = ""
    fs.readdir(itemIconsPath, (err, files) => {
        if (!err) {
            for (const image of files) {
                looksSame(uGGItem, image, (imagesAreSame) => {
                    if ( imagesAreSame ) { goodImage = image }
                })
            }
        }
    })
    const item = itemsData.find((i) => i.id === 3101)
    const result: IItem|null = (item !== undefined) ? {...item} : null
    console.log(`La bonne image : ${goodImage}`)
    return result
    //3101
    //const statsRuneData = itemsData.find((i) => i.iconPath.includes(goodImage))
}

export default generateItems
