

CREATE TABLE `zcash_installation_script` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Name',
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'url',
  `sort` int COMMENT 'Show Order',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Installation script';



CREATE TABLE `zcash_node_server` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `host` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'host',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Name',
  `port` int(11) NOT NULL COMMENT 'default: 21',
  `username` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'username',
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'password',
  
  `node_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Pruning Node/ Full Node',
  
  `proxy_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'proxy type',
  `proxy_host` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'proxy host',
  `proxy_port` int(11) COMMENT 'proxy port',
  `proxy_username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'proxy username',
  `proxy_password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'proxy password',
  
  `server_status` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'online / lost',
  `server_error` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'network not reachable / incorrect password / Exception',
  `server_status_check_time` datetime NULL COMMENT 'server status check time',
  
  `installation_status` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'not installed / installed',
  `installation_log` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ssh output',
  `installation_status_check_time` datetime NULL COMMENT 'installation status check time',
  
  `node_status` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'created / running / paused / restarting / dead / removing / exited',
  `node_error` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'node start error',
  `node_status_check_time` datetime NULL COMMENT 'node status check time',
  
  `node_info_cache_update_time` datetime NULL COMMENT 'node info cache update time',
  
  `sort` int COMMENT 'Show Order',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Remarks',
  `creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Creater',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created',
  `updater` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'Updater',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT 'Delete',
  `tenant_id` bigint NOT NULL DEFAULT '0' COMMENT 'Tenant Number',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Node server';





