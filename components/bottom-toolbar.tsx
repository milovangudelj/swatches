import { SquaresFour } from "@phosphor-icons/react";

export function BottomToolbar() {
  return (
    <div className="flex-none p-4 pt-0">
      <div className="flex justify-between items-center bg-zinc-800 text-white drop-shadow-sm rounded-lg overflow-hidden py-2 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SquaresFour size={16} className="opacity-70" />
            <span className="font-semibold text-xl select-none">Sw</span>
          </div>
        </div>
      </div>
    </div>
  );
}
