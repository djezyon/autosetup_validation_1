import type { ValidationIssue } from '../types/validation';

/** Sample issues from the Roxy.fbx Auto-Setup study (Apr 2026). */
export const ROXY_VALIDATION_ISSUES: ValidationIssue[] = [
  {
    id: 'head-schema',
    technical: "Body part 'Head' does not follow R15 schema",
    part: 'Roxie.Head',
    severity: 'warning',
    category: 'R15 body structure',
  },
  {
    id: 'face-front',
    technical:
      'Could not find required Attachment called FaceFrontAttachment inside of Roxie.Head',
    part: 'Roxie.Head',
    severity: 'warning',
    category: 'Head attachments',
  },
  {
    id: 'hat',
    technical:
      'Could not find required Attachment called HatAttachment inside of Roxie.Head',
    part: 'Roxie.Head',
    severity: 'warning',
    category: 'Head attachments',
  },
  {
    id: 'hair',
    technical:
      'Could not find required Attachment called HairAttachment inside of Roxie.Head',
    part: 'Roxie.Head',
    severity: 'warning',
    category: 'Head attachments',
  },
  {
    id: 'face-center',
    technical:
      'Could not find required Attachment called FaceCenterAttachment inside of Roxie.Head',
    part: 'Roxie.Head',
    severity: 'warning',
    category: 'Head attachments',
  },
  {
    id: 'face-top',
    technical:
      'Could not find required Attachment called FaceTopAttachment inside of Roxie.Head',
    part: 'Roxie.Head',
    severity: 'warning',
    category: 'Head attachments',
  },
  {
    id: 'neck',
    technical:
      'Could not find required Attachment called NeckAttachment inside of Roxie.Head',
    part: 'Roxie.Head',
    severity: 'warning',
    category: 'Head attachments',
  },
  {
    id: 'upper-torso-schema',
    technical: "Body part 'UpperTorso' does not follow R15 schema",
    part: 'Roxie.UpperTorso',
    severity: 'warning',
    category: 'R15 body structure',
  },
  {
    id: 'lower-torso-schema',
    technical: "Body part 'LowerTorso' does not follow R15 schema",
    part: 'Roxie.LowerTorso',
    severity: 'warning',
    category: 'R15 body structure',
  },
  {
    id: 'left-upper-arm',
    technical:
      'Could not find required Attachment called LeftShoulderAttachment inside of Roxie.UpperTorso',
    part: 'Roxie.UpperTorso',
    severity: 'warning',
    category: 'Torso attachments',
  },
  {
    id: 'right-upper-arm',
    technical:
      'Could not find required Attachment called RightShoulderAttachment inside of Roxie.UpperTorso',
    part: 'Roxie.UpperTorso',
    severity: 'warning',
    category: 'Torso attachments',
  },
  {
    id: 'waist',
    technical:
      'Could not find required Attachment called WaistCenterAttachment inside of Roxie.LowerTorso',
    part: 'Roxie.LowerTorso',
    severity: 'warning',
    category: 'Torso attachments',
  },
];
