import { create } from "zustand";
import Values from "values.js";

// define types for state values and actions separately
type State = {
  color: Values;
  weight: number;
  filter: "all" | "tints" | "shades";
  values: Values[];
};

type Actions = {
  changeColor: (hueOrHex: number | string) => void;
  changeWeight: (weight: number) => void;
  changeFilter: (filter: "all" | "tints" | "shades") => void;
  reset: () => void;
};

const initialState: Omit<State, "values"> = {
  color: new Values("hsl(47deg 100% 50% / 1)"),
  weight: 10,
  filter: "all",
};

export const useColors = create<State & Actions>()((set, get) => ({
  color: initialState.color,
  weight: initialState.weight,
  filter: initialState.filter,
  tints: initialState.color.tints(initialState.weight),
  shades: initialState.color.shades(initialState.weight),
  all: initialState.color.all(initialState.weight),
  values:
    initialState.filter === "tints"
      ? initialState.color["tints"](initialState.weight)
      : initialState.filter === "shades"
      ? initialState.color["shades"](initialState.weight)
      : initialState.color["all"](initialState.weight),
  changeColor: (hueOrHex) => {
    if (typeof hueOrHex === "string") {
      const color = new Values(hueOrHex);
      set({
        color,
        values: color[get().filter](get().weight),
      });
      return;
    }

    const color = new Values(`hsl(${hueOrHex}deg 100% 50% / 1)`);
    set({
      color,
      values: color[get().filter](get().weight),
    });
  },
  changeWeight: (weight) => {
    set({
      weight,
      values: get().color[get().filter](weight),
    });
  },
  changeFilter: (filter) => {
    set({ filter, values: get().color[filter](get().weight) });
  },
  reset: () => {
    set({
      color: initialState.color,
      weight: initialState.weight,
      filter: initialState.filter,
      values:
        initialState.filter === "tints"
          ? get().color["tints"](get().weight)
          : initialState.filter === "shades"
          ? get().color["shades"](get().weight)
          : get().color["all"](get().weight),
    });
  },
}));
