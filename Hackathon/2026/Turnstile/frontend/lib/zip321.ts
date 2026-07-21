export const SUBSCRIPTION_PREFIX = "TURNSTILE:SUB:";
export const SUBSCRIPTION_AMOUNT = "0.0001";
export const MAX_TOPIC_LENGTH = 64;

export function subscriptionMemo(topic: string) {
  return `${SUBSCRIPTION_PREFIX}${topic}`;
}

export function isValidTopic(topic: string) {
  return (
    topic.length > 0 &&
    topic.length <= MAX_TOPIC_LENGTH &&
    /^[A-Za-z0-9_-]+$/.test(topic)
  );
}

function base64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function zip321Uri(address: string, topic: string) {
  const memo = base64Url(subscriptionMemo(topic));

  return `zcash:${address}?amount=${SUBSCRIPTION_AMOUNT}&memo=${memo}`;
}
