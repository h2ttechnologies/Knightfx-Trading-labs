"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function AffiliateCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <button className="partner-code-button" type="button" onClick={() => void copy()}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Copied" : code}</button>;
}
