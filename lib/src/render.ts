import { IMemDOM } from "./types";
import { stateEventBus } from "./eventBus";
import doRenderLoop from "./renderLoop";

export function render(element: IMemDOM, target: HTMLElement) {
    let oldDOM: IMemDOM[] = [];
   
    const updateVDOM = () => {
        const newDOM = doRenderLoop(element, target, oldDOM);
        oldDOM = newDOM;
    }
    stateEventBus.addChangeHandler(updateVDOM);
    stateEventBus.stateUpdated();
}
