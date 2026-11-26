const KURDISH_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

// JS getUTCDay() index: 0=Sunday .. 6=Saturday
const KURDISH_WEEKDAYS_FULL = [
  'یەکشەممە',
  'دووشەممە',
  'سێشەممە',
  'چوارشەممە',
  'پێنجشەممە',
  'هەینی',
  'شەممە',
]

export const WEEKDAYS_SHORT_RTL = ['ی', 'د', 'س', 'چ', 'پ', 'هـ', 'ش']

export function toKurdishDigits(value) {
  return String(value).replace(/\d/g, (d) => KURDISH_DIGITS[Number(d)])
}

/**
 * Extracts calendar fields directly from the ISO string's local wall-clock part
 * so the displayed wedding date/time matches the invitation timezone anywhere.
 */
export function parseEventDateParts(isoString) {
  const match = String(isoString).match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
  )

  if (!match) {
    const fallback = new Date(isoString)
    return {
      year: fallback.getFullYear(),
      month: fallback.getMonth() + 1,
      day: fallback.getDate(),
      hour24: fallback.getHours(),
      minute: fallback.getMinutes(),
      weekdayIndex: fallback.getDay(),
    }
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const hour24 = Number(match[4])
  const minute = Number(match[5])
  const weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay()

  return { year, month, day, hour24, minute, weekdayIndex }
}

/**
 * Formats e.g. "یەکشەممە - ٢٩/١١/٢٠٢٦ - کاتژمێر ٦:٠٠ی ئێوارە" from an ISO string.
 */
export function formatHeroDate(isoString) {
  const { year, month, day, hour24, minute, weekdayIndex } = parseEventDateParts(isoString)
  const weekdayName = KURDISH_WEEKDAYS_FULL[weekdayIndex]
  const hour12 = hour24 % 12 || 12
  const minutePadded = String(minute).padStart(2, '0')
  const periodSuffix = hour24 >= 12 ? 'ی ئێوارە' : 'ی بەیانی'
  return `${weekdayName} - ${toKurdishDigits(day)}/${toKurdishDigits(month)}/${toKurdishDigits(year)} - کاتژمێر ${toKurdishDigits(hour12)}:${toKurdishDigits(minutePadded)}${periodSuffix}`
}

/**
 * Generates the RTL 7-column calendar cells for the event's month/year.
 */
export function buildMonthGrid(isoString) {
  const { year, month, day } = parseEventDateParts(isoString)
  const firstDayWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay()
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()

  const cells = []
  for (let i = 0; i < firstDayWeekday; i += 1) {
    cells.push(null)
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(d)
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return {
    year,
    month,
    highlightedDay: day,
    headerText: `مانگی ${toKurdishDigits(month)} ی ${toKurdishDigits(year)}`,
    cells,
  }
}

export function getCountdownTimeLeft(isoString) {
  const targetMs = new Date(isoString).getTime()
  const diff = targetMs - Date.now()
  if (Number.isNaN(diff) || diff <= 0) {
    return { finished: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const totalSeconds = Math.floor(diff / 1000)
  return {
    finished: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function formatIcsUtc(date) {
  const pad = (n) => String(n).padStart(2, '0')
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

export function downloadWeddingIcs({ eventDateISO, groomName, brideName, venueName }) {
  const startDate = new Date(eventDateISO)
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000)

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kurdish Digital Wedding Invitation//CKB//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${startDate.getTime()}@wedding-invitation`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART:${formatIcsUtc(startDate)}`,
    `DTEND:${formatIcsUtc(endDate)}`,
    `SUMMARY:ئاهەنگی مارەبڕین ${groomName} و ${brideName}`,
    `DESCRIPTION:بانگهێشتنامەی مارەبڕینی ${groomName} و ${brideName}`,
    `LOCATION:${venueName}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'wedding-invitation.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
