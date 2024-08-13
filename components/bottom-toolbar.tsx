import { EyedropperSample } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { AnimatePresence, motion } from "framer-motion";

import { useColors } from "~/lib/store";

export function BottomToolbar() {
  const { color, weight, changeColor, changeWeight } = useColors();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [inputHEXValue, setInputHEXValue] = useState(color.hexString());
  const [inputWeightValue, setInputWeightValue] = useState(weight);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setPickerVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setInputHEXValue(color.hexString());
  }, [color]);

  useEffect(() => {
    setInputWeightValue(weight);
  }, [weight]);

  return (
    <div className="flex-none p-4 pt-0">
      <div className="flex justify-between items-center bg-zinc-800 text-white drop-shadow-sm rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              id="color-picker"
              className="flex items-center gap-4"
              ref={pickerRef}
            >
              <form
                className="flex flex-col gap-1 relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  changeColor(inputHEXValue);
                }}
              >
                <label htmlFor="hex" className="text-sm text-white/70">
                  Color
                </label>
                <div className="flex items-center border overflow-hidden border-white/10 rounded">
                  <motion.button
                    className="p-2 flex items-center justify-center outline-none transition-colors"
                    onClick={(e) => {
                      if (e.currentTarget === e.target) return;
                      setPickerVisible((current) => !current);
                    }}
                    style={{
                      backgroundColor: color.hexString(),
                      outlineColor: "transparent",
                      color: color.getBrightness() > 50 ? "black" : "white",
                    }}
                    whileFocus={{
                      outlineColor: color.hexString(),
                    }}
                  >
                    <EyedropperSample size={21} />
                  </motion.button>
                  <AnimatePresence>
                    {pickerVisible && (
                      <motion.div
                        transition={{
                          type: "spring",
                          duration: 0.3,
                          bounce: 0,
                        }}
                        initial={{
                          scale: 0.9,
                          opacity: 0,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        exit={{
                          scale: 0.9,
                          opacity: 0,
                        }}
                        className="w-fit h-fit absolute origin-bottom-left bottom-full left-0 z-10 mb-4"
                      >
                        <HexColorPicker
                          color={color.hexString()}
                          onChange={changeColor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <input
                    name="hex"
                    type="text"
                    value={inputHEXValue}
                    onChange={(e) => setInputHEXValue(e.target.value)}
                    pattern="^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$"
                    className="form-input transition-colors bg-transparent p-2 focus:ring-0 hover:bg-white/[0.06] border-none focus-visible:outline-none focus-visible:bg-white/[0.06] max-w-28 font-mono h-fit text-[16px]/[16px]"
                  />
                </div>
              </form>
              <form
                className="flex flex-col gap-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  changeWeight(inputWeightValue);
                }}
              >
                <label htmlFor="weight" className="text-sm text-white/70">
                  Weight
                </label>
                <input
                  name="weight"
                  type="number"
                  max={100}
                  min={1}
                  step={0.1}
                  value={inputWeightValue}
                  pattern="^(?:100(?:\.0)?|[1-9]?\d(?:\.\d)?)$"
                  onChange={(e) =>
                    setInputWeightValue(Number.parseFloat(e.target.value))
                  }
                  className="form-input transition-colors focus:ring-0 focus:border-white/10 bg-transparent p-2 rounded hover:bg-white/[0.06] focus-visible:outline-none focus-visible:bg-white/[0.06] border border-white/10 max-w-24 font-mono text-base leading-none"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
