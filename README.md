# Reviews-System-Design

##General

        This project serves as the backend design for Project Atelier, an e-commerce company. This server handles the Ratings and Reviews of the individual products. The server is implemented with node.js using express.js and the database was created with PostgreSQL.

##Performance

The backend architecture utilizes AWS and NGINX to deploy a load balancer with caching across 3 servers. These tests are performed with Loader.io.

<details><summary>Typical Load Performance Pre-Optimization</summary>

###Performance for a typical load of 1000 clients per second before load balancing and caching.

<img src="./assets/PreOpt.png"/>
</details>

<details><summary>Typical Load Performance Post-Optimization</summary>

###Performance for a typical load of 1000 clients per second after load balancing and caching.

<img src="./assets/AfterOpt.png"/>
</details>

<details><summary>9000 Clients Per Second</summary>

###Performance for a load of 9000 clients per second.

<img src="./assets/9000K.png"/>
</details>
