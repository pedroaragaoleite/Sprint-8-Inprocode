-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2024 a las 06:47:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
-- Estructura de tabla para la tabla `running_events`
--

CREATE TABLE `running_events` (
  `id` int(11) NOT NULL,
  `event_date` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `type` varchar(25) NOT NULL,
  `route_type` varchar(25) NOT NULL,
  `distance` decimal(10,2) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `running_events`
--

INSERT INTO `running_events` (`id`, `event_date`, `name`, `city`, `type`, `route_type`, `distance`, `latitude`, `longitude`, `start`, `end`) VALUES
(62, '2024-03-05', 'Girona City Marathon', 'Girona', 'Marathon', 'City', 42.20, 41.97940000, 2.82140000, '2024-03-05 08:00:00', '2024-03-05 14:00:00'),
(63, '2024-03-12', 'Montserrat Trail Run', 'Montserrat', 'Half Marathon', 'Mountain', 21.10, 41.59360000, 1.83790000, '2024-03-12 07:30:00', '2024-03-12 11:00:00'),
(64, '2024-03-19', 'Tarragona Historical 10K', 'Tarragona', '10K', 'Historic', 10.00, 41.11890000, 1.24450000, '2024-03-19 09:00:00', '2024-03-19 10:30:00'),
(65, '2024-03-26', 'Lleida Flat Race', 'Lleida', 'Trail Run', 'Urban', 15.00, 41.61760000, 0.62000000, '2024-03-26 08:00:00', '2024-03-26 11:00:00'),
(66, '2024-04-02', 'Costa Brava Beach Dash', 'Costa Brava', '5K', 'Beach', 5.00, 41.69980000, 3.45150000, '2024-04-02 07:00:00', '2024-04-02 08:00:00'),
(67, '2024-04-09', 'Figueres Surreal Night Run', 'Figueres', 'Night Run', 'City', 10.00, 42.26790000, 2.95870000, '2024-04-09 20:00:00', '2024-04-09 21:30:00'),
(68, '2024-04-16', 'Sitges Seaside Marathon', 'Sitges', 'Marathon', 'Beach', 42.20, 41.23720000, 1.80590000, '2024-04-16 08:00:00', '2024-04-16 14:00:00'),
(69, '2024-04-23', 'Pyrenees Ultra Challenge', 'Pyrenees', 'Ultra Marathon', 'Mountain', 50.00, 42.50630000, 1.52180000, '2024-04-23 06:00:00', '2024-04-23 18:00:00'),
(70, '2024-04-30', 'Vic Spring Half Marathon', 'Vic', 'Half Marathon', 'Urban', 21.10, 41.93010000, 2.25490000, '2024-04-30 07:30:00', '2024-04-30 11:00:00'),
(71, '2024-03-07', 'Salou Coastal 5K', 'Salou', '5K', 'Beach', 5.00, 41.07750000, 1.14120000, '2024-03-07 09:00:00', '2024-03-07 09:45:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `running_events`
--
ALTER TABLE `running_events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `running_events`
--
ALTER TABLE `running_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
