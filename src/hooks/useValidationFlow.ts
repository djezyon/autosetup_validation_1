import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BODY_ERRORS,
  CAGE_NAME_FIXES,
  FIX_HOTSPOTS,
  SNACKBAR_DURATION_MS,
} from '../data/bodyErrors';
import type {
  FlowScreen,
  HotspotId,
  ModalView,
  OpenBodyError,
  StudioSnapshot,
} from '../types/bodyErrors';

const SIZE_ERROR_ID = 'size-too-big';
const CAGE_ERROR_ID = 'cage-names';
const ALL_HOTSPOT_IDS = FIX_HOTSPOTS.map((h) => h.id);
const ALL_CAGE_FIX_IDS = CAGE_NAME_FIXES.map((f) => f.id);

const DEFAULT_SNAPSHOT: StudioSnapshot = {
  setupPrimaryTab: 'Body',
  setupSecondaryTab: 'Head',
  explorerSelection: 'Stargirl_V2',
  propertiesTarget: 'Stargirl_V2',
};

function itemSnackbarMessage(errorTitle: string, itemName: string) {
  return `${errorTitle}_${itemName} is fixed`;
}

function errorSnackbarMessage(errorTitle: string) {
  return `${errorTitle} is fixed`;
}

function modalViewFromSizeAccepted(accepted: Set<HotspotId>): ModalView {
  if (accepted.size === 0) return 'errors-suggestions';
  if (accepted.size >= ALL_HOTSPOT_IDS.length) return 'accept-all';
  return 'accept-one';
}

function getAllItemIdsForError(errorId: string): string[] {
  if (errorId === SIZE_ERROR_ID) return ALL_HOTSPOT_IDS;
  if (errorId === CAGE_ERROR_ID) return ALL_CAGE_FIX_IDS;
  return [];
}

export function useValidationFlow() {
  const [flowScreen, setFlowScreen] = useState<FlowScreen>('main-setup');
  const [resolvedErrorIds, setResolvedErrorIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [acceptedItems, setAcceptedItems] = useState<Record<string, Set<string>>>(
    {},
  );
  const [expandedErrorId, setExpandedErrorId] = useState<string>(SIZE_ERROR_ID);
  const [snapshot, setSnapshot] = useState<StudioSnapshot>(DEFAULT_SNAPSHOT);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const openErrors: OpenBodyError[] = useMemo(
    () =>
      BODY_ERRORS.filter((e) => !resolvedErrorIds.has(e.id)).map((e, i) => ({
        ...e,
        displayIndex: i + 1,
      })),
    [resolvedErrorIds],
  );

  const openCount = openErrors.length;

  const sizeAccepted = useMemo(
    () => acceptedItems[SIZE_ERROR_ID] ?? new Set<string>(),
    [acceptedItems],
  );

  const cageAccepted = useMemo(
    () => acceptedItems[CAGE_ERROR_ID] ?? new Set<string>(),
    [acceptedItems],
  );

  const modalView = useMemo(
    () => modalViewFromSizeAccepted(new Set(Array.from(sizeAccepted) as HotspotId[])),
    [sizeAccepted],
  );

  const showSnackbar = useCallback((message: string) => {
    setSnackbarMessage(message);
  }, []);

  useEffect(() => {
    if (!snackbarMessage) return;
    const t = window.setTimeout(
      () => setSnackbarMessage(null),
      SNACKBAR_DURATION_MS,
    );
    return () => window.clearTimeout(t);
  }, [snackbarMessage]);

  const resolveError = useCallback(
    (errorId: string, errorTitle: string) => {
      showSnackbar(errorSnackbarMessage(errorTitle));
      setResolvedErrorIds((prev) => {
        const next = new Set([...prev, errorId]);
        const remaining = BODY_ERRORS.filter((e) => !next.has(e.id));
        if (remaining.length === 0) {
          setFlowScreen('main-setup');
        } else {
          setExpandedErrorId((current) =>
            current === errorId ? remaining[0].id : current,
          );
        }
        return next;
      });
    },
    [showSnackbar],
  );

  const openModal = useCallback(() => {
    setSnapshot((s) => ({ ...s }));
    setFlowScreen('modal');
    const firstOpen = BODY_ERRORS.find((e) => !resolvedErrorIds.has(e.id));
    setExpandedErrorId(firstOpen?.id ?? '');
  }, [resolvedErrorIds]);

  const closeModal = useCallback(() => {
    setFlowScreen('main-setup');
  }, []);

  const acceptHotspot = useCallback(
    (id: HotspotId) => {
      const hotspot = FIX_HOTSPOTS.find((h) => h.id === id);
      const sizeError = BODY_ERRORS.find((e) => e.id === SIZE_ERROR_ID);
      if (!hotspot || !sizeError) return;

      setAcceptedItems((prev) => {
        const current = prev[SIZE_ERROR_ID] ?? new Set<string>();
        if (current.has(id)) return prev;
        const next = new Set([...current, id]);
        showSnackbar(itemSnackbarMessage(sizeError.title, hotspot.snackbarName));
        if (next.size >= ALL_HOTSPOT_IDS.length) {
          queueMicrotask(() => resolveError(SIZE_ERROR_ID, sizeError.title));
        }
        return { ...prev, [SIZE_ERROR_ID]: next };
      });
    },
    [showSnackbar, resolveError],
  );

  const acceptAllForError = useCallback(
    (errorId: string) => {
      const error = BODY_ERRORS.find((e) => e.id === errorId);
      if (!error) return;

      const allIds = getAllItemIdsForError(errorId);
      setAcceptedItems((prev) => ({
        ...prev,
        [errorId]: new Set(allIds),
      }));
      resolveError(errorId, error.title);
    },
    [resolveError],
  );

  const toggleCageFix = useCallback(
    (itemId: string) => {
      const error = BODY_ERRORS.find((e) => e.id === CAGE_ERROR_ID);
      const fix = CAGE_NAME_FIXES.find((f) => f.id === itemId);
      if (!error || !fix) return;

      const current = acceptedItems[CAGE_ERROR_ID] ?? new Set<string>();
      if (current.has(itemId)) {
        setAcceptedItems((prev) => {
          const next = new Set(prev[CAGE_ERROR_ID] ?? []);
          next.delete(itemId);
          return { ...prev, [CAGE_ERROR_ID]: next };
        });
        return;
      }

      setAcceptedItems((prev) => {
        const next = new Set([...(prev[CAGE_ERROR_ID] ?? []), itemId]);
        showSnackbar(itemSnackbarMessage(error.title, fix.suggested));
        if (next.size >= ALL_CAGE_FIX_IDS.length) {
          queueMicrotask(() => resolveError(CAGE_ERROR_ID, error.title));
        }
        return { ...prev, [CAGE_ERROR_ID]: next };
      });
    },
    [acceptedItems, showSnackbar, resolveError],
  );

  const editManually = useCallback(() => {
    setFlowScreen('main-setup');
  }, []);

  const updateSnapshot = useCallback((patch: Partial<StudioSnapshot>) => {
    setSnapshot((prev) => ({ ...prev, ...patch }));
  }, []);

  const isItemAccepted = useCallback(
    (errorId: string, itemId: string) =>
      acceptedItems[errorId]?.has(itemId) ?? false,
    [acceptedItems],
  );

  const isHotspotAccepted = useCallback(
    (id: HotspotId) => sizeAccepted.has(id),
    [sizeAccepted],
  );

  return {
    flowScreen,
    modalView,
    openErrors,
    openCount,
    resolvedErrorIds,
    acceptedItems,
    sizeAccepted,
    cageAccepted,
    expandedErrorId,
    setExpandedErrorId,
    snapshot,
    snackbarMessage,
    openModal,
    closeModal,
    acceptHotspot,
    acceptAllForError,
    toggleCageFix,
    editManually,
    updateSnapshot,
    isItemAccepted,
    isHotspotAccepted,
    /** @deprecated use acceptAllForError('size-too-big') */
    acceptAllFixes: () => acceptAllForError(SIZE_ERROR_ID),
    acceptedHotspots: sizeAccepted,
  };
}

export type ValidationFlowState = ReturnType<typeof useValidationFlow>;
