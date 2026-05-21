import { useCallback, useMemo, useState } from 'react';
import { BODY_ERROR_COUNT } from '../data/bodyErrors';
import type {
  FlowScreen,
  HotspotId,
  ModalView,
  StudioSnapshot,
} from '../types/bodyErrors';

const ALL_HOTSPOTS: HotspotId[] = ['head', 'right-shoulder', 'left-shoulder'];

const DEFAULT_SNAPSHOT: StudioSnapshot = {
  setupPrimaryTab: 'Body',
  setupSecondaryTab: 'Head',
  explorerSelection: 'Stargirl_V2',
  propertiesTarget: 'Stargirl_V2',
};

function modalViewFromAccepted(accepted: Set<HotspotId>): ModalView {
  if (accepted.size === 0) return 'errors-suggestions';
  if (accepted.size >= ALL_HOTSPOTS.length) return 'accept-all';
  return 'accept-one';
}

export function useValidationFlow() {
  const [flowScreen, setFlowScreen] = useState<FlowScreen>('main-setup');
  const [acceptedHotspots, setAcceptedHotspots] = useState<Set<HotspotId>>(
    () => new Set(),
  );
  const [fixesApplied, setFixesApplied] = useState(false);
  const [expandedErrorId, setExpandedErrorId] = useState<string>('size-too-big');
  const [snapshot, setSnapshot] = useState<StudioSnapshot>(DEFAULT_SNAPSHOT);

  const modalView = useMemo(
    () => modalViewFromAccepted(acceptedHotspots),
    [acceptedHotspots],
  );

  const openCount = fixesApplied ? 0 : BODY_ERROR_COUNT;

  const openModal = useCallback(() => {
    setSnapshot((s) => ({ ...s }));
    setFlowScreen('modal');
    setExpandedErrorId('size-too-big');
  }, []);

  const closeModal = useCallback(() => {
    setFlowScreen('main-setup');
  }, []);

  const acceptHotspot = useCallback((id: HotspotId) => {
    setAcceptedHotspots((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const acceptAllFixes = useCallback(() => {
    setAcceptedHotspots(new Set(ALL_HOTSPOTS));
    setFixesApplied(true);
    setFlowScreen('main-setup');
  }, []);

  const editManually = useCallback(() => {
    setAcceptedHotspots(new Set());
    setFlowScreen('main-setup');
  }, []);

  const updateSnapshot = useCallback((patch: Partial<StudioSnapshot>) => {
    setSnapshot((prev) => ({ ...prev, ...patch }));
  }, []);

  return {
    flowScreen,
    modalView,
    acceptedHotspots,
    fixesApplied,
    expandedErrorId,
    setExpandedErrorId,
    openCount,
    snapshot,
    openModal,
    closeModal,
    acceptHotspot,
    acceptAllFixes,
    editManually,
    updateSnapshot,
    isHotspotAccepted: (id: HotspotId) => acceptedHotspots.has(id),
  };
}

export type ValidationFlowState = ReturnType<typeof useValidationFlow>;
