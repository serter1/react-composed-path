import { useEffect } from "react";

/**
 * @param {string | string[]} boxIDs - Examples:
 * useComposedPath('#box', '#button', setVisible)
 * or useComposedPath(['#box1', '#box2'], ['#button1', '#button2'], [setVisible1, setVisible2])
 *
 * @param {string | string[]} buttonIDs
 *
 * @param {Function | Function[]} setStates
 */
export const useComposedPath = (
  boxIDs: string | string[],
  buttonIDs: string | string[],
  setStates: Function | Function[]
) => {
  useEffect(() => {
    const boxes = Array.isArray(boxIDs)
      ? boxIDs.map((boxID) => document.querySelector(boxID))
      : [document.querySelector(boxIDs)];

    const buttons = Array.isArray(buttonIDs)
      ? buttonIDs.map((buttonID) => document.querySelector(buttonID))
      : [document.querySelector(buttonIDs)];

    function handleClickOutside(event: MouseEvent) {
      const isOutsideBoxes = boxes.every(
        (box) => box && !event.composedPath().includes(box as EventTarget)
      );
      const isOutsideButtons = buttons.every(
        (button) => button && !event.composedPath().includes(button as EventTarget)
      );

      if (isOutsideBoxes && isOutsideButtons) {
        if (Array.isArray(setStates)) {
          setStates.forEach((setState) => setState(false));
        } else {
          setStates(false);
        }
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [boxIDs, buttonIDs, setStates]);
};
