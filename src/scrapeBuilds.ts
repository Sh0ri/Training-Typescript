"use strict"

// imports
import {IBuild, IItem, IStep} from "./scrapper"

const getAllBuilds = (): (IBuild[] | void) => {
    // consts
    const isNull = (elem: any): elem is null => (null === elem)
    // selectors
    const FULL_BUILD_SELECTOR = "#content > div > div > div.champion-profile-page > div > div._grid-3._grid-columns"

    const getBuild = (): (IBuild | void) => {
        // test
        const buildElement = document.querySelector(FULL_BUILD_SELECTOR)
        const stepsElement = !isNull(buildElement) ? Array.from(buildElement.children) : null
        const steps = !isNull(stepsElement) ? stepsElement.map((elem) => getStep(elem)) : null
    }
    const getStep = (stepElem: Element): (IStep | void) => {
        // test
        /*
        stepNumber: number,
        stepName: string,
        items: IItem[],
        isCore: boolean,
        */
       const stepTitleElement = stepElem.querySelector(" > div.grid-block.starting-items > div.grid-block-header > div")

       // stepNumber
       const stepNumberElement = !isNull(stepTitleElement) ? stepTitleElement.children[0].textContent : null
       const stepNumber = !isNull(stepNumberElement) ? +stepNumberElement : 0

       // title
       const stepNameElement = !isNull(stepTitleElement) ? stepTitleElement.children[2].textContent : null
       const stepName = !isNull(stepNameElement) ? stepNameElement : ""

       // isCore
       const isCoreElement = stepName === "Core Build"

       // items
       /*
       const items = Array
       .from(stepElem.querySelectorAll(ALLIES_ROW_SELECTOR))
       .map((elem) => getInfoFromCard(elem, "blue"))*/
    }
    const getItem = (): (IItem | void) => {
        // test
    }
}
