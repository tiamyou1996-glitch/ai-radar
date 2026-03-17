export function formatDate(input: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(input));
}

export function formatRelativeDate(input: string) {
  const date = new Date(input).getTime();
  const now = Date.now();
  const diff = Math.round((now - date) / (1000 * 60 * 60 * 24));

  if (diff <= 0) {
    return "今天";
  }

  if (diff === 1) {
    return "1 天前";
  }

  if (diff < 30) {
    return `${diff} 天前`;
  }

  const months = Math.round(diff / 30);
  return `${months} 个月前`;
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function scoreToLabel(score: number) {
  if (score >= 88) return "强烈关注";
  if (score >= 78) return "值得跟进";
  if (score >= 68) return "建议观察";
  return "情报候选";
}
