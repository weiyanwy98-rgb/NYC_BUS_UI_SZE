# NYC Bus Trip Viewer - Test Procedures

## Overview

This document outlines the testing procedures for the NYC Bus Trip Viewer application. It includes manual test cases, integration tests, and performance tests to ensure the application functions correctly.

---

## Test Environment

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls and map tiles)
- Backend server running on `http://localhost:5000`
- Frontend server running on `http://localhost:5173`

### Test Data
- **Backend API URL**: `http://localhost:5000/api/bus_trip`
- **Base API URL**: `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip`
- **Sample Vehicle IDs**: NYCT_4614, NYCT_4615, NYCT_4616
- **Sample Line Names**: Bx2, M1, M15, Q1

---

## Test Cases

### TC-001: Server Readiness Check

**Objective**: Verify that the application correctly detects server availability

**User Story**: US-005, US-011

**Pre-conditions**:
- Application is loaded in browser
- Server may or may not be ready

**Test Steps**:
1. Open the application URL in a browser
2. Observe the server status indicator at the top of the page

**Expected Results**:
- If server is ready: Green "Server: Online" badge is displayed
- If server unavailable: Alert shows "Server: Offline" error
- Status automatically updates every 30 seconds

**Pass/Fail Criteria**:
- ✅ Pass: Status indicator accurately reflects server state
- ❌ Fail: Status indicator is incorrect or doesn't update

---

### TC-002: Load Vehicle References List

**Objective**: Verify that the vehicle references list loads correctly

**User Story**: US-001, US-003

**Pre-conditions**:
- backend server is ready

**Test Steps**:
1. Navigate to the Vehicle selector section
2. Click on "Search vehicle..." button
3. Observe the dropdown list

**Expected Results**:
- Dropdown opens with search input
- List contains approximately 220 vehicle IDs

**Pass/Fail Criteria**:
- ✅ Pass: List loads instantly, all vehicles displayed
- ❌ Fail: List doesn't load, takes too long, or shows errors

---

### TC-003: Search for Specific Vehicle

**Objective**: Verify that vehicle search functionality works correctly

**User Story**: US-003

**Pre-conditions**:
- Backend is ready
- Vehicle list is loaded

**Test Steps**:
1. Click "Search vehicle..." button
2. Type "NYCT_4614" in the search box
3. Observe filtered results
4. Select the vehicle from results

**Expected Results**:
- Search filters results as user types
- Only matching vehicles are shown
- Search is case-insensitive
- Selected vehicle appears in the button
- Dropdown closes after selection

**Pass/Fail Criteria**:
- ✅ Pass: Search filters instantly and accurately
- ❌ Fail: Search is slow, inaccurate, or doesn't work

---

### TC-004: Load Vehicle Trip Data

**Objective**: Verify that vehicle trip data loads and displays on map

**User Story**: US-001, US-007, US-010

**Pre-conditions**:
- Backend server is ready
- Vehicle "NYCT_4614" is selected

**Test Steps**:
1. With vehicle selected, click "Load Trip" button
2. Observe loading state
3. Wait for data to load
4. Observe map display

**Expected Results**:
- Shows loading message
- Route appears on map as red line or markers
- Map automatically centered to the route

**Pass/Fail Criteria**:
- ✅ Pass: Data loads successfully and displays correctly
- ❌ Fail: Data fails to load, map doesn't update, or errors occur

---

### TC-005: Load Published Line Names List

**Objective**: Verify that the bus line names list loads correctly

**User Story**: US-002, US-004

**Pre-conditions**:
- Backend server is ready

**Test Steps**:
1. Navigate to the Line selector section
2. Click on "Search line..." button
3. Observe the dropdown list

**Expected Results**:
- Dropdown opens with search input
- List contains bus line names (Bx1, M1, etc.)
- Line count is displayed in the description

**Pass/Fail Criteria**:
- ✅ Pass: List loads instantly, all lines displayed
- ❌ Fail: List doesn't load, takes too long, or shows errors

---

### TC-006: Search for Specific Bus Line

**Objective**: Verify that bus line search functionality works correctly

**User Story**: US-004

**Pre-conditions**:
- Backend server is ready
- Line list is loaded

**Test Steps**:
1. Click "Search line..." button
2. Type "Bx2" in the search box
3. Observe filtered results
4. Select the line from results

**Expected Results**:
- Search filters results as user types
- Only matching lines are shown
- Selected line appears in the button
- Dropdown closes after selection

**Pass/Fail Criteria**:
- ✅ Pass: Search filters instantly and accurately
- ❌ Fail: Search is slow, inaccurate, or doesn't work

---

### TC-007: Load Bus Line Trip Data

**Objective**: Verify that bus line trip data loads and displays on map

**User Story**: US-002, US-009, US-010

**Pre-conditions**:
- Server is ready
- Line "Bx2" is selected

**Test Steps**:
1. With line selected, click "Load Trip" button
2. Observe loading state
3. Wait for data to load
4. Observe map display

**Expected Results**:
- "Loading..." message is shown
- Routes appear on map as blue lines (may be multiple buses)
- Map automatically centered to bus lines

**Pass/Fail Criteria**:
- ✅ Pass: Data loads successfully and displays correctly
- ❌ Fail: Data fails to load, map doesn't update, or errors occur

---

### TC-008: Map Interaction - Zoom

**Objective**: Verify that map zoom functionality works correctly

**User Story**: US-007

**Pre-conditions**:
- Application loaded
- Map is visible

**Test Steps**:
1. Use mouse scroll wheel to zoom in
2. Use mouse scroll wheel to zoom out
3. Observe map zoom level changes

**Expected Results**:
- Scrolling up zooms in smoothly
- Scrolling down zooms out smoothly
- No lag or stuttering
- Map tiles load at appropriate zoom levels

**Pass/Fail Criteria**:
- ✅ Pass: Zoom works smoothly in both directions
- ❌ Fail: Zoom is laggy, doesn't work, or causes errors

---

### TC-009: Map Interaction - Pan

**Objective**: Verify that map panning functionality works correctly

**User Story**: US-006

**Pre-conditions**:
- Application loaded
- Map is visible

**Test Steps**:
1. Click and hold on the map
2. Drag the mouse to move the map
3. Release mouse button
4. Observe map position

**Expected Results**:
- Map pans smoothly while dragging
- Map follows mouse movement accurately
- No lag or stuttering
- New map tiles load as needed

**Pass/Fail Criteria**:
- ✅ Pass: Pan works smoothly and accurately
- ❌ Fail: Pan is laggy, inaccurate, or doesn't work

---

### TC-010: Click Map Marker for Details

**Objective**: Verify that clicking map markers shows detailed information

**User Story**: US-009

**Pre-conditions**:
- Route data is loaded on map
- Route has point features (markers)

**Test Steps**:
1. Click on a route marker (circle point)
2. Observe popup display
3. Read popup content
4. Click elsewhere to close popup

**Expected Results**:
- Popup appears immediately on click
- Popup displays all available properties
- Properties are formatted as key-value pairs
- Popup is readable and well-formatted
- Popup closes when clicking elsewhere

**Pass/Fail Criteria**:
- ✅ Pass: Popup displays correctly with all information
- ❌ Fail: Popup doesn't appear or information is missing

---

### TC-011: Live or Storaged Data

**Objective**: Verify if data is from NYC server or storaged data in backend

**User Story**: US-008

**Pre-conditions**:
- Backend is ready

**Test Steps**:
1. Check if NYC server is running
2. Retrieve data from backend storage if NYC server is down

**Expected Results**:
- Application function as normally

**Pass/Fail Criteria**:
- ✅ Pass: All information displays correctly
- ❌ Fail: Information is missing, incorrect, or unreadable

---

### TC-015: Error Handling - Invalid Vehicle

**Objective**: Verify that application handles invalid vehicle IDs gracefully

**User Story**: US-017

**Pre-conditions**:
- Server is ready
- Developer tools console is open

**Test Steps**:
1. Manually call API with invalid vehicle ID (use browser console or curl)
2. Observe error handling

**Expected Results**:
- Error is caught and logged to console
- Application doesn't crash
- User-friendly error message is displayed (if applicable)
- User can retry with valid vehicle

**Pass/Fail Criteria**:
- ✅ Pass: Error is handled gracefully
- ❌ Fail: Application crashes or shows unclear errors

---

### TC-021: Multiple Selections

**Objective**: Verify that both selectors can be used independently

**User Story**: US-025

**Pre-conditions**:
- Server is ready

**Test Steps**:
1. Select a vehicle and load its trip
2. Observe map and trip info
3. Then select a bus line and load its trip
4. Observe map and trip info

**Expected Results**:
- Vehicle trip loads and displays correctly
- Vehicle selection remains in dropdown
- Line trip replaces vehicle trip on map
- Line selection remains in dropdown
- Both selections are preserved
- Can switch between them by clicking "Load Trip"

**Pass/Fail Criteria**:
- ✅ Pass: Both selectors work independently
- ❌ Fail: Selections clear each other or don't persist

---

### TC-022: Count Display

**Objective**: Verify that vehicle and line counts are displayed

**User Story**: US-010

**Pre-conditions**:
- Server is ready
- Lists are loaded

**Test Steps**:
1. Observe vehicle selector description
2. Observe line selector description
3. Verify counts are accurate

**Expected Results**:
- Vehicle selector shows "(3500 vehicles)" or similar
- Line selector shows "(XX lines)" with actual count
- Counts are accurate
- Counts update when data loads

**Pass/Fail Criteria**:
- ✅ Pass: Counts are displayed and accurate
- ❌ Fail: Counts are missing or incorrect

---

## Performance Tests

### PT-001: Initial Page Load Time

**Objective**: Verify that initial page load is fast

**Metric**: Time to interactive

**Test Steps**:
1. Clear browser cache
2. Open application URL
3. Measure time until page is fully interactive

**Expected Results**:
- Time to interactive: < 3 seconds on good connection
- First Contentful Paint: < 1.5 seconds
- Largest Contentful Paint: < 2.5 seconds

**Pass/Fail Criteria**:
- ✅ Pass: Meets performance targets
- ❌ Fail: Exceeds performance targets

---

### PT-002: Dropdown Open Performance

**Objective**: Verify that dropdowns open instantly

**Metric**: Time from click to dropdown open

**Test Steps**:
1. Click vehicle selector button (after first load)
2. Measure time until dropdown is fully rendered
3. Repeat 5 times and average

**Expected Results**:
- Average time: < 100ms
- No visible lag
- Smooth animation

**Pass/Fail Criteria**:
- ✅ Pass: Opens instantly with no lag
- ❌ Fail: Noticeable delay or stuttering

---

### PT-003: Search Filter Performance

**Objective**: Verify that search filtering is instant

**Metric**: Time from keystroke to filtered results

**Test Steps**:
1. Open vehicle selector
2. Type a search query character by character
3. Observe filtering speed
4. Measure response time per keystroke

**Expected Results**:
- Filter response: < 50ms per keystroke
- No lag while typing
- Smooth user experience

**Pass/Fail Criteria**:
- ✅ Pass: Filtering is instant and smooth
- ❌ Fail: Noticeable lag between keystrokes and results

---

### PT-004: Map Render Performance

**Objective**: Verify that map renders routes efficiently

**Metric**: Time from data load to map render

**Test Steps**:
1. Load a trip with multiple features
2. Measure time from API response to map display
3. Verify smooth rendering

**Expected Results**:
- Render time: < 500ms
- No frame drops
- Smooth zoom animation

**Pass/Fail Criteria**:
- ✅ Pass: Map renders smoothly and quickly
- ❌ Fail: Visible lag or stuttering

---

## Integration Tests

### IT-001: End-to-End Vehicle Trip Flow

**Objective**: Test complete workflow from server check to trip display

**Test Steps**:
1. Load application
2. Wait for server ready status
3. Open vehicle selector
4. Search for "NYCT_4614"
5. Select vehicle
6. Click "Load Trip"
7. Verify map display
8. Click a map marker
9. Verify popup

**Expected Results**:
- All steps complete without errors
- Each step transitions smoothly to next
- Data displays correctly throughout

**Pass/Fail Criteria**:
- ✅ Pass: Complete flow works end-to-end
- ❌ Fail: Any step fails or errors occur

---

### IT-002: End-to-End Line Trip Flow

**Objective**: Test complete workflow for bus line trip

**Test Steps**:
1. Load application
2. Wait for server ready status
3. Open line selector
4. Search for "Bx2"
5. Select line
6. Click "Load Trip"
7. Verify map display with multiple routes
8. Verify trip information

**Expected Results**:
- All steps complete without errors
- Each step transitions smoothly to next
- Multiple bus routes display correctly

**Pass/Fail Criteria**:
- ✅ Pass: Complete flow works end-to-end
- ❌ Fail: Any step fails or errors occur

---

### IT-003: Caching Across Multiple Operations

**Objective**: Verify caching works across different user actions

**Test Steps**:
1. Load vehicle list (should cache)
2. Load line list (should cache)
3. Load vehicle trip "NYCT_4614" (should cache)
4. Load line trip "Bx2" (should cache)
5. Load vehicle trip "NYCT_4614" again (should use cache)
6. Load line trip "Bx2" again (should use cache)
7. Verify console logs

**Expected Results**:
- First loads fetch and cache data
- Subsequent loads use cached data
- All loads work correctly
- Console logs confirm caching behavior

**Pass/Fail Criteria**:
- ✅ Pass: Caching works for all data types
- ❌ Fail: Any cache miss that should be a hit

---

## Browser Compatibility Tests

### BC-001: Chrome Browser

**Test Steps**:
1. Test all functionality in Chrome (latest version)

**Expected Results**:
- All features work correctly
- No console errors
- Performance is optimal

---

### BC-002: Firefox Browser

**Test Steps**:
1. Test all functionality in Firefox (latest version)

**Expected Results**:
- All features work correctly
- No console errors
- Performance is comparable to Chrome

---

### BC-003: Safari Browser

**Test Steps**:
1. Test all functionality in Safari (latest version)

**Expected Results**:
- All features work correctly
- No console errors
- Performance is comparable to Chrome

---

### BC-004: Edge Browser

**Test Steps**:
1. Test all functionality in Edge (latest version)

**Expected Results**:
- All features work correctly
- No console errors
- Performance is comparable to Chrome

---

## Regression Testing Checklist

After any code changes, verify:

- [ ] Server status check works
- [ ] Vehicle list loads
- [ ] Line list loads
- [ ] Vehicle search works
- [ ] Line search works
- [ ] Vehicle trip loads and displays
- [ ] Line trip loads and displays
- [ ] Map zoom works
- [ ] Map pan works
- [ ] Map markers clickable
- [ ] Trip information displays
- [ ] Caching works for lists
- [ ] Caching works for trip data
- [ ] Loading states display
- [ ] Error handling works
- [ ] Responsive design maintained
- [ ] No console errors
- [ ] Performance acceptable

---

## Bug Report Template

When reporting bugs, use this template:

```markdown
**Bug ID**: BUG-XXX
**Title**: [Brief description]
**Severity**: Critical / High / Medium / Low
**Priority**: P1 / P2 / P3

**Test Case**: TC-XXX
**Environment**:
- Browser: [Chrome/Firefox/Safari/Edge]
- Version: [Browser version]
- OS: [Windows/Mac/Linux]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result**:
[What should happen]

**Actual Result**:
[What actually happened]

**Screenshots/Videos**:
[Attach if available]

**Console Errors**:
[Copy any console errors]

**Additional Notes**:
[Any other relevant information]
```

---

## Test Execution Summary Template

```markdown
**Test Execution Date**: [Date]
**Tester**: [Name]
**Build Version**: [Version/Commit Hash]
**Environment**: [Browser, OS]

**Test Results Summary**:
- Total Test Cases: XX
- Passed: XX
- Failed: XX
- Blocked: XX
- Not Executed: XX

**Pass Rate**: XX%

**Critical Issues**: [List any P1 bugs]

**Notes**: [Any additional observations]
```

---

**Document Version**: 1.0
**Last Updated**: December 2, 2024
**Created By**: NYC Bus Trip Viewer QA Team