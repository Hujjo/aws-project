-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2017 at 12:53 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `c9`
--

-- --------------------------------------------------------

--
-- Table structure for table `archives`
--

CREATE TABLE IF NOT EXISTS `archives` (
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `couleur1` varchar(255) DEFAULT NULL,
  `couleur2` varchar(255) DEFAULT NULL,
  `parties` int(11) DEFAULT NULL,
  `gagnees` int(11) DEFAULT NULL,
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `archives`
--

INSERT INTO `archives` (`login`, `pass`, `couleur1`, `couleur2`, `parties`, `gagnees`) VALUES
('j1', 'j1', 'red', 'green', 5, 4),
('j2', 'j2', 'yellow', 'blue', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `couleur1` varchar(255) NOT NULL,
  `couleur2` varchar(255) NOT NULL,
  `parties` int(11) unsigned NOT NULL,
  `gagnees` int(11) unsigned NOT NULL,
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`login`, `pass`, `couleur1`, `couleur2`, `parties`, `gagnees`) VALUES
('j1', 'j1', 'yellow', 'green', 3, 2),
('j2', 'j2', 'red', 'blue', 3, 1),
('j3', 'j3', 'brown', '', 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
