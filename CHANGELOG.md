# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-06

### Added
- **Age Calculation Functions**:
  - `calculateAge()`: Calculate age from date of birth
  - `calculateAgeFromDDMMYYYY()`: Calculate age from DD/MM/YYYY format with validation
  - `getDetailedAge()`: Get age in years, months, and days

- **Date/Time Separation**:
  - `separateDateTime()`: Separate date and time into individual strings
  - `separateDateTimeWithAMPM()`: Separate with AM/PM format

- **Indian/Specialized Formatting**:
  - `formatIndianDate()`: Format as DD-MM-YYYY
  - `formatIndianDateSlash()`: Format as DD/MM/YYYY
  - `formatIndianDateTime()`: Format as DD/MM/YYYY, HH:mm
  - `formatInvoiceDate()`: Format for invoices (DD-MM-YYYY, h:mm A)
  - `formatDatabaseDateTime()`: Format for database queries (YYYY-MM-DD HH:mm:ss)
  - `formatTimeOnly()`: Format time only (HH:mm)
  - `formatTime12Hour()`: Format time with AM/PM (hh:mm A)
  - `formatFullMonthDate()`: Format with full month name (DD MMM YYYY)
  - `formatRoomSalesDate()`: Format for room sales reports (YYYY-MM-DD HH:mm)

- **Enhanced Date Range Operations**:
  - `dateRangeInChunks()`: Generate date range in manageable chunks
  - `getDateArray()`: Get array of Date objects between dates
  - `getOverlapDays()`: Calculate overlapping days between two date ranges
  - `doRangesOverlap()`: Check if two date ranges overlap
  - `isInOverlapPeriod()`: Check if date falls within a period (for check-in/out)

- **Validation Helpers**:
  - `isValidYYYYMMDD()`: Validate YYYY-MM-DD format
  - `isValidDDMMYYYY()`: Validate DD-MM-YYYY format
  - `isValidDDMMYYYYSlash()`: Validate DD/MM/YYYY format
  - `isSameDay()`: Compare dates ignoring time

- **Advanced Operations**:
  - `adjustTimeByOffset()`: Adjust time by offset hours and minutes
  - `daysAgo()`: Get date N days ago
  - `daysFromNow()`: Get date N days from now
  - `hoursAgo()`: Get date N hours ago
  - `hoursFromNow()`: Get date N hours from now

- **Sorting Helpers**:
  - `sortDatesAscending()`: Sort dates in ascending order
  - `sortDatesDescending()`: Sort dates in descending order
  - `getEarliestDate()`: Get earliest date from array
  - `getLatestDate()`: Get latest date from array

- **Conversion Helpers**:
  - `dateToMoment()`: Convert Date to Moment
  - `momentToDate()`: Convert Moment to Date
  - `isoToMoment()`: Parse ISO string to Moment
  - `parseMultipleFormats()`: Try parsing with multiple formats

- **Date Key Generation**:
  - `toDateKey()`: Generate date key for grouping (YYYY-MM-DD)
  - `toMonthKey()`: Generate month key (YYYY-MM)
  - `toYearKey()`: Generate year key (YYYY)
  - `toWeekKey()`: Generate week key (YYYY-Www)

### Enhanced
- Added Indian date format constants:
  - `DATE_FORMATS.INDIAN_DATE`: 'DD-MM-YYYY'
  - `DATE_FORMATS.INDIAN_DATE_SLASH`: 'DD/MM/YYYY'
  - `DATE_FORMATS.INDIAN_DATETIME`: 'DD/MM/YYYY, HH:mm'
  - `DATE_FORMATS.INDIAN_DATETIME_AMPM`: 'DD-MM-YYYY, h:mm A'

### Documentation
- Updated README with all new functions and examples
- Added real-world use cases from backend and worker repositories
- Enhanced API reference with Indian format examples
- Added age calculation examples for guest management
- Added date range chunking examples for large datasets

## [1.0.1] - 2025-12-06

### Changed
- **BREAKING**: Package renamed from `@digistay/date-utils` to `timezone-date-utils`
- Removed redundant `moment` dependency (moment-timezone already includes it)
- Updated all documentation with correct package name
- Lighter and more optimized package

### Dependencies
- moment-timezone: ^0.5.48 (moment.js is included)

## [1.0.0] - 2025-12-06

### Added
- Initial release of timezone-date-utils
- 60+ date and time utility functions
- Full TypeScript support with type definitions
- Support for both ESM and CJS module systems
- Works in both Node.js backend and browser frontend
- Timezone-aware operations with IST as default
- Hotel-specific functions (check-in/out, night audit, etc.)
- Business day calculations
- Date range utilities
- Comprehensive formatting options
- Moment.js wrapper with enhanced functionality
- Full test coverage with Vitest
- Complete documentation and examples

### Features
- **Creation & Parsing**: now, createDate, parseDate, fromTimestamp, fromUnix, etc.
- **Formatting**: format, formatDisplay, toISOString, toDBFormat, etc.
- **Manipulation**: add, subtract, startOf, endOf, setTime, etc.
- **Comparison**: isBefore, isAfter, isSame, isBetween, etc.
- **Difference Calculations**: diff, diffInDays, diffInHours, etc.
- **Validation**: isValid, isLeapYear, isToday, isWeekend, etc.
- **Getters**: getYear, getMonth, getDayOfWeek, etc.
- **Hotel Functions**: calculateNights, getCheckInTime, getNightAuditDate, etc.
- **Business Days**: getNextBusinessDay, countBusinessDays, etc.
- **Date Ranges**: dateRange, getTodayRange, getThisMonthRange, etc.
- **Utilities**: min, max, clone, toTimezone, fromNow, calendar, etc.

### Dependencies
- moment: ^2.30.1
- moment-timezone: ^0.5.48
- TypeScript: ^5.7.2
- Vitest: ^4.0.15 (dev)

### Module Support
- ESM (ECMAScript Modules)
- CJS (CommonJS)
- TypeScript declarations included
