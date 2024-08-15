import Values from "values.js";

import { Swatch } from "./swatch";
import { InertSwatch } from "./inert-swatch";

export function Swatches({
  values,
  inert = false,
}: {
  values: Values[];
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
        {values.map((value, index) =>
          inert ? (
            <InertSwatch
              key={index}
              value={value.hexString()}
              brightness={value.getBrightness()}
              weight={value.weight}
              type={value.type}
            />
          ) : (
            <Swatch
              key={index}
              value={value.hexString()}
              brightness={value.getBrightness()}
              weight={value.weight}
              type={value.type}
            />
          )
        )}
      </div>
    </div>
  );
}
