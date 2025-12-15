/**
 * Strict Types Usage Examples
 * Demonstrates the new strict typing features
 */

import {
  // Strict types
  ISODateString,
  PositiveInteger,
  NonNegativeInteger,
  DayOfWeek,
  MonthOfYear,
  HourOfDay,
  UnixTimestamp,
  AgeResult,
  DateComponents,
  SeparatedDateTime,
  
  // Type guards
  isISODateString,
  isPositiveInteger,
  isDayOfWeek,
  
  // Validators
  toISODateString,
  toPositiveInteger,
  validateDateString,
  
  // Assertions
  assertPositiveInteger,
  assertDayOfWeek,
  
  // Utility functions
  now,
  createDate,
  calculateNights,
  getMonth,
  getDayOfWeek,
  getHour,
  getDetailedAge,
  getDateComponents,
  separateDateTime,
  toISODate,
  toTimestamp,
  countBusinessDays,
} from './src/index';

// ============================================================================
// Example 1: Type-Safe Booking System
// ============================================================================

interface Booking {
  readonly id: string;
  readonly checkIn: ISODateString;
  readonly checkOut: ISODateString;
  readonly nights: PositiveInteger;
  readonly guestCount: PositiveInteger;
}

function createBooking(
  checkInStr: string,
  checkOutStr: string,
  guests: number
): Booking | { error: string } {
  // Validate dates with type guards
  const checkIn = toISODateString(checkInStr);
  const checkOut = toISODateString(checkOutStr);
  
  if (!checkIn || !checkOut) {
    return { error: 'Invalid date format. Use YYYY-MM-DD' };
  }
  
  // Calculate nights - returns NonNegativeInteger
  const nights = calculateNights(checkIn, checkOut);
  
  // Validate it's positive
  const validNights = toPositiveInteger(nights);
  if (!validNights) {
    return { error: 'Check-out must be after check-in' };
  }
  
  // Validate guest count
  const guestCount = toPositiveInteger(guests);
  if (!guestCount) {
    return { error: 'Guest count must be positive' };
  }
  
  return {
    id: `BK-${Date.now()}`,
    checkIn,
    checkOut,
    nights: validNights,
    guestCount,
  };
}

// Usage
const booking1 = createBooking('2024-01-15', '2024-01-18', 2);
console.log('Booking 1:', booking1);
// ✅ { id: 'BK-...', checkIn: '2024-01-15', checkOut: '2024-01-18', nights: 3, guestCount: 2 }

const booking2 = createBooking('invalid', '2024-01-18', 2);
console.log('Booking 2:', booking2);
// ✅ { error: 'Invalid date format. Use YYYY-MM-DD' }

// ============================================================================
// Example 2: Age Verification System
// ============================================================================

interface Guest {
  name: string;
  dateOfBirth: string;
}

interface AgeVerification {
  guest: string;
  age: NonNegativeInteger;
  isAdult: boolean;
  isSenior: boolean;
  requiresGuardian: boolean;
  eligibleForDiscount: boolean;
}

function verifyGuestAge(guest: Guest): AgeVerification {
  const ageResult: AgeResult = getDetailedAge(guest.dateOfBirth);
  
  return {
    guest: guest.name,
    age: ageResult.years,
    isAdult: ageResult.isAdult,
    isSenior: ageResult.isSenior,
    requiresGuardian: !ageResult.isAdult,
    eligibleForDiscount: ageResult.isSenior,
  };
}

// Usage
const guest = { name: 'John Doe', dateOfBirth: '1985-06-15' };
const verification = verifyGuestAge(guest);
console.log('Age Verification:', verification);
// ✅ { guest: 'John Doe', age: 39, isAdult: true, isSenior: false, ... }

// ============================================================================
// Example 3: Date Component Analysis
// ============================================================================

function analyzeCheckInTime(dateTime: string): {
  components: DateComponents;
  isPeakHour: boolean;
  isWeekend: boolean;
  monthName: string;
} {
  const components = getDateComponents(dateTime);
  const dayOfWeek = getDayOfWeek(dateTime);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return {
    components,
    isPeakHour: components.hour >= 14 && components.hour <= 18, // 2 PM - 6 PM
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    monthName: monthNames[components.month],
  };
}

// Usage
const analysis = analyzeCheckInTime('2024-07-15 16:30:00');
console.log('Check-in Analysis:', analysis);
// ✅ { components: {...}, isPeakHour: true, isWeekend: false, monthName: 'July' }

// ============================================================================
// Example 4: Strict Type Guards in Action
// ============================================================================

function processDateInput(input: unknown): string {
  // Type guard for ISO date string
  if (typeof input === 'string' && isISODateString(input)) {
    // input is now typed as ISODateString
    return `Valid ISO date: ${input}`;
  }
  
  return 'Invalid input';
}

// Usage
console.log(processDateInput('2024-01-15')); // ✅ "Valid ISO date: 2024-01-15"
console.log(processDateInput('invalid'));    // ✅ "Invalid input"
console.log(processDateInput(12345));       // ✅ "Invalid input"

// ============================================================================
// Example 5: Assertions for Required Validation
// ============================================================================

function bookRoom(
  checkIn: string,
  nights: unknown,
  roomNumber: unknown
): { success: true; nights: PositiveInteger } | { success: false; error: string } {
  try {
    // Assert that nights is a positive integer
    assertPositiveInteger(nights, 'nights');
    // nights is now typed as PositiveInteger
    
    // Assert that roomNumber is also positive
    assertPositiveInteger(roomNumber, 'roomNumber');
    
    // Validate check-in date
    const checkInDate = toISODateString(checkIn);
    if (!checkInDate) {
      throw new Error('Invalid check-in date format');
    }
    
    return {
      success: true,
      nights: nights, // TypeScript knows this is PositiveInteger
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Usage
console.log(bookRoom('2024-01-15', 3, 101));
// ✅ { success: true, nights: 3 }

console.log(bookRoom('2024-01-15', 0, 101));
// ✅ { success: false, error: 'nights must be a positive integer, got: 0' }

// ============================================================================
// Example 6: Business Day Calculation with Strict Types
// ============================================================================

interface WorkPeriod {
  startDate: ISODateString;
  endDate: ISODateString;
  businessDays: NonNegativeInteger;
  totalDays: NonNegativeInteger;
}

function calculateWorkPeriod(start: string, end: string): WorkPeriod | null {
  const startDate = toISODateString(start);
  const endDate = toISODateString(end);
  
  if (!startDate || !endDate) {
    return null;
  }
  
  const businessDays = countBusinessDays(startDate, endDate);
  const totalDays = calculateNights(startDate, endDate);
  
  return {
    startDate,
    endDate,
    businessDays,
    totalDays,
  };
}

// Usage
const workPeriod = calculateWorkPeriod('2024-01-15', '2024-01-26');
console.log('Work Period:', workPeriod);
// ✅ { startDate: '2024-01-15', endDate: '2024-01-26', businessDays: 8, totalDays: 11 }

// ============================================================================
// Example 7: Date/Time Separation with Types
// ============================================================================

interface FormattedBooking {
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
}

function formatBookingTimes(
  checkIn: string,
  checkOut: string
): FormattedBooking {
  const checkInParts: SeparatedDateTime = separateDateTime(checkIn);
  const checkOutParts: SeparatedDateTime = separateDateTime(checkOut);
  
  return {
    checkInDate: checkInParts.date,
    checkInTime: checkInParts.time,
    checkOutDate: checkOutParts.date,
    checkOutTime: checkOutParts.time,
  };
}

// Usage
const formatted = formatBookingTimes(
  '2024-01-15 14:00:00',
  '2024-01-18 11:00:00'
);
console.log('Formatted:', formatted);
// ✅ { checkInDate: '15-01-2024', checkInTime: '14:00', ... }

// ============================================================================
// Example 8: Type-Safe Month and Day Operations
// ============================================================================

function getSeasonFromMonth(month: MonthOfYear): string {
  // month is guaranteed to be 0-11
  const seasons: Record<MonthOfYear, string> = {
    0: 'Winter',   // January
    1: 'Winter',   // February
    2: 'Spring',   // March
    3: 'Spring',   // April
    4: 'Spring',   // May
    5: 'Summer',   // June
    6: 'Summer',   // July
    7: 'Summer',   // August
    8: 'Fall',     // September
    9: 'Fall',     // October
    10: 'Fall',    // November
    11: 'Winter',  // December
  };
  
  return seasons[month];
}

function analyzeDate(date: string): {
  month: MonthOfYear;
  season: string;
  dayOfWeek: DayOfWeek;
  hour: HourOfDay;
} {
  const month = getMonth(date);
  const dayOfWeek = getDayOfWeek(date);
  const hour = getHour(date);
  
  return {
    month,
    season: getSeasonFromMonth(month),
    dayOfWeek,
    hour,
  };
}

// Usage
const dateAnalysis = analyzeDate('2024-07-15 14:30:00');
console.log('Date Analysis:', dateAnalysis);
// ✅ { month: 6, season: 'Summer', dayOfWeek: 1, hour: 14 }

// ============================================================================
// Example 9: Timestamp Operations with Branded Types
// ============================================================================

function createTimestampRecord(date: string): {
  date: ISODateString;
  timestamp: UnixTimestamp;
  age: string;
} {
  const isoDate = toISODate(date);
  const timestamp = toTimestamp(date);
  const now = Date.now();
  const ageMs = now - timestamp;
  const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
  
  return {
    date: isoDate,
    timestamp,
    age: `${ageDays} days ago`,
  };
}

// Usage
const record = createTimestampRecord('2024-01-01');
console.log('Timestamp Record:', record);
// ✅ { date: '2024-01-01', timestamp: 1704067200000, age: '348 days ago' }

// ============================================================================
// Summary
// ============================================================================

console.log('\n=== Strict Types Summary ===');
console.log('✅ Type-safe booking creation');
console.log('✅ Age verification with rich results');
console.log('✅ Date component extraction');
console.log('✅ Type guards for runtime validation');
console.log('✅ Assertions for strict validation');
console.log('✅ Business day calculations');
console.log('✅ Date/time separation');
console.log('✅ Season/month operations');
console.log('✅ Timestamp handling');
console.log('\nAll operations are type-safe at compile time and validated at runtime!');
