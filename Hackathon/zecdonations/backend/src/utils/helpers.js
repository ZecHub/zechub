export function generateCampaignLink(campaign_id) {
  return `${process.env.BASE_URL}/campaigns/${campaign_id}`;
}

export function formatZecAmount(amount) {
  return parseFloat(amount).toFixed(8);
}

export function generateQRCodeData(address) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;
}

export function calculateProgress(current, target) {
  if (!target || target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}


export function validateCampaignData(data) {
  const errors = [];

  // Required fields
  if (!data.title || data.title.trim() === '') {
    errors.push("Title is required");
  }

  if (data.title && data.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  // Numeric validation
  if (data.target_amount) {
    const amount = parseFloat(data.target_amount);
    if (isNaN(amount) || amount < 0) {
      errors.push("Target amount must be a positive number");
    }
  }

  // Category validation (if you have predefined categories)
  const validCategories = ["general", "proposal", "birthday"];
  if (data.category && !validCategories.includes(data.category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }

  return errors;
}