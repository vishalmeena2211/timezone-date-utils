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

// Export all types
export type {
  // Basic types
  DateInput,
  StrictDateInput,
  DateFormat,
  StrictDateFormat,
  Timezone,
  TimeUnit,
  TimeUnitSingular,
  TimeUnitPlural,
  TimeUnitAbbreviation,
  
  // Branded types
  ISODateString,
  ISODateTimeString,
  DateFormatString,
  TimezoneString,
  UnixTimestamp,
  UnixTimestampSeconds,
  TimeFormat,
  HolidayDateFormat,
  TimezoneOffsetFormat,
  
  // Numeric types
  DayOfWeek,
  MonthOfYear,
  HourOfDay,
  MinuteOfHour,
  SecondOfMinute,
  PositiveInteger,
  NonNegativeInteger,
  TimezoneOffsetMinutes,
  
  // Range and duration types
  DateRange,
  MutableDateRange,
  Duration,
  StrictDuration,
  
  // Date information types
  BookingDates,
  BookingStatus,
  CalendarDay,
  DayName,
  MonthName,
  
  // Validation and comparison types
  DateValidationResult,
  DateValidationSuccess,
  DateValidationError,
  DateComparisonResult,
  BetweenInclusivity,
  
  // Status and period types
  AvailabilityStatus,
  OccupancyPeriod,
  OccupancyStatus,
  TimeSlot,
  BusinessHours,
  StrictBusinessHours,
  Holiday,
  
  // Filter and range types
  DateFilterOptions,
  StrictDateFilterOptions,
  DateRangePreset,
  ReportRangeType,
  
  // Recurring pattern types
  RecurringPattern,
  RecurringPatternType,
  StrictRecurringPattern,
  
  // Timezone types
  TimezoneInfo,
  IANATimezone,
  
  // Result types
  RangeOverlapResult,
  DateDifferenceResult,
  AgeResult,
  SeparatedDateTime,
  DateComponents,
  BusinessDayOptions,
  
  // Function types
  TypeGuard,
  Validator,
  ValidatorWithResult,
  DateParser,
  DateFormatter,
  MomentLike,
  
  // Utility types
  SortOrder,
  RequiredAll,
  PartialAll,
  ReadonlyDeep,
  StringLiterals,
} from './types';

// Export type guards and validators
export {
  // Type guards
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
  
  // Validators
  validateDateString,
  toPositiveInteger,
  toNonNegativeInteger,
  toISODateString,
  toISODateTimeString,
  toUnixTimestamp,
  toUnixTimestampSeconds,
  
  // Assertions
  assertPositiveInteger,
  assertNonNegativeInteger,
  assertDayOfWeek,
  assertMonthOfYear,
  assertHourOfDay,
  assertTimeFormat,
  assertDateInput,
  
  // Grouped exports
  TypeGuards,
  Validators,
  Assertions,
} from './type-guards';

// Export constants
export * from './constants/timezone';

// Re-export moment types for convenience
export type { Moment } from 'moment-timezone';

