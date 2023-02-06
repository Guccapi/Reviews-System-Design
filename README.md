# Reviews-System-Design

## General

* This project serves as the backend design for Project Atelier, an e-commerce company. 
* This server handles the Ratings and Reviews of the individual products. 
* The server is implemented with node.js using express.js.
* The database was created with PostgreSQL.

## Performance

The backend architecture utilizes AWS and NGINX to deploy a load balancer with caching across 3 servers. These tests are performed with Loader.io.

<details><summary>Typical Load Performance Pre-Optimization</summary>

### Performance for a typical load of 1000 clients per second before load balancing and caching.

<img src="./assets/PreOpt.png"/>
</details>

<details><summary>Typical Load Performance Post-Optimization</summary>

### Performance for a typical load of 1000 clients per second after load balancing and caching.

<img src="./assets/AfterOpt.png"/>
</details>

<details><summary>9000 Clients Per Second</summary>

### Performance for a load of 9000 clients per second.

<img src="./assets/9000K.png"/>
</details>

## Tech Stack
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-brightgreen.svg?style=for-the-badge&logo=Nginx&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue.svg?style=for-the-badge&logo=postgreSQL=white)

## Team

Ratings & Reviews: Matthew Sigler\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matthew-sigler-15859610a/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/siglerm)

### Start the Application Locally

1. Clone the repository locally.
```
git clone https://github.com/Guccapi/Reviews-System-Design.git
```

2. Install the required dependencies.
```
npm install
```

3. Create a copy of `example.config.js`, rename it to `config.js`, and add the required info for your database.

4. Run the server
```
npm start
```

The application is now live locally at `http://localhost:8080/`.

