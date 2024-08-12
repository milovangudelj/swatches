import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedState } from "./animated-state";

export function Swatch({
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
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const indicator =
    type === "tint" ? (
      <span
        style={{
          display: "inline-block",
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
          display: "inline-block",
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
    <>
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
          <span>{indicator}</span>
          <span>{weight}%</span>
        </div>
        <span>{value}</span>
        <AnimatePresence initial={false}>
          {hovered && (
            <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
              <motion.button
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                initial={{
                  scale: 0.75,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.75,
                  opacity: 0,
                }}
                whileHover={{
                  backgroundColor: "#e4e4e7",
                  cursor: "pointer",
                }}
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  color: "black",
                  transformOrigin: "center",
                  bottom: "1rem",
                  right: "1rem",
                  borderRadius: "9999px",
                  backgroundColor: "#fafafa",
                  padding: "0.5rem",
                  filter:
                    "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
                }}
              >
                <AnimatedState
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  state={copied ? "copied" : "copy"}
                >
                  {copied ? <Check size={24} /> : <Copy size={24} />}
                </AnimatedState>
              </motion.button>
            </CopyToClipboard>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
