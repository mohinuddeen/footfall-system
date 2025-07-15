# Project Overview

## 1. Key Assumptions I Made

- I assumed the sensors would always send correct and timely data, so I didn’t add heavy validation or error correction.  
- I considered that each sensor would update at least once every hour, which is how I determine whether it’s active or inactive.  
- I assumed the MongoDB connection would be stable and always available.  
- For simplicity, I kept the APIs open without authentication, assuming security wasn’t the main focus for now.  
- I stored timestamps in the server’s default time zone without handling time zone conversions.

## 2. High-Level Design Decisions

- The backend and frontend are separated to let each focus on its role: the backend manages data and APIs, while the frontend handles charts, device status, and maps.  
- The API structure is simple and modular, which makes it easy to maintain and extend.  
- I used regular polling for data updates to keep the system straightforward, instead of more complex real-time tech.  
- MongoDB was chosen because it handles flexible sensor data well.

## 3. How I’d Scale for Production

- Host the backend and database on a cloud platform like AWS or Azure, using managed MongoDB with sharding for scalability.  
- Replace polling with real-time technologies such as WebSockets to provide faster updates.  
- Add caching (e.g., Redis) to improve performance and reduce database load.  
- Implement logging and monitoring tools to track app health and performance.  
- Enhance security by adding authentication and serving APIs over HTTPS.
