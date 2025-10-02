/**
 * Client-side validation utilities
 */

/**
 * Validate amount is positive
 */
export function validateAmount(amount: number): string | null {
  if (amount <= 0) return "Amount must be greater than 0"
  if (!Number.isFinite(amount)) return "Amount must be a valid number"
  return null
}

/**
 * Validate release time is in the future
 */
export function validateReleaseAt(releaseAt: string): string | null {
  const releaseDate = new Date(releaseAt)
  const now = new Date()

  if (isNaN(releaseDate.getTime())) return "Invalid date format"
  if (releaseDate <= now) return "Release time must be in the future"

  return null
}

/**
 * Basic address validation (transparent addresses for demo)
 */
export function validateAddress(address: string, chain: string): string | null {
  if (!address || address.trim().length === 0) return "Address is required"
  if (address.length < 10) return "Address appears too short"

  // Basic format checks per chain
  if (chain === "ETH" && !address.startsWith("0x")) {
    return "Ethereum address must start with 0x"
  }
  if (chain === "NEAR" && !address.includes(".")) {
    return "NEAR address should include a domain (e.g., .near)"
  }

  return null
}

/**
 * Validate all form fields
 */
export interface ValidationErrors {
  amount?: string
  releaseAt?: string
  destinationAddress?: string
}

export function validateRotationForm(data: {
  amount: number
  releaseAt: string
  destinationAddress: string
  destinationChain: string
}): ValidationErrors {
  const errors: ValidationErrors = {}

  const amountError = validateAmount(data.amount)
  if (amountError) errors.amount = amountError

  const releaseError = validateReleaseAt(data.releaseAt)
  if (releaseError) errors.releaseAt = releaseError

  const addressError = validateAddress(data.destinationAddress, data.destinationChain)
  if (addressError) errors.destinationAddress = addressError

  return errors
}
