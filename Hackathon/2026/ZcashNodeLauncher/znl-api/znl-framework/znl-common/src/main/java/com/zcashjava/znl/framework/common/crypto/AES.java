package com.zcashjava.znl.framework.common.crypto;

import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class AES {

	public static byte[] encrypt(String key, byte[] bytes) throws InvalidKeyException, NoSuchPaddingException,
			IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException {
		byte[] keyBytes = Arrays.copyOf(key.getBytes(Charset.forName("ASCII")), 32);
		SecretKey secretKey = new SecretKeySpec(keyBytes, "AES");
		Cipher cipher = Cipher.getInstance("AES");
		cipher.init(Cipher.ENCRYPT_MODE, secretKey);
		return cipher.doFinal(bytes);
	}

	public static byte[] decrypt(String key, byte[] bytes) throws IllegalBlockSizeException, BadPaddingException,
			InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException {
		byte[] keyBytes = Arrays.copyOf(key.getBytes(Charset.forName("ASCII")), 32);
		SecretKey secretKey = new SecretKeySpec(keyBytes, "AES");
		Cipher cipher = Cipher.getInstance("AES");
		cipher.init(Cipher.DECRYPT_MODE, secretKey);
		return cipher.doFinal(bytes);
	}

}