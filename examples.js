/**
 * Example usage of timezone-date-utils
 * This example works in both Node.js and browser environments
 */

// ESM import (for Node.js with type: "module" or modern bundlers)
import {
  now,
  createDate,
  formatDisplay,
  formatDisplayWithTime,
  calculateNights,
  isWeekend,
  add,
  subtract,
  getCheckInTime,
  getCheckOutTime,
  // New v1.1.0 functions
  calculateAge,
  calculateAgeFromDDMMYYYY,
  separateDateTime,
  formatIndianDate,
  formatIndianDateTime,
  dateRangeInChunks,
  getOverlapDays,
  doRangesOverlap,
  isValidDDMMYYYY,
  daysAgo,
  sortDatesAscending,
  toDateKey,
  toMonthKey,
  TIMEZONES,
  DATE_FORMATS,
} from 'timezone-date-utils';

// For CommonJS: const { now, createDate, ... } = require('timezone-date-utils');

console.log('=== Date Utils Examples ===\n');

// 1. Get current time
const currentTime = now();
console.log('1. Current time (IST):', formatDisplayWithTime(currentTime));

// 2. Create dates
const checkInDate = createDate('2025-12-15');
const checkOutDate = createDate('2025-12-18');
console.log('\n2. Check-in:', formatDisplay(checkInDate));
console.log('   Check-out:', formatDisplay(checkOutDate));

// 3. Calculate nights
const nights = calculateNights(checkInDate, checkOutDate);
console.log('\n3. Number of nights:', nights);

// 4. Check if weekend
const isWeekendStay = isWeekend(checkInDate);
console.log('\n4. Is check-in on weekend?', isWeekendStay);

// 5. Date manipulation
const tomorrow = add(currentTime, 1, 'day');
const lastWeek = subtract(currentTime, 7, 'days');
console.log('\n5. Tomorrow:', formatDisplay(tomorrow));
console.log('   Last week:', formatDisplay(lastWeek));

// ========== NEW v1.1.0 FEATURES ==========

// 6. Age Calculation (for guest management)
console.log('\n=== NEW v1.1.0 Features ===\n');
console.log('6. Age Calculation:');
const guestAge = calculateAge('1990-05-15');
console.log('   Age from DOB (1990-05-15):', guestAge, 'years');

const indianDobAge = calculateAgeFromDDMMYYYY('15/05/1990');
console.log('   Age from DD/MM/YYYY format:', indianDobAge, 'years');

// 7. Date/Time Separation (for C-form, government portals)
console.log('\n7. Date/Time Separation:');
const { date, time } = separateDateTime('2025-12-15 14:30:00');
console.log('   Date:', date);
console.log('   Time:', time);

// 8. Indian Formats (for invoices, reports)
console.log('\n8. Indian Date Formats:');
console.log('   Indian date:', formatIndianDate(currentTime));
console.log('   Indian datetime:', formatIndianDateTime(currentTime));

// 9. Date Range Chunking (for large datasets)
console.log('\n9. Date Range Chunking:');
const chunks = dateRangeInChunks('2025-01-01', '2025-03-31', 30);
console.log('   Total chunks for Q1 2025:', chunks.length);
console.log('   First chunk size:', chunks[0].length, 'days');

// 10. Overlap Detection (for room inventory)
console.log('\n10. Overlap Detection:');
const booking1 = { checkIn: '2025-12-15', checkOut: '2025-12-20' };
const booking2 = { checkIn: '2025-12-18', checkOut: '2025-12-25' };

const hasOverlap = doRangesOverlap(
  booking1.checkIn, booking1.checkOut,
  booking2.checkIn, booking2.checkOut
);
const overlapDays = getOverlapDays(
  booking1.checkIn, booking1.checkOut,
  booking2.checkIn, booking2.checkOut
);
console.log('   Bookings overlap:', hasOverlap);
console.log('   Overlap days:', overlapDays);

// 11. Date Validation
console.log('\n11. Date Validation:');
console.log('   "15-12-2025" is valid:', isValidDDMMYYYY('15-12-2025'));
console.log('   "32-13-2025" is valid:', isValidDDMMYYYY('32-13-2025'));

// 12. Relative Dates
console.log('\n12. Relative Dates:');
console.log('   7 days ago:', formatIndianDate(daysAgo(7)));

// 13. Date Sorting
console.log('\n13. Date Sorting:');
const unsortedDates = ['2025-12-20', '2025-12-15', '2025-12-18'];
const sorted = sortDatesAscending(unsortedDates);
console.log('   Sorted dates:', sorted.map(d => formatDisplay(d)).join(', '));

// 14. Date Keys for Grouping
console.log('\n14. Date Keys for Grouping:');
const sampleDate = createDate('2025-12-15');
console.log('   Date key:', toDateKey(sampleDate));
console.log('   Month key:', toMonthKey(sampleDate));

// 6. Hotel-specific functions
const checkInTime = getCheckInTime(checkInDate);
const checkOutTime = getCheckOutTime(checkOutDate);
console.log('\n6. Check-in time:', checkInTime.format(DATE_FORMATS.DISPLAY_DATETIME));
console.log('   Check-out time:', checkOutTime.format(DATE_FORMATS.DISPLAY_DATETIME));

// 7. Timezone conversion
const newYorkTime = now(TIMEZONES.EST);
console.log('\n7. Current time in New York:', formatDisplayWithTime(newYorkTime));

// 8. Date ranges
import { dateRange } from 'timezone-date-utils';
const allDates = dateRange('2025-12-15', '2025-12-18');
console.log('\n8. All dates in range:');
allDates.forEach(date => {
  console.log(`   - ${formatDisplay(date)} ${isWeekend(date) ? '(Weekend)' : ''}`);
});

console.log('\n=== Frontend Usage Example (React) ===\n');
console.log(`
import { now, formatDisplay, calculateNights } from 'timezone-date-utils';
import { useState, useEffect } from 'react';

function BookingComponent({ checkIn, checkOut }) {
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    setCurrentDate(formatDisplay(now()));
  }, []);
  
  const nights = calculateNights(checkIn, checkOut);
  
  return (
    <div>
      <p>Today: {currentDate}</p>
      <p>Check-in: {formatDisplay(checkIn)}</p>
      <p>Check-out: {formatDisplay(checkOut)}</p>
      <p>Nights: {nights}</p>
    </div>
  );
}
`);

console.log('\n=== Backend Usage Example (Node.js) ===\n');
console.log(`
import { createDate, calculateNights, formatDisplay } from 'timezone-date-utils';

async function processBooking(bookingData) {
  const checkIn = createDate(bookingData.checkInDate);
  const checkOut = createDate(bookingData.checkOutDate);
  const nights = calculateNights(checkIn, checkOut);
  
  return {
    id: bookingData.id,
    checkIn: formatDisplay(checkIn),
    checkOut: formatDisplay(checkOut),
    nights,
    totalAmount: nights * bookingData.ratePerNight,
  };
}
`);
