import COLORS from '@/styles/colors';
import { H4, P } from '@/styles/text';
import {
  MiscSectionData,
  RadioSectionData,
  SectionData,
} from '@/types/settingsSection';
import { useMemo, useState } from 'react';
import BigDataDropdown from '../BigDataDropdown';
import DateInput from '../DateInput';
import InputDropdown from '../InputDropdown';
import RadioGroup from '../RadioGroup';
import TextAreaInput from '../TextAreaInput';
import TextInput from '../TextInput';
import { KeyValueBlurb } from './styles';

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
  if (data.value instanceof Array) return data.value.join(', ');
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
    const len =
      data.options instanceof Array ? data.options.length : data.options.size;

    if (data.type === 'multi-select')
      return len > DROPDOWN_LIMIT ? (
        <BigDataDropdown
          label={editorLabel}
          options={data.options}
          pageSize={data.pageSize}
          defaultValue={data.value ?? undefined}
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
          error={!!data.error}
          multi
        />
      );

    return len > DROPDOWN_LIMIT ? (
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
        error={!!data.error}
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
          ((data.type === 'multi-select' && data.value.length === 0) ||
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
