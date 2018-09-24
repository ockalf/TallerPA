-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2018 a las 15:49:21
-- Versión del servidor: 10.1.33-MariaDB
-- Versión de PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usobackend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimentacion`
--

CREATE TABLE `alimentacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alimentacion`
--

INSERT INTO `alimentacion` (`id`, `nombre`) VALUES
(1, 'carnÃ­voro (carroÃ±ero)'),
(2, 'carnÃ­voro (depredador)'),
(3, 'herbÃ­voro'),
(4, 'herbÃ­voro (rumiante)'),
(5, 'omnÃ­voro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animal`
--

CREATE TABLE `animal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nombreCientifico` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `clase` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `idAlimentacion` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `animal`
--

INSERT INTO `animal` (`id`, `nombre`, `nombreCientifico`, `clase`, `idAlimentacion`) VALUES
(1, 'leon', 'Panthera leo', 'Felidae', 1),
(2, 'leon', 'Panthera leo', 'Felidae', 2),
(4, 'gato', 'Felis catus', 'Felidea', 1),
(5, 'mandril', 'Mandrillus sphinx', 'Cercopithecidae', 3),
(6, 'mandril', 'Mandrillus sphinx', 'Cercopithecidae', 1),
(7, 'mono', 'Mandrillus sphinx', 'Cercopithecidae', 1),
(8, 'mono', 'Mandrillus sphinx', 'Cercopithecidae', 1),
(9, 'mono2', 'Mandrillus sphinx', 'Cercopithecidae', 1),
(10, 'mono3', 'Mandrillus sphinx', 'Cercopithecidae', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domicilio`
--

CREATE TABLE `domicilio` (
  `id_domicilio` int(10) NOT NULL,
  `calle` varchar(20) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `domicilio`
--

INSERT INTO `domicilio` (`id_domicilio`, `calle`, `numero`) VALUES
(5, '9 de Julio', '158'),
(11, 'unaCalle', '123'),
(18, 'Padre Arce', '56'),
(20, 'asd', '2131');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona2`
--

CREATE TABLE `persona2` (
  `id_persona` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `legajo` int(5) DEFAULT NULL,
  `titulo` varchar(20) DEFAULT NULL,
  `estado` varchar(1) NOT NULL,
  `fk_domicilio` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `persona2`
--

INSERT INTO `persona2` (`id_persona`, `nombre`, `apellido`, `legajo`, `titulo`, `estado`, `fk_domicilio`) VALUES
(15, 'Alberto', 'Cortez', NULL, 'Licenciado', 'P', 5),
(22, 'Emma', 'Caceres', 55555, NULL, 'A', 11),
(29, 'DAvid', 'Senese', NULL, 'Tecnico Superior en ', 'P', 18),
(31, 'asdasdÃ­asdasdÂ´Ã±', 'asd', NULL, '123', 'P', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(40) DEFAULT NULL,
  `clave_usuario` varchar(40) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `clave_usuario`) VALUES
(1, 'admin', '202cb962ac59075b964b07152d234b70'),
(2, 'fernando', 'aasd');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alimentacion`
--
ALTER TABLE `alimentacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `domicilio`
--
ALTER TABLE `domicilio`
  ADD PRIMARY KEY (`id_domicilio`);

--
-- Indices de la tabla `persona2`
--
ALTER TABLE `persona2`
  ADD PRIMARY KEY (`id_persona`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alimentacion`
--
ALTER TABLE `alimentacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `animal`
--
ALTER TABLE `animal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `domicilio`
--
ALTER TABLE `domicilio`
  MODIFY `id_domicilio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `persona2`
--
ALTER TABLE `persona2`
  MODIFY `id_persona` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
