import mock from './validation.mock.json';
import type {
  BodyErrorItem,
  CageNameCopy,
  CageNameFixItem,
  FixHotspot,
  SizeComparisonCopy,
} from '../types/bodyErrors';

export const BODY_ERRORS = mock.bodyErrors as BodyErrorItem[];
export const SIZE_COMPARISON = mock.sizeComparison as SizeComparisonCopy;
export const CAGE_NAME_FIXES = mock.cageNameFixes as CageNameFixItem[];
export const CAGE_NAME_COPY = mock.cageNameCopy as CageNameCopy;
export const FIX_HOTSPOTS = mock.hotspots as FixHotspot[];
export const VALIDATION_ASSETS = mock.assets as {
  foundError: string;
  suggestedFix: string;
};
export const SNACKBAR_DURATION_MS =
  (mock.snackbar as { durationMs: number }).durationMs ?? 4000;
