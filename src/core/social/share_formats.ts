export type ShareFormat =
  | 'image_card'
  | 'text_summary'
  | 'json_export'
  | 'link_payload';

export const SHARE_FORMATS: ShareFormat[] = [
  'image_card',
  'text_summary',
  'json_export',
  'link_payload',
];

export function isValidShareFormat(format: string): format is ShareFormat {
  return SHARE_FORMATS.includes(format as ShareFormat);
}
