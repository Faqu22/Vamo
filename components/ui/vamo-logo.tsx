import React from 'react';

import VamoSvg from '../../assets/images/VAMO.svg';

export function VamoLogo({ width = 100, height = 40 }: { width?: number; height?: number }) {
  return <VamoSvg width={width} height={height} />;
}