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
    function globalClickEvent(e: Event) {
      if (box.current && box.current.contains(e.target as Node)) return;
      closeMenu();
      document.removeEventListener('click', globalClickEvent);
    }

    document.addEventListener('click', globalClickEvent);
  }, [closeMenu]);

  return <FilterDropdownMenuBox ref={box}>{children}</FilterDropdownMenuBox>;
}
