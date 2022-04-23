import { AbstractInput } from '.';

/**
 * @TODO validator 추가하기
 */
export class RegisterFileInput extends AbstractInput {
  id!: string;
  s3Uri!: string;
  fileName!: string;
  fileExtension?: string | null;
  fileMimetype?: string | null;
  filePath!: string;
  size!: number;
}
