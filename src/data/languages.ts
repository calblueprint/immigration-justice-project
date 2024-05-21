import { iso6393 } from 'iso-639-3';
import { GroupBase } from 'react-select';
import { LoadOptions } from 'react-select-async-paginate';
import { DropdownOption } from '@/types/dropdown';
import { filterAndPaginate } from '@/utils/helpers';

export const languages = iso6393
  .filter(i => i.type === 'living')
  .filter(i => i.iso6392T || i.name.endsWith('Sign Language'))
  .map(i => i.name)
  .sort((l1, l2) => l1.localeCompare(l2));

export const optionalLanguages: DropdownOption[] = [
  { label: 'Not Applicable', value: 'Not Applicable' },
  ...languages.map(l => ({ label: l, value: l })),
];

// load languages
export const loadLanguages: LoadOptions<
  DropdownOption,
  GroupBase<DropdownOption>,
  null
> = (search, prevOptions) =>
  filterAndPaginate(optionalLanguages, search, prevOptions.length);
