import type { ErrorStatus, HumanizedIssue, ValidationIssue } from '../types/validation';

interface TranslationRule {
  match: RegExp;
  title: string;
  summary: string;
  whyItMatters: string;
  howToFix: string;
  blocking: boolean;
  docSlug: string;
}

const RULES: TranslationRule[] = [
  {
    match: /does not follow R15 schema/i,
    title: 'Body part is not set up for R15 avatars',
    summary:
      'This mesh part is not named or structured the way Roblox expects for playable characters.',
    whyItMatters:
      'R15 is the standard avatar rig. Without it, accessories, animations, and publishing may fail.',
    howToFix:
      'Rename parts to match R15 names (Head, UpperTorso, etc.) or re-import using Auto-Setup so parts are mapped automatically.',
    blocking: false,
    docSlug: 'r15-body-structure',
  },
  {
    match: /FaceFrontAttachment/i,
    title: 'Missing face placement point',
    summary: 'Your head is missing the attachment used to position the face on the avatar.',
    whyItMatters: 'Without it, dynamic heads and some face accessories cannot align correctly.',
    howToFix:
      'Add a FaceFrontAttachment to the Head mesh in your 3D tool, or run Auto-Setup rigging to generate standard head attachments.',
    blocking: false,
    docSlug: 'head-attachments',
  },
  {
    match: /HatAttachment/i,
    title: 'Missing hat placement point',
    summary: 'The head needs a HatAttachment so hats and hair items can sit in the right place.',
    whyItMatters: 'UGC hats snap to this point. Missing it causes floating or misaligned accessories.',
    howToFix:
      'Add HatAttachment to the Head at the crown, or use the head attachment template from the avatar docs.',
    blocking: false,
    docSlug: 'head-attachments',
  },
  {
    match: /HairAttachment/i,
    title: 'Missing hair placement point',
    summary: 'Hair and wigs attach here. Your head does not have this point yet.',
    whyItMatters: 'Hair UGC will not align with the avatar until this attachment exists.',
    howToFix:
      'Add HairAttachment slightly above the hat point on the Head mesh, following the R15 head template.',
    blocking: false,
    docSlug: 'head-attachments',
  },
  {
    match: /FaceCenterAttachment|FaceTopAttachment/i,
    title: 'Missing face alignment points',
    summary: 'Additional head attachments are required for face features and layering.',
    whyItMatters:
      'Makeup, decals, and layered face items rely on these points for correct positioning.',
    howToFix:
      'Add the missing face attachments to Head using the R15 reference rig, then re-run validation.',
    blocking: false,
    docSlug: 'head-attachments',
  },
  {
    match: /NeckAttachment/i,
    title: 'Missing neck connection point',
    summary: 'The head should connect to the torso through a NeckAttachment.',
    whyItMatters: 'Neck accessories and some animation blends expect this joint to exist.',
    howToFix:
      'Place NeckAttachment at the base of the head mesh where it meets the neck opening.',
    blocking: false,
    docSlug: 'head-attachments',
  },
  {
    match: /ShoulderAttachment/i,
    title: 'Missing shoulder connection point',
    summary: 'Arms connect to the torso through shoulder attachments on UpperTorso.',
    whyItMatters: 'Without them, arm movement and shoulder accessories may break.',
    howToFix:
      'Add LeftShoulderAttachment and RightShoulderAttachment on UpperTorso at the shoulder sockets.',
    blocking: false,
    docSlug: 'torso-attachments',
  },
  {
    match: /WaistCenterAttachment/i,
    title: 'Missing waist placement point',
    summary: 'Pants and waist accessories attach at WaistCenterAttachment on LowerTorso.',
    whyItMatters: 'Clothing at the waist will not fit correctly until this point exists.',
    howToFix:
      'Add WaistCenterAttachment at the belt line on LowerTorso per the R15 template.',
    blocking: false,
    docSlug: 'torso-attachments',
  },
  {
    match: /Could not find required Attachment/i,
    title: 'Missing required attachment',
    summary: 'A standard attachment point is missing from this body part.',
    whyItMatters:
      'Attachments tell Roblox where accessories and layered items should snap on your avatar.',
    howToFix:
      'Open the avatar attachment guide, add the named attachment to the listed part, then re-run validation.',
    blocking: false,
    docSlug: 'attachments-overview',
  },
];

const DOC_BASE = 'https://create.roblox.com/docs/art/characters';

function translate(issue: ValidationIssue): Omit<HumanizedIssue, 'status'> {
  const rule =
    RULES.find((r) => r.match.test(issue.technical)) ??
    ({
      match: /.*/,
      title: 'Validation issue needs review',
      summary: issue.technical,
      whyItMatters:
        'This may affect how your avatar behaves in Studio or when published.',
      howToFix:
        'Check the technical detail below and search the avatar setup docs for this message.',
      blocking: false,
      docSlug: 'import',
    } satisfies TranslationRule);

  return {
    ...issue,
    title: rule.title,
    summary: rule.summary,
    whyItMatters: rule.whyItMatters,
    howToFix: rule.howToFix,
    blocking: rule.blocking,
    docUrl: `${DOC_BASE}/${rule.docSlug}`,
  };
}

export function humanizeIssues(
  issues: ValidationIssue[],
  statusById: Record<string, ErrorStatus> = {},
): HumanizedIssue[] {
  return issues.map((issue) => ({
    ...translate(issue),
    status: statusById[issue.id] ?? 'open',
  }));
}

export function groupByCategory(
  issues: HumanizedIssue[],
): Record<string, HumanizedIssue[]> {
  return issues.reduce<Record<string, HumanizedIssue[]>>((acc, issue) => {
    const list = acc[issue.category] ?? [];
    list.push(issue);
    acc[issue.category] = list;
    return acc;
  }, {});
}

export function formatIssuesForCopy(issues: HumanizedIssue[]): string {
  return issues
    .map(
      (i) =>
        `[${i.severity.toUpperCase()}] ${i.title}\n` +
        `Part: ${i.part ?? '—'}\n` +
        `What: ${i.summary}\n` +
        `Fix: ${i.howToFix}\n` +
        `Technical: ${i.technical}`,
    )
    .join('\n\n---\n\n');
}
