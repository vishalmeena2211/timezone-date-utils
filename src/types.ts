/**
 * Type Definitions for Date Utilities
 * Common types used across date operations
 */

import { Moment } from 'moment-timezone';

/**
 * Branded type for ISO date strings (YYYY-MM-DD)
 */
export type ISODateString = string & { readonly __brand: 'ISODateString' };

/**
 * Branded type for ISO datetime strings
 */
export type ISODateTimeString = string & { readonly __brand: 'ISODateTimeString' };

/**
 * Branded type for date format strings
 */
export type DateFormatString = string & { readonly __brand: 'DateFormatString' };

/**
 * Branded type for timezone identifiers
 */
export type TimezoneString = string & { readonly __brand: 'TimezoneString' };

/**
 * Date input types - accepts various formats
 */
export type DateInput = string | number | Date | Moment;

/**
 * Strict date input that only accepts valid date types
 */
export type StrictDateInput = Date | Moment;

/**
 * Unix timestamp in milliseconds
 */
export type UnixTimestamp = number & { readonly __brand: 'UnixTimestamp' };

/**
 * Unix timestamp in seconds
 */
export type UnixTimestampSeconds = number & { readonly __brand: 'UnixTimestampSeconds' };

/**
 * Time unit for date operations (singular forms)
 */
export type TimeUnitSingular = 
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

/**
 * Time unit for date operations (plural forms)
 */
export type TimeUnitPlural = 
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'quarters'
  | 'years';

/**
 * Time unit abbreviations
 */
export type TimeUnitAbbreviation = 
  | 'ms'
  | 's'
  | 'm'
  | 'h'
  | 'd'
  | 'w'
  | 'M'
  | 'Q'
  | 'y';

/**
 * All valid time units
 */
export type TimeUnit = TimeUnitSingular | TimeUnitPlural | TimeUnitAbbreviation;

/**
 * Valid IANA timezone identifiers (exhaustive list)
 * No string fallback - only listed timezones are allowed
 */
export type IANATimezone = 
  | 'Asia/Kolkata'
  | 'UTC'
  | 'America/New_York'
  | 'America/Los_Angeles'
  | 'Europe/London'
  | 'Asia/Dubai'
  | 'Asia/Singapore'
  | 'Australia/Sydney'
  | 'Asia/Tokyo'
  | 'Asia/Hong_Kong';

/**
 * Timezone identifier - only accepts valid IANA timezone strings
 * Use IANATimezone for strict typing
 */
export type Timezone = IANATimezone;

/**
 * Valid date format strings (exhaustive list)
 * Based on DATE_FORMATS constants
 * This is the strict type that only allows predefined formats
 */
export type StrictDateFormat =
  // Standard formats
  | 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  | 'YYYY-MM-DD'
  | 'HH:mm:ss'
  // Year and month formats
  | 'YYYY'
  | 'YYYYMM'
  | 'YYYY-MM'
  // Simple date formats
  | 'M/D'
  | 'MM/DD'
  | 'M/D/YY'
  | 'MM/DD/YY'
  | 'MM/DD/YYYY'
  // Display formats
  | 'DD MMM YY'
  | 'DD MMM YYYY'
  | 'DD MMMM YYYY'
  | 'DD/MM/YYYY'
  | 'dddd, DD MMMM YYYY'
  | 'ddd, MMM DD, YYYY'
  | 'dddd, MMM DD'
  | 'ddd, MMM DD'
  | 'MMM D, YY'
  | 'MMM D, YYYY'
  | 'MMM DD, YYYY'
  | 'MMMM D, YYYY'
  | 'MMMM DD, YYYY'
  | 'DD MMM'
  | 'MMM DD'
  | 'ddd, DD MMM YYYY'
  | 'dddd, DD MMM YYYY'
  | 'DD-MMM-YY'
  | 'MMM YYYY'
  | 'MMMM YYYY'
  // Alternative date formats
  | 'YYYY_MM_DD'
  | 'YYYY.MM.DD'
  // Time formats
  | 'h:mm A'
  | 'hh:mm A'
  | '@ h:mm A'
  | 'HH:mm'
  | 'hh:mm:ss A'
  | 'HH:mm:ss'
  | 'hh A'
  | 'h A'
  | 'HH'
  | 'H:mm'
  | 'hh:ss A'
  | 'mm:ss'
  | 'HH:mm:ss.SSS'
  // Combined date-time formats
  | 'DD MMM YYYY, hh:mm A'
  | 'DD MMMM YYYY, hh:mm:ss A'
  | 'DD/MM/YYYY HH:mm'
  | 'dddd, DD MMMM YYYY, hh:mm A'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD h:mm A'
  | 'YYYY-MM-DD hh:mm A'
  | 'YYYY-MM-DD @ h:mm A'
  // Hotel specific formats
  | 'DD-MMM-YYYY'
  // Indian formats
  | 'DD-MM-YYYY'
  | 'DD-MM-YYYY HH:mm'
  | 'DD/MM/YYYY, HH:mm'
  | 'DD/MM/YYYY, HH:mm:ss'
  | 'DD-MM-YYYY, h:mm A'
  | 'DD-MM-YY'
  | 'DD-MM-YY; hh:mm A'
  // Timestamp formats
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MM-DD HH:mm:ss Z'
  | 'YYYY-MM-DD HH:mm.ss'
  // File naming formats
  | 'YYYYMMDD'
  | 'YYYYMMDDHHmm'
  | 'YYYYMMDD_HHmm'
  | 'YYYYMMDDHHmmss'
  | 'YYYYMMDD_HHmmss'
  | 'YYYY.MM.DD.HHmm'
  | 'YYYY-MM-DD-HHmm'
  | 'YYYY-MM-DD_HHmm'
  | 'YYYY.MM.DD.HH.mm'
  | 'YYYY-MM-DD-HH-mm'
  | 'YYYY.MM.DD.HHmmss'
  | 'YYYY-MM-DD-HHmmss'
  | 'YYYY-MM-DD_HHmmss'
  | 'YYYY-MM-DD_HHmm.ss'
  | 'YYYY.MM.DD.HH.mm.ss'
  | 'YYYY-MM-DD-HH-mm-ss'
  | 'YYYY-MM-DD h:mm:ss A'
  | 'YYYY-MM-DD hh:mm:ss A'
  | 'YYYY-MM-DD @ h:mm:ss A'
  // Database formats
  | 'YYYY-MM-DD HH:mm:ss.SSS'
  // Weekday date formats
  | 'dd MMM D YY'
  | 'ddd MMM D YY'
  | 'ddd MMM D YYYY'
  | 'ddd MMM DD YYYY'
  | 'dddd, MMM D YYYY'
  | 'dddd, MMMM D, YYYY'
  | 'dddd, MMMM DD, YYYY'
  // Weekday date-time formats with h:mm A
  | 'ddd MMM D YY h:mm A'
  | 'ddd MMM D YYYY h:mm A'
  | 'ddd MMM DD YYYY h:mm A'
  | 'dddd, MMM D YYYY h:mm A'
  | 'dddd, MMMM D, YYYY h:mm A'
  | 'dddd, MMMM DD, YYYY h:mm A'
  // Weekday date-time formats with hh:mm A
  | 'ddd MMM D YY hh:mm A'
  | 'ddd MMM D YYYY hh:mm A'
  | 'ddd MMM DD YYYY hh:mm A'
  | 'dddd, MMM D YYYY hh:mm A'
  | 'dddd, MMMM D, YYYY hh:mm A'
  | 'dddd, MMMM DD, YYYY hh:mm A'
  // Weekday date-time formats with @ h:mm A
  | 'ddd MMM D YY @ h:mm A'
  | 'ddd MMM D YYYY @ h:mm A'
  | 'ddd MMM DD YYYY @ h:mm A'
  | 'dddd, MMM D YYYY @ h:mm A'
  | 'dddd, MMMM D, YYYY @ h:mm A'
  | 'dddd, MMMM DD, YYYY @ h:mm A';

/**
 * Date format type - now strictly uses StrictDateFormat
 * Only predefined formats are allowed for maximum type safety
 * No string fallback - prevents invalid format strings at compile time
 */
export type DateFormat = StrictDateFormat;

/**
 * Day of week (0-6, Sunday to Saturday)
 */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Month of year (0-11, January to December)
 */
export type MonthOfYear = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Hour of day (0-23)
 */
export type HourOfDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;

/**
 * Minute of hour (0-59)
 */
export type MinuteOfHour = number & { readonly __min: 0; readonly __max: 59 };

/**
 * Second of minute (0-59)
 */
export type SecondOfMinute = number & { readonly __min: 0; readonly __max: 59 };

/**
 * Date range with start and end
 */
export interface DateRange {
  readonly start: Moment;
  readonly end: Moment;
}

/**
 * Mutable date range
 */
export interface MutableDateRange {
  start: Moment;
  end: Moment;
}

/**
 * Duration object for adding/subtracting time
 */
export interface Duration {
  readonly years?: number;
  readonly months?: number;
  readonly weeks?: number;
  readonly days?: number;
  readonly hours?: number;
  readonly minutes?: number;
  readonly seconds?: number;
  readonly milliseconds?: number;
}

/**
 * Strict duration with at least one field
 */
export type StrictDuration = Duration & (
  | { years: number }
  | { months: number }
  | { weeks: number }
  | { days: number }
  | { hours: number }
  | { minutes: number }
  | { seconds: number }
  | { milliseconds: number }
);

/**
 * Booking status
 */
export type BookingStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

/**
 * Booking date information
 */
export interface BookingDates {
  readonly checkIn: Moment;
  readonly checkOut: Moment;
  readonly nights: number;
  readonly isWeekendStay: boolean;
  readonly isPastDue: boolean;
}

/**
 * Day name
 */
export type DayName = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

/**
 * Month name
 */
export type MonthName = 
  | 'January' | 'February' | 'March' | 'April' | 'May' | 'June'
  | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

/**
 * Calendar day information
 */
export interface CalendarDay {
  readonly date: ISODateString;
  readonly displayDate: string;
  readonly dayOfWeek: DayOfWeek;
  readonly dayName: DayName;
  readonly isWeekend: boolean;
  readonly isToday: boolean;
  readonly isPast: boolean;
  readonly isFuture: boolean;
}

/**
 * Between inclusivity
 */
export type BetweenInclusivity = '()' | '[)' | '(]' | '[]';

/**
 * Time format (HH:mm)
 */
export type TimeFormat = `${number}${number}:${number}${number}`;

/**
 * Positive integer
 */
export type PositiveInteger = number & { readonly __brand: 'PositiveInteger' };

/**
 * Non-negative integer
 */
export type NonNegativeInteger = number & { readonly __brand: 'NonNegativeInteger' };

/**
 * Availability status
 */
export interface AvailabilityStatus {
  readonly date: ISODateString;
  readonly isAvailable: boolean;
  readonly isBlocked: boolean;
  readonly isWeekend: boolean;
  readonly isPast: boolean;
  readonly bookingCount: NonNegativeInteger;
}

/**
 * Time slot
 */
export interface TimeSlot {
  readonly start: Moment;
  readonly end: Moment;
  readonly duration: PositiveInteger; // in minutes
  readonly label: string;
}

/**
 * Business hours
 */
export interface BusinessHours {
  readonly open: TimeFormat; // HH:mm format
  readonly close: TimeFormat; // HH:mm format
  readonly isOpen24Hours: boolean;
  readonly isClosed: boolean;
}

/**
 * Strict business hours - either open with times, 24 hours, or closed
 */
export type StrictBusinessHours = 
  | { readonly open: TimeFormat; readonly close: TimeFormat; readonly isOpen24Hours: false; readonly isClosed: false }
  | { readonly open: '00:00'; readonly close: '00:00'; readonly isOpen24Hours: true; readonly isClosed: false }
  | { readonly open: '00:00'; readonly close: '00:00'; readonly isOpen24Hours: false; readonly isClosed: true };

/**
 * Holiday date format (MM-DD)
 */
export type HolidayDateFormat = `${number}${number}-${number}${number}`;

/**
 * Holiday definition
 */
export interface Holiday {
  readonly date: HolidayDateFormat; // MM-DD format
  readonly name: string;
  readonly isFixed: boolean; // Fixed date or calculated
}

/**
 * Date validation success result
 */
export interface DateValidationSuccess {
  readonly isValid: true;
  readonly date: Moment;
}

/**
 * Date validation error result
 */
export interface DateValidationError {
  readonly isValid: false;
  readonly error: string;
}

/**
 * Date validation result
 */
export type DateValidationResult = DateValidationSuccess | DateValidationError;

/**
 * Occupancy status
 */
export type OccupancyStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

/**
 * Occupancy period
 */
export interface OccupancyPeriod {
  readonly checkIn: Moment;
  readonly checkOut: Moment;
  readonly nights: PositiveInteger;
  readonly guestName?: string;
  readonly roomNumber?: string;
  readonly status: OccupancyStatus;
}

/**
 * Date filter options
 */
export interface DateFilterOptions {
  readonly from?: DateInput;
  readonly to?: DateInput;
  readonly includeWeekends?: boolean;
  readonly includeHolidays?: boolean;
  readonly timezone?: Timezone;
}

/**
 * Strict date filter options with both from and to required
 */
export interface StrictDateFilterOptions {
  readonly from: DateInput;
  readonly to: DateInput;
  readonly includeWeekends: boolean;
  readonly includeHolidays: boolean;
  readonly timezone: Timezone;
}

/**
 * Recurring pattern type
 */
export type RecurringPatternType = 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Recurring pattern
 */
export interface RecurringPattern {
  readonly type: RecurringPatternType;
  readonly interval: PositiveInteger; // Every N days/weeks/months/years
  readonly daysOfWeek?: ReadonlyArray<DayOfWeek>; // For weekly patterns
  readonly dayOfMonth?: number; // For monthly patterns (1-31)
  readonly monthOfYear?: MonthOfYear; // For yearly patterns
  readonly endDate?: Moment;
  readonly occurrences?: PositiveInteger;
}

/**
 * Strict recurring pattern - enforce constraints based on type
 */
export type StrictRecurringPattern = 
  | {
      readonly type: 'daily';
      readonly interval: PositiveInteger;
      readonly endDate?: Moment;
      readonly occurrences?: PositiveInteger;
    }
  | {
      readonly type: 'weekly';
      readonly interval: PositiveInteger;
      readonly daysOfWeek: ReadonlyArray<DayOfWeek>;
      readonly endDate?: Moment;
      readonly occurrences?: PositiveInteger;
    }
  | {
      readonly type: 'monthly';
      readonly interval: PositiveInteger;
      readonly dayOfMonth: number;
      readonly endDate?: Moment;
      readonly occurrences?: PositiveInteger;
    }
  | {
      readonly type: 'yearly';
      readonly interval: PositiveInteger;
      readonly monthOfYear: MonthOfYear;
      readonly dayOfMonth: number;
      readonly endDate?: Moment;
      readonly occurrences?: PositiveInteger;
    };

/**
 * Timezone offset in minutes
 */
export type TimezoneOffsetMinutes = number & { readonly __brand: 'TimezoneOffsetMinutes' };

/**
 * Timezone offset format (+HH:mm or -HH:mm)
 */
export type TimezoneOffsetFormat = `${'+' | '-'}${number}${number}:${number}${number}`;

/**
 * Time zone info
 */
export interface TimezoneInfo {
  readonly name: TimezoneString;
  readonly abbreviation: string;
  readonly offset: TimezoneOffsetMinutes; // in minutes
  readonly offsetFormatted: TimezoneOffsetFormat; // "+05:30"
  readonly isDST: boolean;
}

/**
 * Date comparison result
 */
export type DateComparisonResult = -1 | 0 | 1;

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc' | 'ascending' | 'descending';

/**
 * Type guard result
 */
export type TypeGuard<T> = (value: unknown) => value is T;

/**
 * Validator function that returns boolean
 */
export type Validator<T> = (value: T) => boolean;

/**
 * Validator function that returns validation result
 */
export type ValidatorWithResult<T> = (value: T) => DateValidationResult;

/**
 * Date parser function
 */
export type DateParser = (dateString: string, format?: DateFormat) => Moment | null;

/**
 * Date formatter function
 */
export type DateFormatter = (date: DateInput, format?: DateFormat) => string;

/**
 * Range overlap result
 */
export interface RangeOverlapResult {
  readonly overlaps: boolean;
  readonly overlapStart?: Moment;
  readonly overlapEnd?: Moment;
  readonly overlapDays: NonNegativeInteger;
}

/**
 * Date difference result
 */
export interface DateDifferenceResult {
  readonly years: number;
  readonly months: number;
  readonly weeks: number;
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;
}

/**
 * Age calculation result
 */
export interface AgeResult {
  readonly years: NonNegativeInteger;
  readonly months: NonNegativeInteger;
  readonly days: NonNegativeInteger;
  readonly totalDays: NonNegativeInteger;
  readonly isAdult: boolean; // >= 18 years
  readonly isSenior: boolean; // >= 60 years
}

/**
 * Separated date and time
 */
export interface SeparatedDateTime {
  readonly date: string;
  readonly time: string;
}

/**
 * Date components
 */
export interface DateComponents {
  readonly year: number;
  readonly month: MonthOfYear;
  readonly day: number;
  readonly hour: HourOfDay;
  readonly minute: number; // 0-59
  readonly second: number; // 0-59
  readonly millisecond: number; // 0-999
}

/**
 * Business day options
 */
export interface BusinessDayOptions {
  readonly excludeWeekends: boolean;
  readonly excludeHolidays: boolean;
  readonly holidays?: ReadonlyArray<Holiday>;
  readonly timezone: Timezone;
}

/**
 * Date range preset
 */
export type DateRangePreset = 
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'this_week'
  | 'last_week'
  | 'next_week'
  | 'this_month'
  | 'last_month'
  | 'next_month'
  | 'this_quarter'
  | 'last_quarter'
  | 'next_quarter'
  | 'this_year'
  | 'last_year'
  | 'next_year'
  | 'last_7_days'
  | 'last_30_days'
  | 'last_90_days'
  | 'next_7_days'
  | 'next_30_days'
  | 'next_90_days'
  | 'custom';

/**
 * Report date range type (alias for backward compatibility)
 */
export type ReportRangeType = DateRangePreset;

/**
 * Moment-like interface for type compatibility
 */
export interface MomentLike {
  format(format?: string): string;
  toDate(): Date;
  valueOf(): number;
  unix(): number;
  toISOString(): string;
}

/**
 * Type utilities
 */

/**
 * Make all properties required
 */
export type RequiredAll<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Make all properties optional
 */
export type PartialAll<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties readonly
 */
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};

/**
 * Extract all string literal types from a union
 */
export type StringLiterals<T> = T extends string ? T : never;
