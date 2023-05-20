import { create } from 'zustand';

export interface ModalStoreInterface {
  trailerName?: string;
  trailerId?: string;
  isOpen: boolean;
  openModal: (trailerId: string) => void;
  closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>(set => ({
  trailerId: undefined,
  isOpen: false,
  openModal: (trailerId: string) => set({ isOpen: true, trailerId }),
  closeModal: () => set({ isOpen: false, trailerId: undefined })
}));

export default useInfoModalStore;
