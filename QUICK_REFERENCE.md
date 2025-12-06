# Quick Reference: New Functions in v1.1.0

## 🎯 Age Calculation

```typescript
import { calculateAge, calculateAgeFromDDMMYYYY, getDetailedAge } from 'timezone-date-utils';

calculateAge('1990-05-15')                    // 34
calculateAgeFromDDMMYYYY('15/05/1990')       // 34 (with validation)
getDetailedAge('1990-05-15')                 // { years: 34, months: 7, days: 1 }
```

## 🇮🇳 Indian Formats

```typescript
import {
  formatIndianDate,
  formatIndianDateSlash,
  formatIndianDateTime,
  formatInvoiceDate
} from 'timezone-date-utils';

formatIndianDate(date)        // "15-12-2025"
formatIndianDateSlash(date)   // "15/12/2025"
formatIndianDateTime(date)    // "15/12/2025, 14:30"
formatInvoiceDate(date)       // "15-12-2025, 2:30 PM"
```

## 🕐 Time Formats

```typescript
import {
  formatTimeOnly,
  formatTime12Hour,
  formatDatabaseDateTime,
  formatRoomSalesDate
} from 'timezone-date-utils';

formatTimeOnly(date)          // "14:30"
formatTime12Hour(date)        // "02:30 PM"
formatDatabaseDateTime(date)  // "2025-12-15 14:30:00"
formatRoomSalesDate(date)     // "2025-12-15 14:30"
```

## 🔄 Date/Time Separation

```typescript
import { separateDateTime, separateDateTimeWithAMPM } from 'timezone-date-utils';

separateDateTime('2025-12-15 14:30:00')
// { date: "15-12-2025", time: "14:30" }

separateDateTimeWithAMPM('2025-12-15 14:30:00')
// { date: "15-12-2025", time: "02:30 PM" }
```

## 📅 Date Ranges

```typescript
import {
  dateRangeInChunks,
  getDateArray,
  getOverlapDays,
  doRangesOverlap
} from 'timezone-date-utils';

dateRangeInChunks('2025-01-01', '2025-12-31', 30)  // Array of chunks
getDateArray('2025-12-15', '2025-12-20')           // Array of Date objects
getOverlapDays(start1, end1, start2, end2)         // 2 (days)
doRangesOverlap(start1, end1, start2, end2)        // true/false
```

## ✅ Validation

```typescript
import {
  isValidYYYYMMDD,
  isValidDDMMYYYY,
  isValidDDMMYYYYSlash,
  isSameDay
} from 'timezone-date-utils';

isValidYYYYMMDD('2025-12-15')       // true
isValidDDMMYYYY('15-12-2025')       // true
isValidDDMMYYYYSlash('15/12/2025')  // true
isSameDay(date1, date2)             // true/false
```

## ⏰ Relative Dates

```typescript
import { daysAgo, daysFromNow, hoursAgo, hoursFromNow } from 'timezone-date-utils';

daysAgo(7)          // Date 7 days ago
daysFromNow(14)     // Date 14 days from now
hoursAgo(24)        // Date 24 hours ago
hoursFromNow(12)    // Date 12 hours from now
```

## 📊 Sorting & Min/Max

```typescript
import {
  sortDatesAscending,
  sortDatesDescending,
  getEarliestDate,
  getLatestDate
} from 'timezone-date-utils';

sortDatesAscending([date3, date1, date2])    // [date1, date2, date3]
sortDatesDescending([date1, date2, date3])   // [date3, date2, date1]
getEarliestDate([date1, date2, date3])       // date1
getLatestDate([date1, date2, date3])         // date3
```

## 🔄 Conversions

```typescript
import {
  dateToMoment,
  momentToDate,
  isoToMoment,
  parseMultipleFormats
} from 'timezone-date-utils';

dateToMoment(new Date())                    // Moment
momentToDate(momentInstance)                // Date
isoToMoment('2025-12-15T14:30:00Z')        // Moment
parseMultipleFormats(str, [fmt1, fmt2])    // Moment or null
```

## 🔑 Date Keys (for grouping)

```typescript
import { toDateKey, toMonthKey, toYearKey, toWeekKey } from 'timezone-date-utils';

toDateKey(date)     // "2025-12-15"
toMonthKey(date)    // "2025-12"
toYearKey(date)     // "2025"
toWeekKey(date)     // "2025-W50"
```

## 📝 Constants

```typescript
import { DATE_FORMATS } from 'timezone-date-utils';

DATE_FORMATS.INDIAN_DATE            // 'DD-MM-YYYY'
DATE_FORMATS.INDIAN_DATE_SLASH      // 'DD/MM/YYYY'
DATE_FORMATS.INDIAN_DATETIME        // 'DD/MM/YYYY, HH:mm'
DATE_FORMATS.INDIAN_DATETIME_AMPM   // 'DD-MM-YYYY, h:mm A'
```

## 🚀 Common Use Cases

### Guest Check-in Age Verification
```typescript
import { calculateAgeFromDDMMYYYY } from 'timezone-date-utils';

const age = calculateAgeFromDDMMYYYY(guestDOB);
if (age < 18) throw new Error('Must be 18+');
```

### Invoice Date Formatting
```typescript
import { formatIndianDate, formatTime12Hour } from 'timezone-date-utils';

const invoiceDate = formatIndianDate(invoice.date);
const invoiceTime = formatTime12Hour(invoice.date);
```

### Room Availability Check
```typescript
import { doRangesOverlap } from 'timezone-date-utils';

const isConflict = existingBookings.some(booking =>
  doRangesOverlap(
    requestedCheckIn, requestedCheckOut,
    booking.checkIn, booking.checkOut
  )
);
```

### Report Date Grouping
```typescript
import { toMonthKey } from 'timezone-date-utils';

const byMonth = bookings.reduce((acc, booking) => {
  const key = toMonthKey(booking.date);
  acc[key] = acc[key] || [];
  acc[key].push(booking);
  return acc;
}, {});
```

### C-form Date Separation
```typescript
import { separateDateTime } from 'timezone-date-utils';

const { date, time } = separateDateTime(transaction.checkinTime);
// Submit to government portal
```

---

**Package**: timezone-date-utils  
**Version**: 1.1.0  
**Total Functions**: 100+  
**New in v1.1.0**: 40+ functions
