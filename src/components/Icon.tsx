import React from 'react';
import { IconSvgs, IconType } from '@/lib/icons';

interface Props {
  className?: string;
  type: IconType;
}

const Icon: React.FC<Props> = ({ className, type }: Props) =>
  React.cloneElement(IconSvgs[type], {
    className,
  });

export default Icon;
