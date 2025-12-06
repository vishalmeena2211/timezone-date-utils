# @digistay/date-utils

Comprehensive date and time utilities using moment-timezone with IST (Indian Standard Time) as the default timezone. Built for hotel management systems with specific hotel operations support. **Works seamlessly in both Node.js backend and browser frontend environments.**

## ✨ Features

- ✅ **Universal/Isomorphic** - Works in both Node.js and browsers
- ✅ **Timezone-Aware** - All operations respect timezones, default IST
- ✅ **moment-timezone** - Built on battle-tested library
- ✅ **Hotel-Specific** - Check-in/out times, night audit, etc.
- ✅ **Comprehensive** - 60+ utility functions
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Business Logic** - Weekend/weekday detection, business days
- ✅ **Flexible Formatting** - Multiple display formats
- ✅ **ESM & CJS** - Supports both module systems

## 📦 Installation

```bash
npm install @digistay/date-utils
# or
yarn add @digistay/date-utils
# or
pnpm add @digistay/date-utils
```

### Peer Dependencies

```bash
npm install moment moment-timezone
```

## 🚀 Usage

### Backend (Node.js / NestJS / Express)

```typescript
import * as DateUtil from '@digistay/date-utils';
// or
import { now, formatDisplay, calculateNights } from '@digistay/date-utils';

// Get current time in IST
const currentTime = DateUtil.now();

// Create a date
const checkIn = DateUtil.createDate('2025-12-15');

// Format for display
const displayDate = DateUtil.formatDisplay(checkIn); // "15 Dec 2025"

// Calculate nights between dates
const checkOut = DateUtil.createDate('2025-12-18');
const nights = DateUtil.calculateNights(checkIn, checkOut); // 3
```

### Frontend (React / Next.js / Vue / Angular)

```typescript
// React example
import { now, formatDisplay, isWeekend } from '@digistay/date-utils';
import { useEffect, useState } from 'react';

function DateDisplay() {
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    const date = now();
    const formatted = formatDisplay(date);
    const weekend = isWeekend(date);
    
    setCurrentDate(`${formatted}${weekend ? ' (Weekend)' : ''}`);
  }, []);
  
  return <div>{currentDate}</div>;
}
```

```typescript
// Next.js example
'use client';

import { calculateNights, formatDisplay } from '@digistay/date-utils';

export default function BookingCalculator({ checkIn, checkOut }) {
  const nights = calculateNights(checkIn, checkOut);
  
  return (
    <div>
      <p>Check-in: {formatDisplay(checkIn)}</p>
      <p>Check-out: {formatDisplay(checkOut)}</p>
      <p>Nights: {nights}</p>
    </div>
  );
}
```

## 📖 API Reference

### Creation and Parsing

```typescript
// Current time
DateUtil.now(); // Current time in IST
DateUtil.now('America/New_York'); // Current time in EST

// Create from various inputs
DateUtil.createDate('2025-12-15');
DateUtil.createDate(new Date());
DateUtil.createDate(1702636800000); // timestamp

// Parse with format
DateUtil.parseDate('15-12-2025', 'DD-MM-YYYY');
DateUtil.parseDateStrict('15/12/2025', 'DD/MM/YYYY');

// From timestamp
DateUtil.fromTimestamp(1702636800000);
DateUtil.fromUnix(1702636800); // Unix timestamp (seconds)

// From components
DateUtil.fromComponents(2025, 11, 15, 14, 30, 0); // Dec 15, 2025 2:30 PM
```

### Formatting

```typescript
const date = DateUtil.createDate('2025-12-15');

DateUtil.format(date); // "15 Dec 2025, 02:00 PM"
DateUtil.formatDisplay(date); // "15 Dec 2025"
DateUtil.formatDisplayWithTime(date); // "15 Dec 2025, 02:00 PM"

DateUtil.toISOString(date); // "2025-12-15T14:00:00.000+05:30"
DateUtil.toISODate(date); // "2025-12-15"
DateUtil.toDBFormat(date); // "2025-12-15 14:00:00"

DateUtil.toTimestamp(date); // milliseconds
DateUtil.toUnix(date); // seconds
```

### Manipulation

```typescript
const date = DateUtil.createDate('2025-12-15');

// Add/Subtract
DateUtil.add(date, 3, 'days'); // Dec 18
DateUtil.subtract(date, 1, 'month'); // Nov 15

// Duration
DateUtil.addDuration(date, { days: 3, hours: 2 });
DateUtil.subtractDuration(date, { weeks: 1 });

// Start/End of period
DateUtil.startOf(date, 'month'); // Dec 1, 2025 00:00:00
DateUtil.endOf(date, 'month'); // Dec 31, 2025 23:59:59

// Set values
DateUtil.setTime(date, 14, 30, 0); // Set to 2:30 PM
DateUtil.set(date, { year: 2026, month: 0 }); // Jan 2026
```

### Comparison

```typescript
const date1 = DateUtil.createDate('2025-12-15');
const date2 = DateUtil.createDate('2025-12-20');

DateUtil.isBefore(date1, date2); // true
DateUtil.isAfter(date1, date2); // false
DateUtil.isSame(date1, date1); // true
DateUtil.isSameOrBefore(date1, date2); // true
DateUtil.isSameOrAfter(date1, date2); // false

DateUtil.isBetween(
  '2025-12-17',
  '2025-12-15',
  '2025-12-20'
); // true
```

### Difference Calculations

```typescript
const date1 = DateUtil.createDate('2025-12-15');
const date2 = DateUtil.createDate('2025-12-20');

DateUtil.diff(date1, date2, 'days'); // -5
DateUtil.diffInDays(date1, date2); // -5
DateUtil.diffInHours(date1, date2); // -120
DateUtil.diffInMinutes(date1, date2); // -7200
```

### Validation & Queries

```typescript
const date = DateUtil.createDate('2025-12-15');

DateUtil.isValid(date); // true
DateUtil.isLeapYear(date); // false
DateUtil.isToday(date); // depends on current date
DateUtil.isYesterday(date);
DateUtil.isTomorrow(date);
DateUtil.isPast(date);
DateUtil.isFuture(date);
DateUtil.isWeekend(date);
DateUtil.isWeekday(date);
```

### Getters

```typescript
const date = DateUtil.createDate('2025-12-15 14:30:45');

DateUtil.getYear(date); // 2025
DateUtil.getMonth(date); // 11 (0-indexed)
DateUtil.getDate(date); // 15
DateUtil.getDayOfWeek(date); // 1 (Monday)
DateUtil.getDayOfYear(date); // 349
DateUtil.getHour(date); // 14
DateUtil.getMinute(date); // 30
DateUtil.getSecond(date); // 45
```

### Hotel-Specific Functions

```typescript
const checkIn = DateUtil.createDate('2025-12-15');
const checkOut = DateUtil.createDate('2025-12-18');

// Calculate nights
DateUtil.calculateNights(checkIn, checkOut); // 3

// Check-in/out times
DateUtil.getCheckInTime(checkIn); // 2:00 PM on Dec 15
DateUtil.getCheckOutTime(checkOut); // 11:00 AM on Dec 18

// Check timing
DateUtil.isPastCheckIn(); // true if after 2 PM
DateUtil.isPastCheckOut(); // true if after 11 AM

// Night audit
DateUtil.getNightAuditDate(); // Current audit date
```

### Business Days

```typescript
DateUtil.getNextBusinessDay(); // Next weekday
DateUtil.getPreviousBusinessDay(); // Previous weekday

DateUtil.countBusinessDays(
  '2025-12-15',
  '2025-12-20'
); // Count weekdays only
```

### Date Ranges

```typescript
// Create range
const range = DateUtil.createDateRange('2025-12-15', '2025-12-20');

// Get all dates in range
DateUtil.dateRange('2025-12-15', '2025-12-20'); // Array of Moments

// Predefined ranges
DateUtil.getTodayRange();
DateUtil.getThisWeekRange();
DateUtil.getThisMonthRange();
DateUtil.getThisYearRange();
DateUtil.getLastNDaysRange(7); // Last 7 days
```

### Utility Functions

```typescript
// Min/Max
DateUtil.min([date1, date2, date3]);
DateUtil.max([date1, date2, date3]);

// Clone
DateUtil.clone(date);

// Timezone conversion
DateUtil.toTimezone(date, 'America/New_York');

// Relative time
DateUtil.fromNow(date); // "2 days ago"
DateUtil.toNow(date); // "in 2 days"
DateUtil.calendar(date); // "Today at 2:30 PM"

// Duration
DateUtil.getDuration(date1, date2); // "5 days"
DateUtil.formatDuration(300000); // "5m"
```

## 🌍 Timezones

```typescript
import { TIMEZONES } from '@digistay/date-utils';

// Available timezones
TIMEZONES.IST // 'Asia/Kolkata' (default)
TIMEZONES.UTC // 'UTC'
TIMEZONES.EST // 'America/New_York'
TIMEZONES.PST // 'America/Los_Angeles'
TIMEZONES.GMT // 'Europe/London'
TIMEZONES.DUBAI // 'Asia/Dubai'
TIMEZONES.SINGAPORE // 'Asia/Singapore'
// ... and more
```

## 📅 Constants

```typescript
import {
  DATE_FORMATS,
  DAY_OF_WEEK,
  MONTH_OF_YEAR,
  HOTEL_TIMINGS,
  BUSINESS_DAYS,
  WEEKEND_DAYS,
  MILLISECONDS_IN,
} from '@digistay/date-utils';

// Date formats
DATE_FORMATS.ISO_DATE // 'YYYY-MM-DD'
DATE_FORMATS.DISPLAY_DATE // 'DD MMM YYYY'
DATE_FORMATS.DISPLAY_DATETIME // 'DD MMM YYYY, hh:mm A'

// Days and months
DAY_OF_WEEK.MONDAY // 1
MONTH_OF_YEAR.DECEMBER // 11

// Hotel timings
HOTEL_TIMINGS.CHECK_IN_TIME // '14:00'
HOTEL_TIMINGS.CHECK_OUT_TIME // '11:00'

// Time constants
MILLISECONDS_IN.DAY // 86400000
```

## 🔧 TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  DateInput,
  DateFormat,
  Timezone,
  DateRange,
  Duration,
  BookingDates,
  CalendarDay,
  Moment,
} from '@digistay/date-utils';
```

## 🎯 Common Use Cases

### Booking System

```typescript
import { calculateNights, formatDisplay, isWeekend } from '@digistay/date-utils';

function calculateBooking(checkIn: string, checkOut: string) {
  const nights = calculateNights(checkIn, checkOut);
  const hasWeekendStay = // ... custom logic using isWeekend
  
  return {
    checkIn: formatDisplay(checkIn),
    checkOut: formatDisplay(checkOut),
    nights,
    hasWeekendStay,
  };
}
```

### Availability Calendar

```typescript
import { dateRange, isWeekend, isPast } from '@digistay/date-utils';

function getCalendarDays(startDate: string, endDate: string) {
  const dates = dateRange(startDate, endDate);
  
  return dates.map(date => ({
    date: date.format('YYYY-MM-DD'),
    isWeekend: isWeekend(date),
    isPast: isPast(date),
    isAvailable: true, // Add your logic
  }));
}
```

### Report Generation

```typescript
import { getThisMonthRange, formatDisplay } from '@digistay/date-utils';

function generateMonthlyReport() {
  const { start, end } = getThisMonthRange();
  
  return {
    period: `${formatDisplay(start)} - ${formatDisplay(end)}`,
    // ... fetch and process data
  };
}
```

## 📄 License

MIT

## 👥 Author

DigiStay

## 🐛 Issues

Report issues at: https://github.com/digistayai/date-utils/issues

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

---

**Made with ❤️ for the hospitality industry**
