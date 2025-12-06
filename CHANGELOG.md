# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-06

### Added
- Initial release of @digistay/date-utils
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
