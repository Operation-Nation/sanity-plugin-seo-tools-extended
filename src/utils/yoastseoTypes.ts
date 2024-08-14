export type AssessmentResult = {
  score: number;
  text: string;
};

export type AssessmentRating = 'error' | 'feedback' | 'bad' | 'ok' | 'good' | '';
