export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface AnalysisResult {
  description: string;
  poem: string;
  colors?: Array<{
    red: number;
    green: number;
    blue: number;
  }>;
}