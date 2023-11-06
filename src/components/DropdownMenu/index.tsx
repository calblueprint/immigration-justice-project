import { ReactNode } from 'react';
import { DropdownItem, MenuContainer } from './styles';

interface DropdownMenuProps extends React.ComponentPropsWithoutRef<'div'> {
  show: boolean;
  children: ReactNode;
}

export default function DropdownMenu({ show, children }: DropdownMenuProps) {
  return <MenuContainer $show={show}>{children}</MenuContainer>;
}

DropdownMenu.Item = DropdownItem;
