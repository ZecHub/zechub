package com.zcashjava.znl.framework.encrypt.core.filter;

import cn.hutool.crypto.asymmetric.AsymmetricEncryptor;
import cn.hutool.crypto.asymmetric.KeyType;
import cn.hutool.crypto.symmetric.SymmetricEncryptor;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import com.zcashjava.znl.framework.encrypt.config.ApiEncryptProperties;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;


public class ApiEncryptResponseWrapper extends HttpServletResponseWrapper {

    private final ByteArrayOutputStream byteArrayOutputStream;
    private final ServletOutputStream servletOutputStream;
    private final PrintWriter printWriter;

    public ApiEncryptResponseWrapper(HttpServletResponse response) {
        super(response);
        this.byteArrayOutputStream = new ByteArrayOutputStream();
        this.servletOutputStream = this.getOutputStream();
        this.printWriter = new PrintWriter(new OutputStreamWriter(byteArrayOutputStream));
    }

    public void encrypt(ApiEncryptProperties properties,
                        SymmetricEncryptor symmetricEncryptor,
                        AsymmetricEncryptor asymmetricEncryptor) throws IOException {
        
        HttpServletResponse response = (HttpServletResponse) this.getResponse();
        response.resetBuffer();
        
        this.flushBuffer();
        byte[] body = byteArrayOutputStream.toByteArray();

        
        String encryptedBody = symmetricEncryptor != null ? symmetricEncryptor.encryptBase64(body)
                : asymmetricEncryptor.encryptBase64(body, KeyType.PublicKey);
        response.getWriter().write(encryptedBody);

        
        this.addHeader(properties.getHeader(), "true");
        
        this.addHeader("Access-Control-Expose-Headers", properties.getHeader());
    }

    @Override
    public PrintWriter getWriter() {
        return printWriter;
    }

    @Override
    public void flushBuffer() throws IOException {
        if (servletOutputStream != null) {
            servletOutputStream.flush();
        }
        if (printWriter != null) {
            printWriter.flush();
        }
    }

    @Override
    public void reset() {
        byteArrayOutputStream.reset();
    }

    @Override
    public ServletOutputStream getOutputStream() {
        return new ServletOutputStream() {

            @Override
            public boolean isReady() {
                return false;
            }

            @Override
            public void setWriteListener(WriteListener writeListener) {
            }

            @Override
            public void write(int b) {
                byteArrayOutputStream.write(b);
            }

            @Override
            @SuppressWarnings("NullableProblems")
            public void write(byte[] b) throws IOException {
                byteArrayOutputStream.write(b);
            }

            @Override
            @SuppressWarnings("NullableProblems")
            public void write(byte[] b, int off, int len) {
                byteArrayOutputStream.write(b, off, len);
            }

        };
    }

}