import { SectionData, SettingsSectionData } from '@/types/settingsSection';
import React, { useEffect, useState } from 'react';
import DataField from './DataField';
import { SectionRow } from './styles';

export default function SectionPartial({
  data,
  onChange,
  isEditing = false,
}: {
  data: SettingsSectionData;
  onChange?: (nd: SettingsSectionData) => void;
  isEditing?: boolean;
}) {
  const [storedData, setStoredData] = useState(data);

  useEffect(() => {
    setStoredData(data);
  }, [data]);

  return (
    <>
      {storedData.map((dataValue, idx) => {
        const handleDataChange = (nd: SectionData) => {
          const copy = [...storedData];
          copy[idx] = nd;
          setStoredData(copy);
          onChange?.(copy);
        };

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
                    onChange?.(copy);
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
      })}
    </>
  );
}
