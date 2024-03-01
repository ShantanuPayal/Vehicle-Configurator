# Vehicle Configurator

## Overview
Vehicle Configurator is a B2B portal designed for leasing companies to provide their rental car company customers with a seamless platform to configure and lease a fleet of vehicles. The system is built using Spring 6, Maven 3, Spring Boot 3, REST API, MySQL 8, JPA, Docker, JWT, .NET Web API Core, SQL Server, Entity Core, and React JS. It offers a user-friendly interface for selecting cars, configuring them based on defined conditions, and generating invoices in PDF format.

## Features
- **User Authentication**: Utilizes JWT for secure user authentication and authorization.
- **Car Selection and Configuration**: Allows users to select from a variety of car models and configure them according to predefined conditions.
- **Dynamic Pricing**: The cost of the vehicle adjusts dynamically based on the selected configuration.
- **Database-Driven System**: Utilizes MySQL 8 and SQL Server for storing and managing data, ensuring easy maintenance and scalability.
- **Invoice Generation**: Generates detailed invoices in PDF format at the end of a successful transaction.

## Usage
1. **User Registration/Login**: Users can register and log in using their credentials to access the portal.
2. **Car Selection**: Browse through available car models and select the desired ones.
3. **Configuration**: Customize each selected car based on specified conditions, such as color, features, etc.
4. **Pricing**: View dynamic pricing adjustments as per the selected configurations.
5. **Transaction**: Complete the leasing transaction, and upon success, receive an invoice in PDF format.

## Installation
1. Clone the repository: `git clone https://github.com/ShantanuPayal/Vehicle-Configurator.git`
2. Navigate to the project directory: `cd Vehicle-Configurator`
3. Set up the backend:
   - Navigate to the backend directory: `cd backend`
   - Install dependencies: `mvn clean install`
   - Run the Spring Boot application: `mvn spring-boot:run`
4. Set up the frontend:
   - Navigate to the frontend directory: `cd frontend`
   - Install dependencies: `npm install`
   - Start the React application: `npm start`

## Technologies Used
- Spring 6
- Maven 3
- Spring Boot 3
- REST API
- MySQL 8
- JPA
- Docker
- JWT
- .NET Web API Core
- SQL Server
- Entity Core
- React JS



