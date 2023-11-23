import React from 'react';
import { H2, H3, H4, P } from '@/styles/text';
import {
  EditButton,
  KeyValueBlurb,
  Section,
  SectionHeader,
  SectionRow,
} from './styles';

// types
interface SectionData {
  label: string;
  value: string | string[] | number;
  format?: (v: string | string[] | number) => string;
}

interface SettingsSectionProps {
  title: string;
  data: Array<SectionData | SectionData[] | string>;
}

// helpers
const chooseFormatter = (data: SectionData): string => {
  if (data.format) return data.format(data.value);
  return data.value instanceof Array
    ? data.value.join(', ')
    : data.value.toString();
};

const dataMapper = (data: SectionData | SectionData[] | string) => {
  if (typeof data === 'string') return <H3 key={data}>{data}</H3>;

  if (data instanceof Array)
    return (
      <SectionRow key={data[0].label}>
        {data.map(v => (
          <KeyValueBlurb key={v.label}>
            <H4>{v.label}</H4>
            <P>{chooseFormatter(v)}</P>
          </KeyValueBlurb>
        ))}
      </SectionRow>
    );

  return (
    <KeyValueBlurb key={data.label}>
      <H4>{data.label}</H4>
      <P>{chooseFormatter(data)}</P>
    </KeyValueBlurb>
  );
};

// main component
export default function SettingsSection({ title, data }: SettingsSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <H2>{title}</H2>
        <EditButton />
      </SectionHeader>
      {data.map(dataMapper)}
    </Section>
  );
}
