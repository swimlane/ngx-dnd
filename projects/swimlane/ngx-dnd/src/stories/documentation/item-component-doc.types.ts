export type ItemComponentDocBlock =
  | { type: 'p'; html: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type ItemComponentDoc = {
  title: string;
  blocks: ItemComponentDocBlock[];
};
