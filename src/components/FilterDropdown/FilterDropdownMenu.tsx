import { ReactNode, useEffect, useRef } from 'react';
import { FilterDropdownMenuBox } from './styles';

export default function FilterDropdownMenu({
  closeMenu,
  children,
}: {
  closeMenu: () => void;
  children: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);

  // mount closing action
  useEffect(() => {
    document.addEventListener('click', closeMenu, { once: true });
  }, [closeMenu]);

  return <FilterDropdownMenuBox ref={box}>{children}</FilterDropdownMenuBox>;
}
