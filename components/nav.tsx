import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Shuffle,
  SquaresFour,
  X,
  DownloadSimple,
  SpinnerGap,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import satori from "satori";
import { Svg2Png } from "svg2png-converter";

import { useColors } from "~/lib/store";
import { AnimatedState } from "./animated-state";
import { Swatches } from "./swatches";

const copyIcons = {
  idle: <Copy size={24} />,
  loading: <SpinnerGap size={24} className="animate-spin" />,
  success: <Check size={24} />,
};

export function Nav() {
  const [scope, animate] = useAnimate();
  const { values, changeColor } = useColors();
  const [copiedSVGIcon, setCopiedSVGIcon] =
    useState<keyof typeof copyIcons>("idle");
  const [copiedPNGIcon, setCopiedPNGIcon] =
    useState<keyof typeof copyIcons>("idle");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (copiedSVGIcon) {
      const timeout = setTimeout(() => {
        setCopiedSVGIcon("idle");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedSVGIcon]);

  useEffect(() => {
    if (copiedPNGIcon) {
      const timeout = setTimeout(() => {
        setCopiedPNGIcon("idle");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedPNGIcon]);

  const generateSVG = async () => {
    return satori(<Swatches values={values} inert={true} />, {
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
    setCopiedSVGIcon("loading");

    const svg = await generateSVG();

    navigator.clipboard.writeText(svg);

    setCopiedSVGIcon("success");
  };

  const handleCopyToPNG = async () => {
    setCopiedPNGIcon("loading");

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

    setCopiedPNGIcon("success");
  };

  return (
    <div className="flex-none p-4 pb-0">
      <div className="flex justify-between items-center bg-zinc-800 text-white drop-shadow-sm rounded-lg overflow-hidden p-4">
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
                  { type: "spring", duration: 0.5, bounce: 0 }
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
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
              <button className="inline-flex relative overflow-hidden focus-visible:outline-none select-none items-center gap-2 py-2 pl-3 pr-4 rounded text-white/70 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.12] focus-visible:text-white transition-colors">
                <span>
                  <DownloadSimple size={16} />
                </span>{" "}
                <span>Save / </span>
                <span>
                  <Copy size={16} />
                </span>{" "}
                <span>Copy</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal forceMount>
              <AnimatePresence>
                {dialogOpen && (
                  <Dialog.Overlay asChild>
                    <motion.div
                      transition={{
                        type: "spring",
                        duration: 0.3,
                        bounce: 0,
                      }}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="bg-black/70 backdrop-blur-sm fixed inset-0"
                    />
                  </Dialog.Overlay>
                )}
                {dialogOpen && (
                  <Dialog.Content asChild>
                    <motion.div
                      transition={{
                        type: "spring",
                        duration: 0.3,
                        bounce: 0,
                      }}
                      initial={{
                        opacity: 0,
                        translateX: "-50%",
                        translateY: "-50%",
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        translateX: "-50%",
                        translateY: "-50%",
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        translateX: "-50%",
                        translateY: "-50%",
                        scale: 0.9,
                      }}
                      className="bg-zinc-800 flex flex-col gap-4 text-white rounded-lg shadow-lg fixed top-1/2 left-1/2 w-[90vw] max-w-[450px] max-h-[85vh] p-4 focus-visible:outline-none"
                    >
                      <Dialog.Title className="text-lg font-medium">
                        Save / Copy
                      </Dialog.Title>
                      <Dialog.Description className="text-white/70">
                        Save your swatches to your computer or copy them to your
                        clipboard.
                      </Dialog.Description>
                      <div className="flex gap-2 items-center text-sm">
                        <button
                          onClick={handleCopyToSVG}
                          className="inline-flex relative overflow-hidden focus-visible:outline-none select-none items-center gap-2 py-2 pl-3 pr-4 rounded text-white/70 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.12] focus-visible:text-white transition-colors"
                        >
                          <AnimatedState
                            className="w-full flex items-center justify-center"
                            state={copiedSVGIcon}
                          >
                            {copyIcons[copiedSVGIcon]}
                          </AnimatedState>
                          <span>SVG</span>
                        </button>
                        <button
                          onClick={handleCopyToPNG}
                          className="inline-flex relative overflow-hidden focus-visible:outline-none select-none items-center gap-2 py-2 pl-3 pr-4 rounded text-white/70 hover:text-white hover:bg-white/[0.06] focus-visible:bg-white/[0.12] focus-visible:text-white transition-colors"
                        >
                          <AnimatedState
                            className="w-full flex items-center justify-center"
                            state={copiedPNGIcon}
                          >
                            {copyIcons[copiedPNGIcon]}
                          </AnimatedState>
                          <span>PNG</span>
                        </button>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          className="absolute top-2 right-2 flex items-center justify-center rounded-full w-8 h-8 hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:bg-white/[0.12]"
                          aria-label="Close"
                        >
                          <X size={16} />
                        </button>
                      </Dialog.Close>
                    </motion.div>
                  </Dialog.Content>
                )}
              </AnimatePresence>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
