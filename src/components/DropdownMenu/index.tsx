import { ReactNode } from 'react';
import { DropdownItem, MenuContainer } from './styles';

export default function DropdownMenu({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) {
  return <MenuContainer $show={show}>{children}</MenuContainer>;
}

DropdownMenu.Item = DropdownItem;
