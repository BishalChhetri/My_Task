-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: task_new
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `infos`
--

DROP TABLE IF EXISTS `infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sectors` varchar(255) DEFAULT NULL,
  `agreement` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infos`
--

LOCK TABLES `infos` WRITE;
/*!40000 ALTER TABLE `infos` DISABLE KEYS */;
INSERT INTO `infos` VALUES (133,'John Smith','Engineering',1,'2023-11-27 06:05:43','2023-11-27 06:05:51');
/*!40000 ALTER TABLE `infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitems`
--

DROP TABLE IF EXISTS `menuitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_menuitem_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitems`
--

LOCK TABLES `menuitems` WRITE;
/*!40000 ALTER TABLE `menuitems` DISABLE KEYS */;
INSERT INTO `menuitems` VALUES (1,'Manufacturing'),(2,'Other'),(3,'Service');
/*!40000 ALTER TABLE `menuitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submenus`
--

DROP TABLE IF EXISTS `submenus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submenus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menuItem_title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `submenus_title` (`title`),
  KEY `menuItem_title` (`menuItem_title`),
  KEY `idx_submenu_title` (`title`),
  CONSTRAINT `submenus_ibfk_1` FOREIGN KEY (`menuItem_title`) REFERENCES `menuitems` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submenus`
--

LOCK TABLES `submenus` WRITE;
/*!40000 ALTER TABLE `submenus` DISABLE KEYS */;
INSERT INTO `submenus` VALUES (1,'Manufacturing','Construction Materials'),(2,'Manufacturing','Electronics and Optics'),(3,'Manufacturing','Food and Beverage'),(4,'Manufacturing','Bakery Products'),(5,'Manufacturing','Furniture'),(6,'Manufacturing','Machinery'),(7,'Manufacturing','Metalworking'),(8,'Manufacturing','Plastic & Rubber'),(9,'Manufacturing','Printing'),(10,'Manufacturing','Textile & Clothing'),(11,'Manufacturing','Wood'),(12,'Service','Business Services'),(13,'Service','Engineering'),(14,'Service','IT & Telecom'),(15,'Service','Tourism'),(16,'Service','Translation Services'),(17,'Service','Transport & Logistics'),(18,'Other','Creative Industries'),(19,'Other','Energy Technology'),(20,'Other','Environment');
/*!40000 ALTER TABLE `submenus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submenusubchild`
--

DROP TABLE IF EXISTS `submenusubchild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submenusubchild` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subMenuSub_title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `subMenuSub_title` (`subMenuSub_title`),
  CONSTRAINT `submenusubchild_ibfk_1` FOREIGN KEY (`subMenuSub_title`) REFERENCES `submenusubs` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submenusubchild`
--

LOCK TABLES `submenusubchild` WRITE;
/*!40000 ALTER TABLE `submenusubchild` DISABLE KEYS */;
INSERT INTO `submenusubchild` VALUES (1,'Maritime','Aluminium & Steel Workboats'),(2,'Maritime','Boat/Yacht building'),(3,'Maritime','Ship Repair & Conversion'),(4,'Metal Works','CNC-Machining'),(5,'Metal Works','Forgings, Fasteners'),(6,'Metal Works','Gas, Plasma, Laser, Cutting');
/*!40000 ALTER TABLE `submenusubchild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submenusubchildren`
--

DROP TABLE IF EXISTS `submenusubchildren`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submenusubchildren` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subMenuSub_title` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subMenuSub_title` (`subMenuSub_title`),
  CONSTRAINT `submenusubchildren_ibfk_1` FOREIGN KEY (`subMenuSub_title`) REFERENCES `submenusubs` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submenusubchildren`
--

LOCK TABLES `submenusubchildren` WRITE;
/*!40000 ALTER TABLE `submenusubchildren` DISABLE KEYS */;
/*!40000 ALTER TABLE `submenusubchildren` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submenusubs`
--

DROP TABLE IF EXISTS `submenusubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submenusubs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subMenu_title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subMenu_title` (`subMenu_title`),
  KEY `idx_subMenuSub_title` (`title`),
  CONSTRAINT `submenusubs_ibfk_1` FOREIGN KEY (`subMenu_title`) REFERENCES `submenus` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submenusubs`
--

LOCK TABLES `submenusubs` WRITE;
/*!40000 ALTER TABLE `submenusubs` DISABLE KEYS */;
INSERT INTO `submenusubs` VALUES (1,'Bakery Products','Beverages'),(2,'Bakery Products','Fish & Fish Products'),(3,'Bakery Products','Meat & Meat Products'),(4,'Bakery Products','Milk & Dairy Products'),(5,'Bakery Products','Other'),(6,'Bakery Products','Sweets & Snack Food'),(7,'Furniture','Bathroom/sauna'),(8,'Furniture','Bedroom'),(9,'Furniture','Children\'s Room'),(10,'Furniture','Kitchen'),(11,'Furniture','Living Room'),(12,'Furniture','Office'),(13,'Furniture','Office (Furniture)'),(14,'Furniture','Outdoor'),(15,'Furniture','Project Furniture'),(16,'Machinery','Machinery Components'),(17,'Machinery','Machinery equipments'),(18,'Machinery','Manufacture of Machinery'),(19,'Machinery','Maritime'),(20,'Machinery','Metal Structures'),(21,'Machinery','Other'),(22,'Machinery','Repair & Maintenance'),(27,'MetalWorking','Construction of Structures'),(28,'MetalWorking','Housing & Buildings'),(29,'MetalWorking','Metal Products'),(30,'MetalWorking','Metal Works'),(35,'IT & Telecom','Data Proc., Web Portals'),(36,'IT & Telecom','Programming, Consult.'),(37,'IT & Telecom','Software, Hardware'),(38,'IT & Telecom','Telecommunications');
/*!40000 ALTER TABLE `submenusubs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-27 11:51:16
