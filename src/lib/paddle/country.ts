const COUNTRY_CODE = /^[A-Z]{2}$/;

export function countryCodeFromRequestHeader(
  value: string | null
): string | undefined {
  if (!value) {
    return undefined;
  }

  const code = value.trim().toUpperCase();

  if (code === "OTHERS" || !COUNTRY_CODE.test(code)) {
    return undefined;
  }

  return code;
}
