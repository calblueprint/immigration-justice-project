import React, { useMemo, useState } from 'react';
import { H2, H3, H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import {
  ButtonContainer,
  EditButton,
  KeyValueBlurb,
  Section,
  SectionHeader,
  SectionRow,
} from './styles';
import Button from '../Button';
import DateInput from '../DateInput';
import BigDataDropdown from '../BigDataDropdown';
import InputDropdown from '../InputDropdown';
import TextInput from '../TextInput';
import { FormTextArea } from '../InterestForm/styles';

// config
const DROPDOWN_LIMIT = 20;

// types
interface CommonSectionData {
  label: string;
  placeholder?: string;
}

interface MiscSectionData extends CommonSectionData {
  type: 'text' | 'textarea' | 'date';
  value: string;
  format?: (v: string) => string;
}

interface CommonDropdownSectionData extends CommonSectionData {
  type: 'dropdown';
  options: Set<string> | Map<string, string>;
  pageSize?: number;
}

interface MultiDropdownSectionData extends CommonDropdownSectionData {
  multi: true;
  value: Set<string>;
  format?: (v: Set<string>) => string;
}

interface SingleDropdownSectionData extends CommonDropdownSectionData {
  multi?: false;
  value: string | null;
  format?: (v: string | null) => string;
}

type SectionData =
  | SingleDropdownSectionData
  | MultiDropdownSectionData
  | MiscSectionData;

interface SettingsSectionProps {
  title: string;
  data: readonly (SectionData | SectionData[] | string)[];
  editable?: boolean;
  onChange?: (newValue: Array<SectionData | SectionData[] | string>) => void;
}

// helpers
const chooseFormatter = (data: SectionData): string => {
  if (data.format) {
    if (data.type !== 'dropdown') return data.format(data.value);
    return data.multi ? data.format(data.value) : data.format(data.value); // fuck typescript
  }
  if (data.value instanceof Set) return Array.from(data.value).join(', ');
  return data.value || '';
};

function MiscEditor({
  data,
  onChange,
}: {
  data: MiscSectionData;
  onChange: (nv: string) => void;
}) {
  const [val, setVal] = useState(data.value);

  if (data.type === 'text')
    return (
      <TextInput
        label={data.label}
        value={val}
        setValue={setVal}
        placeholder={data.placeholder}
        onChange={onChange}
      />
    );

  return data.type === 'date' ? (
    <DateInput
      label={data.label}
      value={val}
      setValue={setVal}
      onChange={onChange}
    />
  ) : (
    <FormTextArea />
  );
}

function DataField({
  data,
  editing,
  onChange,
}: {
  data: SectionData;
  editing: boolean;
  onChange: (nd: SectionData) => void;
}) {
  const editor = useMemo(() => {
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
          label={data.label}
          options={data.options}
          pageSize={data.pageSize}
          defaultValue={data.value}
          onChange={nv => onChange({ ...data, value: nv })}
          multi
        />
      ) : (
        <InputDropdown
          label={data.label}
          options={data.options}
          defaultValue={data.value}
          onChange={nv => onChange({ ...data, value: nv })}
          multi
        />
      );
    return data.options.size > DROPDOWN_LIMIT ? (
      <BigDataDropdown
        label={data.label}
        options={data.options}
        pageSize={data.pageSize}
        defaultValue={data.value || undefined}
        onChange={nv => onChange({ ...data, value: nv })}
      />
    ) : (
      <InputDropdown
        label={data.label}
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
          <H4>{data.label}</H4>
          <P>{chooseFormatter(data)}</P>
        </>
      )}
    </KeyValueBlurb>
  );
}

// main component
export default function SettingsSection({
  title,
  data,
  editable,
  onChange,
}: SettingsSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [storedData, setStoredData] = useState<
    Array<SectionData | SectionData[] | string>
  >([...data]);

  const renderedData = useMemo(
    () =>
      storedData.map((dataValue, idx) => {
        const handleDataChange = (nd: SectionData) => {
          const copy = [...storedData];
          copy[idx] = nd;
          setStoredData(copy);
        };

        if (typeof dataValue === 'string')
          return <H3 key={dataValue}>{dataValue}</H3>;

        if (dataValue instanceof Array)
          return (
            <SectionRow key={`*${dataValue[0].label}`}>
              {dataValue.map((v, i) => {
                const handleSubFieldChange = (nd: SectionData) => {
                  const copy = [...storedData];
                  const d = copy[idx];
                  if (d instanceof Array) {
                    const copyd = [...d];
                    copyd[i] = nd;
                    copy[idx] = copyd;
                    setStoredData(copy);
                  }
                };
                return (
                  <DataField
                    key={v.label}
                    data={v}
                    editing={isEditing}
                    onChange={handleSubFieldChange}
                  />
                );
              })}
            </SectionRow>
          );

        return (
          <DataField
            key={dataValue.label}
            data={dataValue}
            editing={isEditing}
            onChange={(nd: SectionData) => handleDataChange(nd)}
          />
        );
      }),
    [storedData, isEditing],
  );

  return (
    <Section>
      <SectionHeader>
        <H2>{title}</H2>
        {editable && <EditButton onClick={() => setIsEditing(!isEditing)} />}
      </SectionHeader>
      {renderedData}
      {isEditing && (
        <ButtonContainer>
          <Button
            $secondaryColor={COLORS.redMid}
            onClick={() => {
              setStoredData([...data]);
              setIsEditing(false);
            }}
          >
            Discard Changes
          </Button>
          <Button
            $primaryColor={COLORS.blueMid}
            $secondaryColor={COLORS.blueDark}
            onClick={() => {
              onChange?.(storedData);
              setIsEditing(false);
            }}
          >
            Save Changes
          </Button>
        </ButtonContainer>
      )}
    </Section>
  );
}
