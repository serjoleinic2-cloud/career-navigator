import type { ShareModel, ShareOptions } from './share_model';

export function shareText(model: ShareModel, options?: ShareOptions): string {
  const parts: string[] = [];

  if (!options?.hideProfession) {
    parts.push(`🎯 ${model.profession}`);
  }

  if (!options?.hideProgress) {
    parts.push(`📈 Progress: ${model.completedSkills}/${model.totalSkills} skills`);
  }

  if (!options?.hideScores) {
    parts.push(`💪 Readiness: ${model.readinessScore}% | Confidence: ${model.confidenceScore}%`);
  }

  if (!options?.hideQuote) {
    parts.push(`"${model.quote}"`);
  }

  parts.push('#SkillTrue #TechCareers');

  return parts.join('\n\n');
}

export function copyText(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function copyImage(imageBlob: Blob): Promise<void> {
  return navigator.clipboard.write([
    new ClipboardItem({ 'image/png': imageBlob })
  ]);
}

export async function nativeShare(text: string, imageBlob?: Blob): Promise<void> {
  if (!navigator.share) {
    throw new Error('Native sharing not supported');
  }

  const files: File[] = [];
  if (imageBlob) {
    files.push(new File([imageBlob], 'career-progress.png', { type: 'image/png' }));
  }

  await navigator.share({
    title: 'My Career Progress',
    text,
    files: files.length > 0 ? files : undefined,
  });
}

export function shareImage(imageBlob: Blob): void {
  const url = URL.createObjectURL(imageBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'career-progress.png';
  a.click();
  URL.revokeObjectURL(url);
}
