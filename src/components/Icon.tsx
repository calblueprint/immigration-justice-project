import { IconSvgs, IconType } from '@/lib/icons';
import React from 'react';

interface Props {
  className?: string;
  type: IconType;
}

const Icon: React.FC<Props> = ({ className, type }: Props) =>
  React.cloneElement(IconSvgs[type], {
    className,
  });

export default Icon;
