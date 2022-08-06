import create from 'zustand';

export type ModalData = any | null;
export type ModalStates = {
  isOpen: boolean;
  data: ModalData;
};

type ModalActions = {
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export type ModalStoreTypes = ModalStates & ModalActions;

const initialState: ModalStates = {
  isOpen: false,
  data: null,
}

const useModalStore = create((set, get) => ({
  ...initialState,
  openModal: (data: ModalData) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}));

export default useModalStore;
