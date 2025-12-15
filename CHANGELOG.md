# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2025-12-15

### Changed - Stricter Type Safety 🔒
- **BREAKING**: `IANATimezone` - Removed `| string` fallback
  - Now only accepts 10 predefined IANA timezones
  - Prevents invalid timezone strings at compile time
  - Provides IDE auto-complete for valid timezones
  
- **BREAKING**: `Timezone` type now strictly uses `IANATimezone`
  - No longer accepts arbitrary strings
  - Compile-time validation of timezone parameters
  
### Added - New Strict Types
- **`StrictDateFormat`**: Union type of 30+ predefined date formats
  - Based on `DATE_FORMATS` constants
  - Compile-time validation for known formats
  - `DateFormat` (string) still available for custom formats

### Documentation
- Added `STRICT_TYPES_V2.md`: Complete guide to strict types without fallbacks
- Migration guide for v1.2.0 → v1.2.1
- Best practices for strict type usage
- Examples of compile-time type safety

### Benefits
- ✅ **Compile-time validation** of timezones and formats
- ✅ **IDE auto-complete** shows only valid options
- ✅ **Prevents typos** like `'Asia/Kolkatta'` or `'IST'`
- ✅ **Better type safety** throughout the codebase
- ✅ **Zero runtime overhead** - types are compile-time only

### Migration Notes
- If using custom timezones not in the list, either:
  1. Add them to `IANATimezone` type (recommended)
  2. Use type assertion `as string` (loses safety)
  3. Use validation functions for dynamic values
- See `STRICT_TYPES_V2.md` for detailed migration guide

## [1.2.0] - 2025-12-15

### Added - Strict Types System 🎉
- **Branded Types** for enhanced type safety:
  - `ISODateString`: Branded string type for YYYY-MM-DD format
  - `ISODateTimeString`: Branded string type for ISO 8601 datetime
  - `UnixTimestamp`: Branded number type for millisecond timestamps
  - `UnixTimestampSeconds`: Branded number type for second timestamps
  - `PositiveInteger`: Branded number type for values > 0
  - `NonNegativeInteger`: Branded number type for values >= 0
  - `TimeFormat`: Template literal type for HH:mm format
  - `HolidayDateFormat`: Template literal type for MM-DD format
  - `TimezoneOffsetFormat`: Template literal type for ±HH:mm format

- **Strict Numeric Types**:
  - `DayOfWeek`: Literal type (0-6) for Sunday through Saturday
  - `MonthOfYear`: Literal type (0-11) for January through December
  - `HourOfDay`: Literal type (0-23) for hours in a day
  - `MinuteOfHour`: Branded type (0-59) for minutes
  - `SecondOfMinute`: Branded type (0-59) for seconds

- **Type Guards** (50+ guards):
  - `isDate()`, `isMoment()`, `isDateInput()`, `isStrictDateInput()`
  - `isPositiveInteger()`, `isNonNegativeInteger()`
  - `isDayOfWeek()`, `isMonthOfYear()`, `isHourOfDay()`
  - `isTimeFormat()`, `isISODateString()`, `isISODateTimeString()`
  - `isHolidayDateFormat()`, `isTimezoneOffsetFormat()`
  - `isUnixTimestamp()`, `isUnixTimestampSeconds()`
  - `isTimeUnit()`, `isIANATimezone()`
  - `isLeapYear()`, `isValidDayOfMonth()`

- **Validators**:
  - `toPositiveInteger()`: Validate and return branded type or null
  - `toNonNegativeInteger()`: Validate and return branded type or null
  - `toISODateString()`: Validate and return branded type or null
  - `toISODateTimeString()`: Validate and return branded type or null
  - `toUnixTimestamp()`: Validate and return branded type or null
  - `toUnixTimestampSeconds()`: Validate and return branded type or null
  - `validateDateString()`: Full validation with discriminated union result

- **Assertions** (throw on invalid):
  - `assertPositiveInteger()`, `assertNonNegativeInteger()`
  - `assertDayOfWeek()`, `assertMonthOfYear()`, `assertHourOfDay()`
  - `assertTimeFormat()`, `assertDateInput()`

- **Enhanced Types**:
  - `AgeResult`: Rich age result with `isAdult`, `isSenior` flags
  - `DateComponents`: Structured date components with strict types
  - `SeparatedDateTime`: Type-safe date/time separation
  - `StrictBusinessHours`: Discriminated union for business hours
  - `StrictRecurringPattern`: Type-safe recurring patterns
  - `DateValidationResult`: Discriminated union for validation
  - `RangeOverlapResult`: Detailed range overlap information

- **Grouped Exports**:
  - `TypeGuards`: Object containing all type guards
  - `Validators`: Object containing all validators
  - `Assertions`: Object containing all assertions

### Changed - Updated Return Types
- `getMonth()`: Now returns `MonthOfYear` (0-11)
- `getDayOfWeek()`: Now returns `DayOfWeek` (0-6)
- `getHour()`: Now returns `HourOfDay` (0-23)
- `toISODate()`: Now returns `ISODateString`
- `toTimestamp()`: Now returns `UnixTimestamp`
- `toUnix()`: Now returns `UnixTimestampSeconds`
- `calculateNights()`: Now returns `NonNegativeInteger`
- `countBusinessDays()`: Now returns `NonNegativeInteger`
- `calculateAge()`: Now returns `NonNegativeInteger`
- `getDetailedAge()`: Now returns `AgeResult` with additional flags
- `separateDateTime()`: Now returns `SeparatedDateTime`
- `separateDateTimeWithAMPM()`: Now returns `SeparatedDateTime`
- `getOverlapDays()`: Now returns `NonNegativeInteger`

### Added - New Functions
- `getDateComponents()`: Get all date parts in a structured object with strict types

### Documentation
- Added `STRICT_TYPES_GUIDE.md`: Comprehensive 600+ line guide
- Added `STRICT_TYPES_IMPLEMENTATION.md`: Implementation summary
- Added `strict-types-examples.ts`: 9 real-world examples
- Updated README.md with TypeScript section and strict types examples

### Notes
- ✅ **Zero Breaking Changes**: All existing code continues to work
- ✅ **Backward Compatible**: Strict types are opt-in enhancements
- ✅ **Zero Runtime Overhead**: Type checks are compile-time only
- ✅ **Production Ready**: All types tested and error-free

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
