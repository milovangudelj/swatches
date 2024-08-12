import { Check, Copy, Shuffle, SquaresFour } from "@phosphor-icons/react";
import { useAnimate } from "framer-motion";

import { useColors } from "~/lib/store";
import { useEffect, useState } from "react";
import { AnimatedState } from "./animated-state";
import satori from "satori";
import { Swatches } from "./swatches";
import { Svg2Png } from "svg2png-converter";

export function Nav() {
  const [scope, animate] = useAnimate();
  const { all, changeColor } = useColors();
  const [copiedSVG, setCopiedSVG] = useState(false);
  const [copiedPNG, setCopiedPNG] = useState(false);

  useEffect(() => {
    if (copiedSVG) {
      const timeout = setTimeout(() => {
        setCopiedSVG(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedSVG]);

  useEffect(() => {
    if (copiedPNG) {
      const timeout = setTimeout(() => {
        setCopiedPNG(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedPNG]);

  const generateSVG = async () => {
    return satori(<Swatches all={all} inert={true} />, {
      width: 1920,
      fonts: [
        {
          name: "Geist Sans",
          data: await (await fetch("/fonts/Geist-Regular.ttf")).arrayBuffer(),
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist Mono",
          data: await (
            await fetch("/fonts/GeistMono-Regular.ttf")
          ).arrayBuffer(),
          weight: 400,
          style: "normal",
        },
      ],
    });
  };

  const handleCopyToSVG = async () => {
    const svg = await generateSVG();

    navigator.clipboard.writeText(svg);

    setCopiedSVG(true);
  };

  const handleCopyToPNG = async () => {
    const svg = await generateSVG();

    const parser = new DOMParser();
    const parsedSVG = parser.parseFromString(svg, "image/svg+xml").children[0];

    const dataURL = await Svg2Png.toDataURL(parsedSVG as SVGSVGElement);
    const blob = await (await fetch(dataURL)).blob();

    navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    setCopiedPNG(true);
  };

  return (
    <div className="flex-none p-4 pb-0">
      <div className="flex justify-between items-center bg-zinc-800 text-white drop-shadow-sm rounded-lg overflow-hidden py-2 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SquaresFour size={16} className="opacity-70" />
            <span className="font-semibold text-xl select-none">Sw</span>
          </div>
          <button
            onClick={() => {
              const animation = async () => {
                await animate(
                  scope.current,
                  { rotateX: "180deg" },
                  { type: "spring", duration: 0.5, bounce: 0 }
                );
                await animate(
                  scope.current,
                  { rotateX: "0deg" },
                  { duration: 0 }
                );
              };

              changeColor(Math.floor(Math.random() * 360));

              animation();
            }}
            className="inline-flex focus-visible:outline-none select-none items-center gap-2 p-2 rounded text-white/70 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.12] focus-visible:text-white transition-colors"
          >
            <Shuffle size={24} ref={scope} />
          </button>
        </div>
        <div className="flex gap-2 items-center text-sm">
          <button
            onClick={handleCopyToSVG}
            className="inline-flex focus-visible:outline-none select-none items-center gap-2 py-2 pl-3 pr-4 rounded text-white/70 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.12] focus-visible:text-white transition-colors"
          >
            <AnimatedState
              className="w-full flex items-center justify-center"
              state={copiedSVG ? "copiedSVG" : "copy"}
            >
              {copiedSVG ? <Check size={24} /> : <Copy size={24} />}
            </AnimatedState>
            <span>SVG</span>
          </button>
          <button
            onClick={handleCopyToPNG}
            className="inline-flex focus-visible:outline-none select-none items-center gap-2 py-2 pl-3 pr-4 rounded text-white/70 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.12] focus-visible:text-white transition-colors"
          >
            <AnimatedState
              className="w-full flex items-center justify-center"
              state={copiedPNG ? "copiedPNG" : "copy"}
            >
              {copiedPNG ? <Check size={24} /> : <Copy size={24} />}
            </AnimatedState>
            <span>PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
