export function InertSwatch({
  value,
  brightness,
  weight,
  type,
}: {
  value: string;
  brightness: number;
  weight: number;
  type: string;
}) {
  const indicator =
    type === "tint" ? (
      <span
        style={{
          display: "block",
          width: "0.625rem",
          height: "0.625rem",
          borderRadius: "9999px",
          borderWidth: "1px",
          marginRight: "0.25rem",
          borderColor: brightness > 50 ? "black" : "white",
        }}
      ></span>
    ) : type === "shade" ? (
      <span
        style={{
          display: "block",
          width: "0.625rem",
          height: "0.625rem",
          borderRadius: "9999px",
          borderWidth: "1px",
          marginRight: "0.25rem",
          borderColor: brightness > 50 ? "black" : "white",
          backgroundColor: brightness > 50 ? "black" : "white",
        }}
      ></span>
    ) : (
      ""
    );

  return (
    <div
      className="group"
      style={{
        flex: "1 1 11.11%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        overflow: "hidden",
        borderRadius: "0.5rem",
        fontFamily:
          '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        padding: "1.5rem",
        position: "relative",
        backgroundColor: value,
        color: brightness > 50 ? "black" : "white",
      }}
    >
      <div
        style={{
          opacity: 0.4,
          display: "flex",
          alignItems: "center",
          fontSize: "10px",
          lineHeight: "1",
        }}
      >
        {indicator}
        <span>{weight}%</span>
      </div>
      <span>{value}</span>
    </div>
  );
}
