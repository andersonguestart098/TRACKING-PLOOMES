export function truncateLog(payload: any, maxLength: number = 300): string {
    const payloadString = JSON.stringify(payload, null, 2);
    return payloadString.length > maxLength
      ? `${payloadString.substring(0, maxLength)}... [truncated]`
      : payloadString;
  }
  