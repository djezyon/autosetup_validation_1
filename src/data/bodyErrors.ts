import mock from './validation.mock.json';
import type { BodyErrorItem, FixHotspot, SizeComparisonCopy } from '../types/bodyErrors';

export const BODY_ERRORS = mock.bodyErrors as BodyErrorItem[];
export const SIZE_COMPARISON = mock.sizeComparison as SizeComparisonCopy;
export const FIX_HOTSPOTS = mock.hotspots as FixHotspot[];
export const VALIDATION_ASSETS = mock.assets as {
  foundError: string;
  suggestedFix: string;
};

export const BODY_ERROR_COUNT = BODY_ERRORS.length;
