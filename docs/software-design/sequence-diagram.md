``` mermaid
sequenceDiagram
    autonumber

    participant User as End User
    participant FE as Frontend (React App)
    participant BE as Backend API
    participant NYC as NYC Server
    participant Cache as Cache Storage


    %% --- 1. FRONTEND PERIODIC SERVER STATUS CHECK ---
    loop Every 15s
        FE->>BE: GET /server-status
        BE->>NYC: GET /status   (NYC returns READY or WAIT)
        alt NYC says READY
            NYC-->>BE: { status: "READY" }
            BE-->>FE: { status: "LIVE" }
        else NYC says WAIT
            NYC-->>BE: { status: "WAIT" }
            BE-->>FE: { status: "OFFLINE", reason: "NYC warming up" }
        end
    end


    %% --- 2. USER SEARCHES VEHICLE OR LINE ---
    User->>FE: Select VehicleRef or LineName
    FE->>BE: GET /bus_trip/:vehRef or /bus_line/:lineName

    %% --- 3. NYC DATA DECISION LOGIC ---
    BE->>NYC: GET trip data   (only allowed when READY)

    alt NYC READY
        NYC-->>BE: 200 OK + Live GeoJSON
        BE->>Cache: Save/update cache
        BE-->>FE: 200 OK + Live GeoJSON + { source: "live" }
        FE->>FE: Render LIVE data on map

    else NYC WAIT or Error
        NYC-->>BE: { status: "WAIT" } or timeout/error
        BE->>Cache: Load cached GeoJSON

        alt Cache Hit
            Cache-->>BE: Cached GeoJSON
            BE-->>FE: 200 OK + Cached GeoJSON + { source: "cached" }
            FE->>FE: Render CACHED data on map
        else Cache Miss
            Cache-->>BE: No data available
            BE-->>FE: 503 "No data available (NYC warming up)"
            FE->>User: Show error popup/message
        end
    end


    %% --- 4. MAP INTERACTIONS ---
    User->>FE: Click marker or route
    FE->>FE: Show popup with feature.properties



  ```

  %% Background polling (optional)
  note over Frontend,Backend: Optional: Frontend polls /server-status periodically to update indicator
