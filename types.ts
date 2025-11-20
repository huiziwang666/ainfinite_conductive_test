export enum ViewState {
  TESTER = 'TESTER',
  KNOWLEDGE = 'KNOWLEDGE',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const MAKEY_MAKEY_KEYS = [
  ' ', // Space
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'w',
  'a',
  's',
  'd',
  'f',
  'g',
  'Enter' // Often used for click simulation
];