"use client";

import { Check, Copy, RotateCcw, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE = `// an interface with intent
export function buildExperience() {
  return (
    <Scene
      motion="purposeful"
      depth={3}
      accessible
      reducedMotion
    />
  );
}

// the browser is the medium
scene.on("pointermove", ({ x, y }) => {
  field.bend(x, y);
});`;

const lines = [
  <span key="1" className="text-mist">
    {"// an interface with intent"}
  </span>,
  <span key="2">
    <span className="syntax-keyword">export function</span>{" "}
    <span className="text-cyan-glow">buildExperience</span>() {"{"}
  </span>,
  <span key="3" className="pl-4">
    <span className="syntax-keyword">return</span> (
  </span>,
  <span key="4" className="pl-8">
    {"<"}
    <span className="syntax-tag">Scene</span>
  </span>,
  <span key="5" className="pl-12">
    motion=<span className="syntax-string">&quot;purposeful&quot;</span>
  </span>,
  <span key="6" className="pl-12">
    depth={"{"}
    <span className="syntax-number">3</span>
    {"}"}
  </span>,
  <span key="7" className="pl-12">
    accessible
  </span>,
  <span key="8" className="pl-12">
    reducedMotion
  </span>,
  <span key="9" className="pl-8">
    {"/>"}
  </span>,
  <span key="10" className="pl-4">
    );
  </span>,
  <span key="11">{"}"}</span>,
  <span key="12">&nbsp;</span>,
  <span key="13" className="text-mist">
    {"// the browser is the medium"}
  </span>,
  <span key="14">
    scene.<span className="text-cyan-glow">on</span>(
    <span className="syntax-string">&quot;pointermove&quot;</span>, (
    {"{"} x, y {"}"}) {`=>`} {"{"}
  </span>,
  <span key="15" className="pl-4">
    field.<span className="text-cyan-glow">bend</span>(x, y);
  </span>,
  <span key="16">{"});"}</span>,
];

export function CodeTerminal() {
  const [runKey, setRunKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
      window.setTimeout(() => setCopyError(false), 2500);
    }
  };

  return (
    <div className="terminal-window overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-danger/70" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-warn/70" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-success/70" aria-hidden="true" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-mist">
            <Terminal className="h-3 w-3" aria-hidden="true" />
            experience.tsx
          </span>
        </div>
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-mist">
          editable
        </span>
      </div>

      <div className="max-h-[330px] overflow-x-auto p-4 sm:p-5">
        <ol key={runKey} className="min-w-max space-y-[0.42rem] font-mono text-[0.68rem] leading-relaxed sm:text-[0.72rem]">
          {lines.map((line, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: 0.1 + index * 0.055, ease: "easeOut" }}
              className="flex gap-4 text-frost"
            >
              <span className="w-4 shrink-0 select-none text-right text-mist" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-pre">{line}</span>
            </motion.li>
          ))}
          <li className="flex gap-4" aria-hidden="true">
            <span className="w-4 shrink-0" />
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-cyan-glow/70" />
          </li>
        </ol>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line/60 px-3 py-2.5">
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-mist">
          canvas 2d / no dependencies
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setRunKey((value) => value + 1)}
            className="flex h-8 items-center gap-1.5 rounded-full border border-line/70 px-2.5 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-mist transition-colors hover:border-line hover:text-frost"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Replay
          </button>
          <button
            type="button"
            onClick={copy}
            className="flex h-8 items-center gap-1.5 rounded-full border border-line/70 px-2.5 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-mist transition-colors hover:border-cyan-glow/30 hover:text-frost"
            aria-live="polite"
          >
            {copied ? (
              <Check className="h-3 w-3 text-cyan-glow" aria-hidden="true" />
            ) : (
              <Copy className="h-3 w-3" aria-hidden="true" />
            )}
            {copied ? "Copied" : copyError ? "Failed" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
