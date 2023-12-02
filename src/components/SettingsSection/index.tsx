import React, { useCallback, useEffect, useState } from 'react';
import { H2, H3 } from '@/styles/text';
import COLORS from '@/styles/colors';
import {
  SectionData,
  SettingsSectionData,
  SubSectionData,
} from '@/types/settingsSection';
import { ButtonContainer, EditButton, Section, SectionHeader } from './styles';
import Button from '../Button';
import SectionPartial from './SectionPartial';

interface SettingsSectionProps {
  title: string;
  data: SettingsSectionData;
  subsections?: SubSectionData[];
  editable?: boolean;
  onSave?: (newValue: Array<SectionData | SectionData[]>) => void;
  onSubSectionSave?: (newSubs: SubSectionData[]) => void;
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

const validateSettingsSection = (data: SettingsSectionData) => {
  let hasError = false;

  // validate data
  const copy = [...data].map(dataValue => {
    if (dataValue instanceof Array) {
      const copyArr = [...dataValue].map(v => {
        const errorMsg = validateData(v);
        if (errorMsg !== '') hasError = true;
        return errorMsg ? { ...v, error: errorMsg } : v;
      });

      return copyArr;
    }

    const errorMsg = validateData(dataValue);
    if (errorMsg !== '') hasError = true;
    return errorMsg ? { ...dataValue, error: errorMsg } : dataValue;
  });

  return { hasError, copy };
};

// main component
export default function SettingsSection({
  title,
  data,
  editable,
  subsections,
  onSave,
  onSubSectionSave,
}: SettingsSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [storedData, setStoredData] = useState<SettingsSectionData>([...data]);
  const [storedSubsections, setStoredSusbections] = useState<SubSectionData[]>(
    subsections ? [...subsections] : [],
  );

  useEffect(() => {
    setStoredData([...data]);
  }, [data]);

  useEffect(() => {
    setStoredSusbections(subsections ? [...subsections] : []);
  }, [subsections]);

  const subVisible = useCallback(
    (sub: SubSectionData) =>
      storedData
        .flatMap(d => d)
        .find(d =>
          d.label === sub.linkLabel && d.value instanceof Set
            ? d.value.has(sub.linkValue)
            : d.value === sub.linkValue,
        ),
    [storedData],
  );

  const handleSaveChanges = useCallback(() => {
    let hasError = false;

    // validate data
    const { hasError: sectionErrored, copy: sectionCopy } =
      validateSettingsSection(storedData);
    if (sectionErrored) hasError = true;

    // validate subsections
    const subc = (storedSubsections ? [...storedSubsections] : []).map(sub => {
      const { hasError: subErrored, copy: subCopy } = validateSettingsSection(
        sub.data,
      );
      if (subErrored && subVisible(sub)) hasError = true;
      return { ...sub, data: subCopy };
    });

    if (!hasError) {
      onSave?.(storedData);
      onSubSectionSave?.(storedSubsections);
      setIsEditing(false);
    } else {
      setStoredData(sectionCopy);
      setStoredSusbections(subc);
    }
  }, [onSave, storedData, onSubSectionSave, storedSubsections, subVisible]);

  return (
    <Section>
      <SectionHeader>
        <H2>{title}</H2>
        {editable && !isEditing && (
          <EditButton onClick={() => setIsEditing(true)} />
        )}
      </SectionHeader>
      <SectionPartial
        data={storedData}
        onChange={nd => setStoredData(nd)}
        isEditing={isEditing}
      />
      {storedSubsections?.map((sub, idx) => {
        const handleSubChange = (nd: SettingsSectionData) => {
          const copy = [...storedSubsections];
          copy[idx] = { ...sub, data: nd };
          setStoredSusbections(copy);
        };

        return (
          subVisible(sub) && (
            <React.Fragment key={sub.title}>
              <H3>{sub.title}</H3>
              <SectionPartial
                data={sub.data}
                onChange={handleSubChange}
                isEditing={isEditing}
              />
            </React.Fragment>
          )
        );
      })}
      {isEditing && (
        <ButtonContainer>
          <Button
            $secondaryColor={COLORS.redMid}
            onClick={() => {
              setStoredData([...data]);
              setStoredSusbections(
                subsections ? [...subsections.map(d => ({ ...d }))] : [],
              );
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
