import create from 'zustand';

export type Page = 0 | 1 | 2;
export type PageStates = {
  page: Page;
  activePage: -1 | Page;
}

type PageActions = {
  setPage: (page: Page) => void;
  setActivePage: (willActivePage: -1 | Page) => void;
}

export type PageStoreTypes = PageStates & PageActions;

const initialState: PageStates = {
  page: 0,
  activePage: -1,
}

const usePageStore = create((set, get) => ({
  ...initialState,
  setPage: (page: Page) => set({ page }),
  setActivePage: (willActivePage: -1 | Page) => set({ activePage: willActivePage })
}));

export default usePageStore;
