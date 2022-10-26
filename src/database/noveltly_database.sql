-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-09-2022 a las 16:43:18
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `noveltly_database`
--
CREATE DATABASE IF NOT EXISTS `noveltly_database` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE `noveltly_database`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(30) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificaciones`
--

DROP TABLE IF EXISTS `clasificaciones`;
CREATE TABLE `clasificaciones` (
  `classId` int(11) NOT NULL,
  `className` varchar(30) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

DROP TABLE IF EXISTS `locales`;
CREATE TABLE `locales` (
  `localId` int(11) NOT NULL,
  `address` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `negocios`
--

DROP TABLE IF EXISTS `negocios`;
CREATE TABLE `negocios` (
  `businessId` int(11) NOT NULL,
  `logo` mediumblob DEFAULT NULL,
  `businessName` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `productId` int(11) NOT NULL,
  `image` longblob DEFAULT NULL,
  `description` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `type` char(7) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `businessId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `rol` char(3) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol`) VALUES
('ADM'),
('CLI'),
('EMP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `userId` int(11) NOT NULL,
  `username` varchar(30) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phone` int(8) DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `fullName` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `roleType` char(3) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indices de la tabla `clasificaciones`
--
ALTER TABLE `clasificaciones`
  ADD PRIMARY KEY (`classId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`localId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `negocios`
--
ALTER TABLE `negocios`
  ADD PRIMARY KEY (`businessId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `businessId` (`businessId`),
  ADD KEY `classId` (`classId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleType` (`roleType`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `localId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clasificaciones`
--
ALTER TABLE `clasificaciones`
  ADD CONSTRAINT `clasificaciones_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categorias` (`categoryId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `locales`
--
ALTER TABLE `locales`
  ADD CONSTRAINT `locales_ibfk_1` FOREIGN KEY (`localId`) REFERENCES `negocios` (`businessId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locales_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `negocios`
--
ALTER TABLE `negocios`
  ADD CONSTRAINT `negocios_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `negocios_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categorias` (`categoryId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`businessId`) REFERENCES `negocios` (`businessId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `clasificaciones` (`classId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`roleType`) REFERENCES `roles` (`rol`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
