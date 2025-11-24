export interface IUiState {
  globalLoading: boolean;
  globalError: string | null;
  showAdviseModal: boolean;
}

export const UI_INITIAL_STATE: IUiState = {
  globalLoading: false,
  globalError: null,
  showAdviseModal: false,
};