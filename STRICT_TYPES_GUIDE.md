# Strict Types Guide

## Overview

The `digistay-date-utils` library now includes comprehensive strict typing to ensure type safety at compile time and runtime. This guide explains the available types and how to use them effectively.

## Table of Contents

- [Branded Types](#branded-types)
- [Numeric Types](#numeric-types)
- [String Types](#string-types)
- [Complex Types](#complex-types)
- [Type Guards](#type-guards)
- [Validators](#validators)
- [Assertions](#assertions)
- [Best Practices](#best-practices)

## Branded Types

Branded types provide additional type safety by creating distinct types from primitives that cannot be accidentally mixed.

### ISODateString

A string in the format `YYYY-MM-DD`.

```typescript
import { ISODateString, toISODateString } from 'digistay-date-utils';

// Validation
const dateStr = toISODateString('2024-01-15'); // ISODateString | null
if (dateStr) {
  console.log('Valid ISO date:', dateStr);
}
```

### ISODateTimeString

A string representing a full ISO 8601 datetime.

```typescript
import { ISODateTimeString, toISODateTimeString } from 'digistay-date-utils';

const dateTimeStr = toISODateTimeString('2024-01-15T10:30:00Z');
```

### UnixTimestamp

Unix timestamp in milliseconds (branded number).

```typescript
import { UnixTimestamp, toUnixTimestamp } from 'digistay-date-utils';

const timestamp = toUnixTimestamp(Date.now());
```

### UnixTimestampSeconds

Unix timestamp in seconds (branded number).

```typescript
import { UnixTimestampSeconds, toUnixTimestampSeconds } from 'digistay-date-utils';

const timestampSec = toUnixTimestampSeconds(Math.floor(Date.now() / 1000));
```

## Numeric Types

### DayOfWeek

Integer from 0-6 representing Sunday through Saturday.

```typescript
import { DayOfWeek, isDayOfWeek, assertDayOfWeek } from 'digistay-date-utils';

function processDay(day: DayOfWeek) {
  // day is guaranteed to be 0-6
}

const day = 1; // Monday
if (isDayOfWeek(day)) {
  processDay(day);
}

// Or use assertion
assertDayOfWeek(day); // Throws if invalid
processDay(day);
```

### MonthOfYear

Integer from 0-11 representing January through December.

```typescript
import { MonthOfYear, isMonthOfYear } from 'digistay-date-utils';

const month: MonthOfYear = 0; // January
```

### HourOfDay

Integer from 0-23 representing hours in a day.

```typescript
import { HourOfDay, isHourOfDay } from 'digistay-date-utils';

const hour: HourOfDay = 14; // 2 PM
```

### PositiveInteger

A positive integer (> 0).

```typescript
import { PositiveInteger, toPositiveInteger } from 'digistay-date-utils';

const nights = toPositiveInteger(3); // PositiveInteger | null
```

### NonNegativeInteger

A non-negative integer (>= 0).

```typescript
import { NonNegativeInteger, toNonNegativeInteger } from 'digistay-date-utils';

const count = toNonNegativeInteger(0); // NonNegativeInteger | null
```

## String Types

### TimeFormat

String in format `HH:mm`.

```typescript
import { TimeFormat, isTimeFormat } from 'digistay-date-utils';

const time = '14:30';
if (isTimeFormat(time)) {
  // time is now TimeFormat
  const validTime: TimeFormat = time;
}
```

### HolidayDateFormat

String in format `MM-DD`.

```typescript
import { HolidayDateFormat, isHolidayDateFormat } from 'digistay-date-utils';

const holiday = '01-26'; // Republic Day
if (isHolidayDateFormat(holiday)) {
  // holiday is now HolidayDateFormat
}
```

### TimezoneOffsetFormat

String in format `+HH:mm` or `-HH:mm`.

```typescript
import { TimezoneOffsetFormat, isTimezoneOffsetFormat } from 'digistay-date-utils';

const offset = '+05:30'; // IST offset
if (isTimezoneOffsetFormat(offset)) {
  // offset is now TimezoneOffsetFormat
}
```

## Complex Types

### DateRange

Immutable date range with start and end.

```typescript
import { DateRange, createDateRange } from 'digistay-date-utils';

const range: DateRange = createDateRange('2024-01-01', '2024-01-31');
// range.start and range.end are readonly
```

### Duration

Immutable duration object.

```typescript
import { Duration } from 'digistay-date-utils';

const duration: Duration = {
  days: 7,
  hours: 12,
  minutes: 30,
};
```

### StrictDuration

Duration with at least one field required.

```typescript
import { StrictDuration } from 'digistay-date-utils';

// Valid
const duration1: StrictDuration = { days: 1 };
const duration2: StrictDuration = { hours: 2, minutes: 30 };

// Invalid - at least one field required
// const invalid: StrictDuration = {}; // TypeScript error
```

### BusinessHours

Business hours definition.

```typescript
import { BusinessHours, TimeFormat } from 'digistay-date-utils';

const hours: BusinessHours = {
  open: '09:00' as TimeFormat,
  close: '18:00' as TimeFormat,
  isOpen24Hours: false,
  isClosed: false,
};
```

### StrictBusinessHours

Discriminated union for business hours with type safety.

```typescript
import { StrictBusinessHours } from 'digistay-date-utils';

// Regular hours
const regular: StrictBusinessHours = {
  open: '09:00',
  close: '18:00',
  isOpen24Hours: false,
  isClosed: false,
};

// 24 hours
const alwaysOpen: StrictBusinessHours = {
  open: '00:00',
  close: '00:00',
  isOpen24Hours: true,
  isClosed: false,
};

// Closed
const closed: StrictBusinessHours = {
  open: '00:00',
  close: '00:00',
  isOpen24Hours: false,
  isClosed: true,
};
```

### DateValidationResult

Discriminated union for validation results.

```typescript
import { DateValidationResult, validateDateString } from 'digistay-date-utils';

const result: DateValidationResult = validateDateString('2024-01-15');

if (result.isValid) {
  // TypeScript knows result.date exists
  console.log(result.date.format());
} else {
  // TypeScript knows result.error exists
  console.error(result.error);
}
```

### RecurringPattern

Base recurring pattern type.

```typescript
import { RecurringPattern, RecurringPatternType } from 'digistay-date-utils';

const pattern: RecurringPattern = {
  type: 'weekly',
  interval: 2,
  daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
};
```

### StrictRecurringPattern

Type-safe recurring pattern with pattern-specific fields.

```typescript
import { StrictRecurringPattern } from 'digistay-date-utils';

// Weekly pattern - requires daysOfWeek
const weekly: StrictRecurringPattern = {
  type: 'weekly',
  interval: 1,
  daysOfWeek: [1, 3, 5],
};

// Monthly pattern - requires dayOfMonth
const monthly: StrictRecurringPattern = {
  type: 'monthly',
  interval: 1,
  dayOfMonth: 15,
};

// Yearly pattern - requires both monthOfYear and dayOfMonth
const yearly: StrictRecurringPattern = {
  type: 'yearly',
  interval: 1,
  monthOfYear: 0, // January
  dayOfMonth: 1,
};
```

## Type Guards

Type guards are functions that check and narrow types at runtime.

### Basic Type Guards

```typescript
import {
  isDate,
  isMoment,
  isDateInput,
  isStrictDateInput,
} from 'digistay-date-utils';

const value: unknown = new Date();

if (isDate(value)) {
  // value is now Date
  console.log(value.getTime());
}

if (isMoment(value)) {
  // value is now Moment
  console.log(value.format());
}
```

### Numeric Type Guards

```typescript
import {
  isPositiveInteger,
  isNonNegativeInteger,
  isDayOfWeek,
  isMonthOfYear,
  isHourOfDay,
} from 'digistay-date-utils';

function processValue(value: unknown) {
  if (isPositiveInteger(value)) {
    // value is PositiveInteger
  }
  
  if (isDayOfWeek(value)) {
    // value is DayOfWeek (0-6)
  }
}
```

### String Type Guards

```typescript
import {
  isTimeFormat,
  isHolidayDateFormat,
  isTimezoneOffsetFormat,
  isISODateString,
  isISODateTimeString,
} from 'digistay-date-utils';

const time = '14:30';
if (isTimeFormat(time)) {
  // time is TimeFormat
}

const date = '2024-01-15';
if (isISODateString(date)) {
  // date is ISODateString
}
```

### Using TypeGuards Object

```typescript
import { TypeGuards } from 'digistay-date-utils';

const value = 15;
if (TypeGuards.isDayOfWeek(value)) {
  // value is DayOfWeek
}
```

## Validators

Validators create branded types from primitives.

```typescript
import { Validators } from 'digistay-date-utils';

// Returns branded type or null
const posInt = Validators.toPositiveInteger(5); // PositiveInteger | null
const isoDate = Validators.toISODateString('2024-01-15'); // ISODateString | null
const timestamp = Validators.toUnixTimestamp(Date.now()); // UnixTimestamp | null

// Validate date strings
const result = Validators.validateDateString('2024-01-15', 'YYYY-MM-DD');
if (result.isValid) {
  console.log(result.date);
}
```

## Assertions

Assertions throw TypeErrors if validation fails.

```typescript
import { Assertions } from 'digistay-date-utils';

function processDay(value: unknown) {
  // Throws if not valid, otherwise narrows type
  Assertions.assertDayOfWeek(value);
  // value is now DayOfWeek
  
  Assertions.assertPositiveInteger(value, 'day');
  // value is now PositiveInteger
}

// Individual assertions
import {
  assertPositiveInteger,
  assertDayOfWeek,
  assertTimeFormat,
  assertDateInput,
} from 'digistay-date-utils';

try {
  assertPositiveInteger(0, 'nights'); // Throws: "nights must be a positive integer"
} catch (error) {
  console.error(error.message);
}
```

## Best Practices

### 1. Use Branded Types at Boundaries

```typescript
import { ISODateString, toISODateString } from 'digistay-date-utils';

// API response type
interface BookingResponse {
  checkIn: ISODateString;
  checkOut: ISODateString;
}

// Validate at boundary
function parseBooking(data: unknown): BookingResponse | null {
  const checkIn = toISODateString(data.checkIn);
  const checkOut = toISODateString(data.checkOut);
  
  if (!checkIn || !checkOut) return null;
  
  return { checkIn, checkOut };
}
```

### 2. Use Type Guards for Unknown Values

```typescript
import { isDateInput, isPositiveInteger } from 'digistay-date-utils';

function processBooking(checkIn: unknown, nights: unknown) {
  if (!isDateInput(checkIn) || !isPositiveInteger(nights)) {
    throw new Error('Invalid booking data');
  }
  
  // checkIn and nights are now properly typed
}
```

### 3. Use Discriminated Unions for Results

```typescript
import { DateValidationResult } from 'digistay-date-utils';

function handleValidation(result: DateValidationResult) {
  if (result.isValid) {
    // TypeScript knows result.date exists
    return result.date.format();
  } else {
    // TypeScript knows result.error exists
    return `Error: ${result.error}`;
  }
}
```

### 4. Use ReadOnly Types for Immutability

```typescript
import { DateRange, Duration } from 'digistay-date-utils';

// These types have readonly properties
const range: DateRange = createDateRange('2024-01-01', '2024-01-31');
// range.start = something; // TypeScript error

const duration: Duration = { days: 7 };
// duration.days = 10; // TypeScript error
```

### 5. Use Strict Variants When Possible

```typescript
import {
  StrictDateInput,
  StrictDuration,
  StrictBusinessHours,
  StrictRecurringPattern,
} from 'digistay-date-utils';

// More type-safe than the base types
function processStrictDate(date: StrictDateInput) {
  // Only accepts Date or Moment, not strings or numbers
}
```

### 6. Combine with Utility Types

```typescript
import { ReadonlyDeep, RequiredAll, PartialAll } from 'digistay-date-utils';

interface Config {
  timezone: string;
  format: string;
  options?: {
    strict: boolean;
  };
}

// Make everything readonly recursively
type ImmutableConfig = ReadonlyDeep<Config>;

// Make all properties required
type RequiredConfig = RequiredAll<Config>;

// Make all properties optional
type OptionalConfig = PartialAll<Config>;
```

## TypeScript Configuration

For best results, ensure strict mode is enabled in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

## Examples

### Complete Booking System Example

```typescript
import {
  ISODateString,
  PositiveInteger,
  DateRange,
  BookingStatus,
  toISODateString,
  toPositiveInteger,
  createDateRange,
  calculateNights,
  isISODateString,
  assertPositiveInteger,
} from 'digistay-date-utils';

interface Booking {
  readonly id: string;
  readonly checkIn: ISODateString;
  readonly checkOut: ISODateString;
  readonly nights: PositiveInteger;
  readonly status: BookingStatus;
}

function createBooking(
  checkIn: string,
  checkOut: string,
): Booking | null {
  // Validate dates
  const validCheckIn = toISODateString(checkIn);
  const validCheckOut = toISODateString(checkOut);
  
  if (!validCheckIn || !validCheckOut) {
    return null;
  }
  
  // Calculate nights
  const nights = calculateNights(validCheckIn, validCheckOut);
  assertPositiveInteger(nights, 'nights');
  
  return {
    id: crypto.randomUUID(),
    checkIn: validCheckIn,
    checkOut: validCheckOut,
    nights: nights as PositiveInteger,
    status: 'confirmed',
  };
}

// Usage
const booking = createBooking('2024-01-15', '2024-01-18');
if (booking) {
  console.log(`Booking for ${booking.nights} nights`);
}
```

### Business Hours System Example

```typescript
import {
  StrictBusinessHours,
  TimeFormat,
  HourOfDay,
  isTimeFormat,
} from 'digistay-date-utils';

function createBusinessHours(
  open: string,
  close: string,
  is24Hours: boolean = false,
  isClosed: boolean = false,
): StrictBusinessHours | null {
  if (!isTimeFormat(open) || !isTimeFormat(close)) {
    return null;
  }
  
  if (is24Hours) {
    return {
      open: '00:00',
      close: '00:00',
      isOpen24Hours: true,
      isClosed: false,
    };
  }
  
  if (isClosed) {
    return {
      open: '00:00',
      close: '00:00',
      isOpen24Hours: false,
      isClosed: true,
    };
  }
  
  return {
    open,
    close,
    isOpen24Hours: false,
    isClosed: false,
  };
}

// Usage
const hours = createBusinessHours('09:00', '18:00');
if (hours && !hours.isOpen24Hours && !hours.isClosed) {
  console.log(`Open from ${hours.open} to ${hours.close}`);
}
```

## Summary

The strict type system provides:

- **Compile-time safety** with TypeScript's type system
- **Runtime validation** with type guards and validators
- **Immutability** with readonly properties
- **Brand types** to prevent mixing incompatible values
- **Discriminated unions** for type-safe result handling
- **Comprehensive documentation** with IntelliSense support

Use these types to build more robust and maintainable date/time handling code!
