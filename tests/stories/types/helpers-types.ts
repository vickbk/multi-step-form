export type LABEL_LOCATOR = [RegExp | string, string];

export type SHOWN_TEXT = RegExp | string;
export type TEXT_WITH_NTH = [SHOWN_TEXT, number];
export type TEXT_MATCHER = SHOWN_TEXT | TEXT_WITH_NTH;
