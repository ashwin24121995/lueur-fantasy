# Homepage Matches Display - Findings

## Current Status (Dec 28, 2025 IST)

The homepage is now correctly showing:

### Tomorrow's Matches (Dec 28, 2025)
The timezone fix is working! Tomorrow's matches are now displaying:

1. **Canterbury [CAN] vs Otago [OTG]**
   - Starts in: 5h 32m
   - Time: Sun, 28 Dec @ 03:25 am IST

2. **Melbourne Stars [MLS] vs Sydney Thunder [SYT]**
   - Starts in: 10h 22m
   - Time: Sun, 28 Dec @ 08:15 am IST

3. **Durban Super Giants [DSG] vs MI Cape Town [MICT]**
   - Starts in: 15h 37m
   - Time: Sun, 28 Dec @ 01:30 pm IST

4. **Abu Dhabi Knight Riders [ABD] vs Gulf Giants [GG]**
   - Starts in: 16h 37m
   - Time: Sun, 28 Dec @ 02:30 pm IST

### Live Matches
- Currently showing "No Live Matches" (correct - no matches in progress)

### Today's Matches
- Currently showing "No Matches Today" (correct - it's late night Dec 27 IST, no matches scheduled)

## Issue Identified
The matches are showing under "Tomorrow's Matches" but since it's now Dec 28 in IST, they should be showing under "Today's Matches".

The IST calculation needs adjustment - the server is using UTC time, and the IST offset calculation might not be correct.

## Fix Required
Need to verify the IST boundary calculation is correct. Current UTC time is ~21:52 UTC on Dec 27, which is 03:22 IST on Dec 28.
So "today" in IST should be Dec 28, and these matches should show under "Today's Matches".
