import { atom } from "recoil";

export const userTheme = atom({
  key: "theme",
  default: true,
});

export const modalToggleState = atom({
  key: "isOpen",
  default: false,
});

export const modalState = atom({
  key: "modalId",
  default: "diary",
});
