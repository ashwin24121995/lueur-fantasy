import axios from 'axios';

const API_KEY = process.env.CRICKET_API_KEY;
const BASE_URL = 'https://api.cricapi.com/v1';

console.log('API Key present:', !!API_KEY);
console.log('API Key (first 10 chars):', API_KEY ? API_KEY.substring(0, 10) + '...' : 'N/A');

async function testCricScore() {
  console.log('\n========== TESTING CRICSCORE ENDPOINT ==========');
  
  try {
    const response = await axios.get(`${BASE_URL}/cricScore`, {
      params: { apikey: API_KEY },
      timeout: 30000
    });
    
    console.log('Status:', response.data.status);
    
    if (response.data.status !== 'success') {
      console.log('Failed to get cricScore data');
      return;
    }
    
    const matches = response.data.data;
    console.log('Total matches from cricScore:', matches.length);
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);
    
    console.log('\nCurrent time (UTC):', now.toISOString());
    console.log('Today start:', today.toISOString());
    console.log('Tomorrow start:', tomorrow.toISOString());
    
    const live = [];
    const todayMatches = [];
    const tomorrowMatches = [];
    
    for (const match of matches) {
      const matchDate = new Date(match.dateTimeGMT);
      const hasScores = match.t1s || match.t2s;
      const isFixture = match.ms === 'fixture';
      const statusLower = (match.status || '').toLowerCase();
      const isCompleted = statusLower.includes('won') || 
                          statusLower.includes('draw') ||
                          statusLower.includes('no result') ||
                          statusLower.includes('abandoned');
      
      // Live match - has scores, not a fixture, not completed
      if (hasScores && !isFixture && !isCompleted) {
        live.push(match);
      }
      // Today's match (not completed)
      else if (matchDate >= today && matchDate < tomorrow && !isCompleted) {
        todayMatches.push(match);
      }
      // Tomorrow's match
      else if (matchDate >= tomorrow && matchDate < dayAfter && !isCompleted) {
        tomorrowMatches.push(match);
      }
    }
    
    console.log('\n--- LIVE MATCHES ---');
    console.log('Count:', live.length);
    live.forEach((m, i) => {
      console.log(`${i + 1}. ${m.t1} vs ${m.t2}`);
      console.log(`   Score: ${m.t1s || 'N/A'} | ${m.t2s || 'N/A'}`);
      console.log(`   Status: ${m.status}`);
      console.log(`   MS: ${m.ms}`);
      console.log(`   Series: ${m.series}`);
    });
    
    console.log('\n--- TODAY\'S MATCHES ---');
    console.log('Count:', todayMatches.length);
    todayMatches.forEach((m, i) => {
      console.log(`${i + 1}. ${m.t1} vs ${m.t2}`);
      console.log(`   Time: ${new Date(m.dateTimeGMT).toISOString()}`);
      console.log(`   Status: ${m.status}`);
      console.log(`   MS: ${m.ms}`);
      console.log(`   Series: ${m.series}`);
    });
    
    console.log('\n--- TOMORROW\'S MATCHES ---');
    console.log('Count:', tomorrowMatches.length);
    tomorrowMatches.forEach((m, i) => {
      console.log(`${i + 1}. ${m.t1} vs ${m.t2}`);
      console.log(`   Time: ${new Date(m.dateTimeGMT).toISOString()}`);
      console.log(`   Series: ${m.series}`);
    });
    
    // Show all matches with their raw data
    console.log('\n--- ALL MATCHES (first 10) ---');
    matches.slice(0, 10).forEach((m, i) => {
      console.log(`${i + 1}. ${m.t1} vs ${m.t2}`);
      console.log(`   Date: ${m.dateTimeGMT}`);
      console.log(`   MS: ${m.ms}`);
      console.log(`   T1S: ${m.t1s || 'N/A'}`);
      console.log(`   T2S: ${m.t2s || 'N/A'}`);
      console.log(`   Status: ${m.status}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testCricScore();
