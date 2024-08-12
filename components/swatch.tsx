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
        className="inline-block w-2.5 h-2.5 rounded-full border mr-1"
        style={{
          borderColor: brightness > 50 ? "black" : "white",
        }}
      ></span>
    ) : type === "shade" ? (
      <span
        className="inline-block w-2.5 h-2.5 rounded-full border mr-1"
        style={{
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
        className="group flex-[1_1_33.33%] md:flex-[1_1_22.22%] xl:flex-[1_1_11.11%] flex flex-col gap-2 overflow-hidden rounded-lg font-mono p-6 relative"
        style={{
          backgroundColor: value,
          color: brightness > 50 ? "black" : "white",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center opacity-40 select-none text-[10px]/[1]">
          <span>{indicator}</span>
          <span>{weight}%</span>
        </div>
        <span className="select-none">{value}</span>
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
                whileFocus={{
                  backgroundColor: "#e4e4e7",
                }}
                className="absolute focus-visible:outline-none bottom-4 right-4 bg-zinc-50 text-black overflow-hidden origin-center drop-shadow p-2 rounded-full"
              >
                <AnimatedState
                  className="flex items-center justify-center w-full"
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
