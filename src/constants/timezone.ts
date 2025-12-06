/**
 * Date and Timezone Constants
 * All timezone and date-related constants for the application
 */

export const TIMEZONES = {
  IST: 'Asia/Kolkata',
  UTC: 'UTC',
  EST: 'America/New_York',
  PST: 'America/Los_Angeles',
  GMT: 'Europe/London',
  DUBAI: 'Asia/Dubai',
  SINGAPORE: 'Asia/Singapore',
  SYDNEY: 'Australia/Sydney',
  TOKYO: 'Asia/Tokyo',
  HONG_KONG: 'Asia/Hong_Kong',
} as const;

export const DEFAULT_TIMEZONE = TIMEZONES.IST;

export const DATE_FORMATS = {
  // Standard formats
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  ISO_DATE: 'YYYY-MM-DD',
  ISO_TIME: 'HH:mm:ss',
  
  // Display formats
  DISPLAY_DATE: 'DD MMM YYYY',
  DISPLAY_DATE_FULL: 'DD MMMM YYYY',
  DISPLAY_DATE_SHORT: 'DD/MM/YYYY',
  DISPLAY_DATE_LONG: 'dddd, DD MMMM YYYY',
  
  // Time formats
  DISPLAY_TIME_12: 'hh:mm A',
  DISPLAY_TIME_24: 'HH:mm',
  DISPLAY_TIME_FULL_12: 'hh:mm:ss A',
  DISPLAY_TIME_FULL_24: 'HH:mm:ss',
  
  // Combined date-time formats
  DISPLAY_DATETIME: 'DD MMM YYYY, hh:mm A',
  DISPLAY_DATETIME_FULL: 'DD MMMM YYYY, hh:mm:ss A',
  DISPLAY_DATETIME_SHORT: 'DD/MM/YYYY HH:mm',
  DISPLAY_DATETIME_LONG: 'dddd, DD MMMM YYYY, hh:mm A',
  
  // Hotel specific formats
  CHECK_IN_OUT: 'DD MMM YYYY',
  BOOKING_DATE: 'DD/MM/YYYY',
  INVOICE_DATE: 'DD-MMM-YYYY',
  REPORT_DATE: 'YYYY-MM-DD',
  
  // Timestamp formats
  TIMESTAMP: 'YYYY-MM-DD HH:mm:ss',
  TIMESTAMP_WITH_ZONE: 'YYYY-MM-DD HH:mm:ss Z',
  
  // File naming formats
  FILE_DATE: 'YYYYMMDD',
  FILE_DATETIME: 'YYYYMMDD_HHmmss',
  
  // Database formats
  DB_DATE: 'YYYY-MM-DD',
  DB_DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DB_TIMESTAMP: 'YYYY-MM-DD HH:mm:ss.SSS',
} as const;

export const TIME_UNITS = {
  MILLISECOND: 'millisecond',
  SECOND: 'second',
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
} as const;

export const DAY_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

export const MONTH_OF_YEAR = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
} as const;

export const HOTEL_TIMINGS = {
  CHECK_IN_TIME: '14:00',  // 2:00 PM
  CHECK_OUT_TIME: '11:00', // 11:00 AM
  NIGHT_AUDIT_TIME: '00:00', // Midnight
  LATE_CHECK_OUT_TIME: '18:00', // 6:00 PM
} as const;

export const DATE_RANGES = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'this_week',
  LAST_WEEK: 'last_week',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_QUARTER: 'this_quarter',
  LAST_QUARTER: 'last_quarter',
  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  CUSTOM: 'custom',
} as const;

export const MILLISECONDS_IN = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

export const SECONDS_IN = {
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000, // Approximate (30 days)
  YEAR: 31536000, // Approximate (365 days)
} as const;

export const MINUTES_IN = {
  HOUR: 60,
  DAY: 1440,
  WEEK: 10080,
} as const;

export const HOURS_IN = {
  DAY: 24,
  WEEK: 168,
} as const;

export const INDIAN_HOLIDAYS = {
  REPUBLIC_DAY: '01-26',
  INDEPENDENCE_DAY: '08-15',
  GANDHI_JAYANTI: '10-02',
  // Add more holidays as needed
} as const;

export const BUSINESS_DAYS = [
  DAY_OF_WEEK.MONDAY,
  DAY_OF_WEEK.TUESDAY,
  DAY_OF_WEEK.WEDNESDAY,
  DAY_OF_WEEK.THURSDAY,
  DAY_OF_WEEK.FRIDAY,
] as const;

export const WEEKEND_DAYS = [
  DAY_OF_WEEK.SATURDAY,
  DAY_OF_WEEK.SUNDAY,
] as const;
