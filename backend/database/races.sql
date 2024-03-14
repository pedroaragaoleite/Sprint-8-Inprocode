-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2024 a las 16:58:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `races`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `map_coords`
--

CREATE TABLE `map_coords` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `latitude` decimal(10,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `map_coords`
--

INSERT INTO `map_coords` (`id`, `name`, `longitude`, `latitude`) VALUES
(36, 'The Alhambra', -3.58814100, 37.17607800),
(37, 'The Great Mosque of Córdoba', -4.77938300, 37.87908300),
(38, 'Park Güell', 2.15272400, 41.41449500),
(39, 'Sagrada Família', 2.17435600, 41.40362900),
(40, 'Toledo Old City', -4.02263700, 39.86283800),
(41, 'The Giralda', -5.99250000, 37.38611100),
(42, 'Alcázar of Segovia', -4.12399600, 40.94807100),
(43, 'Royal Palace of Madrid', -3.71431200, 40.41795300),
(44, 'Plaza Mayor, Salamanca', -5.66353900, 40.96077300),
(45, 'El Escorial', -4.12374900, 40.58903000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `running_events`
--

CREATE TABLE `running_events` (
  `id` int(11) NOT NULL,
  `event_date` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `route_type` varchar(50) NOT NULL,
  `distance` decimal(10,2) NOT NULL,
  `latitude` decimal(10,4) NOT NULL,
  `longitude` decimal(11,4) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `running_events`
--

INSERT INTO `running_events` (`id`, `event_date`, `name`, `city`, `type`, `route_type`, `distance`, `latitude`, `longitude`, `start`, `end`) VALUES
(102, '2024-01-05', 'New Year Resolution Run', 'Barcelona', '5K', 'Urban', 5.00, 41.3851, 2.1734, '2024-01-05 09:00:00', '2024-01-05 10:00:00'),
(103, '2024-01-12', 'Winter Wonderland Half', 'Andorra', 'Half Marathon', 'Snow', 21.10, 42.5063, 1.5218, '2024-01-12 08:00:00', '2024-01-12 11:00:00'),
(104, '2024-01-19', 'Urban Trail Series', 'Madrid', '10K', 'City', 10.00, 40.4168, -3.7038, '2024-01-19 07:00:00', '2024-01-19 08:30:00'),
(105, '2024-01-26', 'Frosty Mountain Marathon', 'Sierra Nevada', 'Marathon', 'Mountain', 42.20, 37.0985, -3.7849, '2024-01-26 07:00:00', '2024-01-26 13:00:00'),
(106, '2024-02-02', 'Valentine’s Love Run', 'Valencia', '10K', 'Urban', 10.00, 39.4699, -0.3763, '2024-02-02 18:00:00', '2024-02-02 19:30:00'),
(109, '2024-02-23', 'Leap Year Lakeside Leap', 'Gijon', '10K', 'Park', 10.00, 43.5322, -5.6611, '2024-02-23 10:00:00', '2024-02-23 11:30:00'),
(110, '2024-03-02', 'Spring Bloom Race', 'Sevilla', 'Half Marathon', 'Urban', 21.10, 37.3891, -5.9845, '2024-03-02 08:00:00', '2024-03-02 11:00:00'),
(111, '2024-04-07', 'May Flowers Trail', 'Granada', 'Trail Run', 'Mountain', 15.00, 37.1773, -3.5986, '2024-04-07 07:00:00', '2024-04-07 10:00:00'),
(116, '2024-06-11', 'City Night Lights Run', 'Lisbon', 'Half Marathon', 'City', 21.10, 38.7223, -9.1393, '2024-06-11 21:00:00', '2024-06-11 23:30:00'),
(118, '2024-06-25', 'Beach Volley Run', 'Ibiza', '5K', 'Beach', 5.00, 38.9068, 1.4201, '2024-06-25 17:00:00', '2024-06-25 18:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `map_coords`
--
ALTER TABLE `map_coords`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `running_events`
--
ALTER TABLE `running_events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `map_coords`
--
ALTER TABLE `map_coords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `running_events`
--
ALTER TABLE `running_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
