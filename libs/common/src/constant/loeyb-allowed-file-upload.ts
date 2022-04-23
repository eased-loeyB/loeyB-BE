export const ALLOWED_IMAGE_MIMETYPES: string[] = [
  'image/bmp',
  'image/gif',
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/pdf',
];

export const ALLOWED_IMAGE_EXTENSIONS: string[] = [
  'bmp',
  'gif',
  'jpg',
  'jpeg',
  'png',
  'pdf',
];

export const ALLOWED_EXTENSIONS: string[] = [
  ...ALLOWED_IMAGE_EXTENSIONS,
  ...ALLOWED_IMAGE_MIMETYPES,
];
