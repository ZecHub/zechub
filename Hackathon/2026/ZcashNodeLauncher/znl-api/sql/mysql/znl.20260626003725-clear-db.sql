-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: znl
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `infra_api_access_log`
--

DROP TABLE IF EXISTS `infra_api_access_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infra_api_access_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Log Master Keys',
  `trace_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Link tracking number.',
  `user_id` bigint NOT NULL DEFAULT '0' COMMENT 'User ID',
  `user_type` tinyint NOT NULL DEFAULT '0' COMMENT 'User Type',
  `application_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Apply Name',
  `request_method` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Method name requested',
  `request_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Address of the request',
  `request_params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Request Parameters',
  `response_body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Response',
  `user_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'User IP',
  `user_agent` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Browser UA',
  `operate_module` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Operation Module',
  `operate_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Operation Name',
  `operate_type` tinyint DEFAULT '0' COMMENT 'Operations Classification',
  `begin_time` datetime NOT NULL COMMENT 'Start Request Time',
  `end_time` datetime NOT NULL COMMENT 'End of request time',
  `duration` int NOT NULL COMMENT 'Duration of implementation',
  `result_code` int NOT NULL DEFAULT '0' COMMENT 'The result code.',
  `result_msg` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Results Hint',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_create_time` (`create_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='API Access Log Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infra_api_access_log`
--

LOCK TABLES `infra_api_access_log` WRITE;
/*!40000 ALTER TABLE `infra_api_access_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `infra_api_access_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infra_api_error_log`
--

DROP TABLE IF EXISTS `infra_api_error_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infra_api_error_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `trace_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Link tracking number.',
  `user_id` bigint NOT NULL DEFAULT '0' COMMENT 'User ID',
  `user_type` tinyint NOT NULL DEFAULT '0' COMMENT 'User Type',
  `application_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Apply Name',
  `request_method` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Method name requested',
  `request_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Address of the request',
  `request_params` varchar(8000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Request Parameters',
  `user_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'User IP',
  `user_agent` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Browser UA',
  `exception_time` datetime NOT NULL COMMENT 'Anomalous time of occurrence',
  `exception_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Anomalous name',
  `exception_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Unusual news.',
  `exception_root_cause_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'It''s an unusual source of information.',
  `exception_stack_trace` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Anomalous Trail',
  `exception_class_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Unusual Full Name',
  `exception_file_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Unusual Class Files',
  `exception_method_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'The name of the method of abnormality.',
  `exception_line_number` int NOT NULL COMMENT 'The way that an anomaly happens.',
  `process_status` tinyint NOT NULL COMMENT 'Process Status',
  `process_time` datetime DEFAULT NULL COMMENT 'Processing Time',
  `process_user_id` int DEFAULT '0' COMMENT 'Process user IDs',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22656 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='System Anomalous Log';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infra_api_error_log`
--

LOCK TABLES `infra_api_error_log` WRITE;
/*!40000 ALTER TABLE `infra_api_error_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `infra_api_error_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infra_config`
--

DROP TABLE IF EXISTS `infra_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infra_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Arguments Main Key',
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Parameter Grouping',
  `type` tinyint NOT NULL COMMENT 'Parameter Type',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Parameter Name',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Parameter Key Name',
  `value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Parameter Keys',
  `visible` bit(1) NOT NULL COMMENT 'Visible',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Parameter Configuration Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infra_config`
--

LOCK TABLES `infra_config` WRITE;
/*!40000 ALTER TABLE `infra_config` DISABLE KEYS */;
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (2,'biz',1,'User-Default-Password','system.user.init-password','123456',0x00,'Default Password 123456','admin','2021-01-05 17:03:48','1','2026-06-24 22:56:53',0x00);
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (7,'url',2,'MySQL Monitor Address','url.druid','',0x01,'','1','2023-04-07 13:41:16','1','2026-06-24 23:01:46',0x01);
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (8,'url',2,'SkyWalking Monitor Address','url.skywalking','',0x01,'','1','2023-04-07 13:41:16','1','2026-06-24 23:01:46',0x01);
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (9,'url',2,'Spring Boot Admin Monitor Address','url.spring-boot-admin','',0x01,'','1','2023-04-07 13:41:16','1','2026-06-24 23:01:46',0x01);
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (10,'url',2,'Swagger Doc Address','url.swagger','',0x01,'','1','2023-04-07 13:41:16','1','2026-06-24 23:01:46',0x01);
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (11,'ui',2,'Tencent Map Key','tencent.lbs.key','#####-#####-#####-#####-#####-#####',0x01,'Tencent Map Key','1','2023-06-03 19:16:27','1','2026-06-24 23:01:46',0x01);
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (12,'test2',2,'test3','test4','test5',0x01,'test6','1','2023-12-03 09:55:16','1','2026-06-24 22:56:02',0x01);
INSERT INTO `infra_config` (`id`, `category`, `type`, `name`, `config_key`, `value`, `visible`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (13,'biz',2,'User Register Switch','system.user.register-enabled','true',0x00,'','1','2025-04-26 17:23:41','1','2026-06-24 23:01:46',0x01);
/*!40000 ALTER TABLE `infra_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infra_file`
--

DROP TABLE IF EXISTS `infra_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infra_file` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Document number',
  `config_id` bigint DEFAULT NULL COMMENT 'Configure Numbering',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Filename',
  `path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'File Path',
  `url` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'File URL',
  `type` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'File Type',
  `size` int NOT NULL COMMENT 'File Size',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1984 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='File sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infra_file`
--

LOCK TABLES `infra_file` WRITE;
/*!40000 ALTER TABLE `infra_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `infra_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infra_file_config`
--

DROP TABLE IF EXISTS `infra_file_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infra_file_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Configure Name',
  `storage` tinyint NOT NULL COMMENT 'Memory',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `master` bit(1) NOT NULL COMMENT 'Whether or not to configure',
  `config` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Storage Configuration',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='File Profile';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infra_file_config`
--

LOCK TABLES `infra_file_config` WRITE;
/*!40000 ALTER TABLE `infra_file_config` DISABLE KEYS */;
INSERT INTO `infra_file_config` (`id`, `name`, `storage`, `remark`, `master`, `config`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (29,'LocalStorage',10,NULL,0x01,'{\n    \"@class\": \"com.zcashjava.znl.module.infra.framework.file.core.client.local.LocalFileClientConfig\",\n    \"basePath\": \"/Users/yunai/tmp/file\",\n    \"domain\": \"http://127.0.0.1:48080\"\n}','1','2025-05-02 11:25:45','1','2026-06-26 00:00:22',0x00);
/*!40000 ALTER TABLE `infra_file_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infra_file_content`
--

DROP TABLE IF EXISTS `infra_file_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infra_file_content` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `config_id` bigint NOT NULL COMMENT 'Configure Numbering',
  `path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'File Path',
  `content` mediumblob NOT NULL COMMENT 'File Contents',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='File sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infra_file_content`
--

LOCK TABLES `infra_file_content` WRITE;
/*!40000 ALTER TABLE `infra_file_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `infra_file_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_dept`
--

DROP TABLE IF EXISTS `system_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_dept` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Sector id',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Name of department',
  `parent_id` bigint NOT NULL DEFAULT '0' COMMENT 'Parent id',
  `sort` int NOT NULL DEFAULT '0' COMMENT 'Show Order',
  `leader_user_id` bigint DEFAULT NULL COMMENT 'Officer-in-Charge',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Contact call.',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Mailbox',
  `status` tinyint NOT NULL COMMENT 'Sector Status (0 Normal 1 Disableed)',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Sectoral table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_dept`
--

LOCK TABLES `system_dept` WRITE;
/*!40000 ALTER TABLE `system_dept` DISABLE KEYS */;
INSERT INTO `system_dept` (`id`, `name`, `parent_id`, `sort`, `leader_user_id`, `phone`, `email`, `status`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (100,'Zcash Java',0,0,1,NULL,NULL,0,'admin','2021-01-05 17:03:47','1','2026-06-23 13:27:24',0x00,1);
INSERT INTO `system_dept` (`id`, `name`, `parent_id`, `sort`, `leader_user_id`, `phone`, `email`, `status`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (101,'Los Angels',100,1,104,NULL,NULL,0,'admin','2021-01-05 17:03:47','1','2026-06-23 13:27:24',0x00,1);
INSERT INTO `system_dept` (`id`, `name`, `parent_id`, `sort`, `leader_user_id`, `phone`, `email`, `status`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (103,'R&D Dept',101,1,1,NULL,NULL,0,'admin','2021-01-05 17:03:47','1','2026-06-23 13:27:24',0x00,1);
INSERT INTO `system_dept` (`id`, `name`, `parent_id`, `sort`, `leader_user_id`, `phone`, `email`, `status`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (105,'Testing Dept',101,3,NULL,NULL,NULL,0,'admin','2021-01-05 17:03:47','1','2026-06-23 13:27:24',0x00,1);
/*!40000 ALTER TABLE `system_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_dict_data`
--

DROP TABLE IF EXISTS `system_dict_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_dict_data` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Dictionary Encoding',
  `sort` int NOT NULL DEFAULT '0' COMMENT 'Sort Dictionary',
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Dictionary Tags',
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Dictionary Keys',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Dictionary Type',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT 'Status (0 normal 1 disabled)',
  `color_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Colour Type',
  `css_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'css style',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3031 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Dictionary Data Sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_dict_data`
--

LOCK TABLES `system_dict_data` WRITE;
/*!40000 ALTER TABLE `system_dict_data` DISABLE KEYS */;
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1,1,'Male','1','system_user_sex',0,'default','A','Male','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (2,2,'Female','2','system_user_sex',0,'success','','Female','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (8,1,'Normal','1','infra_job_status',0,'success','','Normal','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (9,2,'Suspended','2','infra_job_status',0,'danger','','Suspended','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (12,1,'System-Internal','1','infra_config_type',0,'danger','','System-Internal','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (13,2,'Custom','2','infra_config_type',0,'primary','','Custom','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (16,0,'Others','0','infra_operate_type',0,'default','','Others','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (17,1,'Query','1','infra_operate_type',0,'info','','Query','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (18,2,'Create','2','infra_operate_type',0,'primary','','Create','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (19,3,'Update','3','infra_operate_type',0,'warning','','Update','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (20,4,'Delete','4','infra_operate_type',0,'danger','','Delete','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (22,5,'Export','5','infra_operate_type',0,'default','','Export','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (23,6,'Import','6','infra_operate_type',0,'default','','Import','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (27,1,'Enabled','0','common_status',0,'primary','','Enabled','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (28,2,'Disabled','1','common_status',0,'info','','Disabled','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (29,1,'Dir','1','system_menu_type',0,'','','Dir','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (30,2,'Menu','2','system_menu_type',0,'','','Menu','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (31,3,'Button','3','system_menu_type',0,'','','Button','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (32,1,'System-Internal','1','system_role_type',0,'danger','','System-Internal','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (33,2,'Custom','2','system_role_type',0,'primary','','Custom','admin','2021-01-05 17:03:48','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (34,1,'All','1','system_data_scope',0,'','','All','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (35,2,'Dept','2','system_data_scope',0,'','','Dept','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (36,3,'User-Dept','3','system_data_scope',0,'','','User-Dept','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (37,4,'User-Dept-Recurse','4','system_data_scope',0,'','','User-Dept-Recurse','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (38,5,'User','5','system_data_scope',0,'','','User','admin','2021-01-05 17:03:48','','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (39,0,'Success','0','system_login_result',0,'success','','Success','','2021-01-18 06:17:36','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (40,10,'Incorrect Username or Password','10','system_login_result',0,'primary','','Incorrect Username or Password','','2021-01-18 06:17:54','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (41,20,'Account blocked','20','system_login_result',0,'warning','','Account blocked','','2021-01-18 06:17:54','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (42,30,'Verification code does not exist','30','system_login_result',0,'info','','Verification code does not exist','','2021-01-18 06:17:54','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (43,31,'Incorrect verification code','31','system_login_result',0,'info','','Incorrect verification code','','2021-01-18 06:17:54','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (44,100,'Server Error','100','system_login_result',0,'danger','','Server Error','','2021-01-18 06:17:54','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (45,1,'Yes','true','infra_boolean_string',0,'danger','','Yes','','2021-01-19 03:20:55','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (46,1,'No','false','infra_boolean_string',0,'info','','No','','2021-01-19 03:20:55','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (60,1,'Member','1','user_type',0,'primary','',NULL,'','2021-02-26 00:16:27','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (61,2,'Admin','2','user_type',0,'success','',NULL,'','2021-02-26 00:16:34','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (62,0,'Unhandled','0','infra_api_error_log_process_status',0,'primary','',NULL,'','2021-02-26 07:07:19','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (63,1,'Handled','1','infra_api_error_log_process_status',0,'success','',NULL,'','2021-02-26 07:07:26','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (64,2,'Ignored','2','infra_api_error_log_process_status',0,'danger','',NULL,'','2021-02-26 07:07:34','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (80,100,'Username','100','system_login_type',0,'primary','','Username','1','2021-10-06 00:52:02','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (81,101,'Social','101','system_login_type',0,'info','','Social','1','2021-10-06 00:52:17','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (83,200,'Logout','200','system_login_type',0,'primary','','Logout','1','2021-10-06 00:52:58','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (85,202,'Force Logout','202','system_login_type',0,'danger','','Force Logout','1','2021-10-06 00:53:41','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1150,1,'DB','1','infra_file_storage',0,'default','',NULL,'1','2022-03-15 00:25:28','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1151,10,'Local Disk','10','infra_file_storage',0,'default','',NULL,'1','2022-03-15 00:25:41','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1152,11,'FTP Server','11','infra_file_storage',0,'default','',NULL,'1','2022-03-15 00:26:06','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1153,12,'SFTP Server','12','infra_file_storage',0,'default','',NULL,'1','2022-03-15 00:26:22','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1154,20,'S3 Server','20','infra_file_storage',0,'default','',NULL,'1','2022-03-15 00:26:31','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1155,103,'SMS','103','system_login_type',0,'default','',NULL,'1','2022-05-09 23:57:58','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1156,1,'password','password','system_oauth2_grant_type',0,'default','','password mode','1','2022-05-12 00:22:05','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1157,2,'authorization_code','authorization_code','system_oauth2_grant_type',0,'primary','','authorization code mode','1','2022-05-12 00:22:59','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1158,3,'implicit','implicit','system_oauth2_grant_type',0,'success','','implicit','1','2022-05-12 00:23:40','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1159,4,'client_credentials','client_credentials','system_oauth2_grant_type',0,'default','','client credentials','1','2022-05-12 00:23:51','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1160,5,'refresh_token','refresh_token','system_oauth2_grant_type',0,'info','','refresh token','1','2022-05-12 00:24:02','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1436,20,'Zcash','20','system_social_type',0,'','','','1','2023-11-04 13:04:54','1','2026-06-23 14:09:37',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1529,1,'Day','1','date_interval',0,'','','','1','2024-03-29 22:50:26','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1530,2,'Week','2','date_interval',0,'','','','1','2024-03-29 22:50:36','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1531,3,'Month','3','date_interval',0,'','','','1','2024-03-29 22:50:46','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1532,4,'Quarter','4','date_interval',0,'','','','1','2024-03-29 22:51:01','1','2026-06-24 23:30:24',0x00);
INSERT INTO `system_dict_data` (`id`, `sort`, `label`, `value`, `dict_type`, `status`, `color_type`, `css_class`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1533,5,'Year','5','date_interval',0,'','','','1','2024-03-29 22:51:07','1','2026-06-24 23:30:24',0x00);
/*!40000 ALTER TABLE `system_dict_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_dict_type`
--

DROP TABLE IF EXISTS `system_dict_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_dict_type` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Dictionary Master Keys',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Dictionary Name',
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Dictionary Type',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT 'Status (0 normal 1 disabled)',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `deleted_time` datetime DEFAULT NULL COMMENT 'Delete Time',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Dictionary Type List';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_dict_type`
--

LOCK TABLES `system_dict_type` WRITE;
/*!40000 ALTER TABLE `system_dict_type` DISABLE KEYS */;
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (1,'Gender','system_user_sex',0,NULL,'admin','2021-01-05 17:03:48','1','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (6,'Config Type','infra_config_type',0,NULL,'admin','2021-01-05 17:03:48','','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (9,'Operate Type','infra_operate_type',0,NULL,'admin','2021-01-05 17:03:48','1','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (10,'Status','common_status',0,NULL,'admin','2021-01-05 17:03:48','','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (11,'Yes/No','infra_boolean_string',0,NULL,'','2021-01-19 03:20:08','','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (104,'Login Result','system_login_result',0,'Login Result','','2021-01-18 06:17:11','','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (109,'User Type','user_type',0,NULL,'','2021-02-26 00:15:51','','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (110,'Api error handle status','infra_api_error_log_process_status',0,NULL,'','2021-02-26 07:07:01','','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (116,'Login Type','system_login_type',0,NULL,'1','2021-10-06 00:50:46','1','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (145,'Role Type','system_role_type',0,NULL,'1','2022-02-16 13:01:46','1','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (147,'OAuth2 grant type','system_oauth2_grant_type',0,NULL,'1','2022-05-12 00:20:52','1','2026-06-24 23:33:08',0x00,NULL);
INSERT INTO `system_dict_type` (`id`, `name`, `type`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `deleted_time`) VALUES (601,'Social Type','system_social_type',0,'','1','2023-11-04 13:03:54','1','2026-06-24 23:33:08',0x00,NULL);
/*!40000 ALTER TABLE `system_dict_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_login_log`
--

DROP TABLE IF EXISTS `system_login_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_login_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Access ID',
  `log_type` bigint NOT NULL COMMENT 'Log Type',
  `trace_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Link tracking number.',
  `user_id` bigint NOT NULL DEFAULT '0' COMMENT 'User ID',
  `user_type` tinyint NOT NULL DEFAULT '0' COMMENT 'User Type',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '',
  `result` tinyint NOT NULL COMMENT 'Landing results',
  `user_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'User IP',
  `user_agent` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Browser UA',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4035 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='System access logs';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_login_log`
--

LOCK TABLES `system_login_log` WRITE;
/*!40000 ALTER TABLE `system_login_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_login_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_menu`
--

DROP TABLE IF EXISTS `system_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Menu ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Menu Name',
  `permission` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Permission Identification',
  `type` tinyint NOT NULL COMMENT 'Menu Type',
  `sort` int NOT NULL DEFAULT '0' COMMENT 'Show Order',
  `parent_id` bigint NOT NULL DEFAULT '0' COMMENT 'Parent Menu ID',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Route Address',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '#' COMMENT 'Menu Icon',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Component Path',
  `component_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Component Name',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT 'Menu Status',
  `visible` bit(1) NOT NULL DEFAULT b'1' COMMENT 'Visible',
  `keep_alive` bit(1) NOT NULL DEFAULT b'1' COMMENT 'Cache',
  `always_show` bit(1) NOT NULL DEFAULT b'1' COMMENT 'Whether to always show',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5042 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Menu Permission Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_menu`
--

LOCK TABLES `system_menu` WRITE;
/*!40000 ALTER TABLE `system_menu` DISABLE KEYS */;
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1,'System','',1,10,0,'/system','ep:tools',NULL,NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (2,'Infra','',1,20,0,'/infra','ep:monitor',NULL,NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (100,'User','system:user:list',2,1,1,'user','ep:avatar','system/user/index','SystemUser',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (101,'Role','',2,2,1,'role','ep:user','system/role/index','SystemRole',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (102,'Menu','',2,3,1,'menu','ep:menu','system/menu/index','SystemMenu',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (103,'Dept','',2,4,1,'dept','fa:address-card','system/dept/index','SystemDept',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (104,'Post','',2,5,1,'post','fa:address-book-o','system/post/index','SystemPost',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (105,'Dict','',2,6,1,'dict','ep:collection','system/dict/index','SystemDictType',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (106,'Config','',2,8,2,'config','fa:connectdevelop','infra/config/index','InfraConfig',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (108,'Log','',1,9,1,'log','ep:document-copy','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (109,'Token','',2,2,1261,'token','fa:key','system/oauth2/token/index','SystemTokenClient',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (500,'Operate Log','',2,1,108,'operate-log','ep:position','system/operatelog/index','SystemOperateLog',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (501,'Login Log','',2,2,108,'login-log','ep:promotion','system/loginlog/index','SystemLoginLog',0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1001,'Query User','system:user:query',3,1,100,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1002,'Create User','system:user:create',3,2,100,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1003,'Edit User','system:user:update',3,3,100,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1004,'Delete User','system:user:delete',3,4,100,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1005,'Export User','system:user:export',3,5,100,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1006,'Import User','system:user:import',3,6,100,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1007,'Reset Password','system:user:update-password',3,7,100,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1008,'Query Role','system:role:query',3,1,101,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1009,'Create Role','system:role:create',3,2,101,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1010,'Update Role','system:role:update',3,3,101,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1011,'Delete Role','system:role:delete',3,4,101,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1012,'Export Role','system:role:export',3,5,101,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1013,'Query Menu','system:menu:query',3,1,102,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1014,'Create Menu','system:menu:create',3,2,102,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1015,'Edit Menu','system:menu:update',3,3,102,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1016,'Delete Menu','system:menu:delete',3,4,102,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1017,'Query Dept','system:dept:query',3,1,103,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1018,'Create Dept','system:dept:create',3,2,103,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1019,'Edit Dept','system:dept:update',3,3,103,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1020,'Delete Dept','system:dept:delete',3,4,103,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1021,'Query Post','system:post:query',3,1,104,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1022,'Create Post','system:post:create',3,2,104,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1023,'Edit Post','system:post:update',3,3,104,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1024,'Delete Post','system:post:delete',3,4,104,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1025,'Export Post','system:post:export',3,5,104,'','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1026,'Query Dict','system:dict:query',3,1,105,'#','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1027,'Create Dict','system:dict:create',3,2,105,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1028,'Update Dict','system:dict:update',3,3,105,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1029,'Delete Dict','system:dict:delete',3,4,105,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1030,'Export Dict','system:dict:export',3,5,105,'#','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1031,'Query Config','infra:config:query',3,1,106,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1032,'Create Config','infra:config:create',3,2,106,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1033,'Edit Config','infra:config:update',3,3,106,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1034,'Delete Config','infra:config:delete',3,4,106,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1035,'Export Config','infra:config:export',3,5,106,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1040,'Query Operate','system:operate-log:query',3,1,500,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1042,'Export Log','system:operate-log:export',3,2,500,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1043,'Query Login','system:login-log:query',3,1,501,'#','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1045,'Export Log','system:login-log:export',3,3,501,'#','#','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1046,'Token List','system:oauth2-token:page',3,1,109,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1048,'Delete Token','system:oauth2-token:delete',3,2,109,'','','',NULL,0,0x01,0x01,0x01,'admin','2021-01-05 17:03:48','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1063,'Set User-Role Permission','system:permission:assign-role-menu',3,6,101,'','','',NULL,0,0x01,0x01,0x01,'','2021-01-06 17:53:44','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1064,'Set Role-DataScope Permission','system:permission:assign-role-data-scope',3,7,101,'','','',NULL,0,0x01,0x01,0x01,'','2021-01-06 17:56:31','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1065,'Set User-Role Relation','system:permission:assign-user-role',3,8,101,'','','',NULL,0,0x01,0x01,0x01,'','2021-01-07 10:23:28','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1078,'Access Log','',2,1,1083,'api-access-log','ep:place','infra/apiAccessLog/index','InfraApiAccessLog',0,0x01,0x01,0x01,'','2021-02-26 01:32:59','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1082,'Export Log','infra:api-access-log:export',3,2,1078,'','','',NULL,0,0x01,0x01,0x01,'','2021-02-26 01:32:59','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1083,'Api Log','',2,4,2,'log','fa:tasks',NULL,NULL,0,0x01,0x01,0x01,'','2021-02-26 02:18:24','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1084,'Error Log','infra:api-error-log:query',2,2,1083,'api-error-log','ep:warning-filled','infra/apiErrorLog/index','InfraApiErrorLog',0,0x01,0x01,0x01,'','2021-02-26 07:53:20','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1085,'Handle Log','infra:api-error-log:update-status',3,2,1084,'','','',NULL,0,0x01,0x01,0x01,'','2021-02-26 07:53:20','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1086,'Export Log','infra:api-error-log:export',3,3,1084,'','','',NULL,0,0x01,0x01,0x01,'','2021-02-26 07:53:20','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1088,'Query Log','infra:api-access-log:query',3,1,1078,'','','',NULL,0,0x01,0x01,0x01,'1','2021-03-10 01:28:04','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1089,'Query Log','infra:api-error-log:query',3,1,1084,'','','',NULL,0,0x01,0x01,0x01,'1','2021-03-10 01:29:09','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1138,'Tenant List','',2,0,1224,'list','ep:house','system/tenant/index','SystemTenant',0,0x01,0x01,0x01,'','2021-12-14 12:31:43','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1139,'Query Tenant','system:tenant:query',3,1,1138,'','','',NULL,0,0x01,0x01,0x01,'','2021-12-14 12:31:44','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1140,'Create Tenant','system:tenant:create',3,2,1138,'','','',NULL,0,0x01,0x01,0x01,'','2021-12-14 12:31:44','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1141,'Edit Tenant','system:tenant:update',3,3,1138,'','','',NULL,0,0x01,0x01,0x01,'','2021-12-14 12:31:44','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1142,'Delete Tenant','system:tenant:delete',3,4,1138,'','','',NULL,0,0x01,0x01,0x01,'','2021-12-14 12:31:44','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1143,'Export Tenant','system:tenant:export',3,5,1138,'','','',NULL,0,0x01,0x01,0x01,'','2021-12-14 12:31:44','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1224,'Tenant Management','',2,0,1,'tenant','fa-solid:house-user',NULL,NULL,0,0x01,0x01,0x01,'1','2022-02-20 01:41:13','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1225,'Tenant Package','',2,0,1224,'package','fa:bars','system/tenantPackage/index','SystemTenantPackage',0,0x01,0x01,0x01,'','2022-02-19 17:44:06','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1226,'Query Tenant Package','system:tenant-package:query',3,1,1225,'','','',NULL,0,0x01,0x01,0x01,'','2022-02-19 17:44:06','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1227,'Create Tenant Package','system:tenant-package:create',3,2,1225,'','','',NULL,0,0x01,0x01,0x01,'','2022-02-19 17:44:06','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1228,'Edit Tenant Package','system:tenant-package:update',3,3,1225,'','','',NULL,0,0x01,0x01,0x01,'','2022-02-19 17:44:06','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1229,'Delete Tenant Package','system:tenant-package:delete',3,4,1225,'','','',NULL,0,0x01,0x01,0x01,'','2022-02-19 17:44:06','','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1261,'OAuth 2.0','',2,10,1,'oauth2','fa:dashcube',NULL,NULL,0,0x01,0x01,0x01,'1','2022-05-09 23:38:17','1','2024-02-29 01:12:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1263,'App','',2,0,1261,'oauth2/application','fa:hdd-o','system/oauth2/client/index','SystemOAuth2Client',0,0x01,0x01,0x01,'','2022-05-10 16:26:33','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1264,'Query Client','system:oauth2-client:query',3,1,1263,'','','',NULL,0,0x01,0x01,0x01,'','2022-05-10 16:26:33','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1265,'Create Client','system:oauth2-client:create',3,2,1263,'','','',NULL,0,0x01,0x01,0x01,'','2022-05-10 16:26:33','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1266,'Edit Client','system:oauth2-client:update',3,3,1263,'','','',NULL,0,0x01,0x01,0x01,'','2022-05-10 16:26:33','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1267,'Delete Client','system:oauth2-client:delete',3,4,1263,'','','',NULL,0,0x01,0x01,0x01,'','2022-05-10 16:26:33','1','2026-06-25 14:57:08',0x00);
INSERT INTO `system_menu` (`id`, `name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `component_name`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (5010,'Switch Tenant','system:tenant:visit',3,999,1138,'','','','',0,0x01,0x01,0x01,'1','2025-05-05 15:25:32','1','2026-06-25 14:57:08',0x00);
/*!40000 ALTER TABLE `system_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_oauth2_access_token`
--

DROP TABLE IF EXISTS `system_oauth2_access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_oauth2_access_token` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `user_id` bigint NOT NULL COMMENT 'User ID',
  `user_type` tinyint NOT NULL COMMENT 'User Type',
  `user_info` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'User Information',
  `access_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Access the tokens',
  `refresh_token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Refresh Decoration',
  `client_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Client ID',
  `scopes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Scope of the mandate',
  `expires_time` datetime NOT NULL COMMENT 'Expiration time',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_access_token` (`access_token`) USING BTREE,
  KEY `idx_refresh_token` (`refresh_token`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='OAuth2 access token';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_oauth2_access_token`
--

LOCK TABLES `system_oauth2_access_token` WRITE;
/*!40000 ALTER TABLE `system_oauth2_access_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_oauth2_access_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_oauth2_approve`
--

DROP TABLE IF EXISTS `system_oauth2_approve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_oauth2_approve` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `user_id` bigint NOT NULL COMMENT 'User ID',
  `user_type` tinyint NOT NULL COMMENT 'User Type',
  `client_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Client ID',
  `scope` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Scope of the mandate',
  `approved` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Acceptance',
  `expires_time` datetime NOT NULL COMMENT 'Expiration time',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='OAuth2 Approval Form';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_oauth2_approve`
--

LOCK TABLES `system_oauth2_approve` WRITE;
/*!40000 ALTER TABLE `system_oauth2_approve` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_oauth2_approve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_oauth2_client`
--

DROP TABLE IF EXISTS `system_oauth2_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_oauth2_client` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `client_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Client ID',
  `secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Client Key',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Apply Name',
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Apply Icon',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Apply Description',
  `status` tinyint NOT NULL COMMENT 'Status',
  `access_token_validity_seconds` int NOT NULL COMMENT 'Access to the period of validity of the medal',
  `refresh_token_validity_seconds` int NOT NULL COMMENT 'Refresh the period of validity of the medals',
  `redirect_uris` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Redirectable URI address',
  `authorized_grant_types` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Type of authorization',
  `scopes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Scope of the mandate',
  `auto_approve_scopes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Scope of authorization automatically adopted',
  `authorities` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Permissions',
  `resource_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Resources',
  `additional_information` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Can not open message',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='OAuth2 Client Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_oauth2_client`
--

LOCK TABLES `system_oauth2_client` WRITE;
/*!40000 ALTER TABLE `system_oauth2_client` DISABLE KEYS */;
INSERT INTO `system_oauth2_client` (`id`, `client_id`, `secret`, `name`, `logo`, `description`, `status`, `access_token_validity_seconds`, `refresh_token_validity_seconds`, `redirect_uris`, `authorized_grant_types`, `scopes`, `auto_approve_scopes`, `authorities`, `resource_ids`, `additional_information`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1,'default','admin123','System','/static/imgs/zcash.png','#',0,1800,2592000,'[\n    \"https://demo-zcashnodelauncher.zcashjava.com\",\n    \"http://127.0.0.1:5666\"\n]','[\"password\",\"authorization_code\",\"implicit\",\"refresh_token\",\"client_credentials\"]','[\"user.read\",\"user.write\"]','[]','[\"user.read\",\"user.write\"]','[]','{}','1','2022-05-11 21:47:12','1','2026-06-24 22:54:33',0x00);
/*!40000 ALTER TABLE `system_oauth2_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_oauth2_code`
--

DROP TABLE IF EXISTS `system_oauth2_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_oauth2_code` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `user_id` bigint NOT NULL COMMENT 'User ID',
  `user_type` tinyint NOT NULL COMMENT 'User Type',
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Authorisation Code',
  `client_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Client ID',
  `scopes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Scope of the mandate',
  `expires_time` datetime NOT NULL COMMENT 'Expiration time',
  `redirect_uri` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Redirectable URI address',
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Status',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='OAuth2 Authorization List';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_oauth2_code`
--

LOCK TABLES `system_oauth2_code` WRITE;
/*!40000 ALTER TABLE `system_oauth2_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_oauth2_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_oauth2_refresh_token`
--

DROP TABLE IF EXISTS `system_oauth2_refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_oauth2_refresh_token` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Numbering',
  `user_id` bigint NOT NULL COMMENT 'User ID',
  `refresh_token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Refresh Decoration',
  `user_type` tinyint NOT NULL COMMENT 'User Type',
  `client_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Client ID',
  `scopes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Scope of the mandate',
  `expires_time` datetime NOT NULL COMMENT 'Expiration time',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2212 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='OAuth2 Refresh Decoration';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_oauth2_refresh_token`
--

LOCK TABLES `system_oauth2_refresh_token` WRITE;
/*!40000 ALTER TABLE `system_oauth2_refresh_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_oauth2_refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_operate_log`
--

DROP TABLE IF EXISTS `system_operate_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_operate_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Log Master Keys',
  `trace_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Link tracking number.',
  `user_id` bigint NOT NULL COMMENT 'User ID',
  `user_type` tinyint NOT NULL DEFAULT '0' COMMENT 'User Type',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Operation module type',
  `sub_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Operation Name',
  `biz_id` bigint NOT NULL COMMENT 'Operational Data Module Numbering',
  `action` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Operational Contents',
  `success` bit(1) NOT NULL DEFAULT b'1' COMMENT 'Operation Results',
  `extra` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Expand Fields',
  `request_method` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Method name requested',
  `request_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Address of the request',
  `user_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'User IP',
  `user_agent` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Browser UA',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Operation log log V2 version';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_operate_log`
--

LOCK TABLES `system_operate_log` WRITE;
/*!40000 ALTER TABLE `system_operate_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_operate_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_post`
--

DROP TABLE IF EXISTS `system_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_post` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Position ID',
  `code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Job Coding',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Name of post',
  `sort` int NOT NULL COMMENT 'Show Order',
  `status` tinyint NOT NULL COMMENT 'Status (0 normal 1 disabled)',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Job Information Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_post`
--

LOCK TABLES `system_post` WRITE;
/*!40000 ALTER TABLE `system_post` DISABLE KEYS */;
INSERT INTO `system_post` (`id`, `code`, `name`, `sort`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1,'CEO','CEO',1,0,'','1','2021-01-06 17:03:48','1','2026-06-23 13:23:39',0x00,1);
INSERT INTO `system_post` (`id`, `code`, `name`, `sort`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2,'Manager','Manager',2,0,'','1','2021-01-05 17:03:48','1','2026-06-23 13:23:39',0x00,1);
INSERT INTO `system_post` (`id`, `code`, `name`, `sort`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (4,'Employee','Employee',4,0,'','1','2021-01-05 17:03:48','1','2026-06-23 13:23:39',0x00,1);
INSERT INTO `system_post` (`id`, `code`, `name`, `sort`, `status`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (5,'HR','HR',5,0,'','1','2024-03-24 20:45:40','1','2026-06-23 13:23:39',0x00,1);
/*!40000 ALTER TABLE `system_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_role`
--

DROP TABLE IF EXISTS `system_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Role ID',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Role Name',
  `code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Role Permission Strings',
  `sort` int NOT NULL COMMENT 'Show Order',
  `data_scope` tinyint NOT NULL DEFAULT '1' COMMENT 'Data coverage (1: All Data Permissions 2: Self-Determination Data Permissions 3: Data Permissions for the Department 4: Data Permissions for the Department and the following)',
  `data_scope_dept_ids` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Data range (specify sector arrays)',
  `status` tinyint NOT NULL COMMENT 'Role Status (0 Normal 1 Disableed)',
  `type` tinyint NOT NULL COMMENT 'Role Type',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Can not open message';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_role`
--

LOCK TABLES `system_role` WRITE;
/*!40000 ALTER TABLE `system_role` DISABLE KEYS */;
INSERT INTO `system_role` (`id`, `name`, `code`, `sort`, `data_scope`, `data_scope_dept_ids`, `status`, `type`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1,'Super Admin','super_admin',1,1,'',0,1,'Super Admin','admin','2021-01-05 17:03:48','','2026-06-24 22:58:16',0x00,1);
INSERT INTO `system_role` (`id`, `name`, `code`, `sort`, `data_scope`, `data_scope_dept_ids`, `status`, `type`, `remark`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2,'Common','common',2,2,'',0,1,'Common','admin','2021-01-05 17:03:48','','2026-06-24 22:58:16',0x00,1);
/*!40000 ALTER TABLE `system_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_role_menu`
--

DROP TABLE IF EXISTS `system_role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_role_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'From Addendum No.',
  `role_id` bigint NOT NULL COMMENT 'Role ID',
  `menu_id` bigint NOT NULL COMMENT 'Menu ID',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Role & Menu Link Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_role_menu`
--

LOCK TABLES `system_role_menu` WRITE;
/*!40000 ALTER TABLE `system_role_menu` DISABLE KEYS */;
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (263,109,1,'1','2022-02-22 00:56:14','1','2022-02-22 00:56:14',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (434,2,1,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (477,2,100,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (478,2,101,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (479,2,102,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (481,2,103,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (483,2,104,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (485,2,105,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (490,2,108,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (492,2,109,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (498,2,1138,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (523,2,1224,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (524,2,1225,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (541,2,500,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (543,2,501,'1','2022-02-22 13:09:12','1','2022-02-22 13:09:12',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (675,2,2,'1','2022-02-22 13:16:57','1','2022-02-22 13:16:57',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (690,2,1078,'1','2022-02-22 13:16:57','1','2022-02-22 13:16:57',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (692,2,1083,'1','2022-02-22 13:16:57','1','2022-02-22 13:16:57',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (693,2,1084,'1','2022-02-22 13:16:57','1','2022-02-22 13:16:57',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (703,2,106,'1','2022-02-22 13:16:57','1','2022-02-22 13:16:57',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1296,110,1,'110','2022-02-23 00:23:55','110','2022-02-23 00:23:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1578,111,1,'1','2022-03-07 21:37:58','1','2022-03-07 21:37:58',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1729,109,100,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1730,109,101,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1731,109,1063,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1732,109,1064,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1733,109,1001,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1734,109,1065,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1735,109,1002,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1736,109,1003,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1737,109,1004,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1738,109,1005,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1739,109,1006,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1740,109,1007,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1741,109,1008,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1742,109,1009,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1743,109,1010,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1744,109,1011,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1745,109,1012,'1','2022-09-21 22:08:51','1','2022-09-21 22:08:51',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1746,111,100,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1747,111,101,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1748,111,1063,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1749,111,1064,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1750,111,1001,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1751,111,1065,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1752,111,1002,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1753,111,1003,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1754,111,1004,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1755,111,1005,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1756,111,1006,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1757,111,1007,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1758,111,1008,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1759,111,1009,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1760,111,1010,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1761,111,1011,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1762,111,1012,'1','2022-09-21 22:08:52','1','2022-09-21 22:08:52',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1763,109,100,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1764,109,101,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1765,109,1063,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1766,109,1064,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1767,109,1001,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1768,109,1065,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1769,109,1002,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1770,109,1003,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1771,109,1004,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1772,109,1005,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1773,109,1006,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1774,109,1007,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1775,109,1008,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1776,109,1009,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1777,109,1010,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1778,109,1011,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1779,109,1012,'1','2022-09-21 22:08:53','1','2022-09-21 22:08:53',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1780,111,100,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1781,111,101,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1782,111,1063,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1783,111,1064,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1784,111,1001,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1785,111,1065,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1786,111,1002,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1787,111,1003,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1788,111,1004,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1789,111,1005,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1790,111,1006,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1791,111,1007,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1792,111,1008,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1793,111,1009,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1794,111,1010,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1795,111,1011,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1796,111,1012,'1','2022-09-21 22:08:54','1','2022-09-21 22:08:54',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1797,109,100,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1798,109,101,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1799,109,1063,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1800,109,1064,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1801,109,1001,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1802,109,1065,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1803,109,1002,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1804,109,1003,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1805,109,1004,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1806,109,1005,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1807,109,1006,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1808,109,1007,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1809,109,1008,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1810,109,1009,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1811,109,1010,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1812,109,1011,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1813,109,1012,'1','2022-09-21 22:08:55','1','2022-09-21 22:08:55',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1814,111,100,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1815,111,101,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1816,111,1063,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1817,111,1064,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1818,111,1001,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1819,111,1065,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1820,111,1002,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1821,111,1003,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1822,111,1004,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1823,111,1005,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1824,111,1006,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1825,111,1007,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1826,111,1008,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1827,111,1009,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1828,111,1010,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1829,111,1011,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1830,111,1012,'1','2022-09-21 22:08:56','1','2022-09-21 22:08:56',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1831,109,103,'1','2022-09-21 22:43:23','1','2022-09-21 22:43:23',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1832,109,1017,'1','2022-09-21 22:43:23','1','2022-09-21 22:43:23',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1833,109,1018,'1','2022-09-21 22:43:23','1','2022-09-21 22:43:23',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1834,109,1019,'1','2022-09-21 22:43:23','1','2022-09-21 22:43:23',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1835,109,1020,'1','2022-09-21 22:43:23','1','2022-09-21 22:43:23',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1836,111,103,'1','2022-09-21 22:43:24','1','2022-09-21 22:43:24',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1837,111,1017,'1','2022-09-21 22:43:24','1','2022-09-21 22:43:24',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1838,111,1018,'1','2022-09-21 22:43:24','1','2022-09-21 22:43:24',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1839,111,1019,'1','2022-09-21 22:43:24','1','2022-09-21 22:43:24',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1840,111,1020,'1','2022-09-21 22:43:24','1','2022-09-21 22:43:24',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1991,2,1024,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1992,2,1025,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1993,2,1026,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1994,2,1027,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1995,2,1028,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1996,2,1029,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1997,2,1030,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1998,2,1031,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1999,2,1032,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2000,2,1033,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2001,2,1034,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2002,2,1035,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2007,2,1040,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2008,2,1042,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2009,2,1043,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2010,2,1045,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2011,2,1046,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2012,2,1048,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2024,2,1063,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2025,2,1064,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2026,2,1065,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2036,2,1082,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2037,2,1085,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2038,2,1086,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2040,2,1088,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2041,2,1089,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2073,2,1139,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2075,2,1140,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2077,2,1141,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2078,2,1142,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2079,2,1143,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2099,2,1226,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2100,2,1227,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2101,2,1228,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2102,2,1229,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2123,2,1261,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2124,2,1263,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2125,2,1264,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2126,2,1265,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2127,2,1266,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2128,2,1267,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2129,2,1001,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2130,2,1002,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2131,2,1003,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2132,2,1004,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2133,2,1005,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2134,2,1006,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2135,2,1007,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2136,2,1008,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2137,2,1009,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2138,2,1010,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2139,2,1011,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2140,2,1012,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2141,2,1013,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2143,2,1015,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2145,2,1017,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2146,2,1018,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2147,2,1019,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2148,2,1020,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2149,2,1021,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2150,2,1022,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2151,2,1023,'1','2023-01-25 08:42:52','1','2023-01-25 08:42:52',0x00,1);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2929,109,1224,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2930,109,1225,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2931,109,1226,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2932,109,1227,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2933,109,1228,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2934,109,1229,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2935,109,1138,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2936,109,1139,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2937,109,1140,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2938,109,1141,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2939,109,1142,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2940,109,1143,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2941,111,1224,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2942,111,1225,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2943,111,1226,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2944,111,1227,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2945,111,1228,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2946,111,1229,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2947,111,1138,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2948,111,1139,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2949,111,1140,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2950,111,1141,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2951,111,1142,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2952,111,1143,'1','2023-12-02 23:19:40','1','2023-12-02 23:19:40',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2993,109,2,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2994,109,1031,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2995,109,1032,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2996,109,1033,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2997,109,1034,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (2998,109,1035,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3015,109,1078,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3016,109,1082,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3017,109,1083,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3018,109,1084,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3019,109,1085,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3020,109,1086,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3022,109,1088,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3023,109,1089,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3027,109,106,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3069,111,2,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3070,111,1031,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3071,111,1032,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3072,111,1033,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3073,111,1034,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3074,111,1035,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3091,111,1078,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3092,111,1082,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3093,111,1083,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3094,111,1084,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3095,111,1085,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3096,111,1086,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3098,111,1088,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3099,111,1089,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3103,111,106,'1','2023-12-02 23:41:02','1','2023-12-02 23:41:02',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3221,109,102,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3222,109,1013,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3223,109,1014,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3224,109,1015,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3225,109,1016,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,121);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3226,111,102,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3227,111,1013,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3228,111,1014,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3229,111,1015,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,122);
INSERT INTO `system_role_menu` (`id`, `role_id`, `menu_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (3230,111,1016,'1','2023-12-30 11:42:36','1','2023-12-30 11:42:36',0x00,122);
/*!40000 ALTER TABLE `system_role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_tenant`
--

DROP TABLE IF EXISTS `system_tenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_tenant` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Tenant Number',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tenant name',
  `contact_user_id` bigint DEFAULT NULL COMMENT '',
  `contact_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '',
  `contact_mobile` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Contact the cell phone.',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT 'Tenant status',
  `websites` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Bind domain names arrays',
  `package_id` bigint NOT NULL COMMENT 'Tenant Suite Number',
  `expire_time` datetime NOT NULL COMMENT 'Expiration time',
  `account_count` int NOT NULL COMMENT 'Number of accounts',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tenant lists';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_tenant`
--

LOCK TABLES `system_tenant` WRITE;
/*!40000 ALTER TABLE `system_tenant` DISABLE KEYS */;
INSERT INTO `system_tenant` (`id`, `name`, `contact_user_id`, `contact_name`, `contact_mobile`, `status`, `websites`, `package_id`, `expire_time`, `account_count`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (1,'Zcash Java',NULL,'Zcash Java','#',0,'demo-zcashnodelauncher.zcashjava.com,127.0.0.1:3000',0,'2099-02-19 17:14:16',9999,'1','2021-01-05 17:03:47','1','2026-06-23 12:21:35',0x00);
/*!40000 ALTER TABLE `system_tenant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_tenant_package`
--

DROP TABLE IF EXISTS `system_tenant_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_tenant_package` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Package Number',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Package name',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT 'Tenant status (0 normal 1 disabled)',
  `remark` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Remarks',
  `menu_ids` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tenant Suite';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_tenant_package`
--

LOCK TABLES `system_tenant_package` WRITE;
/*!40000 ALTER TABLE `system_tenant_package` DISABLE KEYS */;
INSERT INTO `system_tenant_package` (`id`, `name`, `status`, `remark`, `menu_ids`, `creator`, `create_time`, `updater`, `update_time`, `deleted`) VALUES (111,'Normal',0,'#','[1,2,5,1031,1032,1033,1034,1035,1036,1037,1038,1039,1050,1051,1052,1053,1054,1056,1057,1058,1059,1060,1063,1064,1065,1066,1067,1070,1075,1077,1078,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1118,1119,1120,100,101,102,103,106,107,110,111,112,113,114,1138,1139,115,1140,116,1141,1142,1143,2713,2714,2715,2716,2717,2718,2720,2721,1185,2722,1186,1187,2723,1188,2724,1189,2725,1190,2726,1191,2727,2472,1192,2728,2729,1193,1194,2730,1195,2731,2732,1197,2733,2478,1198,2734,2479,1199,2735,2480,1200,2481,1201,2482,1202,2739,2483,2484,2740,2485,2486,2487,1207,2488,1208,2489,1209,2490,1210,2491,1211,2492,1212,2493,1213,2494,2495,1215,1216,2497,1217,1218,1219,1220,1221,1222,1224,1225,1226,1227,1228,1229,1237,1238,1239,1240,1241,1242,1243,2525,1255,1256,1001,1257,1002,1258,1003,1259,1004,1260,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020]','1','2022-02-22 00:54:00','1','2026-06-24 22:59:37',0x00);
/*!40000 ALTER TABLE `system_tenant_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_user_post`
--

DROP TABLE IF EXISTS `system_user_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_user_post` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` bigint NOT NULL DEFAULT '0' COMMENT 'User ID',
  `post_id` bigint NOT NULL DEFAULT '0' COMMENT 'Position ID',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Organisation';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_user_post`
--

LOCK TABLES `system_user_post` WRITE;
/*!40000 ALTER TABLE `system_user_post` DISABLE KEYS */;
INSERT INTO `system_user_post` (`id`, `user_id`, `post_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (112,1,1,'admin','2022-05-02 07:25:24','admin','2022-05-02 07:25:24',0x00,1);
INSERT INTO `system_user_post` (`id`, `user_id`, `post_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (125,1,2,'1','2024-07-13 22:31:39','1','2024-07-13 22:31:39',0x00,1);
/*!40000 ALTER TABLE `system_user_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_user_role`
--

DROP TABLE IF EXISTS `system_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'From Addendum No.',
  `user_id` bigint NOT NULL COMMENT 'User ID',
  `role_id` bigint NOT NULL COMMENT 'Role ID',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User and role association table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_user_role`
--

LOCK TABLES `system_user_role` WRITE;
/*!40000 ALTER TABLE `system_user_role` DISABLE KEYS */;
INSERT INTO `system_user_role` (`id`, `user_id`, `role_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1,1,1,'','2022-01-11 13:19:45','','2022-05-12 12:35:17',0x00,1);
INSERT INTO `system_user_role` (`id`, `user_id`, `role_id`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (18,1,2,'1','2022-05-12 20:39:29','1','2022-05-12 20:39:29',0x00,1);
/*!40000 ALTER TABLE `system_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_users`
--

DROP TABLE IF EXISTS `system_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_users` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Password',
  `nickname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'nick of the user',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `dept_id` bigint DEFAULT NULL COMMENT 'Sector ID',
  `post_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Job ID array',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Cannot initialise Evolution''s mail component.',
  `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Cell phone number.',
  `sex` tinyint DEFAULT '0' COMMENT 'Sex of user',
  `avatar` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Header Address',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT 'Account status (0 normal 1 disabled)',
  `login_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Last login IP',
  `login_date` datetime DEFAULT NULL COMMENT 'Last Login Time',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='User Information Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_users`
--

LOCK TABLES `system_users` WRITE;
/*!40000 ALTER TABLE `system_users` DISABLE KEYS */;
INSERT INTO `system_users` (`id`, `username`, `password`, `nickname`, `remark`, `dept_id`, `post_ids`, `email`, `mobile`, `sex`, `avatar`, `status`, `login_ip`, `login_date`, `creator`, `create_time`, `updater`, `update_time`, `deleted`, `tenant_id`) VALUES (1,'zcashjava','$2a$04$KljJDa/LK7QfDm0lF5OhuePhlPfjRH3tB2Wu351Uidz.oQGJXevPi','ZcashJava','ZcashJava',103,'[1,2]','zcashjava@outlook.com','#',2,'/static/imgs/zcash.png',0,'0:0:0:0:0:0:0:1','2026-06-25 15:00:17','zcashjava','2021-01-05 17:03:47',NULL,'2026-06-25 15:00:17',0x00,1);
/*!40000 ALTER TABLE `system_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'znl'
--

--
-- Dumping routines for database 'znl'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-26  0:37:25