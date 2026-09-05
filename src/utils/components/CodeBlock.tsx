import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const KEYWORDS = new Set(
  "function const let return if else for while of in new class null true false continue break do typeof public private protected static final void abstract interface implements extends import package this super try catch throw throws synchronized enum record instanceof int long double boolean char String List Map var".split(
    " ",
  ),
);

/** One single pass so replacements never rewrite each other's markup. */
const TOKEN = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(@\w+)|(\b\w+\b)/g;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(line: string) {
  if (line.trim().startsWith("//")) {
    return `<span class="text-muted-foreground italic">${esc(line)}</span>`;
  }
  return line.replace(TOKEN, (match, comment, str, annotation, word) => {
    if (comment) return `<span class="text-muted-foreground italic">${esc(comment)}</span>`;
    if (str) return `<span class="text-mark-compare">${esc(str)}</span>`;
    if (annotation) return `<span class="text-accent">${esc(annotation)}</span>`;
    if (word) {
      if (KEYWORDS.has(word)) return `<span class="text-mark-path">${esc(word)}</span>`;
      if (/^\d+$/.test(word)) return `<span class="text-mark-done">${word}</span>`;
    }
    return esc(match);
  });
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[oklch(0.155_0.024_255)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          {copied ? <FiCheck className="text-mark-done" /> : <FiCopy />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-6">
        <code className="font-mono">
          {code.split("\n").map((l, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-6 shrink-0 text-right text-muted-foreground/50 select-none">
                {i + 1}
              </span>
              <span
                className="whitespace-pre"
                dangerouslySetInnerHTML={{ __html: highlight(l) || "&nbsp;" }}
              />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
