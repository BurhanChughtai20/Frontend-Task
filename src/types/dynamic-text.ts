export type TextObject = { 
  text: string; 
  highlight?: boolean; 
  className?: string 
};

export type TextData = string | TextObject;
