import { IWidgetProps } from "./types";
/**
 * @method clearChildren - to remove all the children of element
 * @param {HTMLElement} element
 */
export declare function clearChildren(element: HTMLElement): void;
/**
 * @method render - render a component on target
 * @param {HTMLElement} Component
 * @param {HTMLElement } target
 */
export declare function render(Component: HTMLElement, target: HTMLElement): void;
/**
 *
 * @param {String} type - type of widget
 * @param {Object} props - props for the widget
 * @returns {HTMLElement}
 */
export declare function Widget(type: keyof HTMLElementTagNameMap, props?: IWidgetProps): HTMLElement;
