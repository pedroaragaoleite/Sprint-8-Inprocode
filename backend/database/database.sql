
CREATE DATABASE races;

USE races;

CREATE TABLE running_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    route_type VARCHAR(50) NOT NULL,
    distance DECIMAL(10, 2) NOT NULL 
);