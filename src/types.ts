/**
 * Type Definitions for Date Utilities
 * Common types used across date operations
 */

import { Moment } from 'moment-timezone';

/**
 * Date input types - accepts various formats
 */
export type DateInput = string | number | Date | Moment;

/**
 * Time unit for date operations
 */
export type TimeUnit = 
  | 'millisecond' | 'milliseconds' | 'ms'
  | 'second' | 'seconds' | 's'
  | 'minute' | 'minutes' | 'm'
  | 'hour' | 'hours' | 'h'
  | 'day' | 'days' | 'd'
  | 'week' | 'weeks' | 'w'
  | 'month' | 'months' | 'M'
  | 'quarter' | 'quarters' | 'Q'
  | 'year' | 'years' | 'y';

/**
 * Date format string
 */
export type DateFormat = string;

/**
 * Timezone identifier
 */
export type Timezone = string;

/**
 * Date range with start and end
 */
export interface DateRange {
  start: Moment;
  end: Moment;
}

/**
 * Duration object for adding/subtracting time
 */
export interface Duration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

/**
 * Booking date information
 */
export interface BookingDates {
  checkIn: Moment;
  checkOut: Moment;
  nights: number;
  isWeekendStay: boolean;
  isPastDue: boolean;
}

/**
 * Calendar day information
 */
export interface CalendarDay {
  date: string;
  displayDate: string;
  dayOfWeek: number;
  dayName: string;
  isWeekend: boolean;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}

/**
 * Report date range type
 */
export type ReportRangeType = 
  | 'today'
  | 'yesterday'
  | 'this_week'
  | 'last_week'
  | 'this_month'
  | 'last_month'
  | 'this_quarter'
  | 'last_quarter'
  | 'this_year'
  | 'last_year'
  | 'last_7_days'
  | 'last_30_days'
  | 'last_90_days'
  | 'custom';

/**
 * Date comparison result
 */
export type DateComparisonResult = -1 | 0 | 1;

/**
 * Between inclusivity
 */
export type BetweenInclusivity = '()' | '[)' | '(]' | '[]';

/**
 * Availability status
 */
export interface AvailabilityStatus {
  date: string;
  isAvailable: boolean;
  isBlocked: boolean;
  isWeekend: boolean;
  isPast: boolean;
  bookingCount: number;
}

/**
 * Time slot
 */
export interface TimeSlot {
  start: Moment;
  end: Moment;
  duration: number; // in minutes
  label: string;
}

/**
 * Business hours
 */
export interface BusinessHours {
  open: string; // HH:mm format
  close: string; // HH:mm format
  isOpen24Hours: boolean;
  isClosed: boolean;
}

/**
 * Holiday definition
 */
export interface Holiday {
  date: string; // MM-DD format
  name: string;
  isFixed: boolean; // Fixed date or calculated
}

/**
 * Date validation result
 */
export interface DateValidationResult {
  isValid: boolean;
  error?: string;
  date?: Moment;
}

/**
 * Occupancy period
 */
export interface OccupancyPeriod {
  checkIn: Moment;
  checkOut: Moment;
  nights: number;
  guestName?: string;
  roomNumber?: string;
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
}

/**
 * Date filter options
 */
export interface DateFilterOptions {
  from?: DateInput;
  to?: DateInput;
  includeWeekends?: boolean;
  includeHolidays?: boolean;
  timezone?: Timezone;
}

/**
 * Recurring pattern
 */
export interface RecurringPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // Every N days/weeks/months/years
  daysOfWeek?: number[]; // For weekly patterns
  dayOfMonth?: number; // For monthly patterns
  monthOfYear?: number; // For yearly patterns
  endDate?: Moment;
  occurrences?: number;
}

/**
 * Time zone info
 */
export interface TimezoneInfo {
  name: string;
  abbreviation: string;
  offset: number; // in minutes
  offsetFormatted: string; // "+05:30"
  isDST: boolean;
}
