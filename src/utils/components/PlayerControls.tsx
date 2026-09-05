import { FiPause, FiPlay, FiRotateCcw, FiSkipBack, FiSkipForward } from "react-icons/fi";

interface Props {
  playing: boolean;
  step: number;
  total: number;
  speed: number;
  onToggle: () => void;
  onStep: (delta: number) => void;
  onReset: () => void;
  onScrub: (value: number) => void;
  onSpeed: (value: number) => void;
}

const btn =
  "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground";

export function PlayerControls({
  playing,
  step,
  total,
  speed,
  onToggle,
  onStep,
  onReset,
  onScrub,
  onSpeed,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-3">
      <div className="flex items-center gap-2">
        <button type="button" className={btn} onClick={onReset} aria-label="Reset animation">
          <FiRotateCcw />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => onStep(-1)}
          disabled={step === 0}
          aria-label="Previous step"
        >
          <FiSkipBack />
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? "Pause animation" : "Play animation"}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {playing ? <FiPause /> : <FiPlay />}
          <span className="text-sm">{playing ? "Pause" : "Play"}</span>
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => onStep(1)}
          disabled={step >= total - 1}
          aria-label="Next step"
        >
          <FiSkipForward />
        </button>
      </div>

      <div className="flex min-w-[180px] flex-1 items-center gap-3">
        <input
          type="range"
          min={0}
          max={Math.max(total - 1, 0)}
          value={step}
          onChange={(e) => onScrub(Number(e.target.value))}
          aria-label="Scrub steps"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-primary"
        />
        <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
          {step + 1}/{total}
        </span>
      </div>

      <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        speed
        <select
          value={speed}
          onChange={(e) => onSpeed(Number(e.target.value))}
          className="rounded-md border border-border bg-surface-2 px-2 py-1.5 text-foreground"
        >
          <option value={1400}>0.5x</option>
          <option value={700}>1x</option>
          <option value={380}>2x</option>
          <option value={180}>4x</option>
        </select>
      </label>
    </div>
  );
}