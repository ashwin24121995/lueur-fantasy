const now = new Date();
const IST_OFFSET_MS = 330 * 60 * 1000;

// Get current time in IST
const istNow = new Date(now.getTime() + IST_OFFSET_MS);

// Get today's midnight in IST, then convert to UTC
const todayMidnightIST = new Date(Date.UTC(
  istNow.getUTCFullYear(),
  istNow.getUTCMonth(),
  istNow.getUTCDate(),
  0, 0, 0, 0
));
// Convert IST midnight to UTC (subtract 5:30)
const todayStart = new Date(todayMidnightIST.getTime() - IST_OFFSET_MS);

const tomorrowStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
const dayAfterStart = new Date(tomorrowStart.getTime() + 24 * 60 * 60 * 1000);

console.log('Now (UTC):', now.toISOString());
console.log('IST Now:', istNow.toISOString());
console.log('Today Start (UTC for IST midnight):', todayStart.toISOString());
console.log('Tomorrow Start (UTC):', tomorrowStart.toISOString());
console.log('Day After Start (UTC):', dayAfterStart.toISOString());

// Parse API date as UTC
function parseApiDateAsUTC(dateStr) {
  if (!dateStr.endsWith('Z') && !dateStr.includes('+')) {
    // Check if there's no timezone indicator after position 10 (after date part)
    const hasTimezone = dateStr.length > 19 && (dateStr[19] === '+' || dateStr[19] === '-');
    if (!hasTimezone) {
      return new Date(dateStr + 'Z');
    }
  }
  return new Date(dateStr);
}

// Test match dates (these are GMT times from API)
const matches = [
  '2025-12-28T08:25:00', // Canterbury vs Otago - 13:55 IST
  '2025-12-28T13:15:00', // Melbourne vs Sydney - 18:45 IST
  '2025-12-28T18:30:00', // Durban vs MI Cape Town - 00:00 IST (Dec 29)
  '2025-12-28T19:30:00', // Abu Dhabi vs Gulf Giants - 01:00 IST (Dec 29)
];

console.log('\n--- Match Date Analysis (with UTC parsing) ---');
matches.forEach(m => {
  const matchDate = parseApiDateAsUTC(m);
  const isToday = matchDate >= todayStart && matchDate < tomorrowStart;
  const isTomorrow = matchDate >= tomorrowStart && matchDate < dayAfterStart;
  const istTime = new Date(matchDate.getTime() + IST_OFFSET_MS);
  console.log(m + ' (IST: ' + istTime.toISOString().slice(0,16) + ')');
  console.log('  Parsed UTC:', matchDate.toISOString());
  console.log('  -> Today:', isToday, 'Tomorrow:', isTomorrow);
});
