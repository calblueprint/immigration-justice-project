import { useMemo, useState } from 'react';
import {
  MiscSectionData,
  RadioSectionData,
  SectionData,
} from '@/types/settingsSection';
import { H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import DateInput from '../DateInput';
import BigDataDropdown from '../BigDataDropdown';
import InputDropdown from '../InputDropdown';
import TextInput from '../TextInput';
import { KeyValueBlurb } from './styles';
import TextAreaInput from '../TextAreaInput';
import RadioGroup from '../RadioGroup';

// config
const DROPDOWN_LIMIT = 20;

// helpers
function MiscEditor({
  data,
  onChange,
}: {
  data: MiscSectionData | RadioSectionData;
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
        id={data.label}
        label={editorLabel}
        value={val}
        setValue={setVal}
        placeholder={data.placeholder}
        onChange={onChange}
        errorText={data.error}
      />
    );

  if (data.type === 'radio')
    return (
      <RadioGroup
        label={editorLabel}
        name={editorLabel}
        options={data.options}
        value={val}
        setValue={setVal}
        onChange={onChange}
        error={data.error}
      />
    );

  return data.type === 'date' ? (
    <DateInput
      id={data.label}
      label={editorLabel}
      value={val}
      setValue={setVal}
      onChange={onChange}
      error={data.error}
    />
  ) : (
    <TextAreaInput
      id={data.label}
      label={editorLabel}
      value={val}
      setValue={setVal}
      placeholder={data.placeholder}
      onChange={onChange}
      error={data.error}
    />
  );
}

const chooseFormatter = (data: SectionData): string => {
  if (data.format) {
    if (data.type !== 'multi-select') return data.format(data.value || '');
    return data.format(data.value);
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

    if (data.type !== 'multi-select' && data.type !== 'single-select')
      return (
        <MiscEditor
          data={data}
          onChange={(nv: string) => {
            if (!data.validate?.(nv))
              onChange({ ...data, error: '', value: nv });
            else onChange({ ...data, value: nv });
          }}
        />
      );

    // typescript complains when i try to put this condition
    // in the multi prop :pensive:
    if (data.type === 'multi-select')
      return data.options.size > DROPDOWN_LIMIT ? (
        <BigDataDropdown
          label={editorLabel}
          options={data.options}
          pageSize={data.pageSize}
          defaultValue={data.value}
          onChange={nv => {
            if (!data.validate?.(nv))
              onChange({ ...data, error: '', value: nv });
            else onChange({ ...data, value: nv });
          }}
          error={data.error}
          multi
        />
      ) : (
        <InputDropdown
          label={editorLabel}
          options={data.options}
          defaultValue={data.value}
          onChange={nv => {
            if (!data.validate?.(nv))
              onChange({ ...data, error: '', value: nv });
            else onChange({ ...data, value: nv });
          }}
          error={data.error}
          multi
        />
      );
    return data.options.size > DROPDOWN_LIMIT ? (
      <BigDataDropdown
        label={editorLabel}
        options={data.options}
        pageSize={data.pageSize}
        defaultValue={data.value || undefined}
        onChange={nv => {
          if (!data.validate?.(nv)) onChange({ ...data, error: '', value: nv });
          else onChange({ ...data, value: nv });
        }}
        error={data.error}
      />
    ) : (
      <InputDropdown
        label={editorLabel}
        options={data.options}
        defaultValue={data.value || undefined}
        onChange={nv => {
          if (!data.validate?.(nv)) onChange({ ...data, error: '', value: nv });
          else onChange({ ...data, value: nv });
        }}
        error={data.error}
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
          {data.emptyText &&
          ((data.type === 'multi-select' && data.value.size === 0) ||
            (data.type !== 'multi-select' && !data.value)) ? (
            <P $color={COLORS.greyMid}>{data.emptyText}</P>
          ) : (
            <P>{chooseFormatter(data)}</P>
          )}
        </>
      )}
    </KeyValueBlurb>
  );
}
