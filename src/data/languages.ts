import { DropdownOption } from '@/types/dropdown';
import { iso6393 } from 'iso-639-3';

export const languages: DropdownOption[] = iso6393
  .filter(i => i.type === 'living')
  .filter(i => i.iso6392T || i.name.endsWith('Sign Language'))
  .map(i => ({ label: i.name, value: i.name }))
  .sort((l1, l2) => l1.label.localeCompare(l2.label));

export const optionalLanguages: DropdownOption[] = [
  { label: 'N/A', value: 'N/A' },
  ...languages,
];
