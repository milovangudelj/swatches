import Values from "values.js";

import { Swatch } from "./swatch";
import { InertSwatch } from "./inert-swatch";

export function Swatches({
  all,
  inert = false,
}: {
  all: Values[];
  inert?: boolean;
}) {
  return (
    <div
      id="swatches"
      style={{
        flex: "1 1 0%",
        display: "flex",
        backgroundColor: "#18181b",
        padding: "1rem",
        fontFamily:
          '"Geist Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          overflowY: "auto",
          flexWrap: "wrap",
          borderRadius: "0.5rem",
          gap: "0.5rem",
          width: "100%",
          minHeight: "100%",
        }}
      >
        {all.map((tint, index) =>
          inert ? (
            <InertSwatch
              key={index}
              value={tint.hexString()}
              brightness={tint.getBrightness()}
              weight={tint.weight}
              type={tint.type}
            />
          ) : (
            <Swatch
              key={index}
              value={tint.hexString()}
              brightness={tint.getBrightness()}
              weight={tint.weight}
              type={tint.type}
            />
          )
        )}
      </div>
    </div>
  );
}
