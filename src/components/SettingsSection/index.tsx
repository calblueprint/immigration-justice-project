import React, { useCallback, useMemo, useState } from 'react';
import { H2, H3 } from '@/styles/text';
import COLORS from '@/styles/colors';
import { SectionData, SettingsSectionData } from '@/types/settingsSection';
import {
  ButtonContainer,
  EditButton,
  Section,
  SectionHeader,
  SectionRow,
} from './styles';
import Button from '../Button';
import DataField from './DataField';

interface SettingsSectionProps {
  title: string;
  data: SettingsSectionData;
  editable?: boolean;
  onChange?: (newValue: Array<SectionData | SectionData[] | string>) => void;
}

// helpers
const validateData = (v: SectionData) => {
  let errorMsg = '';
  if (v.validate) {
    if (v.type !== 'dropdown') errorMsg = v.validate(v.value);
    else errorMsg = v.multi ? v.validate(v.value) : v.validate(v.value);
  }
  return errorMsg;
};

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

  const handleSaveChanges = useCallback(() => {
    let hasError = false;
    const copy = [...storedData];

    // validate data
    copy.map(dataValue => {
      if (typeof dataValue === 'string') return dataValue;

      if (dataValue instanceof Array) {
        const copyArr = [...dataValue];

        copyArr.map(v => {
          const errorMsg = validateData(v);
          hasError = errorMsg !== '';
          return errorMsg ? { ...v, error: errorMsg } : v;
        });

        return copyArr;
      }

      const errorMsg = validateData(dataValue);
      hasError = errorMsg !== '';
      return errorMsg ? { ...dataValue, error: errorMsg } : dataValue;
    });

    if (!hasError) {
      onChange?.(storedData);
      setIsEditing(false);
    } else {
      setStoredData(copy);
    }
  }, [onChange, storedData]);

  return (
    <Section>
      <SectionHeader>
        <H2>{title}</H2>
        {editable && !isEditing && (
          <EditButton onClick={() => setIsEditing(true)} />
        )}
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
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </ButtonContainer>
      )}
    </Section>
  );
}
