import React from 'react';

import VamoSvg from '@/assets/images/VAMO.svg';
import { useThemeColor } from '@/hooks/use-theme-color';

export function VamoLogo({ width = 100, height = 40 }: { width?: number; height?: number }) {
  const textColor = useThemeColor({}, 'text');
  return <VamoSvg width={width} height={height} fill={textColor} />;
}