"use client";

import { useEffect, useState } from "react";

const fallbackYear = 2026;

export function CopyrightNotice() {
  const [year, setYear] = useState(fallbackYear);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>© {year} KNIGHTFX TRADING LABS. ALL RIGHTS RESERVED.</span>;
}
