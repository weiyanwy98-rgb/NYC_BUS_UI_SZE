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
- Dev server running on `http://localhost:3000` or `http://localhost:3001`

### Test Data
- **Base API URL**: `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip`
- **Sample Vehicle IDs**: NYCT_4614, NYCT_4615, NYCT_4616
- **Sample Line Names**: Bx2, M1, M15, Q1

---

## Test Cases

### TC-001: Server Readiness Check

**Objective**: Verify that the application correctly detects server availability

**User Story**: US-005, US-014

**Pre-conditions**:
- Application is loaded in browser
- Server may or may not be ready

**Test Steps**:
1. Open the application URL in a browser
2. Observe the server status indicator at the top of the page

**Expected Results**:
- If server is ready: Green "Server Ready" badge is displayed
- If server is starting: Alert shows "Server Starting Up" with loading spinner
- If server unavailable: Alert shows "Server Unavailable" error
- Status automatically updates every 5 seconds until ready

**Pass/Fail Criteria**:
- ✅ Pass: Status indicator accurately reflects server state
- ❌ Fail: Status indicator is incorrect or doesn't update

---

### TC-002: Load Vehicle References List

**Objective**: Verify that the vehicle references list loads correctly

**User Story**: US-001, US-003

**Pre-conditions**:
- Server is ready (green status badge visible)

**Test Steps**:
1. Navigate to the Vehicle selector section
2. Click on "Search vehicle..." button
3. Observe the dropdown list

**Expected Results**:
- Dropdown opens with search input
- List contains approximately 3,500 vehicle IDs
- Vehicle count is displayed in the description (e.g., "3500 vehicles")
- No lag when opening dropdown

**Pass/Fail Criteria**:
- ✅ Pass: List loads instantly, all vehicles displayed
- ❌ Fail: List doesn't load, takes too long, or shows errors

---

### TC-003: Search for Specific Vehicle

**Objective**: Verify that vehicle search functionality works correctly

**User Story**: US-003

**Pre-conditions**:
- Server is ready
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
- No lag during typing
- Selected vehicle appears in the button
- Dropdown closes after selection

**Pass/Fail Criteria**:
- ✅ Pass: Search filters instantly and accurately
- ❌ Fail: Search is slow, inaccurate, or doesn't work

---

### TC-004: Load Vehicle Trip Data

**Objective**: Verify that vehicle trip data loads and displays on map

**User Story**: US-001, US-007, US-011

**Pre-conditions**:
- Server is ready
- Vehicle "NYCT_4614" is selected

**Test Steps**:
1. With vehicle selected, click "Load Trip" button
2. Observe loading state
3. Wait for data to load
4. Observe map display

**Expected Results**:
- "Load Trip" button shows loading spinner
- Button is disabled during loading
- Trip data loads within 3-5 seconds
- Route appears on map as blue line
- Map automatically zooms to fit the route
- Trip information card displays below selectors
- Trip information shows feature count and properties

**Pass/Fail Criteria**:
- ✅ Pass: Data loads successfully and displays correctly
- ❌ Fail: Data fails to load, map doesn't update, or errors occur

---

### TC-005: Load Published Line Names List

**Objective**: Verify that the bus line names list loads correctly

**User Story**: US-002, US-004

**Pre-conditions**:
- Server is ready

**Test Steps**:
1. Navigate to the Line selector section
2. Click on "Search line..." button
3. Observe the dropdown list

**Expected Results**:
- Dropdown opens with search input
- List contains bus line names (Bx1, M1, etc.)
- Line count is displayed in the description
- No lag when opening dropdown

**Pass/Fail Criteria**:
- ✅ Pass: List loads instantly, all lines displayed
- ❌ Fail: List doesn't load, takes too long, or shows errors

---

### TC-006: Search for Specific Bus Line

**Objective**: Verify that bus line search functionality works correctly

**User Story**: US-004

**Pre-conditions**:
- Server is ready
- Line list is loaded

**Test Steps**:
1. Click "Search line..." button
2. Type "Bx2" in the search box
3. Observe filtered results
4. Select the line from results

**Expected Results**:
- Search filters results as user types
- Only matching lines are shown
- Search is case-insensitive
- No lag during typing
- Selected line appears in the button
- Dropdown closes after selection

**Pass/Fail Criteria**:
- ✅ Pass: Search filters instantly and accurately
- ❌ Fail: Search is slow, inaccurate, or doesn't work

---

### TC-007: Load Bus Line Trip Data

**Objective**: Verify that bus line trip data loads and displays on map

**User Story**: US-002, US-007, US-011

**Pre-conditions**:
- Server is ready
- Line "Bx2" is selected

**Test Steps**:
1. With line selected, click "Load Trip" button
2. Observe loading state
3. Wait for data to load
4. Observe map display

**Expected Results**:
- "Load Trip" button shows loading spinner
- Button is disabled during loading
- Trip data loads within 3-5 seconds
- Routes appear on map as blue lines (may be multiple buses)
- Map automatically zooms to fit all routes
- Trip information card displays below selectors
- Trip information shows feature count (may be multiple)

**Pass/Fail Criteria**:
- ✅ Pass: Data loads successfully and displays correctly
- ❌ Fail: Data fails to load, map doesn't update, or errors occur

---

### TC-008: Map Interaction - Zoom

**Objective**: Verify that map zoom functionality works correctly

**User Story**: US-006

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

**User Story**: US-008

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

### TC-011: Trip Information Display

**Objective**: Verify that trip information card displays correctly

**User Story**: US-009

**Pre-conditions**:
- Trip data is loaded

**Test Steps**:
1. Load a vehicle or line trip
2. Observe the "Trip Information" card below selectors
3. Review displayed information

**Expected Results**:
- Card appears when data is loaded
- "Features" count is displayed accurately
- "Type" shows "FeatureCollection" or similar
- "Sample Properties" shows JSON of first feature
- Properties are formatted and readable
- Scrollbar appears if properties are long

**Pass/Fail Criteria**:
- ✅ Pass: All information displays correctly
- ❌ Fail: Information is missing, incorrect, or unreadable

---

### TC-012: Caching - Vehicle List

**Objective**: Verify that vehicle list is cached after first load

**User Story**: US-018

**Pre-conditions**:
- Application freshly loaded
- Server is ready

**Test Steps**:
1. Open vehicle selector (first time)
2. Note load time in browser console
3. Close dropdown
4. Open vehicle selector again (second time)
5. Note load time in console

**Expected Results**:
- First load: Console shows "Fetched and cached vehicle references"
- First load takes 1-3 seconds
- Second load: Console shows "Returning cached vehicle references"
- Second load is instant (< 100ms)

**Pass/Fail Criteria**:
- ✅ Pass: Second load uses cache and is instant
- ❌ Fail: Second load fetches data again or is slow

---

### TC-013: Caching - Line List

**Objective**: Verify that line list is cached after first load

**User Story**: US-018

**Pre-conditions**:
- Application freshly loaded
- Server is ready

**Test Steps**:
1. Open line selector (first time)
2. Note load time in browser console
3. Close dropdown
4. Open line selector again (second time)
5. Note load time in console

**Expected Results**:
- First load: Console shows "Fetched and cached published line names"
- First load takes 1-3 seconds
- Second load: Console shows "Returning cached published line names"
- Second load is instant (< 100ms)

**Pass/Fail Criteria**:
- ✅ Pass: Second load uses cache and is instant
- ❌ Fail: Second load fetches data again or is slow

---

### TC-014: Caching - Trip Data

**Objective**: Verify that trip data is cached after first load

**User Story**: US-018

**Pre-conditions**:
- Application loaded
- Server is ready

**Test Steps**:
1. Load trip for vehicle "NYCT_4614" (first time)
2. Note load time and console message
3. Clear map by selecting another vehicle (don't load)
4. Select "NYCT_4614" again and click "Load Trip"
5. Note load time and console message

**Expected Results**:
- First load: Console shows "Fetched and cached bus trip for vehicle NYCT_4614"
- First load takes 2-5 seconds
- Second load: Console shows "Returning cached bus trip for vehicle NYCT_4614"
- Second load is instant (< 100ms)

**Pass/Fail Criteria**:
- ✅ Pass: Second load uses cache and is instant
- ❌ Fail: Second load fetches data again or is slow

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

### TC-016: Responsive Design - Desktop

**Objective**: Verify that application works on desktop resolution

**User Story**: US-015

**Pre-conditions**:
- Browser window sized to 1920x1080

**Test Steps**:
1. Resize browser to 1920x1080
2. Observe layout
3. Test all functionality

**Expected Results**:
- Two-column layout (selectors | map)
- All elements visible and properly sized
- Map is large and usable
- No horizontal scrolling
- All functionality works correctly

**Pass/Fail Criteria**:
- ✅ Pass: Layout is optimal for desktop viewing
- ❌ Fail: Layout is broken or cramped

---

### TC-020: Responsive Design - Laptop

**Objective**: Verify that application works on laptop resolution

**User Story**: US-015

**Pre-conditions**:
- Browser window sized to 1366x768

**Test Steps**:
1. Resize browser to 1366x768
2. Observe layout
3. Test all functionality

**Expected Results**:
- Two-column layout maintained
- Elements slightly smaller but still usable
- Map remains functional
- No horizontal scrolling
- All functionality works correctly

**Pass/Fail Criteria**:
- ✅ Pass: Layout adapts well to laptop size
- ❌ Fail: Layout is broken or elements overlap

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