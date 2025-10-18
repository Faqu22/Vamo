import React from 'react';

import { ThemedText } from '@/components/themed-text';

export function VamoLogo({ width = 100, height = 40 }: { width?: number; height?: number }) {
  return <ThemedText type="subtitle">Vamo</ThemedText>;
}