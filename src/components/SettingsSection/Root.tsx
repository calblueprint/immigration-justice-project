import { useState } from 'react';
import { Flex } from '@/styles/containers';
import { H2 } from '@/styles/text';
import { EditButton } from '../EditButton';
import * as Styles from './styles';

interface BasicRootProps {
  viewMode: React.ReactNode;
  label: string;
}

interface EditableRootProps extends BasicRootProps {
  canEdit: true;
  editMode: React.ReactNode;
}

interface NonEditableRootProps extends BasicRootProps {
  canEdit?: false;
  editMode?: never;
}

type RootProps = EditableRootProps | NonEditableRootProps;

export function Root({ viewMode, editMode, canEdit, label }: RootProps) {
  const [editing, setEditing] = useState(false);

  return (
    <Styles.SectionContainer>
      <Flex $justify="between">
        <H2>{label}</H2>
        {canEdit ? (
          <EditButton onClick={() => setEditing(prev => !prev)} />
        ) : null}
      </Flex>
      {editing ? editMode : viewMode}
    </Styles.SectionContainer>
  );
}
