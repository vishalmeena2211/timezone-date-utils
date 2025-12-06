/**
 * Example usage of @digistay/date-utils
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
  TIMEZONES,
  DATE_FORMATS,
} from '@digistay/date-utils';

// For CommonJS: const { now, createDate, ... } = require('@digistay/date-utils');

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

// 6. Hotel-specific functions
const checkInTime = getCheckInTime(checkInDate);
const checkOutTime = getCheckOutTime(checkOutDate);
console.log('\n6. Check-in time:', checkInTime.format(DATE_FORMATS.DISPLAY_DATETIME));
console.log('   Check-out time:', checkOutTime.format(DATE_FORMATS.DISPLAY_DATETIME));

// 7. Timezone conversion
const newYorkTime = now(TIMEZONES.EST);
console.log('\n7. Current time in New York:', formatDisplayWithTime(newYorkTime));

// 8. Date ranges
import { dateRange } from '@digistay/date-utils';
const allDates = dateRange('2025-12-15', '2025-12-18');
console.log('\n8. All dates in range:');
allDates.forEach(date => {
  console.log(`   - ${formatDisplay(date)} ${isWeekend(date) ? '(Weekend)' : ''}`);
});

console.log('\n=== Frontend Usage Example (React) ===\n');
console.log(`
import { now, formatDisplay, calculateNights } from '@digistay/date-utils';
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
import { createDate, calculateNights, formatDisplay } from '@digistay/date-utils';

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
