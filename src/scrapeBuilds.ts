"use strict"

// imports
import {ITemporaryBuild, ITemporaryStep, IPosition} from "./scrapper"

const getUGGBuild = (): (ITemporaryBuild | null) => {
    // consts
    const isNull = (elem: any): elem is null => (null === elem)
    // selectors
    const FULL_BUILD_SELECTOR = "#content > div > div > div.champion-profile-page > div > div._grid-3._grid-columns"

    const getBuild = (): (ITemporaryBuild | null) => {
        // test
        const buildElement = document.querySelector(FULL_BUILD_SELECTOR)
        const stepsElement = !isNull(buildElement) ? Array.from(buildElement.children) : null
        const steps = !isNull(stepsElement) ? stepsElement.map((elem) => getStep(elem)) : null

        const result = !isNull(steps) ? {steps} : null
        return result
    }
    const getStep = (stepElem: Element): ITemporaryStep => {
        // test
        /*
        stepNumber: number,
        stepName: string,
        itemsPositions: IPosition[],
        isCore: boolean,
        */
       const stepTitleElement = stepElem.querySelector("div.grid-block-header > div")

       // stepNumber
       const stepNumberElement = !isNull(stepTitleElement) ? stepTitleElement.children[0].textContent : null
       const stepNumber = !isNull(stepNumberElement) ? +stepNumberElement : 0

       // title
       const stepNameElement = !isNull(stepTitleElement) ? stepTitleElement.children[2].textContent : null
       const stepName = !isNull(stepNameElement) ? stepNameElement : ""

       // isCore
       const isCore = stepName === "Core Build"

       // itemsElements
       const itemsElements = getItemsElements(stepElem, stepName)

       // itemsPositions
       const itemsPositions = itemsElements.map((elem) => getItemPosition(elem)).filter((itemPosition: IPosition|null): itemPosition is IPosition => itemPosition !== null)

       const result = {
        stepNumber,
        stepName,
        itemsPositions,
        isCore,
    }
       return result
    }
    const getItemsElements = (stepElem: Element, stepName: string): (Element[]) => {
        //
        if (stepName === "Starting Build" || stepName === "Core Build") {
            // hehe
            return Array.from(stepElem.querySelectorAll("div.grid-block-content > div > div.items > div"))
        } else {
            // hihi
            return Array.from(stepElem.querySelectorAll("div.grid-block-content > div > div"))
        }
    }
    const getItemPosition = (itemElem: Element): (IPosition | null) => {
        const itemInfosElem = itemElem.querySelector("div > div > div")
        if (isNull(itemInfosElem)) {
            return null
        }

        const {left, top, width, height} = itemInfosElem.getBoundingClientRect()
        console.log(`x : ${left}`)
        console.log(`y : ${top}`)
        console.log(`width : ${width}`)
        console.log(`height : ${height}`)
        return {left, top, width, height}
    }
    return getBuild()
}
export default getUGGBuild
