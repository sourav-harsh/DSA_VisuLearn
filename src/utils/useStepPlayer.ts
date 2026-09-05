import { useCallback, useEffect, useState } from "react";

export function useStepPlayer(total: number, resetKey: string) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [resetKey]);

  useEffect(() => {
    if (!playing || total === 0) return;
    const id = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= total - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [playing, speed, total]);

  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p) setStep((s) => (s >= total - 1 ? 0 : s));
      return !p;
    });
  }, [total]);

  const move = useCallback(
    (delta: number) => {
      setPlaying(false);
      setStep((s) => Math.min(Math.max(s + delta, 0), Math.max(total - 1, 0)));
    },
    [total],
  );

  const scrub = useCallback((value: number) => {
    setPlaying(false);
    setStep(value);
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setStep(0);
  }, []);

  return { step, playing, speed, setSpeed, toggle, move, scrub, reset };
}