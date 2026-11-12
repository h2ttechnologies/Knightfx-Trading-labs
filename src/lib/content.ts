export const siteConfig = {
  name: "KnightFX Trading Labs",
  founder: "Hareesh",
  experience: "4+ years",
  links: {
    discord: "https://discord.gg/a62jBGnfT",
    telegram: "https://t.me/knightfxtrader",
    instagram: "",
    youtube: "",
    whatsapp: "https://chat.whatsapp.com/GegRPYcjZcpHmydqSPVU3u",
    email: "",
  },
};

export type Course = {
  slug: string;
  number: string;
  title: string;
  description: string;
  level: string;
  topics: string[];
  icon: string;
  image_url?: string | null;
  featured?: boolean;
};

export const courses: Course[] = [
  {
    slug: "trading-fundamentals",
    number: "01",
    title: "Trading fundamentals",
    description: "A clear starting point for understanding how financial markets work.",
    level: "Foundation",
    topics: ["Financial markets", "Forex basics", "Currency pairs", "Pips & lot sizes", "Bid & ask", "Trading platforms"],
    icon: "01",
  },
  {
    slug: "technical-analysis",
    number: "02",
    title: "Technical analysis",
    description: "Learn to organise charts and interpret price action with context.",
    level: "Foundation",
    topics: ["Candlesticks", "Support & resistance", "Trend analysis", "Market structure", "Price action"],
    icon: "02",
  },
  {
    slug: "smc-ict-concepts",
    number: "03",
    title: "SMC & ICT concepts",
    description: "An educational overview of commonly discussed market structure concepts.",
    level: "Intermediate",
    topics: ["Liquidity", "Structure shifts", "Break of structure", "Fair value gaps", "Order blocks", "Premium & discount"],
    icon: "03",
  },
  {
    slug: "risk-management",
    number: "04",
    title: "Risk management",
    description: "Build a process for sizing positions and protecting trading capital.",
    level: "All levels",
    topics: ["Position sizing", "Risk per trade", "Stop-loss placement", "Risk-to-reward", "Drawdown", "Trading psychology"],
    icon: "04",
  },
  {
    slug: "advanced-trading-concepts",
    number: "05",
    title: "Advanced trading concepts",
    description: "Explore how context, sessions and confluence fit into a trading plan.",
    level: "Advanced",
    topics: ["Multi-timeframe analysis", "Session behaviour", "Confluence", "Trade management", "Strategy development"],
    icon: "05",
  },
  {
    slug: "trading-psychology",
    number: "06",
    title: "Trading psychology",
    description: "Recognise emotional habits and create routines that support discipline.",
    level: "All levels",
    topics: ["Emotional discipline", "Revenge trading", "Overtrading", "Patience", "Consistency", "Trading journals"],
    icon: "06",
  },
];

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  sections: { heading: string; body: string }[];
  image?: string | null;
  featured?: boolean;
};

// These previews are deliberately generic. Replace them with reviewed, dated analysis before publication.
export const insights: Insight[] = [
  {
    slug: "daily-market-outlook-preview",
    category: "Market outlook",
    title: "A framework for a daily market outlook",
    excerpt: "A demonstration of how to organise structure, levels and scenarios before a session.",
    readingTime: "4 min read",
    sections: [
      { heading: "Start with context", body: "A useful outlook begins with the higher-timeframe picture. Note whether price is trending, ranging or approaching an area that deserves attention. This preview contains no live market call." },
      { heading: "Map areas, not promises", body: "Mark areas that could matter and write down what would confirm or invalidate each scenario. A level is a point for observation, not a prediction that price must react." },
      { heading: "Prepare for the calendar", body: "Check relevant economic announcements and consider whether the timing or volatility changes your plan. This is an educational example, not current financial advice." },
    ],
  },
  {
    slug: "xauusd-analysis-preview",
    category: "XAUUSD analysis",
    title: "How to structure a gold chart review",
    excerpt: "A demonstration checklist for reviewing gold without turning analysis into a signal.",
    readingTime: "5 min read",
    sections: [
      { heading: "Use multiple timeframes", body: "Write down the broad structure first, then narrow your attention to the session you are studying. Keep the observations descriptive and separate from any trade decision." },
      { heading: "Define your invalidation", body: "If you are studying a possible scenario, decide what evidence would make that idea no longer useful. Risk decisions belong to the individual trader and their own plan." },
      { heading: "Keep a record", body: "Save the chart with a timestamp and revisit it later. Reviewing what happened can be more useful than trying to predict every move." },
    ],
  },
  {
    slug: "forex-structure-preview",
    category: "Forex analysis",
    title: "A simple structure-first forex review",
    excerpt: "A demonstration of a repeatable way to describe price action across a currency pair.",
    readingTime: "4 min read",
    sections: [
      { heading: "Describe what is visible", body: "Identify the current swing structure and note where price is relative to recent ranges. Avoid adding a directional view before you have described the chart." },
      { heading: "Consider the session", body: "The same pair can behave differently across sessions. Note the time and conditions so your review has context." },
      { heading: "Separate education from execution", body: "A chart breakdown explains an observation; it does not tell a reader what to buy or sell. Any example should be tested against a personal risk plan." },
    ],
  },
  {
    slug: "trading-sessions-preview",
    category: "Trading sessions",
    title: "What to consider across trading sessions",
    excerpt: "A demonstration guide to session timing, overlap and changing market activity.",
    readingTime: "3 min read",
    sections: [
      { heading: "Session context", body: "Trading activity changes through the day. A session label is context, not a reliable forecast of direction or volatility." },
      { heading: "Plan around your schedule", body: "Choose study periods that fit your time zone and routine. Avoid forcing a trade simply because a market session is open." },
      { heading: "Review your own observations", body: "A journal helps distinguish a repeated observation from an assumption. Record the instrument, time and what you actually saw." },
    ],
  },
  {
    slug: "weekly-review-preview",
    category: "Weekly recap",
    title: "A weekly review for better process",
    excerpt: "A demonstration template for reviewing decisions, preparation and lessons learned.",
    readingTime: "4 min read",
    sections: [
      { heading: "Review the plan", body: "Compare your preparation with what you did during the week. Focus on whether you followed your rules, not only on the outcome of a position." },
      { heading: "Find one adjustment", body: "Look for a specific behaviour you can improve. Small, measurable changes are easier to review than vague promises to trade better." },
      { heading: "Keep performance in context", body: "A short sample does not establish a reliable edge. Avoid drawing broad conclusions from a few trades." },
    ],
  },
  {
    slug: "discipline-preview",
    category: "Trading psychology",
    title: "Discipline begins before the chart",
    excerpt: "A demonstration reflection on routines, patience and emotional awareness.",
    readingTime: "3 min read",
    sections: [
      { heading: "Create a pre-session routine", body: "A consistent routine can help you check your plan, your schedule and your state of mind before you begin to study the market." },
      { heading: "Use rules to reduce impulse", body: "Rules are useful when they are clear enough to review. Write down what qualifies as a setup and what conditions mean you should wait." },
      { heading: "Pause when needed", body: "Stepping away is a valid decision. Education and practice do not remove the financial risks of trading." },
    ],
  },
];

export const resultCategories = [
  "All milestones",
  "Prop firm payouts",
  "Certificates",
  "Funding achievements",
  "Trader milestones",
  "Community",
];

export const partnerCategories = ["Prop firm partners", "Broker partners"];
