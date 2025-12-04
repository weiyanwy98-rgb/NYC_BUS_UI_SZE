Conversation opened. 1 unread message.

Skip to content
Using Gmail with screen readers
in:spam 
1 of 1
(no subject)
Spam
Nick <nick.work.stufff@gmail.com>
Attachments
3:50 PM (1 minute ago)
to me

Why is this message in spam? This message is similar to messages that were identified as spam in the past.
Report not spam

 4 Attachments
  •  Scanned by Gmail
# External API Endpoints Documentation

## Overview

This document describes the external API endpoints used by the NYC Bus Trip Viewer application. All endpoints are provided by the NYC Bus Engine API hosted on Google Cloud Run.

**Base URL:** `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip`

---

## Endpoints

### 1. Server Readiness Check

**Purpose:** Check if the NYC Bus API server is ready and operational. The server requires a cold start and may not be available 24/7.

**Endpoint:** `GET /ready`

**Full URL:** `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/ready`

**Request Method:** `GET`

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Parameters:** None

**Response:**
- **Success (200 OK)**
- **Error (4xx/5xx)**

**Response Format:**
```typescript
{
  status: string;
}
```

**Example Request:**
```bash
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/ready
```

**Example Response:**
#### Server Ready
```json
{
  "status": "Ready"
}
```
#### Server Starting Up
```json
{
  "status": "Wait"
}
```

**Usage Notes:**
- This endpoint should be called before attempting to use other endpoints
- The server may require several seconds to complete cold start
- Recommended to poll this endpoint every 5 seconds until ready

---

### 2. Get Vehicle References

**Purpose:** Retrieve a list of all available vehicle reference IDs in the NYC bus system.

**Endpoint:** `GET /getVehRef`

**Full URL:** `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getVehRef`

**Request Method:** `GET`

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Parameters:** None

**Response Format:** JSON array of strings

**Response Schema:**
```typescript
string[]
```

**Example Response:**
```json
[
  "NYCT_4614",
  "NYCT_4615",
  "NYCT_4616",
  ...
]
```

**Example Request:**
```bash
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getVehRef
```

**Usage Notes:**
- Returns approximately 3,500 vehicle references
- Response is cached for 5 minutes in the application
- Used to populate the vehicle selector dropdown

---

### 3. Get Bus Trip by Vehicle Reference

**Purpose:** Retrieve GeoJSON trip data for a specific vehicle by its reference ID.

**Endpoint:** `GET /getBusTripByVehRef/{vehicleRef}`

**Full URL:** `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getBusTripByVehRef/{vehicleRef}`

**Request Method:** `GET`

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `vehicleRef` (string, required): The vehicle reference ID (e.g., "NYCT_4614")

**Response Format:** GeoJSON FeatureCollection

**Response Schema:**
```typescript
{
  type: string;
  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: number[] | number[][];
    };
    properties: Record<string, any>;
  }>;
}
```

**Example Request:**
```bash
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getBusTripByVehRef/NYCT_4614
```

**Example Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-74.006, 40.7128],
          [-74.007, 40.7138]
        ]
      },
      "properties": {
        "vehicleRef": "NYCT_4614",
        "publishedLineName": "Bx2",
        "direction": "0",
        "timestamp": "2024-12-02T10:00:00Z"
      }
    }
  ]
}
```

**Usage Notes:**
- Returns route geometry and trip metadata
- Response is cached for 5 minutes per vehicle
- Maximum 50 vehicle trip responses cached at once (LRU eviction)

---

### 4. Get Published Line Names

**Purpose:** Retrieve a list of all published bus line names in the NYC bus system.

**Endpoint:** `GET /getPubLineName`

**Full URL:** `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getPubLineName`

**Request Method:** `GET`

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Parameters:** None

**Response Format:** JSON array of strings

**Response Schema:**
```typescript
string[]
```

**Example Response:**
```json
[
  "Bx1",
  "Bx2",
  "M1",
  "M15",
  "Q1",
  ...
]
```

**Example Request:**
```bash
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getPubLineName
```

**Usage Notes:**
- Returns all active bus line names
- Response is cached for 5 minutes in the application
- Used to populate the line selector dropdown

---

### 5. Get Bus Trip by Published Line Name

**Purpose:** Retrieve GeoJSON trip data for all buses operating on a specific line.

**Endpoint:** `GET /getBusTripByPubLineName/{lineName}`

**Full URL:** `https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getBusTripByPubLineName/{lineName}`

**Request Method:** `GET`

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `lineName` (string, required): The published line name (e.g., "Bx2")

**Response Format:** GeoJSON FeatureCollection

**Response Schema:**
```typescript
{
  type: string;
  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: number[] | number[][];
    };
    properties: Record<string, any>;
  }>;
}
```

**Example Request:**
```bash
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getBusTripByPubLineName/Bx2
```

**Example Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-74.006, 40.7128],
          [-74.007, 40.7138],
          [-74.008, 40.7148]
        ]
      },
      "properties": {
        "publishedLineName": "Bx2",
        "direction": "0",
        "routeId": "BX2",
        "tripId": "BX2_123",
        "timestamp": "2024-12-02T10:00:00Z"
      }
    }
  ]
}
```

**Usage Notes:**
- Returns route geometry for all active buses on the specified line
- May contain multiple features (one per active bus)
- Response is cached for 5 minutes per line
- Maximum 50 line trip responses cached at once (LRU eviction)

---

## Error Handling

All endpoints may return the following error responses:

### HTTP Status Codes

| Status Code | Meaning | Description |
|------------|---------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request parameters |
| 404 | Not Found | Resource not found (invalid vehicle/line ID) |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Server not ready (cold start) |

### Error Response Format Example

```json
{
  "timestamp": "2025-12-02T06:02:39.692+00:00",
  "status": 404,
  "error": "Error message description",
  "path": "/api/bus_trip/readyy"
}
```

---

<!-- ## Rate Limiting

**Current Implementation:** No explicit rate limiting documented

**Recommendations:**
- Implement client-side caching (✅ Already implemented - 5 minute cache)
- Avoid polling endpoints more frequently than necessary
- Use the `/ready` endpoint to check server availability before making requests

--- -->

## Caching Strategy

The application implements an in-memory caching layer to minimize API calls:

### Cache Configuration

| Data Type | Cache Duration | Max Cache Size | Eviction Policy |
|-----------|---------------|----------------|-----------------|
| Vehicle References | 5 minutes | 1 entry | Time-based |
| Published Line Names | 5 minutes | 1 entry | Time-based |
| Vehicle Trip GeoJSON | 5 minutes | 50 entries | LRU (Least Recently Used) |
| Line Trip GeoJSON | 5 minutes | 50 entries | LRU (Least Recently Used) |

### Cache Benefits

- **Reduced API calls:** Subsequent requests for the same data within 5 minutes return cached results
- **Improved performance:** Instant responses for cached data
- **Network efficiency:** Reduced bandwidth usage
- **Better UX:** Faster page loads and tab switching

---

## Authentication

**Current Implementation:** None required

All endpoints are publicly accessible without authentication tokens or API keys.

---

<!-- ## Implementation Details

### HTTP Client

The application uses **Axios** for all HTTP requests with the following configuration:

```typescript
const apiClient = axios.create({
  baseURL: 'https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Service Layer Location

All API integrations are implemented in:
```
src/services/busApi.ts
```

### Key Functions

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `checkServerReady()` | `/ready` | Check server availability |
| `getVehicleReferences()` | `/getVehRef` | Get vehicle list |
| `getBusTripByVehicleRef(vehicleRef)` | `/getBusTripByVehRef/{vehicleRef}` | Get vehicle trip |
| `getPublishedLineNames()` | `/getPubLineName` | Get line list |
| `getBusTripByPublishedLineName(lineName)` | `/getBusTripByPubLineName/{lineName}` | Get line trip |
| `clearCache()` | N/A | Clear all cached data |

--- -->

<!-- ## Testing

### Manual Testing

Use the following curl commands to test endpoints:

```bash
# Check server readiness
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/ready

# Get vehicle references
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getVehRef

# Get trip by vehicle
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getBusTripByVehRef/NYCT_4614

# Get line names
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getPubLineName

# Get trip by line
curl -X GET https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip/getBusTripByPubLineName/Bx2
```

--- -->

<!-- ## Monitoring Recommendations

### Server Availability
- Monitor the `/ready` endpoint health
- Track cold start times
- Alert on extended unavailability

### Performance Metrics
- API response times
- Cache hit/miss rates
- Error rates by endpoint

### Data Quality
- Validate GeoJSON structure
- Monitor for empty feature collections
- Track data freshness

--- -->

<!-- ## Future Considerations

### Potential Enhancements

1. **Real-time Updates**
   - WebSocket connection for live bus positions
   - Server-Sent Events (SSE) for push notifications

2. **Historical Data**
   - Trip history by vehicle/line
   - Route comparison over time

3. **Advanced Filtering**
   - Filter by borough, route type
   - Time-based trip queries

4. **Batch Operations**
   - Request multiple vehicles/lines in single call
   - Reduce network overhead

--- -->

<!-- ## Contact & Support -->

For API issues or questions:
- **API Provider:** NYC Bus Engine
- **Hosting:** Google Cloud Run
- **Application Repository:** [Link to your repo]

---

**Document Version:** 1.0
**Last Updated:** December 2, 2024
**Author:** Generated for NYC Bus Trip Viewer Application
External-API-Endpoints.md
Displaying unnamed.jpg.