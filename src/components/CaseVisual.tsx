import React from 'react';
import { AlgorithmCase } from '../types';
import { CubeSvg } from './CubeSvg';
import { CubeIso } from './CubeIso';
import { useCardViewMode } from '../utils/viewMode';

interface Props {
  caseData: AlgorithmCase;
  size?: number;
  showArrows?: boolean;
}

/** Hình của một case theo chế độ 2D/3D người dùng đang chọn (mặc định 2D). */
export const CaseVisual: React.FC<Props> = ({ caseData, size = 120, showArrows = true }) => {
  const mode = useCardViewMode();
  if (mode === '3d' && caseData.simulatable !== false) return <CubeIso caseData={caseData} size={size} />;
  return <CubeSvg caseData={caseData} size={size} showArrows={showArrows} />;
};
