import { iso6393 } from 'iso-639-3';
import { DropdownOption } from '@/types/dropdown';

export const languages = iso6393
  .filter(i => i.type === 'living')
  .filter(i => i.iso6392T || i.name.endsWith('Sign Language'))
  .map(i => i.name)
  .sort((l1, l2) => l1.localeCompare(l2));

export const optionalLanguages: DropdownOption[] = [
  { label: 'N/A', value: 'N/A' },
  ...languages.map(l => ({ label: l, value: l })),
];
