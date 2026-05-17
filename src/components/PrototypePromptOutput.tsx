"use client";

/**
 * PrototypePromptOutput — Muyun owns this component.
 * Displays the generated Lovable/Bolt prompt with a one-click copy button.
 */

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface PrototypePromptOutputProps {
  prompt: string;
}

export default function PrototypePromptOutput({
  prompt,
}: PrototypePromptOutputProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // strip surrounding code block fences if Claude wrapped the prompt
  const cleanPrompt = prompt
    .replace(/^```[a-z]*\n?/i, "")
    .replace(/\n?```$/, "")
    .trim();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Copy this prompt and paste it into{" "}
          <a
            href="https://lovable.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-brand-600 hover:underline"
          >
            Lovable <ExternalLink className="h-3 w-3" />
          </a>{" "}
          or{" "}
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-brand-600 hover:underline"
          >
            Bolt <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>

        <button className="btn-secondary" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Prompt
            </>
          )}
        </button>
      </div>

      <pre className="max-h-80 overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
        {cleanPrompt}
      </pre>
    </div>
  );
}
