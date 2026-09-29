import { useSyncExternalStore } from 'react';

export type CardViewMode = '2d' | '3d';

const KEY = 'cubequick_card_view_v1';
const listeners = new Set<() => void>();

function read(): CardViewMode {
  try {
    return localStorage.getItem(KEY) === '3d' ? '3d' : '2d';
  } catch {
    return '2d';
  }
}

let current: CardViewMode = read();

export function setCardViewMode(mode: CardViewMode) {
  current = mode;
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    // bỏ qua nếu bị chặn lưu
  }
  listeners.forEach(l => l());
}

/** Chế độ hiển thị các thẻ case (2D / 3D), dùng chung mọi màn hình và nhớ qua lần mở sau. */
export function useCardViewMode(): CardViewMode {
  return useSyncExternalStore(
    cb => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current
  );
}
