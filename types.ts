export enum Gender {
  MALE = 'ชาย',
  FEMALE = 'หญิง',
  NEUTRAL = 'ไม่ระบุ'
}

export interface FormData {
  fatherName: string;
  motherName: string;
  birthDate: string;
  gender: Gender;
  style: string;
}

export interface NameSuggestion {
  name: string;
  meaning: string;
  origin: string;
  auspiciousness: string; // Explanation of why it's good (Sirimongkol)
  score: number; // 1-100
}

export interface GeminiResponse {
  suggestions: NameSuggestion[];
  summary: string;
}