'use strict'

export const isNull = (elem: any): elem is null => (null === elem);
export const isHTMLElement = (elem: any): elem is HTMLElement => (elem instanceof HTMLElement);
export const isHTMLHeadingElement = (elem: any): elem is HTMLHeadingElement => (elem instanceof HTMLHeadingElement);
export const isElement = (elem: any): elem is Element => (elem instanceof Element);
export const isString = (elem: any): elem is String => (elem instanceof String);

