export function getRandomBananaEmoji(): string {
  const bananaEmojis = ['🍌', '🍌', '🥳', '⚾', '🎪', '🎭', '🏆', '💫', '⭐'];
  return bananaEmojis[Math.floor(Math.random() * bananaEmojis.length)];
}

export function formatCurrency(amount: number, currency: string = 'ZEC'): string {
  return `${amount.toFixed(4)} ${currency}`;
}

export function formatZcash(amount: number): string {
  return `${amount.toFixed(4)} ZEC`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}