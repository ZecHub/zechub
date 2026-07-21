export const calculatePrivacyScore = (
  funding: 'Transparent' | 'Mixed' | 'Shielded' | 'Pending',
  payout: 'Transparent' | 'Mixed' | 'Shielded' | 'Pending',
  newAddressUsed: boolean = false,
  shieldedAddressUsed: boolean = false
): number => {
  let score = 0;

  // Funding Privacy (40 Points)
  if (funding === 'Mixed') score += 20;
  if (funding === 'Shielded') score += 40;

  // Payout Privacy (40 Points)
  if (payout === 'Mixed') score += 20;
  if (payout === 'Shielded') score += 40;

  // Wallet Privacy Practices (20 Points)
  if (newAddressUsed) score += 10;
  if (shieldedAddressUsed) score += 10;

  return score;
};

export const getPrivacyBadge = (score: number): string => {
  if (score >= 0 && score <= 25) return 'Public Transaction';
  if (score >= 26 && score <= 50) return 'Privacy Aware';
  if (score >= 51 && score <= 75) return 'Shielded Contributor';
  if (score >= 76 && score <= 100) return 'Privacy Champion';
  return 'Public Transaction';
};
