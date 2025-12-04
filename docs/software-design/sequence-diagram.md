sequenceDiagram
  participant User
  participant Sidebar as Sidebar(UI)
  participant Frontend as Frontend(App)
  participant Map as MapComponent(Leaflet)
  participant Backend as Backend(API Gateway)
  participant NYC as NYC_Server
  participant Cache as Cache/DB

  User->>Sidebar: Click/select VehicleRef / Line
  Sidebar->>Frontend: emit select(VehRef|Line)
  Frontend->>Backend: GET /server-status
  Backend->>NYC: HEAD /health or ping
  alt NYC responds OK
    NYC-->>Backend: 200 OK (live)
    Backend-->>Frontend: { status: "LIVE", lastSeen: timestamp }
    Frontend->>Backend: GET /bus_trip/getBusTripByVehRef/:id or /getBusTripByPubLineName/:line
    Backend->>NYC: GET /nyc/endpoint (proxy)
    NYC-->>Backend: 200 OK + GeoJSON (live)
    Backend->>Cache: save GeoJSON (cache update)
    Backend-->>Frontend: 200 OK + GeoJSON
    Frontend->>Frontend: clear previous layers
    Frontend->>Map: render GeoJSON (lines + points) + color
    Map-->>Frontend: on render complete
    Frontend->>User: show "Server Status: LIVE"
  else NYC unreachable / down
    NYC--x Backend: no response / error
    Backend-->>Frontend: { status: "OFFLINE" }
    Frontend->>Backend: GET /bus_trip/getCached/:id (request cached)
    Backend->>Cache: query last saved GeoJSON
    alt cached found
      Cache-->>Backend: cached GeoJSON
      Backend-->>Frontend: 200 OK + cached GeoJSON
      Frontend->>Frontend: clear previous layers
      Frontend->>Map: render cached GeoJSON (with badge "cached")
      Frontend->>User: show "Server Status: OFFLINE — Showing cached data"
    else no cache
      Cache-->>Backend: empty
      Backend-->>Frontend: 503 + "No data available"
      Frontend->>User: show error "Data unavailable"
    end
  end

  %% Interaction with rendered features
  User->>Map: click point/line
  Map->>Frontend: onFeatureClick(feature)
  Frontend->>Map: open Popup with feature.properties
  Map-->>User: display popup (properties, timestamp, etc.)

  %% Background polling (optional)
  note over Frontend,Backend: Optional: Frontend polls /server-status periodically to update indicator
