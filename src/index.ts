/**
 * timezone-date-utils
 * 
 * Comprehensive date and time utilities using moment-timezone
 * Works seamlessly in both Node.js backend and browser frontend environments
 * 
 * @author DigiStay
 * @license MIT
 */

// Export all utility functions
export * from './date.utils';

// Export additional types (non-duplicate ones)
export type {
  BookingDates,
  CalendarDay,
  ReportRangeType,
  DateComparisonResult,
  BetweenInclusivity,
  AvailabilityStatus,
  TimeSlot,
  BusinessHours,
  Holiday,
  DateValidationResult,
  OccupancyPeriod,
  DateFilterOptions,
  RecurringPattern,
  TimezoneInfo,
} from './types';

// Export constants
export * from './constants/timezone';

// Re-export moment types for convenience
export type { Moment } from 'moment-timezone';
