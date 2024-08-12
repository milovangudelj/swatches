import { EyedropperSample } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { useColors } from "~/lib/store";

export function BottomToolbar() {
  const { color, changeColor } = useColors();
  const [pickerVisible, setPickerVisible] = useState(false);
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

  return (
    <div className="flex-none p-4 pt-0">
      <div className="flex justify-between items-center bg-zinc-800 text-white drop-shadow-sm rounded-lg py-2 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div id="color-picker" className="flex relative" ref={pickerRef}>
              <button
                className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/[0.06] focus-within:bg-white/[0.12] transition-colors"
                onClick={() => {
                  setPickerVisible((current) => !current);
                }}
                style={{
                  backgroundColor: color.hexString(),
                  color: color.getBrightness() > 50 ? "black" : "white",
                }}
              >
                <EyedropperSample size={24} />
              </button>
              {pickerVisible && (
                <HexColorPicker
                  color={color.hexString()}
                  onChange={changeColor}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
