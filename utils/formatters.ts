/**
 * 숫자 포맷팅 유틸리티 함수
 */

/**
 * 콤마가 포함된 숫자 문자열을 숫자로 변환
 * @param value - 변환할 문자열 (예: "14,000")
 * @returns 파싱된 숫자 (예: 14000)
 */
export function parseFormattedNumber(value: string): number {
  return parseInt(value.replace(/,/g, ''), 10);
}

/**
 * 숫자를 천 단위 콤마가 포함된 문자열로 변환
 * @param num - 변환할 숫자
 * @returns 포맷팅된 문자열 (예: "14,000")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}
