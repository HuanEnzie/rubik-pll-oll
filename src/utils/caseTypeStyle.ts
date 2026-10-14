import { CaseType } from '../types';

/** Màu nhãn loại case (OLL vàng, PLL xanh dương, ZBLS xanh ngọc, ZBLL tím). */
export const TYPE_BADGE: Record<CaseType, string> = {
  OLL: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  PLL: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  ZBLS: 'bg-teal-500/15 text-teal-300 border border-teal-500/30',
  ZBLL: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
};
