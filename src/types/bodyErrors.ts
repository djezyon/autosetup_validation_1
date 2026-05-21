export type FlowScreen = 'main-setup' | 'modal';

export type ModalView = 'errors-suggestions' | 'accept-one' | 'accept-all';

export type HotspotId = 'head' | 'right-shoulder' | 'left-shoulder';

export interface FixHotspot {
  id: HotspotId;
  label: string;
  /** Percent-based position on suggested-fix preview */
  top: string;
  left: string;
}

export interface BodyErrorItem {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  hasComparison: boolean;
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
