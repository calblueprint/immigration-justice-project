import { useMemo, useState } from 'react';
import { MiscSectionData, SectionData } from '@/types/settingsSection';
import { H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import DateInput from '../DateInput';
import BigDataDropdown from '../BigDataDropdown';
import InputDropdown from '../InputDropdown';
import TextInput from '../TextInput';
import { FormTextArea } from '../InterestForm/styles';
import { KeyValueBlurb } from './styles';

// config
const DROPDOWN_LIMIT = 20;

// helpers
function MiscEditor({
  data,
  onChange,
}: {
  data: MiscSectionData;
  onChange: (nv: string) => void;
}) {
  const [val, setVal] = useState(data.value);
  const editorLabel = useMemo(
    () => (data.editorLabel ? data.editorLabel : data.label),
    [data],
  );

  if (data.type === 'text')
    return (
      <TextInput
        label={editorLabel}
        value={val}
        setValue={setVal}
        placeholder={data.placeholder}
        onChange={onChange}
        errorText={data.error}
      />
    );

  return data.type === 'date' ? (
    <DateInput
      label={editorLabel}
      value={val}
      setValue={setVal}
      onChange={onChange}
      error={data.error}
    />
  ) : (
    <div>
      <H4>{editorLabel}</H4>
      <FormTextArea />
    </div>
  );
}

const chooseFormatter = (data: SectionData): string => {
  if (data.format) {
    if (data.type !== 'dropdown') return data.format(data.value);
    return data.multi ? data.format(data.value) : data.format(data.value);
  }
  if (data.value instanceof Set) return Array.from(data.value).join(', ');
  return data.value || '';
};

// main component
export default function DataField({
  data,
  editing,
  onChange,
}: {
  data: SectionData;
  editing: boolean;
  onChange: (nd: SectionData) => void;
}) {
  const editor = useMemo(() => {
    const editorLabel = data.editorLabel ? data.editorLabel : data.label;

    if (data.type !== 'dropdown')
      return (
        <MiscEditor
          data={data}
          onChange={(nv: string) => onChange({ ...data, value: nv })}
        />
      );

    // typescript complains when i try to put this condition
    // in the multi prop :pensive:
    if (data.multi)
      return data.options.size > DROPDOWN_LIMIT ? (
        <BigDataDropdown
          label={editorLabel}
          options={data.options}
          pageSize={data.pageSize}
          defaultValue={data.value}
          onChange={nv => onChange({ ...data, value: nv })}
          multi
        />
      ) : (
        <InputDropdown
          label={editorLabel}
          options={data.options}
          defaultValue={data.value}
          onChange={nv => onChange({ ...data, value: nv })}
          multi
        />
      );
    return data.options.size > DROPDOWN_LIMIT ? (
      <BigDataDropdown
        label={editorLabel}
        options={data.options}
        pageSize={data.pageSize}
        defaultValue={data.value || undefined}
        onChange={nv => onChange({ ...data, value: nv })}
      />
    ) : (
      <InputDropdown
        label={editorLabel}
        options={data.options}
        defaultValue={data.value || undefined}
        onChange={nv => onChange({ ...data, value: nv })}
      />
    );
  }, [data, onChange]);

  return (
    <KeyValueBlurb>
      {editing ? (
        editor
      ) : (
        <>
          <H4 $color={COLORS.greyDark}>{data.label}</H4>
          <P>{chooseFormatter(data)}</P>
        </>
      )}
    </KeyValueBlurb>
  );
}
