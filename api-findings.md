# Cricket API Findings

## Key Discovery
The `/cricScore` endpoint (also called eCricScore) returns current/upcoming matches with:
- `ms`: "fixture" for upcoming, "live" for live matches
- `t1s`, `t2s`: Team scores (empty for fixtures)
- `dateTimeGMT`: Match date/time
- `status`: Human-readable status like "Match starts at Jan 03, 08:15 GMT"

## Correct Endpoints to Use

1. **cricScore** - For live scores and upcoming fixtures
   - URL: `https://api.cricapi.com/v1/cricScore?apikey=KEY`
   - Returns matches with `ms` field: "fixture" or "live" or result

2. **currentMatches** - For current/recent matches
   - URL: `https://api.cricapi.com/v1/currentMatches?apikey=KEY`
   - Returns matches that are currently happening or recently completed

3. **matches** - General matches list
   - URL: `https://api.cricapi.com/v1/matches?apikey=KEY`
   - Returns a broader list but may include older matches

## Data Structure from cricScore
```json
{
  "id": "e712c17b-b956-4830-b9c9-971f68438323",
  "dateTimeGMT": "2026-01-04T15:30:00",
  "matchType": "t20",
  "status": "Match starts at Jan 03, 15:30 GMT",
  "ms": "fixture",
  "t1": "Durban Super Giants [DSG]",
  "t2": "Pretoria Capitals [PC]",
  "t1s": "",
  "t2s": "",
  "t1img": "https://g.cricapi.com/iapi/...",
  "t2img": "https://g.cricapi.com/iapi/...",
  "series": "SA20, 2025-26"
}
```

## Implementation Fix
Need to use `/cricScore` endpoint instead of `/matches` for live and upcoming matches display.


## currentMatches API Structure
The `/currentMatches` endpoint returns matches with full details:
- `id`: Match ID (UUID)
- `name`: Full match name
- `matchType`: "t20", "odi", "test"
- `status`: Result or current status
- `venue`: Stadium name
- `date`: Date string
- `dateTimeGMT`: ISO datetime
- `teams`: Array of team names
- `teamInfo`: Array with name, shortname, img
- `score`: Array of innings scores with r, w, o, inning
- `fantasyEnabled`: true/false - IMPORTANT for fantasy features
- `bbbEnabled`: Ball-by-ball enabled
- `hasSquad`: Squad available
- `matchStarted`: true/false
- `matchEnded`: true/false

## Key Insight
The `currentMatches` API returns matches that are:
1. Currently live (matchStarted=true, matchEnded=false)
2. Recently completed (matchEnded=true)

For UPCOMING matches, we need to use `/cricScore` which has `ms: "fixture"` for upcoming matches.

## Solution
1. Use `/cricScore` for upcoming fixtures (ms="fixture") and live matches (ms has score)
2. Use `/currentMatches` for detailed match info with scores
3. Filter by date to show today's and tomorrow's matches
