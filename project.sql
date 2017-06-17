-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2017 at 12:54 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `choice`
--

CREATE TABLE IF NOT EXISTS `choice` (
  `id_user` int(11) NOT NULL,
  `dateChoice` date NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (`id_user`,`dateChoice`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `choice`
--

INSERT INTO `choice` (`id_user`, `dateChoice`) VALUES
(1, '2017-03-15'),
(1, '2017-03-16'),
(1, '2017-03-17'),
(1, '2017-03-18'),
(1, '2017-04-09'),
(1, '2017-04-16'),
(1, '2017-05-03'),
(1, '2017-05-04'),
(1, '2017-05-06'),
(1, '2017-05-07'),
(1, '2017-05-08'),
(1, '2017-05-13'),
(1, '2017-05-14'),
(1, '2017-05-19'),
(1, '2017-06-10'),
(2, '2017-03-14'),
(2, '2017-03-17'),
(2, '2017-03-28'),
(2, '2017-03-29'),
(6, '2017-04-05'),
(6, '2017-04-06'),
(6, '2017-04-07'),
(6, '2017-04-08'),
(6, '2017-04-12'),
(6, '2017-04-14'),
(6, '2017-06-01'),
(7, '2017-04-08'),
(7, '2017-04-21'),
(7, '2017-04-22'),
(8, '2017-04-08'),
(8, '2017-04-09'),
(8, '2017-04-15'),
(8, '2017-04-23'),
(9, '2017-01-06'),
(9, '2017-01-07'),
(9, '2017-03-30'),
(9, '2017-03-31'),
(9, '2017-04-01'),
(9, '2017-04-03'),
(9, '2017-04-04'),
(9, '2017-04-05'),
(9, '2017-04-06'),
(9, '2017-04-07'),
(9, '2017-04-08'),
(9, '2017-04-09'),
(9, '2017-05-11');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `color` varchar(32) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `color`) VALUES
(1, 'u1', 'u1', '#0055C3'),
(2, 'u2', 'u2', '#F78C6D'),
(3, 'napo', 'aze', '#ff0080'),
(5, 'hash2', '$2a$10$50C1OHoXq7SjroM0yh3PiOIjL', '#000000'),
(6, 'napjuste', 'azerty', '#15d232'),
(7, 'n', 'azerty', '#000000'),
(8, '<h1>luca', 'luca', '#fcff55'),
(9, 'ben', '123', '#80ffff');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `choice`
--
ALTER TABLE `choice`
  ADD CONSTRAINT `choice_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
