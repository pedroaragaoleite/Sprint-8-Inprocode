-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2024 a las 21:25:50
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
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `map_coords`
--

INSERT INTO `map_coords` (`id`, `name`, `latitude`, `longitude`) VALUES
(36, 'The Alhambra', 37.17607800, -3.58814100),
(37, 'The Great Mosque of Córdoba', 37.87908300, -4.77938300),
(38, 'Park Güell', 41.41449500, 2.15272400),
(39, 'Sagrada Família', 41.40362900, 2.17435600),
(40, 'Toledo Old City', 39.86283800, -4.02263700),
(41, 'The Giralda', 37.38611100, -5.99250000),
(42, 'Alcázar of Segovia', 40.94807100, -4.12399600),
(43, 'Royal Palace of Madrid', 40.41795300, -3.71431200),
(44, 'Plaza Mayor, Salamanca', 40.96077300, -5.66353900),
(45, 'El Escorial', 40.58903000, -4.12374900);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,6) NOT NULL,
  `longitude` decimal(10,6) NOT NULL,
  `type_food` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `latitude`, `longitude`, `type_food`) VALUES
(1, 'Verde Vivo', 40.416775, -3.703790, 'Healthy'),
(2, 'Olas de Avena', 41.385064, 2.173404, 'Healthy'),
(3, 'Eco Bocado', 39.469907, -0.376288, 'Healthy'),
(4, 'Raíces y Hojas', 37.388630, -5.982330, 'Healthy'),
(5, 'Sabor Sano', 36.721261, -4.421266, 'Healthy'),
(6, 'Alma Zen', 43.362344, -8.411540, 'Healthy'),
(7, 'Verdor Vital', 28.123546, -15.436257, 'Healthy'),
(8, 'Fresco Fénix', 39.862832, -4.027323, 'Healthy'),
(9, 'Huerta y Corazón', 41.648823, -0.889085, 'Healthy'),
(10, 'Pureza Pura', 38.345996, -0.490686, 'Healthy');

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
(1, '2024-01-15', 'Madrid Marathon', 'Madrid', 'Marathon', 'City', 42.20, 40.4165, -3.7026, '2024-01-15 09:00:00', '2024-01-15 10:00:00'),
(2, '2024-02-10', 'Barcelona Half Marathon', 'Barcelona', 'Half Marathon', 'City', 21.10, 41.3851, 2.1734, '2024-02-10 09:00:00', '2024-02-10 10:00:00'),
(3, '2024-03-20', 'Valencia 10K', 'Valencia', '10K', 'Beach', 10.00, 39.4699, -0.3763, '2024-03-20 09:00:00', '2024-03-20 10:00:00'),
(4, '2024-04-05', 'Seville City Run', 'Seville', '5K', 'City', 5.00, 37.3891, -5.9845, '2024-04-05 09:00:00', '2024-04-05 10:00:00'),
(5, '2024-05-25', 'Malaga Beach Marathon', 'Malaga', 'Marathon', 'Beach', 42.20, 36.7213, -4.4217, '2024-05-25 09:00:00', '2024-05-25 10:00:00'),
(6, '2024-06-15', 'Bilbao Night Half Marathon', 'Bilbao', 'Half Marathon', 'City', 21.10, 43.2630, -2.9350, '2024-06-15 09:00:00', '2024-06-15 10:00:00'),
(7, '2024-07-08', 'Granada Historic 10K', 'Granada', '10K', 'Historic', 10.00, 37.1773, -3.5986, '2024-07-08 09:00:00', '2024-07-08 10:00:00'),
(8, '2024-08-22', 'Alicante Sunset Run', 'Alicante', '5K', 'Beach', 5.00, 38.3452, -0.4810, '2024-08-22 09:00:00', '2024-08-22 10:00:00'),
(9, '2024-09-09', 'Zaragoza River Marathon', 'Zaragoza', 'Marathon', 'River', 42.20, 41.6488, -0.8891, '2024-09-09 09:00:00', '2024-09-09 10:00:00'),
(10, '2024-10-14', 'Gijon Autumn 10K', 'Gijon', '10K', 'Park', 10.00, 43.5411, -5.6645, '2024-10-14 09:00:00', '2024-10-14 10:00:00'),
(11, '2024-11-03', 'Tarragona Coastal Run', 'Tarragona', 'Half Marathon', 'Coast', 21.10, 41.1189, 1.2445, '2024-11-03 09:00:00', '2024-11-03 10:00:00'),
(12, '2024-12-05', 'Cordoba Bridge Marathon', 'Cordoba', 'Marathon', 'Historic', 42.20, 37.8882, -4.7794, '2024-12-05 09:00:00', '2024-12-05 10:00:00'),
(13, '2024-02-25', 'Lleida Trail Run', 'Lleida', 'Trail', 'Mountain', 15.00, 41.6176, 0.6200, '2024-02-25 09:00:00', '2024-02-25 10:00:00'),
(14, '2024-03-18', 'Salamanca Historical Marathon', 'Salamanca', 'Marathon', 'Historic', 42.20, 40.9618, -5.6668, '2024-03-18 09:00:00', '2024-03-18 10:00:00'),
(15, '2024-04-10', 'Pamplona City Run', 'Pamplona', '5K', 'City', 5.00, 42.8185, -1.6443, '2024-04-10 09:00:00', '2024-04-10 10:00:00'),
(16, '2024-05-05', 'Oviedo Green Marathon', 'Oviedo', 'Marathon', 'Park', 42.20, 43.3614, -5.8494, '2024-05-05 09:00:00', '2024-05-05 10:00:00'),
(17, '2024-06-30', 'Santander Bay 10K', 'Santander', '10K', 'Bay', 10.00, 43.4623, -3.8099, '2024-06-30 09:00:00', '2024-06-30 10:00:00'),
(18, '2024-07-20', 'Vigo Seaside Half Marathon', 'Vigo', 'Half Marathon', 'Seaside', 21.10, 42.2406, -8.7207, '2024-07-20 09:00:00', '2024-07-20 10:00:00'),
(19, '2024-08-16', 'Murcia Summer 5K', 'Murcia', '5K', 'City', 5.00, 37.9922, -1.1307, '2024-08-16 09:00:00', '2024-08-16 10:00:00'),
(20, '2024-09-22', 'Huesca Mountain Marathon', 'Huesca', 'Marathon', 'Mountain', 42.20, 42.1361, -0.4089, '2024-09-22 09:00:00', '2024-09-22 10:00:00'),
(21, '2024-10-29', 'Logroño Vineyard Run', 'Logroño', 'Half Marathon', 'Vineyard', 21.10, 42.4627, -2.4445, '2024-10-29 09:00:00', '2024-10-29 10:00:00'),
(22, '2024-11-19', 'Badajoz Border Run', 'Badajoz', '10K', 'River', 10.00, 38.8794, -6.9703, '2024-11-19 09:00:00', '2024-11-19 10:00:00'),
(23, '2024-12-12', 'Santa Cruz de Tenerife Island Marathon', 'Santa Cruz de Tenerife', 'Marathon', 'Island', 42.20, 28.4636, -16.2518, '2024-12-12 09:00:00', '2024-12-12 10:00:00'),
(24, '2024-07-04', 'Almeria Desert Run', 'Almeria', 'Trail', 'Desert', 20.00, 36.8340, -2.4637, '2024-07-04 09:00:00', '2024-07-04 10:00:00'),
(25, '2024-08-03', 'Toledo Medieval Marathon', 'Toledo', 'Marathon', 'Historic', 42.20, 39.8628, -4.0273, '2024-08-03 09:00:00', '2024-08-03 10:00:00'),
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `longitude` (`longitude`),
  ADD KEY `longitude_2` (`longitude`);

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
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
-- AUTO_INCREMENT de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `running_events`
--
ALTER TABLE `running_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
