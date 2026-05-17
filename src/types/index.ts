export type FlowType =
  | "onboarding"
  | "paywall"
  | "checkout"
  | "navigation"
  | "empty-state"
  | "search"
  | "settings";

export interface AnalyzeRequest {
  category: string;
  flowType: FlowType;
  competitors?: string[];
}

export interface MobbinScreenshot {
  id: string;
  appName: string;
  imageUrl: string;
  flowType: string;
  platform: "ios" | "android" | "web";
}

export interface AnalyzeResponse {
  report: string;
  screenshots: MobbinScreenshot[];
}

/* ── Prototype Interview (v5 branching flow) ── */

export type InterviewFlow = "improve" | "new" | null;

export interface Recommendation {
  text: string;
  priority: "High" | "Medium" | "Low";
  rationale: string;
  competitors: string;
}

export interface PrototypeInterviewAnswers {
  flow: InterviewFlow;
  // Branch A (improve)
  improvementAreas: string[];
  improvementDetail: string;
  // Branch B (new)
  productDescription: string;
  targetUser: string;
  targetUserQualitative: string;
  // Q-FINAL (both)
  selectedRecommendations: number[];
  customFeatures: string;
}

export const EMPTY_ANSWERS: PrototypeInterviewAnswers = {
  flow: null,
  improvementAreas: [],
  improvementDetail: "",
  productDescription: "",
  targetUser: "",
  targetUserQualitative: "",
  selectedRecommendations: [],
  customFeatures: "",
};

export const TARGET_USER_OPTIONS = [
  {
    label: "First-time users / beginners",
    value: "users new to this type of product — they need simple flows, guidance, and zero jargon",
  },
  {
    label: "Mainstream consumers",
    value: "everyday app users — they expect familiar patterns and minimal friction",
  },
  {
    label: "Working professionals",
    value: "daily-use professionals — they value speed, density, and efficiency",
  },
  {
    label: "Tech-savvy early adopters",
    value: "power users who explore features and expect cutting-edge design",
  },
];

export const IMPROVEMENT_AREA_OPTIONS = [
  { label: "Onboarding & first-time experience", value: "onboarding" },
  { label: "Core user flow / main feature", value: "core-flow" },
  { label: "Navigation & information architecture", value: "navigation" },
  { label: "Trust & security perception", value: "trust" },
  { label: "Engagement & retention", value: "engagement" },
  { label: "Just give me recommendations", value: "auto" },
];
