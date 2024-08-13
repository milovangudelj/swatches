import { create } from "zustand";
import Values from "values.js";

// define types for state values and actions separately
type State = {
  color: Values;
  weight: number;
  tints: Values[];
  shades: Values[];
  all: Values[];
};

type Actions = {
  changeColor: (hueOrHex: number | string) => void;
  changeWeight: (weight: number) => void;
  reset: () => void;
};

const initialState: Pick<State, "color" | "weight"> = {
  color: new Values("hsl(47deg 100% 50% / 1)"),
  weight: 10,
};

export const useColors = create<State & Actions>()((set, get) => ({
  color: initialState.color,
  weight: initialState.weight,
  tints: initialState.color.tints(initialState.weight),
  shades: initialState.color.shades(initialState.weight),
  all: initialState.color.all(initialState.weight),
  changeColor: (hueOrHex) => {
    if (typeof hueOrHex === "string") {
      const color = new Values(hueOrHex);
      set({
        color,
        tints: color.tints(get().weight),
        shades: color.shades(get().weight),
        all: color.all(get().weight),
      });
      return;
    }

    const color = new Values(`hsl(${hueOrHex}deg 100% 50% / 1)`);
    set({
      color,
      tints: color.tints(get().weight),
      shades: color.shades(get().weight),
      all: color.all(get().weight),
    });
  },
  changeWeight: (weight) => {
    set({
      weight,
      tints: get().color.tints(weight),
      shades: get().color.shades(weight),
      all: get().color.all(weight),
    });
  },
  reset: () => {
    set({
      color: initialState.color,
      weight: initialState.weight,
      tints: initialState.color.tints(initialState.weight),
      shades: initialState.color.shades(initialState.weight),
      all: initialState.color.all(initialState.weight),
    });
  },
}));
