-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: newm
-- ------------------------------------------------------
-- Server version	10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `nascimento` varchar(10) NOT NULL,
  `cpf` varchar(18) NOT NULL,
  `celular` varchar(18) NOT NULL,
  `email` varchar(100) NOT NULL,
  `endereco` varchar(150) NOT NULL,
  `observacao` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Isis Gabrielly Jaqueline Almeida','16/02/1990','927.621.833-59','(85)98379-0170','isisgabriellyjaquelinealmeida_@iblojas.com.br','Vila Sílvia Helena','Mora na cidade Fortaleza'),(2,'Kauê Theo Vitor Cardoso','01/10/2010','425.794.803-58','(88)98969-3812','kauetheovitorcardoso__kauetheovitorcardoso@solviagens.com','Rua Teodorico Teles Neto','Mora na cidade Fortaleza'),(3,'Lucas José Oliver da Paz','05/07/1990','263.233.623-68','(88)98961-8269','lucasjoseoliverdapaz_@w3ag.com','Rua Presidente Kennedy','Mora na cidade de Fortaleza'),(4,'Luiza Daniela Rezende','25/04/1990','520.481.303-99','(85)98188-9642','lluizadanielarezende@dominatto.ind.br','Vila Puebla','Mora na cidade de Fortaleza'),(5,'Bianca Rosa Jesus','03/03/1990','443.432.393-81','(85)98827-3827','biancarosajesus__biancarosajesus@oliveiraesouza.adv.br','Rua G','Mora na cidade Fortaleza');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-26  9:16:25
