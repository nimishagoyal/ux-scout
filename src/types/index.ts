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

export interface PrototypeInterviewAnswers {
  productDescription: string;
  targetUser: string;
  topGoal: string;
}
