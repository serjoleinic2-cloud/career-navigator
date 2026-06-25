export type { ShareState } from './share_state_builder';
export { buildShareState } from './share_state_builder';

export type { ShareCardLayout, ShareMetric, ShareBadge, ShareProgressBar } from './share_card_engine';
export { generateShareCard } from './share_card_engine';

export type { ShareFormat } from './share_formats';
export { SHARE_FORMATS, isValidShareFormat } from './share_formats';

export type { CareerSnapshot } from './export_engine';
export { exportCareerSnapshot, serializeSnapshot } from './export_engine';

export type { ImportResult } from './import_engine';
export { importCareerSnapshot } from './import_engine';

export type { ViralMetrics, ShareEvent } from './viral_metrics_engine';
export { createViralMetrics, recordShare, recordExport } from './viral_metrics_engine';

export { generateShareText } from './share_text_generator';

export type { SharePrompt } from './share_gate';
export { shouldPromptShare, markShareCandidate } from './share_gate';
