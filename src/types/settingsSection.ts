interface CommonSectionData {
  label: string;
  placeholder?: string;
  error?: string;
  editorLabel?: string;
}

export interface MiscSectionData extends CommonSectionData {
  type: 'text' | 'textarea' | 'date';
  value: string;
  format?: (v: string) => string;
  validate?: (v: string) => string;
}

// specify multi-select vs single-select via type of value
// for empty multi, pass in an empty Set
// for empty single, pass in null or empty string
interface CommonDropdownSectionData extends CommonSectionData {
  type: 'dropdown';
  options: Set<string> | Map<string, string>;
  pageSize?: number;
}

interface SingleDropdownSectionData extends CommonDropdownSectionData {
  multi?: false;
  value: string | null;
  format?: (s: string | null) => string;
  validate?: (s: string | null) => string;
}

interface MultiDropdownSectionData extends CommonDropdownSectionData {
  multi: true;
  value: Set<string>;
  format?: (s: Set<string>) => string;
  validate?: (s: Set<string>) => string;
}

export type SectionData =
  | SingleDropdownSectionData
  | MultiDropdownSectionData
  | MiscSectionData;

export type SettingsSectionData = Array<SectionData | SectionData[]>;

export interface SubSectionData {
  title: string;
  linkLabel: string;
  linkValue: string;
  data: SettingsSectionData;
}
