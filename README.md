# Reviews-System-Design

   ##General
   
        This project serves as the backend design for Project Atelier, an e-commerce company. This server handles the Ratings and Reviews of the individual products. The server is implemented with node.js using express.js and the database was created with PostgreSQL.
        
   ##Performance
   
   The backend architecture utilizes AWS and NGINX to deploy a load balancer with caching across 3 servers. These tests are performed with Loader.io.
   
   <details>
     <summary>Typical Load Performance</summary>
     
     ###Pre-Optimization with 1000 Clients per second over 1 minute
   
