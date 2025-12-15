/**
 * Date Utility Functions
 * Comprehensive date and time utilities using moment-timezone
 * All dates are handled in IST (Asia/Kolkata) timezone by default
 */

import moment, { Moment, unitOfTime } from 'moment-timezone';
import {
  DEFAULT_TIMEZONE,
  DATE_FORMATS,
  TIMEZONES,
  TIME_UNITS,
  DAY_OF_WEEK,
  MONTH_OF_YEAR,
  HOTEL_TIMINGS,
  BUSINESS_DAYS,
  WEEKEND_DAYS,
  MILLISECONDS_IN,
} from './constants/timezone';

// Import strict types
import type {
  DateInput,
  TimeUnit,
  DateFormat,
  Timezone,
  DateRange,
  Duration,
  DayOfWeek,
  MonthOfYear,
  HourOfDay,
  PositiveInteger,
  NonNegativeInteger,
  ISODateString,
  UnixTimestamp,
  UnixTimestampSeconds,
  DateValidationResult,
  BetweenInclusivity,
  SeparatedDateTime,
  AgeResult,
  DateComponents,
  RangeOverlapResult,
} from './types';

// Re-export types for backward compatibility
export type {
  DateInput,
  TimeUnit,
  DateFormat,
  Timezone,
  DateRange,
  Duration,
  DayOfWeek,
  MonthOfYear,
  HourOfDay,
  PositiveInteger,
  NonNegativeInteger,
};

// ============================================================================
// CREATION AND PARSING
// ============================================================================

/**
 * Create a moment instance in IST timezone
 */
export function now(timezone: Timezone = DEFAULT_TIMEZONE): Moment {
  return moment.tz(timezone);
}

/**
 * Create a moment instance from various inputs in IST timezone
 */
export function createDate(
  input?: DateInput,
  format?: DateFormat,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  if (input === undefined || input === null) {
    return now(timezone);
  }

  if (moment.isMoment(input)) {
    return input.clone().tz(timezone);
  }

  if (format) {
    return moment.tz(input as string, format, timezone);
  }

  return moment.tz(input, timezone);
}

/**
 * Parse date string with format
 */
export function parseDate(
  dateString: string,
  format: DateFormat = DATE_FORMATS.ISO_DATE,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return moment.tz(dateString, format, timezone);
}

/**
 * Parse date string strictly (must match format exactly)
 */
export function parseDateStrict(
  dateString: string,
  format: DateFormat,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return moment.tz(dateString, format, true, timezone);
}

/**
 * Create date from timestamp (milliseconds)
 */
export function fromTimestamp(
  timestamp: number,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return moment.tz(timestamp, timezone);
}

/**
 * Create date from Unix timestamp (seconds)
 */
export function fromUnix(
  unixTimestamp: number,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return moment.unix(unixTimestamp).tz(timezone);
}

/**
 * Create date from date components
 */
export function fromComponents(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return moment.tz([year, month, day, hour, minute, second], timezone);
}

// ============================================================================
// FORMATTING
// ============================================================================

/**
 * Format date to string
 */
export function format(
  date: DateInput,
  formatString: DateFormat = DATE_FORMATS.DISPLAY_DATETIME,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return createDate(date, undefined, timezone).format(formatString);
}

/**
 * Format date for display (DD MMM YYYY)
 */
export function formatDisplay(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, DATE_FORMATS.DISPLAY_DATE, timezone);
}

/**
 * Format date for display with time (DD MMM YYYY, hh:mm A)
 */
export function formatDisplayWithTime(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, DATE_FORMATS.DISPLAY_DATETIME, timezone);
}

/**
 * Format as ISO string
 */
export function toISOString(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return createDate(date, undefined, timezone).toISOString();
}

/**
 * Format as ISO date (YYYY-MM-DD)
 */
export function toISODate(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): ISODateString {
  return format(date, DATE_FORMATS.ISO_DATE, timezone) as ISODateString;
}

/**
 * Format for database storage
 */
export function toDBFormat(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, DATE_FORMATS.DB_DATETIME, timezone);
}

/**
 * Format for file naming
 */
export function toFileFormat(
  date: DateInput,
  includeTime: boolean = false,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  const formatString = includeTime
    ? DATE_FORMATS.FILE_DATETIME
    : DATE_FORMATS.FILE_DATE;
  return format(date, formatString, timezone);
}

/**
 * Get timestamp in milliseconds
 */
export function toTimestamp(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): UnixTimestamp {
  return createDate(date, undefined, timezone).valueOf() as UnixTimestamp;
}

/**
 * Get Unix timestamp in seconds
 */
export function toUnix(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): UnixTimestampSeconds {
  return createDate(date, undefined, timezone).unix() as UnixTimestampSeconds;
}

// ============================================================================
// MANIPULATION
// ============================================================================

/**
 * Add time to date
 */
export function add(
  date: DateInput,
  amount: number,
  unit: TimeUnit = 'days',
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone).add(amount, unit);
}

/**
 * Subtract time from date
 */
export function subtract(
  date: DateInput,
  amount: number,
  unit: TimeUnit = 'days',
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone).subtract(amount, unit);
}

/**
 * Add duration to date
 */
export function addDuration(
  date: DateInput,
  duration: Duration,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone).add(duration);
}

/**
 * Subtract duration from date
 */
export function subtractDuration(
  date: DateInput,
  duration: Duration,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone).subtract(duration);
}

/**
 * Start of time unit (e.g., start of day, month, year)
 */
export function startOf(
  date: DateInput,
  unit: TimeUnit = 'day',
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone).startOf(unit);
}

/**
 * End of time unit (e.g., end of day, month, year)
 */
export function endOf(
  date: DateInput,
  unit: TimeUnit = 'day',
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone).endOf(unit);
}

/**
 * Set specific time on a date
 */
export function setTime(
  date: DateInput,
  hour: number,
  minute: number = 0,
  second: number = 0,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone)
    .hour(hour)
    .minute(minute)
    .second(second)
    .millisecond(0);
}

/**
 * Set date to specific values
 */
export function set(
  date: DateInput,
  values: {
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    minute?: number;
    second?: number;
  },
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  const momentDate = createDate(date, undefined, timezone);
  
  if (values.year !== undefined) momentDate.year(values.year);
  if (values.month !== undefined) momentDate.month(values.month);
  if (values.date !== undefined) momentDate.date(values.date);
  if (values.hour !== undefined) momentDate.hour(values.hour);
  if (values.minute !== undefined) momentDate.minute(values.minute);
  if (values.second !== undefined) momentDate.second(values.second);
  
  return momentDate;
}

// ============================================================================
// COMPARISON
// ============================================================================

/**
 * Check if date is before another date
 */
export function isBefore(
  date: DateInput,
  compareDate: DateInput,
  unit?: TimeUnit,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const d1 = createDate(date, undefined, timezone);
  const d2 = createDate(compareDate, undefined, timezone);
  return d1.isBefore(d2, unit);
}

/**
 * Check if date is after another date
 */
export function isAfter(
  date: DateInput,
  compareDate: DateInput,
  unit?: TimeUnit,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const d1 = createDate(date, undefined, timezone);
  const d2 = createDate(compareDate, undefined, timezone);
  return d1.isAfter(d2, unit);
}

/**
 * Check if date is same as another date
 */
export function isSame(
  date: DateInput,
  compareDate: DateInput,
  unit?: TimeUnit,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const d1 = createDate(date, undefined, timezone);
  const d2 = createDate(compareDate, undefined, timezone);
  return d1.isSame(d2, unit);
}

/**
 * Check if date is same or before another date
 */
export function isSameOrBefore(
  date: DateInput,
  compareDate: DateInput,
  unit?: TimeUnit,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const d1 = createDate(date, undefined, timezone);
  const d2 = createDate(compareDate, undefined, timezone);
  return d1.isSameOrBefore(d2, unit);
}

/**
 * Check if date is same or after another date
 */
export function isSameOrAfter(
  date: DateInput,
  compareDate: DateInput,
  unit?: TimeUnit,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const d1 = createDate(date, undefined, timezone);
  const d2 = createDate(compareDate, undefined, timezone);
  return d1.isSameOrAfter(d2, unit);
}

/**
 * Check if date is between two dates
 */
export function isBetween(
  date: DateInput,
  startDate: DateInput,
  endDate: DateInput,
  unit?: TimeUnit,
  inclusivity: '()' | '[)' | '(]' | '[]' = '()',
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const d = createDate(date, undefined, timezone);
  const start = createDate(startDate, undefined, timezone);
  const end = createDate(endDate, undefined, timezone);
  return d.isBetween(start, end, unit, inclusivity);
}

// ============================================================================
// DIFFERENCE CALCULATIONS
// ============================================================================

/**
 * Get difference between two dates
 */
export function diff(
  date1: DateInput,
  date2: DateInput,
  unit: TimeUnit = 'days',
  precise: boolean = false,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  const d1 = createDate(date1, undefined, timezone);
  const d2 = createDate(date2, undefined, timezone);
  return d1.diff(d2, unit, precise);
}

/**
 * Get difference in days
 */
export function diffInDays(
  date1: DateInput,
  date2: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return diff(date1, date2, 'days', false, timezone);
}

/**
 * Get difference in hours
 */
export function diffInHours(
  date1: DateInput,
  date2: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return diff(date1, date2, 'hours', false, timezone);
}

/**
 * Get difference in minutes
 */
export function diffInMinutes(
  date1: DateInput,
  date2: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return diff(date1, date2, 'minutes', false, timezone);
}

/**
 * Get difference in seconds
 */
export function diffInSeconds(
  date1: DateInput,
  date2: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return diff(date1, date2, 'seconds', false, timezone);
}

/**
 * Get difference in milliseconds
 */
export function diffInMilliseconds(
  date1: DateInput,
  date2: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return diff(date1, date2, 'milliseconds', false, timezone);
}

// ============================================================================
// GETTERS
// ============================================================================

/**
 * Get year from date
 */
export function getYear(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).year();
}

/**
 * Get month from date (0-11)
 */
export function getMonth(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): MonthOfYear {
  return createDate(date, undefined, timezone).month() as MonthOfYear;
}

/**
 * Get date (day of month) from date
 */
export function getDate(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).date();
}

/**
 * Get day of week from date (0-6, Sunday is 0)
 */
export function getDayOfWeek(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): DayOfWeek {
  return createDate(date, undefined, timezone).day() as DayOfWeek;
}

/**
 * Get day of year from date (1-366)
 */
export function getDayOfYear(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).dayOfYear();
}

/**
 * Get week of year from date
 */
export function getWeekOfYear(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).week();
}

/**
 * Get hour from date (0-23)
 */
export function getHour(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): HourOfDay {
  return createDate(date, undefined, timezone).hour() as HourOfDay;
}

/**
 * Get minute from date (0-59)
 */
export function getMinute(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).minute();
}

/**
 * Get second from date (0-59)
 */
export function getSecond(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).second();
}

/**
 * Get millisecond from date (0-999)
 */
export function getMillisecond(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).millisecond();
}

/**
 * Get all date components as a structured object
 */
export function getDateComponents(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): DateComponents {
  const m = createDate(date, undefined, timezone);
  return {
    year: m.year(),
    month: m.month() as MonthOfYear,
    day: m.date(),
    hour: m.hour() as HourOfDay,
    minute: m.minute(),
    second: m.second(),
    millisecond: m.millisecond(),
  };
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Check if date is valid
 */
export function isValid(date: DateInput, format?: DateFormat): boolean {
  if (format) {
    return moment(date as string, format, true).isValid();
  }
  return moment(date).isValid();
}

/**
 * Check if year is leap year
 */
export function isLeapYear(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  return createDate(date, undefined, timezone).isLeapYear();
}

/**
 * Check if date is today
 */
export function isToday(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  return isSame(date, now(timezone), 'day', timezone);
}

/**
 * Check if date is yesterday
 */
export function isYesterday(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const yesterday = subtract(now(timezone), 1, 'day', timezone);
  return isSame(date, yesterday, 'day', timezone);
}

/**
 * Check if date is tomorrow
 */
export function isTomorrow(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const tomorrow = add(now(timezone), 1, 'day', timezone);
  return isSame(date, tomorrow, 'day', timezone);
}

/**
 * Check if date is in the past
 */
export function isPast(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  return isBefore(date, now(timezone), undefined, timezone);
}

/**
 * Check if date is in the future
 */
export function isFuture(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  return isAfter(date, now(timezone), undefined, timezone);
}

/**
 * Check if date is a weekend
 */
export function isWeekend(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const day = getDayOfWeek(date, timezone);
  return WEEKEND_DAYS.includes(day as any);
}

/**
 * Check if date is a weekday
 */
export function isWeekday(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const day = getDayOfWeek(date, timezone);
  return BUSINESS_DAYS.includes(day as any);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the minimum date from an array of dates
 */
export function min(
  dates: DateInput[],
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  const momentDates = dates.map((d) => createDate(d, undefined, timezone));
  return moment.min(momentDates);
}

/**
 * Get the maximum date from an array of dates
 */
export function max(
  dates: DateInput[],
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  const momentDates = dates.map((d) => createDate(d, undefined, timezone));
  return moment.max(momentDates);
}

/**
 * Clone a date
 */
export function clone(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone).clone();
}

/**
 * Convert date to different timezone
 */
export function toTimezone(
  date: DateInput,
  targetTimezone: Timezone,
  sourceTimezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, sourceTimezone).tz(targetTimezone);
}

/**
 * Get relative time from now (e.g., "2 hours ago", "in 3 days")
 */
export function fromNow(
  date: DateInput,
  withoutSuffix: boolean = false,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return createDate(date, undefined, timezone).fromNow(withoutSuffix);
}

/**
 * Get relative time from another date
 */
export function from(
  date: DateInput,
  compareDate: DateInput,
  withoutSuffix: boolean = false,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  const d1 = createDate(date, undefined, timezone);
  const d2 = createDate(compareDate, undefined, timezone);
  return d1.from(d2, withoutSuffix);
}

/**
 * Get relative time to now (e.g., "in 2 hours", "3 days ago")
 */
export function toNow(
  date: DateInput,
  withoutPrefix: boolean = false,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return createDate(date, undefined, timezone).toNow(withoutPrefix);
}

/**
 * Get calendar time (e.g., "Today at 2:30 PM", "Last Monday at 2:30 PM")
 */
export function calendar(
  date: DateInput,
  referenceDate?: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  const momentDate = createDate(date, undefined, timezone);
  if (referenceDate) {
    const refDate = createDate(referenceDate, undefined, timezone);
    return momentDate.calendar(refDate);
  }
  return momentDate.calendar();
}

// ============================================================================
// DATE RANGE FUNCTIONS
// ============================================================================

/**
 * Create a date range
 */
export function createDateRange(
  start: DateInput,
  end: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): DateRange {
  return {
    start: createDate(start, undefined, timezone),
    end: createDate(end, undefined, timezone),
  };
}

/**
 * Get all dates between start and end
 */
export function dateRange(
  start: DateInput,
  end: DateInput,
  unit: TimeUnit = 'days',
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment[] {
  const startDate = createDate(start, undefined, timezone);
  const endDate = createDate(end, undefined, timezone);
  const dates: Moment[] = [];
  
  let current = startDate.clone();
  while (current.isSameOrBefore(endDate, unit)) {
    dates.push(current.clone());
    current.add(1, unit);
  }
  
  return dates;
}

/**
 * Get date range for today
 */
export function getTodayRange(timezone: Timezone = DEFAULT_TIMEZONE): DateRange {
  const today = now(timezone);
  return {
    start: startOf(today, 'day', timezone),
    end: endOf(today, 'day', timezone),
  };
}

/**
 * Get date range for this week
 */
export function getThisWeekRange(timezone: Timezone = DEFAULT_TIMEZONE): DateRange {
  const today = now(timezone);
  return {
    start: startOf(today, 'week', timezone),
    end: endOf(today, 'week', timezone),
  };
}

/**
 * Get date range for this month
 */
export function getThisMonthRange(timezone: Timezone = DEFAULT_TIMEZONE): DateRange {
  const today = now(timezone);
  return {
    start: startOf(today, 'month', timezone),
    end: endOf(today, 'month', timezone),
  };
}

/**
 * Get date range for this year
 */
export function getThisYearRange(timezone: Timezone = DEFAULT_TIMEZONE): DateRange {
  const today = now(timezone);
  return {
    start: startOf(today, 'year', timezone),
    end: endOf(today, 'year', timezone),
  };
}

/**
 * Get date range for last N days
 */
export function getLastNDaysRange(
  days: number,
  timezone: Timezone = DEFAULT_TIMEZONE,
): DateRange {
  const today = now(timezone);
  return {
    start: startOf(subtract(today, days - 1, 'days', timezone), 'day', timezone),
    end: endOf(today, 'day', timezone),
  };
}

// ============================================================================
// HOTEL-SPECIFIC FUNCTIONS
// ============================================================================

/**
 * Get check-in time for a date
 */
export function getCheckInTime(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  const [hour, minute] = HOTEL_TIMINGS.CHECK_IN_TIME.split(':').map(Number);
  return setTime(date, hour, minute, 0, timezone);
}

/**
 * Get check-out time for a date
 */
export function getCheckOutTime(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  const [hour, minute] = HOTEL_TIMINGS.CHECK_OUT_TIME.split(':').map(Number);
  return setTime(date, hour, minute, 0, timezone);
}

/**
 * Calculate number of nights between check-in and check-out
 */
export function calculateNights(
  checkIn: DateInput,
  checkOut: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): NonNegativeInteger {
  const checkInDate = startOf(checkIn, 'day', timezone);
  const checkOutDate = startOf(checkOut, 'day', timezone);
  const nights = diffInDays(checkOutDate, checkInDate, timezone);
  return Math.max(0, nights) as NonNegativeInteger;
}

/**
 * Check if current time is past check-out time
 */
export function isPastCheckOut(
  date: DateInput = now(),
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const currentTime = createDate(date, undefined, timezone);
  const checkOutTime = getCheckOutTime(date, timezone);
  return currentTime.isAfter(checkOutTime);
}

/**
 * Check if current time is past check-in time
 */
export function isPastCheckIn(
  date: DateInput = now(),
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const currentTime = createDate(date, undefined, timezone);
  const checkInTime = getCheckInTime(date, timezone);
  return currentTime.isAfter(checkInTime);
}

/**
 * Get night audit date (the date for which the night audit is being run)
 */
export function getNightAuditDate(
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  const currentTime = now(timezone);
  const midnightToday = startOf(currentTime, 'day', timezone);
  
  // If it's past midnight but before check-out time, audit date is yesterday
  if (currentTime.isBefore(getCheckOutTime(currentTime, timezone))) {
    return subtract(midnightToday, 1, 'day', timezone);
  }
  
  return midnightToday;
}

// ============================================================================
// BUSINESS DAY FUNCTIONS
// ============================================================================

/**
 * Get the next business day (Monday-Friday)
 */
export function getNextBusinessDay(
  date: DateInput = now(),
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  let nextDay = add(date, 1, 'day', timezone);
  
  while (isWeekend(nextDay, timezone)) {
    nextDay = add(nextDay, 1, 'day', timezone);
  }
  
  return nextDay;
}

/**
 * Get the previous business day (Monday-Friday)
 */
export function getPreviousBusinessDay(
  date: DateInput = now(),
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  let prevDay = subtract(date, 1, 'day', timezone);
  
  while (isWeekend(prevDay, timezone)) {
    prevDay = subtract(prevDay, 1, 'day', timezone);
  }
  
  return prevDay;
}

/**
 * Count business days between two dates
 */
export function countBusinessDays(
  startDate: DateInput,
  endDate: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): NonNegativeInteger {
  const start = createDate(startDate, undefined, timezone);
  const end = createDate(endDate, undefined, timezone);
  
  let count = 0;
  let current = start.clone();
  
  while (current.isSameOrBefore(end, 'day')) {
    if (isWeekday(current, timezone)) {
      count++;
    }
    current.add(1, 'day');
  }
  
  return count as NonNegativeInteger;
}

// ============================================================================
// DURATION HELPERS
// ============================================================================

/**
 * Get human-readable duration between two dates
 */
export function getDuration(
  date1: DateInput,
  date2: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  const d1 = createDate(date1, undefined, timezone);
  const d2 = createDate(date2, undefined, timezone);
  const duration = moment.duration(d1.diff(d2));
  
  return duration.humanize();
}

/**
 * Format duration in hours and minutes
 */
export function formatDuration(
  milliseconds: number,
): string {
  const duration = moment.duration(milliseconds);
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// ============================================================================
// AGE CALCULATION
// ============================================================================

/**
 * Calculate age from date of birth
 */
export function calculateAge(
  dateOfBirth: DateInput,
  referenceDate: DateInput = now(),
  timezone: Timezone = DEFAULT_TIMEZONE,
): NonNegativeInteger {
  const birthDate = createDate(dateOfBirth, undefined, timezone);
  const refDate = createDate(referenceDate, undefined, timezone);
  
  return Math.max(0, refDate.diff(birthDate, 'years')) as NonNegativeInteger;
}

/**
 * Parse date of birth from DD/MM/YYYY format and calculate age
 */
export function calculateAgeFromDDMMYYYY(
  dateString: string,
  referenceDate: DateInput = now(),
  timezone: Timezone = DEFAULT_TIMEZONE,
): number | null {
  try {
    const [day, month, year] = dateString.split('/').map(Number);
    const birthDate = moment.tz([year, month - 1, day], timezone);
    
    if (!birthDate.isValid() || isNaN(birthDate.year())) {
      return null;
    }
    
    const refDate = createDate(referenceDate, undefined, timezone);
    const age = refDate.year() - birthDate.year();
    const monthDiff = refDate.month() - birthDate.month();
    
    // Adjust if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && refDate.date() < birthDate.date())) {
      return age - 1;
    }
    
    return age;
  } catch {
    return null;
  }
}

/**
 * Get age in years, months, and days
 */
export function getDetailedAge(
  dateOfBirth: DateInput,
  referenceDate: DateInput = now(),
  timezone: Timezone = DEFAULT_TIMEZONE,
): AgeResult {
  const birthDate = createDate(dateOfBirth, undefined, timezone);
  const refDate = createDate(referenceDate, undefined, timezone);
  
  const years = Math.max(0, refDate.diff(birthDate, 'years'));
  birthDate.add(years, 'years');
  
  const months = Math.max(0, refDate.diff(birthDate, 'months'));
  birthDate.add(months, 'months');
  
  const days = Math.max(0, refDate.diff(birthDate, 'days'));
  
  const totalDays = Math.max(0, refDate.diff(createDate(dateOfBirth, undefined, timezone), 'days'));
  
  return {
    years: years as NonNegativeInteger,
    months: months as NonNegativeInteger,
    days: days as NonNegativeInteger,
    totalDays: totalDays as NonNegativeInteger,
    isAdult: years >= 18,
    isSenior: years >= 60,
  };
}

// ============================================================================
// DATE/TIME SEPARATION
// ============================================================================

/**
 * Separate date and time into separate strings
 */
export function separateDateTime(
  dateTime: DateInput,
  dateFormat: DateFormat = DATE_FORMATS.INDIAN_DATE,
  timeFormat: DateFormat = 'HH:mm',
  timezone: Timezone = DEFAULT_TIMEZONE,
): SeparatedDateTime {
  const m = createDate(dateTime, undefined, timezone);
  return {
    date: m.format(dateFormat),
    time: m.format(timeFormat),
  };
}

/**
 * Separate date and time into separate strings with AM/PM
 */
export function separateDateTimeWithAMPM(
  dateTime: DateInput,
  dateFormat: DateFormat = DATE_FORMATS.INDIAN_DATE,
  timezone: Timezone = DEFAULT_TIMEZONE,
): SeparatedDateTime {
  const m = createDate(dateTime, undefined, timezone);
  return {
    date: m.format(dateFormat),
    time: m.format('hh:mm A'),
  };
}

// ============================================================================
// DATE RANGE GENERATION WITH CHUNKS
// ============================================================================

/**
 * Generate date range in chunks to avoid memory issues with large ranges
 */
export function dateRangeInChunks(
  start: DateInput,
  end: DateInput,
  chunkSize: number = 30,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment[][] {
  const allDates = dateRange(start, end, 'days', timezone);
  const chunks: Moment[][] = [];
  
  for (let i = 0; i < allDates.length; i += chunkSize) {
    chunks.push(allDates.slice(i, i + chunkSize));
  }
  
  return chunks;
}

/**
 * Get array of dates as Date objects between start and end
 */
export function getDateArray(
  startDate: DateInput,
  endDate: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Date[] {
  const dates: Date[] = [];
  const currentDate = createDate(startDate, undefined, timezone);
  const end = createDate(endDate, undefined, timezone);
  
  while (currentDate.isSameOrBefore(end, 'day')) {
    dates.push(currentDate.toDate());
    currentDate.add(1, 'day');
  }
  
  return dates;
}

// ============================================================================
// SPECIALIZED FORMATTING
// ============================================================================

/**
 * Format date in Indian date format (DD-MM-YYYY)
 */
export function formatIndianDate(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, DATE_FORMATS.INDIAN_DATE, timezone);
}

/**
 * Format date in Indian date format with slashes (DD/MM/YYYY)
 */
export function formatIndianDateSlash(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'DD/MM/YYYY', timezone);
}

/**
 * Format date with time in Indian format (DD/MM/YYYY, HH:mm)
 */
export function formatIndianDateTime(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'DD/MM/YYYY, HH:mm', timezone);
}

/**
 * Format date with time and AM/PM (DD-MM-YYYY, hh:mm A)
 */
export function formatInvoiceDate(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'DD-MM-YYYY, h:mm A', timezone);
}

/**
 * Format for database queries (YYYY-MM-DD HH:mm:ss)
 */
export function formatDatabaseDateTime(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'YYYY-MM-DD HH:mm:ss', timezone);
}

/**
 * Format time only (HH:mm)
 */
export function formatTimeOnly(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'HH:mm', timezone);
}

/**
 * Format time with AM/PM (hh:mm A)
 */
export function formatTime12Hour(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'hh:mm A', timezone);
}

/**
 * Format date with full month name (DD MMM YYYY)
 */
export function formatFullMonthDate(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'DD MMM YYYY', timezone);
}

/**
 * Format date for room sales report (YYYY-MM-DD HH:mm)
 */
export function formatRoomSalesDate(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'YYYY-MM-DD HH:mm', timezone);
}

// ============================================================================
// DATE VALIDATION AND CHECKING
// ============================================================================

/**
 * Check if date string is in YYYY-MM-DD format and valid
 */
export function isValidYYYYMMDD(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  
  return moment(dateStr, 'YYYY-MM-DD', true).isValid();
}

/**
 * Check if date string is in DD-MM-YYYY format and valid
 */
export function isValidDDMMYYYY(dateStr: string): boolean {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(dateStr)) return false;
  
  return moment(dateStr, 'DD-MM-YYYY', true).isValid();
}

/**
 * Check if date string is in DD/MM/YYYY format and valid
 */
export function isValidDDMMYYYYSlash(dateStr: string): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateStr)) return false;
  
  return moment(dateStr, 'DD/MM/YYYY', true).isValid();
}

/**
 * Check if two dates are on the same day (ignoring time)
 */
export function isSameDay(
  date1: DateInput,
  date2: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  return isSame(date1, date2, 'day', timezone);
}

/**
 * Check if date falls within check-in/check-out overlap period
 */
export function isInOverlapPeriod(
  date: DateInput,
  startDate: DateInput,
  endDate: DateInput,
  includeEnd: boolean = false,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const d = startOf(date, 'day', timezone);
  const s = startOf(startDate, 'day', timezone);
  const e = includeEnd ? endOf(endDate, 'day', timezone) : startOf(endDate, 'day', timezone);
  
  if (isSame(d, e, 'day')) return false;
  
  return (
    (isSameOrBefore(s, d, 'day') && isAfter(e, d, 'day')) ||
    (isBefore(s, d, 'day') && isSameOrAfter(e, d, 'day')) ||
    isSame(s, d, 'day')
  );
}

// ============================================================================
// ADVANCED DATE OPERATIONS
// ============================================================================

/**
 * Get overlapping days between two date ranges
 */
export function getOverlapDays(
  range1Start: DateInput,
  range1End: DateInput,
  range2Start: DateInput,
  range2End: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): NonNegativeInteger {
  const r1Start = startOf(range1Start, 'day', timezone);
  const r1End = startOf(range1End, 'day', timezone);
  const r2Start = startOf(range2Start, 'day', timezone);
  const r2End = startOf(range2End, 'day', timezone);
  
  const overlapStart = moment.max(r1Start, r2Start);
  const overlapEnd = moment.min(r1End, r2End);
  
  if (overlapStart.isAfter(overlapEnd)) {
    return 0 as NonNegativeInteger;
  }
  
  return Math.max(0, overlapEnd.diff(overlapStart, 'days')) as NonNegativeInteger;
}

/**
 * Check if two date ranges overlap
 */
export function doRangesOverlap(
  range1Start: DateInput,
  range1End: DateInput,
  range2Start: DateInput,
  range2End: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): boolean {
  const r1Start = startOf(range1Start, 'day', timezone);
  const r1End = startOf(range1End, 'day', timezone);
  const r2Start = startOf(range2Start, 'day', timezone);
  const r2End = startOf(range2End, 'day', timezone);
  
  return r1Start.isBefore(r2End) && r2Start.isBefore(r1End);
}

/**
 * Adjust time by offset hours (for timezone conversions or IST adjustments)
 */
export function adjustTimeByOffset(
  date: DateInput,
  offsetHours: number,
  offsetMinutes: number = 0,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return createDate(date, undefined, timezone)
    .add(offsetHours, 'hours')
    .add(offsetMinutes, 'minutes');
}

/**
 * Get date N days ago from now
 */
export function daysAgo(
  days: number,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return subtract(now(timezone), days, 'days', timezone);
}

/**
 * Get date N days from now
 */
export function daysFromNow(
  days: number,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return add(now(timezone), days, 'days', timezone);
}

/**
 * Get date N hours ago from now
 */
export function hoursAgo(
  hours: number,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return subtract(now(timezone), hours, 'hours', timezone);
}

/**
 * Get date N hours from now
 */
export function hoursFromNow(
  hours: number,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return add(now(timezone), hours, 'hours', timezone);
}

// ============================================================================
// SORTING HELPERS
// ============================================================================

/**
 * Sort array of dates in ascending order
 */
export function sortDatesAscending(
  dates: DateInput[],
  timezone: Timezone = DEFAULT_TIMEZONE,
): Date[] {
  return dates
    .map(d => createDate(d, undefined, timezone).toDate())
    .sort((a, b) => a.getTime() - b.getTime());
}

/**
 * Sort array of dates in descending order
 */
export function sortDatesDescending(
  dates: DateInput[],
  timezone: Timezone = DEFAULT_TIMEZONE,
): Date[] {
  return dates
    .map(d => createDate(d, undefined, timezone).toDate())
    .sort((a, b) => b.getTime() - a.getTime());
}

/**
 * Get the earliest date from an array
 */
export function getEarliestDate(
  dates: DateInput[],
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return min(dates, timezone);
}

/**
 * Get the latest date from an array
 */
export function getLatestDate(
  dates: DateInput[],
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return max(dates, timezone);
}

// ============================================================================
// CONVERSION HELPERS
// ============================================================================

/**
 * Convert Date object to moment in specified timezone
 */
export function dateToMoment(
  date: Date,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return moment.tz(date, timezone);
}

/**
 * Convert moment to native Date object
 */
export function momentToDate(momentDate: Moment): Date {
  return momentDate.toDate();
}

/**
 * Convert ISO string to moment
 */
export function isoToMoment(
  isoString: string,
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment {
  return moment.tz(isoString, timezone);
}

/**
 * Parse multiple date formats and return moment
 */
export function parseMultipleFormats(
  dateString: string,
  formats: string[],
  timezone: Timezone = DEFAULT_TIMEZONE,
): Moment | null {
  for (const fmt of formats) {
    const m = moment.tz(dateString, fmt, true, timezone);
    if (m.isValid()) {
      return m;
    }
  }
  return null;
}

// ============================================================================
// DATE KEY GENERATION
// ============================================================================

/**
 * Generate a date key for grouping (YYYY-MM-DD format)
 */
export function toDateKey(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return toISODate(date, timezone);
}

/**
 * Generate a month key for grouping (YYYY-MM format)
 */
export function toMonthKey(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'YYYY-MM', timezone);
}

/**
 * Generate a year key for grouping (YYYY format)
 */
export function toYearKey(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  return format(date, 'YYYY', timezone);
}

/**
 * Generate a week key for grouping (YYYY-Www format)
 */
export function toWeekKey(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): string {
  const m = createDate(date, undefined, timezone);
  return `${m.year()}-W${m.week().toString().padStart(2, '0')}`;
}

// ============================================================================
// EXPORT CONSTANTS
// ============================================================================

export {
  DEFAULT_TIMEZONE,
  TIMEZONES,
  DATE_FORMATS,
  TIME_UNITS,
  DAY_OF_WEEK,
  MONTH_OF_YEAR,
  HOTEL_TIMINGS,
  BUSINESS_DAYS,
  WEEKEND_DAYS,
  MILLISECONDS_IN,
};
