export type JessiePage = "homepage" | "create" | "biology" | "calm";

export type JessieMode = "create" | "biology" | "calm" | "blended";

export interface JessieRequest {
  user_input: string;
  page: JessiePage;
  premium?: boolean;
}

export interface JessieResponse {
  mode: JessieMode;
  title: string;
  summary: string;
  final_prompt: string;
  alternate_prompts: string[];
  negative_prompt: string;
  caption: string;
  why_this_works: string;
  tags: string[];
  safety_notes: string[];
}
