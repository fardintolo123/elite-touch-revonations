const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export function formatMonthYear(date: string): string {
  const [year, month] = date.split('-')
  const monthIndex = Number(month) - 1

  if (!year || monthIndex < 0 || monthIndex >= MONTHS.length) {
    throw new Error(`Invalid YYYY-MM-DD date: ${date}`)
  }

  return `${MONTHS[monthIndex]} ${year}`
}
