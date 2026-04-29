export type IntroductionBadge = {
  src: string;
  alt: string;
  href: string;
};

export type IntroductionBlock =
  | { type: 'badges'; items: IntroductionBadge[] }
  | { type: 'p'; html: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; language: string; code: string };

export type IntroductionDoc = {
  title: string;
  blocks: IntroductionBlock[];
};
