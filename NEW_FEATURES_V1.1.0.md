# New Features in v1.1.0

This document summarizes the new utility functions added to the timezone-date-utils library based on patterns identified in the hotel-backend and workers repositories.

## 🎯 Overview

Version 1.1.0 adds **40+ new utility functions** that address common date/time operations found across the DigiStay ecosystem, with special focus on:

- Age calculations for guest management
- Indian date formats for invoices and reports
- Date range operations for large datasets
- Enhanced validation and formatting
- Sorting and conversion helpers

---

## 📊 Age Calculation

### `calculateAge(dateOfBirth, referenceDate?, timezone?): number`
Calculate age in years from a date of birth.

```typescript
import { calculateAge } from 'timezone-date-utils';

const age = calculateAge('1990-05-15'); // 34 (current age)
const ageAt = calculateAge('1990-05-15', '2020-01-01'); // 29 (age at specific date)
```

### `calculateAgeFromDDMMYYYY(dateString, referenceDate?, timezone?): number | null`
Parse DD/MM/YYYY format and calculate age with validation.

```typescript
import { calculateAgeFromDDMMYYYY } from 'timezone-date-utils';

const age = calculateAgeFromDDMMYYYY('15/05/1990'); // 34
const invalid = calculateAgeFromDDMMYYYY('invalid'); // null
```

**Use Case**: Guest check-in age verification, analytics by age groups

### `getDetailedAge(dateOfBirth, referenceDate?, timezone?): { years, months, days }`
Get detailed age breakdown.

```typescript
import { getDetailedAge } from 'timezone-date-utils';

const age = getDetailedAge('2020-05-15');
// { years: 4, months: 7, days: 1 }
```

---

## 🔄 Date/Time Separation

### `separateDateTime(dateTime, dateFormat?, timeFormat?, timezone?): { date, time }`
Split datetime into separate formatted strings.

```typescript
import { separateDateTime } from 'timezone-date-utils';

const { date, time } = separateDateTime('2025-12-15 14:30:00');
// date: "15-12-2025", time: "14:30"
```

**Use Case**: C-form submissions, government portal integrations

### `separateDateTimeWithAMPM(dateTime, dateFormat?, timezone?): { date, time }`
Split datetime with 12-hour time format.

```typescript
import { separateDateTimeWithAMPM } from 'timezone-date-utils';

const { date, time } = separateDateTimeWithAMPM('2025-12-15 14:30:00');
// date: "15-12-2025", time: "02:30 PM"
```

---

## 🇮🇳 Indian/Specialized Formatting

### Indian Date Formats

```typescript
import {
  formatIndianDate,
  formatIndianDateSlash,
  formatIndianDateTime,
} from 'timezone-date-utils';

const date = '2025-12-15 14:30:00';

formatIndianDate(date);        // "15-12-2025"
formatIndianDateSlash(date);   // "15/12/2025"
formatIndianDateTime(date);    // "15/12/2025, 14:30"
```

**Use Case**: Invoice generation, government reports, guest documents

### Report & Database Formats

```typescript
import {
  formatInvoiceDate,
  formatDatabaseDateTime,
  formatRoomSalesDate,
} from 'timezone-date-utils';

formatInvoiceDate(date);         // "15-12-2025, 2:30 PM"
formatDatabaseDateTime(date);    // "2025-12-15 14:30:00"
formatRoomSalesDate(date);       // "2025-12-15 14:30"
```

**Use Case**: PDF invoices, SQL queries, analytics reports

### Time-Only Formats

```typescript
import {
  formatTimeOnly,
  formatTime12Hour,
  formatFullMonthDate,
} from 'timezone-date-utils';

formatTimeOnly(date);          // "14:30"
formatTime12Hour(date);        // "02:30 PM"
formatFullMonthDate(date);     // "15 Dec 2025"
```

---

## 📅 Enhanced Date Range Operations

### `dateRangeInChunks(start, end, chunkSize?, timezone?): Moment[][]`
Split large date ranges into manageable chunks.

```typescript
import { dateRangeInChunks } from 'timezone-date-utils';

const chunks = dateRangeInChunks('2025-01-01', '2025-12-31', 30);
// Array of 12 arrays, each with ~30 dates
```

**Use Case**: Processing large calendar updates, batch operations

### `getDateArray(startDate, endDate, timezone?): Date[]`
Get array of Date objects between dates.

```typescript
import { getDateArray } from 'timezone-date-utils';

const dates = getDateArray('2025-12-15', '2025-12-20');
// [Date, Date, Date, Date, Date, Date]
```

**Use Case**: Calendar generation, availability checks

### `getOverlapDays(range1Start, range1End, range2Start, range2End, timezone?): number`
Calculate overlapping days between two ranges.

```typescript
import { getOverlapDays } from 'timezone-date-utils';

const overlap = getOverlapDays(
  '2025-12-15', '2025-12-20',
  '2025-12-18', '2025-12-25'
); // 2 days
```

**Use Case**: Room inventory management, double-booking prevention

### `doRangesOverlap(range1Start, range1End, range2Start, range2End, timezone?): boolean`
Check if two date ranges overlap.

```typescript
import { doRangesOverlap } from 'timezone-date-utils';

const hasOverlap = doRangesOverlap(
  '2025-12-15', '2025-12-20',
  '2025-12-18', '2025-12-25'
); // true
```

### `isInOverlapPeriod(date, startDate, endDate, includeEnd?, timezone?): boolean`
Check if date falls within check-in/check-out period.

```typescript
import { isInOverlapPeriod } from 'timezone-date-utils';

const inPeriod = isInOverlapPeriod(
  '2025-12-17',
  '2025-12-15',
  '2025-12-20'
); // true
```

**Use Case**: Room allocation, blocking calendar dates

---

## ✅ Enhanced Validation

### Format Validators

```typescript
import {
  isValidYYYYMMDD,
  isValidDDMMYYYY,
  isValidDDMMYYYYSlash,
} from 'timezone-date-utils';

isValidYYYYMMDD('2025-12-15');    // true
isValidDDMMYYYY('15-12-2025');    // true
isValidDDMMYYYYSlash('15/12/2025'); // true
```

**Use Case**: Form validation, API input sanitization

### `isSameDay(date1, date2, timezone?): boolean`
Compare dates ignoring time component.

```typescript
import { isSameDay } from 'timezone-date-utils';

isSameDay('2025-12-15 09:00', '2025-12-15 18:00'); // true
```

---

## 🔧 Advanced Operations

### Time Adjustments

```typescript
import {
  adjustTimeByOffset,
  daysAgo,
  daysFromNow,
  hoursAgo,
  hoursFromNow,
} from 'timezone-date-utils';

adjustTimeByOffset(date, 5, 30);  // Add 5h 30m
daysAgo(7);                       // 7 days ago
daysFromNow(14);                  // 14 days from now
hoursAgo(24);                     // 24 hours ago
hoursFromNow(12);                 // 12 hours from now
```

**Use Case**: IST conversions, relative date calculations

---

## 📊 Sorting & Aggregation

### Sorting Helpers

```typescript
import {
  sortDatesAscending,
  sortDatesDescending,
  getEarliestDate,
  getLatestDate,
} from 'timezone-date-utils';

const dates = ['2025-12-20', '2025-12-15', '2025-12-18'];

sortDatesAscending(dates);    // [Dec 15, Dec 18, Dec 20]
sortDatesDescending(dates);   // [Dec 20, Dec 18, Dec 15]
getEarliestDate(dates);       // Dec 15
getLatestDate(dates);         // Dec 20
```

**Use Case**: Report generation, analytics, date-based sorting

---

## 🔄 Conversion Helpers

```typescript
import {
  dateToMoment,
  momentToDate,
  isoToMoment,
  parseMultipleFormats,
} from 'timezone-date-utils';

// Type conversions
dateToMoment(new Date());
momentToDate(momentInstance);
isoToMoment('2025-12-15T14:30:00Z');

// Flexible parsing
parseMultipleFormats(
  '15/12/2025',
  ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD']
);
```

**Use Case**: API integrations, data migrations, flexible input handling

---

## 🔑 Date Key Generation

Perfect for data grouping and aggregation.

```typescript
import {
  toDateKey,
  toMonthKey,
  toYearKey,
  toWeekKey,
} from 'timezone-date-utils';

const date = '2025-12-15';

toDateKey(date);    // "2025-12-15"
toMonthKey(date);   // "2025-12"
toYearKey(date);    // "2025"
toWeekKey(date);    // "2025-W50"
```

**Use Case**: Reports grouping, analytics dashboards, data aggregation

```typescript
// Example: Group bookings by month
const bookings = [...];
const byMonth = bookings.reduce((acc, booking) => {
  const key = toMonthKey(booking.date);
  acc[key] = acc[key] || [];
  acc[key].push(booking);
  return acc;
}, {});
```

---

## 🎨 New Constants

Added Indian date format constants:

```typescript
import { DATE_FORMATS } from 'timezone-date-utils';

DATE_FORMATS.INDIAN_DATE           // 'DD-MM-YYYY'
DATE_FORMATS.INDIAN_DATE_SLASH     // 'DD/MM/YYYY'
DATE_FORMATS.INDIAN_DATETIME       // 'DD/MM/YYYY, HH:mm'
DATE_FORMATS.INDIAN_DATETIME_AMPM  // 'DD-MM-YYYY, h:mm A'
```

---

## 🚀 Real-World Examples

### Guest Check-in with Age Verification

```typescript
import { calculateAgeFromDDMMYYYY, formatIndianDate } from 'timezone-date-utils';

function processGuestCheckin(dobString: string) {
  const age = calculateAgeFromDDMMYYYY(dobString);
  
  if (age === null) {
    throw new Error('Invalid date of birth format');
  }
  
  if (age < 18) {
    throw new Error('Guest must be 18 or older');
  }
  
  return {
    age,
    category: age >= 60 ? 'senior' : 'adult'
  };
}
```

### Room Inventory with Overlap Detection

```typescript
import { doRangesOverlap, getOverlapDays } from 'timezone-date-utils';

function checkRoomAvailability(
  requestedCheckIn: string,
  requestedCheckOut: string,
  existingBookings: Booking[]
) {
  for (const booking of existingBookings) {
    if (doRangesOverlap(
      requestedCheckIn, requestedCheckOut,
      booking.checkIn, booking.checkOut
    )) {
      const overlapDays = getOverlapDays(
        requestedCheckIn, requestedCheckOut,
        booking.checkIn, booking.checkOut
      );
      
      return {
        available: false,
        conflict: booking,
        overlapDays
      };
    }
  }
  
  return { available: true };
}
```

### Invoice Generation with Indian Formats

```typescript
import {
  formatIndianDate,
  formatTime12Hour,
  separateDateTimeWithAMPM
} from 'timezone-date-utils';

function generateInvoiceData(transaction: Transaction) {
  const { date: checkInDate, time: checkInTime } = 
    separateDateTimeWithAMPM(transaction.checkInTime);
  
  return {
    invoiceNumber: transaction.invoiceNumber,
    invoiceDate: formatIndianDate(transaction.invoiceDate),
    checkIn: {
      date: checkInDate,
      time: checkInTime
    },
    // ... more fields
  };
}
```

### Report Generation with Chunking

```typescript
import { dateRangeInChunks, toDateKey } from 'timezone-date-utils';

async function generateAnnualReport(year: number) {
  const chunks = dateRangeInChunks(
    `${year}-01-01`,
    `${year}-12-31`,
    30
  );
  
  const results = await Promise.all(
    chunks.map(async (dateChunk) => {
      const dates = dateChunk.map(d => toDateKey(d));
      return await fetchRevenueData(dates);
    })
  );
  
  return consolidateResults(results);
}
```

---

## 📈 Migration Guide

If you're using custom date utilities in your codebase, here's how to migrate:

### Before (Custom Implementation)
```typescript
// hotel-backend/src/utils/date.ts
function formatDateToDDMMYYYYIndian(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return moment(date).tz('Asia/Kolkata').format('DD/MM/YYYY');
}
```

### After (Using Library)
```typescript
import { formatIndianDateSlash } from 'timezone-date-utils';

// Direct replacement
const formatted = formatIndianDateSlash(dateInput);
```

### Before (Age Calculation)
```typescript
if (date_of_birth) {
  const [day, month, year] = date_of_birth.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  if (!isNaN(birthDate.getTime())) {
    const age = new Date().getFullYear() - birthDate.getFullYear();
    mixpanelData.age = age;
  }
}
```

### After (Using Library)
```typescript
import { calculateAgeFromDDMMYYYY } from 'timezone-date-utils';

const age = calculateAgeFromDDMMYYYY(date_of_birth);
if (age !== null) {
  mixpanelData.age = age;
}
```

---

## 🎯 Benefits

1. **Reduced Code Duplication**: Same date operations used across 3+ repositories now centralized
2. **Better Validation**: Proper error handling for date parsing and validation
3. **Consistent Formatting**: All Indian formats follow the same standard
4. **Performance**: Optimized date range operations with chunking support
5. **Type Safety**: Full TypeScript support with proper types
6. **Tested**: All new functions have test coverage

---

## 📝 Summary

**Total New Functions**: 40+
**New Constants**: 4 date formats
**Use Cases Covered**:
- ✅ Guest management (age calculation)
- ✅ Invoice generation (Indian formats)
- ✅ Government portal integration (C-form)
- ✅ Room inventory (overlap detection)
- ✅ Report generation (chunking, grouping)
- ✅ Analytics (sorting, aggregation)

---

## 🔗 Related Documentation

- [Full API Reference](./README.md)
- [Examples](./examples.js)
- [Changelog](./CHANGELOG.md)
- [Development Guide](./DEVELOPMENT.md)
