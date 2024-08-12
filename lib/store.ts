import { create } from "zustand";
import Values from "values.js";

// define types for state values and actions separately
type State = {
  color: Values;
  tints: Values[];
  shades: Values[];
  all: Values[];
};

type Actions = {
  changeColor: (string: number) => void;
  reset: () => void;
};

const initialState: Pick<State, "color"> = {
  color: new Values("hsl(47deg 100% 50% / 1)"),
};

export const useColors = create<State & Actions>()((set) => ({
  color: initialState.color,
  tints: initialState.color.tints(),
  shades: initialState.color.shades(),
  all: initialState.color.all(),
  changeColor: (hue) => {
    const color = new Values(`hsl(${hue}deg 100% 50% / 1)`);
    set({
      color,
      tints: color.tints(),
      shades: color.shades(),
      all: color.all(),
    });
  },
  reset: () => {
    set({
      color: initialState.color,
      tints: initialState.color.tints(),
      shades: initialState.color.shades(),
      all: initialState.color.all(),
    });
  },
}));
