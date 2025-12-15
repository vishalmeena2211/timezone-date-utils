/**
 * Type Guards and Validators
 * Runtime type checking and validation utilities
 */

import { Moment } from 'moment-timezone';
import {
  DateInput,
  StrictDateInput,
  UnixTimestamp,
  UnixTimestampSeconds,
  DayOfWeek,
  MonthOfYear,
  HourOfDay,
  PositiveInteger,
  NonNegativeInteger,
  TimeFormat,
  HolidayDateFormat,
  TimezoneOffsetFormat,
  ISODateString,
  ISODateTimeString,
  DateValidationResult,
  TimeUnit,
  IANATimezone,
} from './types';

/**
 * Check if value is a valid Date object
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Check if value is a Moment object
 */
export function isMoment(value: unknown): value is Moment {
  return value !== null && typeof value === 'object' && '_isAMomentObject' in value;
}

/**
 * Check if value is a valid DateInput
 */
export function isDateInput(value: unknown): value is DateInput {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    isDate(value) ||
    isMoment(value)
  );
}

/**
 * Check if value is a StrictDateInput
 */
export function isStrictDateInput(value: unknown): value is StrictDateInput {
  return isDate(value) || isMoment(value);
}

/**
 * Check if value is a positive integer
 */
export function isPositiveInteger(value: unknown): value is PositiveInteger {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

/**
 * Check if value is a non-negative integer
 */
export function isNonNegativeInteger(value: unknown): value is NonNegativeInteger {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/**
 * Check if value is a valid DayOfWeek (0-6)
 */
export function isDayOfWeek(value: unknown): value is DayOfWeek {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 6;
}

/**
 * Check if value is a valid MonthOfYear (0-11)
 */
export function isMonthOfYear(value: unknown): value is MonthOfYear {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 11;
}

/**
 * Check if value is a valid HourOfDay (0-23)
 */
export function isHourOfDay(value: unknown): value is HourOfDay {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 23;
}

/**
 * Check if value is a valid TimeFormat (HH:mm)
 */
export function isTimeFormat(value: unknown): value is TimeFormat {
  if (typeof value !== 'string') return false;
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(value);
}

/**
 * Check if value is a valid HolidayDateFormat (MM-DD)
 */
export function isHolidayDateFormat(value: unknown): value is HolidayDateFormat {
  if (typeof value !== 'string') return false;
  const holidayRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return holidayRegex.test(value);
}

/**
 * Check if value is a valid TimezoneOffsetFormat (+HH:mm or -HH:mm)
 */
export function isTimezoneOffsetFormat(value: unknown): value is TimezoneOffsetFormat {
  if (typeof value !== 'string') return false;
  const offsetRegex = /^[+-]([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return offsetRegex.test(value);
}

/**
 * Check if value is a valid ISO date string (YYYY-MM-DD)
 */
export function isISODateString(value: unknown): value is ISODateString {
  if (typeof value !== 'string') return false;
  const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!isoDateRegex.test(value)) return false;
  
  // Additional validation for valid dates
  const date = new Date(value);
  return isDate(date) && date.toISOString().startsWith(value);
}

/**
 * Check if value is a valid ISO datetime string
 */
export function isISODateTimeString(value: unknown): value is ISODateTimeString {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  return isDate(date);
}

/**
 * Check if value is a valid Unix timestamp (milliseconds)
 */
export function isUnixTimestamp(value: unknown): value is UnixTimestamp {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= 8640000000000000 // Max timestamp
  );
}

/**
 * Check if value is a valid Unix timestamp in seconds
 */
export function isUnixTimestampSeconds(value: unknown): value is UnixTimestampSeconds {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= 8640000000000 // Max timestamp in seconds
  );
}

/**
 * Check if value is a valid TimeUnit
 */
export function isTimeUnit(value: unknown): value is TimeUnit {
  const validUnits: TimeUnit[] = [
    'millisecond', 'milliseconds', 'ms',
    'second', 'seconds', 's',
    'minute', 'minutes', 'm',
    'hour', 'hours', 'h',
    'day', 'days', 'd',
    'week', 'weeks', 'w',
    'month', 'months', 'M',
    'quarter', 'quarters', 'Q',
    'year', 'years', 'y',
  ];
  return typeof value === 'string' && validUnits.includes(value as TimeUnit);
}

/**
 * Check if value is a valid IANA timezone
 */
export function isIANATimezone(value: unknown): value is IANATimezone {
  if (typeof value !== 'string') return false;
  
  // Basic check for IANA timezone format
  const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
  return timezoneRegex.test(value) || value === 'UTC';
}

/**
 * Validate and create a branded PositiveInteger
 */
export function toPositiveInteger(value: number): PositiveInteger | null {
  return isPositiveInteger(value) ? (value as PositiveInteger) : null;
}

/**
 * Validate and create a branded NonNegativeInteger
 */
export function toNonNegativeInteger(value: number): NonNegativeInteger | null {
  return isNonNegativeInteger(value) ? (value as NonNegativeInteger) : null;
}

/**
 * Validate and create a branded ISODateString
 */
export function toISODateString(value: string): ISODateString | null {
  return isISODateString(value) ? (value as ISODateString) : null;
}

/**
 * Validate and create a branded ISODateTimeString
 */
export function toISODateTimeString(value: string): ISODateTimeString | null {
  return isISODateTimeString(value) ? (value as ISODateTimeString) : null;
}

/**
 * Validate and create a branded UnixTimestamp
 */
export function toUnixTimestamp(value: number): UnixTimestamp | null {
  return isUnixTimestamp(value) ? (value as UnixTimestamp) : null;
}

/**
 * Validate and create a branded UnixTimestampSeconds
 */
export function toUnixTimestampSeconds(value: number): UnixTimestampSeconds | null {
  return isUnixTimestampSeconds(value) ? (value as UnixTimestampSeconds) : null;
}

/**
 * Validate date string with specific format
 */
export function validateDateString(
  dateString: string,
  format?: string,
): DateValidationResult {
  try {
    const date = new Date(dateString);
    
    if (!isDate(date)) {
      return {
        isValid: false,
        error: 'Invalid date string',
      };
    }
    
    // Additional format validation can be added here
    const moment = require('moment-timezone');
    const momentDate = moment(dateString, format, true);
    
    if (!momentDate.isValid()) {
      return {
        isValid: false,
        error: `Date string does not match format: ${format}`,
      };
    }
    
    return {
      isValid: true,
      date: momentDate,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Assert value is a positive integer
 */
export function assertPositiveInteger(
  value: unknown,
  name: string = 'value',
): asserts value is PositiveInteger {
  if (!isPositiveInteger(value)) {
    throw new TypeError(`${name} must be a positive integer, got: ${value}`);
  }
}

/**
 * Assert value is a non-negative integer
 */
export function assertNonNegativeInteger(
  value: unknown,
  name: string = 'value',
): asserts value is NonNegativeInteger {
  if (!isNonNegativeInteger(value)) {
    throw new TypeError(`${name} must be a non-negative integer, got: ${value}`);
  }
}

/**
 * Assert value is a valid DayOfWeek
 */
export function assertDayOfWeek(
  value: unknown,
  name: string = 'value',
): asserts value is DayOfWeek {
  if (!isDayOfWeek(value)) {
    throw new TypeError(`${name} must be a day of week (0-6), got: ${value}`);
  }
}

/**
 * Assert value is a valid MonthOfYear
 */
export function assertMonthOfYear(
  value: unknown,
  name: string = 'value',
): asserts value is MonthOfYear {
  if (!isMonthOfYear(value)) {
    throw new TypeError(`${name} must be a month of year (0-11), got: ${value}`);
  }
}

/**
 * Assert value is a valid HourOfDay
 */
export function assertHourOfDay(
  value: unknown,
  name: string = 'value',
): asserts value is HourOfDay {
  if (!isHourOfDay(value)) {
    throw new TypeError(`${name} must be an hour of day (0-23), got: ${value}`);
  }
}

/**
 * Assert value is a valid TimeFormat
 */
export function assertTimeFormat(
  value: unknown,
  name: string = 'value',
): asserts value is TimeFormat {
  if (!isTimeFormat(value)) {
    throw new TypeError(`${name} must be a valid time format (HH:mm), got: ${value}`);
  }
}

/**
 * Assert value is a valid DateInput
 */
export function assertDateInput(
  value: unknown,
  name: string = 'value',
): asserts value is DateInput {
  if (!isDateInput(value)) {
    throw new TypeError(`${name} must be a valid date input, got: ${typeof value}`);
  }
}

/**
 * Check if a year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Validate day of month for a given month and year
 */
export function isValidDayOfMonth(day: number, month: MonthOfYear, year: number): boolean {
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return false;
  }
  
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month];
}

/**
 * Export all type guards and validators
 */
export const TypeGuards = {
  isDate,
  isMoment,
  isDateInput,
  isStrictDateInput,
  isPositiveInteger,
  isNonNegativeInteger,
  isDayOfWeek,
  isMonthOfYear,
  isHourOfDay,
  isTimeFormat,
  isHolidayDateFormat,
  isTimezoneOffsetFormat,
  isISODateString,
  isISODateTimeString,
  isUnixTimestamp,
  isUnixTimestampSeconds,
  isTimeUnit,
  isIANATimezone,
  isLeapYear,
  isValidDayOfMonth,
};

export const Validators = {
  validateDateString,
  toPositiveInteger,
  toNonNegativeInteger,
  toISODateString,
  toISODateTimeString,
  toUnixTimestamp,
  toUnixTimestampSeconds,
};

export const Assertions = {
  assertPositiveInteger,
  assertNonNegativeInteger,
  assertDayOfWeek,
  assertMonthOfYear,
  assertHourOfDay,
  assertTimeFormat,
  assertDateInput,
};
