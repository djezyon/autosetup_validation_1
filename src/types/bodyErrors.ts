export type FlowScreen = 'main-setup' | 'modal';

export type ModalView = 'errors-suggestions' | 'accept-one' | 'accept-all';

export type HotspotId = 'head' | 'right-shoulder' | 'left-shoulder';

export type ErrorPanelType = 'size-comparison' | 'rename-table';

export interface FixHotspot {
  id: HotspotId;
  label: string;
  /** Used in snackbar: Size_{snackbarName} is fixed */
  snackbarName: string;
  top: string;
  left: string;
}

export interface BodyErrorItem {
  id: string;
  title: string;
  subtitle: string;
  panel: ErrorPanelType;
}

export interface OpenBodyError extends BodyErrorItem {
  displayIndex: number;
}

export interface CageNameFixItem {
  id: string;
  found: string;
  foundChip: string;
  suggested: string;
  suggestedChip: string;
}

export interface CageNameCopy {
  errorHeadline: string;
  errorBody: string;
  fixHeadline: string;
  fixBody: string;
}

export interface SizeComparisonCopy {
  errorHeadline: string;
  errorBody: string;
  fixHeadline: string;
  fixBody: string;
}

export interface StudioSnapshot {
  setupPrimaryTab: string;
  setupSecondaryTab: string;
  explorerSelection: string;
  propertiesTarget: string;
}
