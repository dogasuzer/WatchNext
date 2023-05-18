import { create } from 'zustand';

export interface ScrollStoreInterface {
  scrollDestination?: string;
  setScroll: (scrollDestination: string) => void;
}

const useScrollStore = create<ScrollStoreInterface>(set => ({
  scrollDestination: undefined,
  setScroll: (scrollDestination: string) => set({ scrollDestination })
}));

export default useScrollStore;
