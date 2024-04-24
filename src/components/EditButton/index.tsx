import Link from 'next/link';
import Icon from '@/components/Icon';
import { Flex } from '@/styles/containers';
import { UnstyledButton } from '../Buttons';
import * as Styles from './styles';

export function EditLinkButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Flex $gap="5px">
        <Styles.EditText>Edit</Styles.EditText>
        <Icon type="edit" />
      </Flex>
    </Link>
  );
}

export function EditButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <UnstyledButton onClick={onClick}>
      <Flex $gap="5px">
        <Styles.EditText>Edit</Styles.EditText>
        <Icon type="edit" />
      </Flex>
    </UnstyledButton>
  );
}
