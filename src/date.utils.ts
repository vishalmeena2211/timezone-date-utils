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

/**
 * Type definitions
 */
export type DateInput = string | number | Date | Moment;
export type TimeUnit = unitOfTime.DurationConstructor;
export type DateFormat = string;
export type Timezone = string;

/**
 * Interface for date range
 */
export interface DateRange {
  start: Moment;
  end: Moment;
}

/**
 * Interface for duration
 */
export interface Duration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

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
  if (!input) {
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
): string {
  return format(date, DATE_FORMATS.ISO_DATE, timezone);
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
): number {
  return createDate(date, undefined, timezone).valueOf();
}

/**
 * Get Unix timestamp in seconds
 */
export function toUnix(
  date: DateInput,
  timezone: Timezone = DEFAULT_TIMEZONE,
): number {
  return createDate(date, undefined, timezone).unix();
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
): number {
  return createDate(date, undefined, timezone).month();
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
): number {
  return createDate(date, undefined, timezone).day();
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
): number {
  return createDate(date, undefined, timezone).hour();
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
): number {
  const checkInDate = startOf(checkIn, 'day', timezone);
  const checkOutDate = startOf(checkOut, 'day', timezone);
  const nights = diffInDays(checkOutDate, checkInDate, timezone);
  return Math.max(0, nights);
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
): number {
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
  
  return count;
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
