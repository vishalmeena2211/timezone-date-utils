# Strict Types v2 - No String/Number Fallbacks

## Overview

The library now enforces **strict typing without any `string` or `number` fallbacks** for timezone and format types. This ensures maximum type safety at compile time.

## Changes Made

### 1. Timezone Types

#### Before (v1.2.0)
```typescript
export type IANATimezone = 
  | 'Asia/Kolkata'
  | 'UTC'
  // ... other timezones
  | string; // ❌ Allowed any string
```

#### After (v1.2.1)
```typescript
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
  // ✅ No string fallback - only listed timezones allowed

export type Timezone = IANATimezone; // Strict by default
```

**Impact:**
- ✅ Compile-time validation of timezone strings
- ✅ Auto-complete shows only valid timezones
- ✅ Prevents typos like `'Asia/Kolkatta'` (extra 't')
- ✅ Prevents invalid timezones like `'IST'` or `'PST'`

### 2. Date Format Types

#### New: StrictDateFormat

```typescript
export type StrictDateFormat =
  // Standard formats
  | 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  | 'YYYY-MM-DD'
  | 'HH:mm:ss'
  // Display formats
  | 'DD MMM YYYY'
  | 'DD MMMM YYYY'
  | 'DD/MM/YYYY'
  // ... 30+ predefined formats
  // ✅ No string fallback
```

**When to use:**
- Use `StrictDateFormat` for compile-time validation
- Use `DateFormat` (still `string`) for custom moment.js formats

```typescript
// ✅ Strict - only predefined formats
function formatStrict(date: DateInput, format: StrictDateFormat): string {
  return format(date, format);
}

// ✅ Flexible - any moment.js format
function formatCustom(date: DateInput, format: DateFormat): string {
  return format(date, format);
}
```

## Usage Examples

### Example 1: Strict Timezone Usage

```typescript
import { now, Timezone } from 'timezone-date-utils';

// ✅ Valid - auto-complete will show only valid timezones
const istTime = now('Asia/Kolkata');
const utcTime = now('UTC');
const estTime = now('America/New_York');

// ❌ TypeScript Error - not in the allowed list
const invalid = now('IST'); // Error: Type '"IST"' is not assignable to type 'IANATimezone'
const typo = now('Asia/Kolkatta'); // Error: Type '"Asia/Kolkatta"' is not assignable
```

### Example 2: Strict Format Usage

```typescript
import { format, StrictDateFormat } from 'timezone-date-utils';

const date = now();

// ✅ Valid - predefined format
const formatted1 = format(date, 'YYYY-MM-DD');
const formatted2 = format(date, 'DD MMM YYYY, hh:mm A');

// For custom formats, explicitly type as DateFormat
const customFormat: DateFormat = 'YYYY [Year] MM [Month]';
const formatted3 = format(date, customFormat);
```

### Example 3: Type-Safe Function Parameters

```typescript
import { Timezone, IANATimezone, createDate } from 'timezone-date-utils';

// Function that only accepts valid timezones
function getBusinessHours(timezone: IANATimezone) {
  const now = createDate(undefined, undefined, timezone);
  // TypeScript guarantees timezone is valid
}

// ✅ Valid calls
getBusinessHours('Asia/Kolkata');
getBusinessHours('America/New_York');

// ❌ TypeScript Error
getBusinessHours('PST'); // Error: Argument of type '"PST"' is not assignable
getBusinessHours('Invalid'); // Error
```

### Example 4: Branded Types with Strict Validation

```typescript
import { 
  TimezoneString, 
  DateFormatString,
  isIANATimezone 
} from 'timezone-date-utils';

// Runtime validation for dynamic values
function validateUserTimezone(input: string): TimezoneString | null {
  if (isIANATimezone(input)) {
    return input as TimezoneString;
  }
  return null;
}

const userInput = 'Asia/Dubai';
const validated = validateUserTimezone(userInput);

if (validated) {
  // Can now use with confidence
  const time = now(validated);
}
```

## Type Safety Benefits

### 1. Compile-Time Validation

```typescript
// Before v1.2.1
const tz1: Timezone = 'Invalid_Timezone'; // ✅ Compiled (but wrong!)

// After v1.2.1
const tz2: Timezone = 'Invalid_Timezone'; // ❌ TypeScript Error
```

### 2. IDE Auto-Complete

When typing timezone parameter, IDE will show:
```
'Asia/Kolkata'
'UTC'
'America/New_York'
'America/Los_Angeles'
'Europe/London'
'Asia/Dubai'
'Asia/Singapore'
'Australia/Sydney'
'Asia/Tokyo'
'Asia/Hong_Kong'
```

No more guessing or looking up documentation!

### 3. Prevents Common Mistakes

```typescript
// Common mistakes that are now caught:
now('IST');              // ❌ Not valid IANA timezone
now('EST');              // ❌ Use 'America/New_York' instead
now('PST');              // ❌ Use 'America/Los_Angeles' instead
now('Asia/Kolkatta');    // ❌ Typo caught
format(date, 'YYYYMMDD'); // ❌ Missing dash (if using StrictDateFormat)
```

## Migration Guide

### Migrating from v1.2.0 to v1.2.1

#### If you used custom timezones:

**Before:**
```typescript
const customTz: Timezone = 'Asia/Bangkok'; // Was allowed
const time = now(customTz);
```

**After:**
You have two options:

**Option 1: Use IANATimezone (Recommended)**
```typescript
// Add to the IANATimezone type in your fork/PR
export type IANATimezone = 
  | 'Asia/Kolkata'
  | 'Asia/Bangkok' // Add your timezone
  | /* ... other timezones */;
```

**Option 2: Type as DateFormat for flexibility**
```typescript
// For dynamic/user-provided timezones
const customTz = 'Asia/Bangkok' as string;
const time = now(customTz); // Works but loses type safety
```

**Option 3: Use branded type with validation**
```typescript
import { isIANATimezone } from 'timezone-date-utils';

const userTz = getUserTimezoneInput(); // string from user
if (isIANATimezone(userTz)) {
  const time = now(userTz); // Type-safe
} else {
  // Handle invalid timezone
}
```

#### If you used custom formats:

**Before:**
```typescript
const fmt: DateFormat = 'Custom [Format]'; // Was allowed
```

**After:**
```typescript
// Still works - DateFormat is still string for flexibility
const fmt: DateFormat = 'Custom [Format]';

// But if you want strict validation:
const strictFmt: StrictDateFormat = 'YYYY-MM-DD'; // Only predefined
```

## Best Practices

### 1. Use Strict Types at Function Boundaries

```typescript
// ✅ Good - strict types in public API
export function bookRoom(
  checkIn: ISODateString,
  nights: PositiveInteger,
  timezone: IANATimezone
): Booking {
  // Implementation
}

// ❌ Avoid - loose types in public API
export function bookRoom(
  checkIn: string,
  nights: number,
  timezone: string
): Booking {
  // Less type safe
}
```

### 2. Validate at Boundaries, Trust Internally

```typescript
import { toISODateString, assertPositiveInteger, isIANATimezone } from 'timezone-date-utils';

export function processBooking(
  checkInStr: string,
  nightsInput: unknown,
  timezoneInput: string
) {
  // Validate at the boundary
  const checkIn = toISODateString(checkInStr);
  if (!checkIn) throw new Error('Invalid check-in date');
  
  assertPositiveInteger(nightsInput, 'nights');
  const nights = nightsInput as PositiveInteger;
  
  if (!isIANATimezone(timezoneInput)) {
    throw new Error('Invalid timezone');
  }
  
  // Now work with type-safe values
  return internalBooking(checkIn, nights, timezoneInput);
}

// Internal function trusts the types
function internalBooking(
  checkIn: ISODateString,
  nights: PositiveInteger,
  timezone: IANATimezone
) {
  // No validation needed - types guarantee correctness
}
```

### 3. Use Const Assertions for Literals

```typescript
import { TIMEZONES } from 'timezone-date-utils';

// ✅ Good - type-safe
const myTimezone = TIMEZONES.IST; // Type: 'Asia/Kolkata'
const time = now(myTimezone);

// ✅ Also good
const regions = ['Asia/Kolkata', 'UTC', 'America/New_York'] as const;
regions.forEach(tz => {
  console.log(now(tz)); // Type-safe
});
```

## Summary

| Aspect | Before v1.2.1 | After v1.2.1 |
|--------|---------------|--------------|
| Timezone Type | `IANATimezone` includes `\| string` | Strict - only 10 listed timezones |
| DateFormat Type | Only `string` | `StrictDateFormat` (30+ formats) + `DateFormat` (flexible) |
| Compile Safety | Weak - any string accepted | Strong - only valid values |
| Runtime Safety | Same - validation needed | Same - validation still needed |
| IDE Support | Poor - no auto-complete | Excellent - full auto-complete |
| Error Detection | Runtime only | Compile-time + Runtime |

## Breaking Changes

⚠️ **Potential Breaking Change:** If your code uses custom timezones not in the list, you'll get TypeScript errors.

**Solutions:**
1. Add your timezone to the `IANATimezone` type (recommended)
2. Use type assertion `as string` (loses type safety)
3. Use validation functions for dynamic values

## Future Considerations

If you need additional timezones, please:
1. Open an issue with the timezone name
2. Submit a PR adding it to `IANATimezone` type
3. We'll add commonly used timezones to the core list

Common requests we expect to add:
- `'Europe/Paris'`
- `'Asia/Shanghai'`
- `'America/Toronto'`
- `'Australia/Melbourne'`
- `'Asia/Bangkok'`
