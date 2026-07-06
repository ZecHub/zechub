package com.zcashjava.znl.module.zcash.dal.dataobject.nodeserver;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Base64Utils;

import com.baomidou.mybatisplus.annotation.KeySequence;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.zcashjava.znl.framework.common.crypto.AES;
import com.zcashjava.znl.framework.mybatis.core.dataobject.BaseDO;
import com.zcashjava.znl.framework.ssh.ProxyConfig;
import com.zcashjava.znl.framework.ssh.ServerConfig;
import com.zcashjava.znl.framework.ssh.ZcashNodeManager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Installation script DO
 *
 * 
 */
@TableName("zcash_node_server")
@KeySequence("zcash_node_server_seq") // Used for auto-incrementing primary keys in Oracle, PostgreSQL, Kingbase, DB2, H2 databases. For databases like MySQL, this can be omitted.
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NodeServerDO extends BaseDO {

    /**
     * ID
     */
    @TableId
    private Long id;
    /**
     * host
     */
    private String host;
    /**
     * Name
     */
    private String name;
    /**
     * default: 22
     */
    private Integer port;
    /**
     * username
     */
    private String username;
    /**
     * password
     */
    private String password;

    
    /**
     * {@link ZcashNodeManager#nodeType_pruning}
     * {@link ZcashNodeManager#nodeType_full}
     * Pruning Node/ Full Node
     */
    private String nodeType;
    /**
     * proxy type
     */
    private String proxyType;
    /**
     * proxy host
     */
    private String proxyHost;
    /**
     * proxy port
     */
    private Integer proxyPort;
    /**
     * proxy username
     */
    private String proxyUsername;
    /**
     * proxy password
     */
    private String proxyPassword;
    
    public static final String serverStatus_online = "online";
    public static final String serverStatus_lost = "lost";
    /**
     * online / lost
     */
    private String serverStatus;
    /**
     * network not reachable / incorrect password / Exception
     */
    private String serverError;
    /**
     * server status check time
     */
    private LocalDateTime serverStatusCheckTime;
    
    public static final String installationStatus_installed = "installed";
    public static final String installationStatus_notInstalled = "not installed";
    
    /**
     * not installed / installed
     */
    private String installationStatus;
    /**
     * ssh output
     */
    private String installationLog;
    /**
     * installation status check time
     */
    private LocalDateTime installationStatusCheckTime;

    public static final String nodeStatus_running = "running";
    public static final String nodeStatus_exited = "exited";
    public static final String nodeStatus_created = "created";
    /**
     * created / running / paused / restarting / dead / removing / exited
     */
    private String nodeStatus;
    /**
     * node start error
     */
    private String nodeError;
    /**
     * node status check time
     */
    private LocalDateTime nodeStatusCheckTime;
    /**
     * Show Order
     */
    private Integer sort;
    /**
     * Remarks
     */
    private String remark;
    
    
    private LocalDateTime nodeInfoCacheUpdateTime;
    
    
    
    public ServerConfig toServerConfig() {
    	ServerConfig serverConfig = new ServerConfig();
        serverConfig.setHost(this.getHost());
        serverConfig.setPort(this.getPort());
        serverConfig.setUsername(this.getUsername());
        serverConfig.setPassword(this.getPassword());
        
        if (StringUtils.isNotBlank(this.getProxyType())) {
			ProxyConfig proxyConfig = new ProxyConfig();
			proxyConfig.setProxyType(this.getProxyType());
			proxyConfig.setUsername(this.getProxyUsername());
			proxyConfig.setPassword(this.getProxyPassword());
			proxyConfig.setHost(this.getProxyHost());
			proxyConfig.setPort(this.getProxyPort());
			serverConfig.setProxyConfig(proxyConfig);
		}
        
        
        return serverConfig;
    }
    
    
    
    public void encryptPasswords(String key) {
    	
        if (StringUtils.isNotBlank(password)) {
        	byte[] encryptedBytes;
			try {
				encryptedBytes = AES.encrypt(key, password.getBytes("utf-8"));
			} catch (InvalidKeyException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException
					| UnsupportedEncodingException | NoSuchAlgorithmException e) {
				throw new IllegalStateException("", e);
			}
        	setPassword(Base64Utils.encodeToString(encryptedBytes));
		}
        

        if (StringUtils.isNotBlank(proxyPassword)) {
        	byte[] encryptedBytes;
			try {
				encryptedBytes = AES.encrypt(key, proxyPassword.getBytes("utf-8"));
			} catch (InvalidKeyException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException
					| UnsupportedEncodingException | NoSuchAlgorithmException e) {
				throw new IllegalStateException("", e);
			}
        	setProxyPassword(Base64Utils.encodeToString(encryptedBytes));
		}
    	
    }
    
    

    public void decryptPasswords(String key) {

        if (StringUtils.isNotBlank(password)) {
        	byte[] encryptedPassword = Base64Utils.decodeFromString(password);
        	byte[] decreptedBytes;
			try {
				decreptedBytes = AES.decrypt(key, encryptedPassword);
				setPassword(new String(decreptedBytes, "utf-8"));
			} catch (InvalidKeyException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException | UnsupportedEncodingException | NoSuchAlgorithmException e) {
				throw new IllegalStateException("", e);
			}
		}

        if (StringUtils.isNotBlank(proxyPassword)) {
        	byte[] encryptedPassword = Base64Utils.decodeFromString(proxyPassword);
        	byte[] decreptedBytes;
			try {
				decreptedBytes = AES.decrypt(key, encryptedPassword);
				setProxyPassword(new String(decreptedBytes, "utf-8"));
			} catch (InvalidKeyException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException | UnsupportedEncodingException | NoSuchAlgorithmException e) {
				throw new IllegalStateException("", e);
			}
		}
    	
    }
    
    

    public void clearPrivateInfo() {
    	NodeServerDO data = this;
		data.setPassword(null);
		data.setProxyPassword(null);
		data.setHost(null);
	}
    
    
    
    


}