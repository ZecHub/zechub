package com.zcashjava.znl.framework.ssh;

import java.io.IOException;
import java.io.OutputStream;
import java.net.SocketAddress;
import java.nio.charset.Charset;
import java.security.KeyPair;
import java.security.PublicKey;
import java.time.Duration;
import java.time.Instant;
import java.util.Collection;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.NavigableSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.apache.sshd.client.ClientFactoryManager;
import org.apache.sshd.client.auth.AuthenticationIdentitiesProvider;
import org.apache.sshd.client.auth.UserAuthFactory;
import org.apache.sshd.client.auth.hostbased.HostBasedAuthenticationReporter;
import org.apache.sshd.client.auth.keyboard.UserInteraction;
import org.apache.sshd.client.auth.password.PasswordAuthenticationReporter;
import org.apache.sshd.client.auth.password.PasswordIdentityProvider;
import org.apache.sshd.client.auth.pubkey.PublicKeyAuthenticationReporter;
import org.apache.sshd.client.channel.ChannelDirectTcpip;
import org.apache.sshd.client.channel.ChannelExec;
import org.apache.sshd.client.channel.ChannelShell;
import org.apache.sshd.client.channel.ChannelSubsystem;
import org.apache.sshd.client.channel.ClientChannel;
import org.apache.sshd.client.channel.ClientChannelEvent;
import org.apache.sshd.client.config.hosts.HostConfigEntry;
import org.apache.sshd.client.future.AuthFuture;
import org.apache.sshd.client.keyverifier.ServerKeyVerifier;
import org.apache.sshd.client.session.ClientSession;
import org.apache.sshd.client.session.ClientSession.ClientSessionEvent;
import org.apache.sshd.client.session.forward.DynamicPortForwardingTracker;
import org.apache.sshd.client.session.forward.ExplicitPortForwardingTracker;
import org.apache.sshd.common.AttributeRepository;
import org.apache.sshd.common.AttributeRepository.AttributeKey;
import org.apache.sshd.common.NamedFactory;
import org.apache.sshd.common.PropertyResolver;
import org.apache.sshd.common.Service;
import org.apache.sshd.common.channel.Channel;
import org.apache.sshd.common.channel.ChannelListener;
import org.apache.sshd.common.channel.PtyChannelConfigurationHolder;
import org.apache.sshd.common.channel.throttle.ChannelStreamWriter;
import org.apache.sshd.common.channel.throttle.ChannelStreamWriterResolver;
import org.apache.sshd.common.cipher.Cipher;
import org.apache.sshd.common.cipher.CipherInformation;
import org.apache.sshd.common.compression.Compression;
import org.apache.sshd.common.compression.CompressionInformation;
import org.apache.sshd.common.filter.FilterChain;
import org.apache.sshd.common.forward.PortForwardingEventListener;
import org.apache.sshd.common.future.CloseFuture;
import org.apache.sshd.common.future.GlobalRequestFuture;
import org.apache.sshd.common.future.GlobalRequestFuture.ReplyHandler;
import org.apache.sshd.common.future.KeyExchangeFuture;
import org.apache.sshd.common.future.SshFutureListener;
import org.apache.sshd.common.io.IoSession;
import org.apache.sshd.common.io.IoWriteFuture;
import org.apache.sshd.common.kex.KexProposalOption;
import org.apache.sshd.common.kex.KexState;
import org.apache.sshd.common.kex.KeyExchangeFactory;
import org.apache.sshd.common.kex.extension.KexExtensionHandler;
import org.apache.sshd.common.keyprovider.KeyIdentityProvider;
import org.apache.sshd.common.mac.Mac;
import org.apache.sshd.common.mac.MacInformation;
import org.apache.sshd.common.session.ReservedSessionMessagesHandler;
import org.apache.sshd.common.session.SessionDisconnectHandler;
import org.apache.sshd.common.session.SessionHeartbeatController.HeartbeatType;
import org.apache.sshd.common.session.SessionListener;
import org.apache.sshd.common.session.UnknownChannelReferenceHandler;
import org.apache.sshd.common.session.helpers.TimeoutIndicator;
import org.apache.sshd.common.signature.Signature;
import org.apache.sshd.common.util.buffer.Buffer;
import org.apache.sshd.common.util.net.SshdSocketAddress;

import lombok.Getter;
import lombok.Setter;

public class ClientSessionEx {

	
	
	@Getter
	@Setter
	private ClientSession session;
	
	

	public ClientSessionEx(ClientSession session) {
		super();
		this.session = session;
	}

	

	public String executeInteractiveCommand(String command, InteractiveCommandListener listener) throws IOException {
		return executeInteractiveCommand(command, listener, TimeUnit.MINUTES.toMillis(60));
	}
	
	public String executeInteractiveCommand(String command, InteractiveCommandListener listener, 
			Long timeout) throws IOException {
	    try (ChannelExec channel = session.createExecChannel(command)) {
	        

	        InteractiveOutputBuffer interactiveOutputBuffer = new InteractiveOutputBuffer();
	        interactiveOutputBuffer.setListener(listener);
	        channel.setOut(interactiveOutputBuffer.getOut());
	        channel.setErr(interactiveOutputBuffer.getErr());

	        channel.open().verify(10000);
	        

	        OutputStream input = channel.getInvertedIn();
	        interactiveOutputBuffer.setInvertedIn(input);
	        
	        

	        if (timeout != null) {
		        channel.waitFor(EnumSet.of(ClientChannelEvent.CLOSED), timeout);
			} else {
		        channel.waitFor(EnumSet.of(ClientChannelEvent.CLOSED), -1);
			}
	        
	        Integer exitStatus = channel.getExitStatus();
	        if (exitStatus == null) {
				throw new ShellException(interactiveOutputBuffer.getTerminalOutput().toString())
				.setCmd(command)
				.setMessageExt("existsStatus is null");
			}
	        
	        if (exitStatus != 0) {
				throw new ShellException(interactiveOutputBuffer.getTerminalOutput().toString())
				.setCmd(command);
			}
	        
	        
	        return interactiveOutputBuffer.getTerminalOutput().toString();
	        
	    }
	}



	public void addChannelListener(ChannelListener listener) {
		session.addChannelListener(listener);
	}



	public ReservedSessionMessagesHandler getReservedSessionMessagesHandler() {
		return session.getReservedSessionMessagesHandler();
	}



	public String getUsername() {
		return session.getUsername();
	}



	public void setUsername(String username) {
		session.setUsername(username);
	}



	public KeyIdentityProvider getKeyIdentityProvider() {
		return session.getKeyIdentityProvider();
	}



	public SessionDisconnectHandler getSessionDisconnectHandler() {
		return session.getSessionDisconnectHandler();
	}



	public KexExtensionHandler getKexExtensionHandler() {
		return session.getKexExtensionHandler();
	}



	public void setKexExtensionHandler(KexExtensionHandler handler) {
		session.setKexExtensionHandler(handler);
	}



	public UnknownChannelReferenceHandler getUnknownChannelReferenceHandler() {
		return session.getUnknownChannelReferenceHandler();
	}



	public void setSessionDisconnectHandler(SessionDisconnectHandler handler) {
		session.setSessionDisconnectHandler(handler);
	}



	public ChannelStreamWriterResolver getChannelStreamWriterResolver() {
		return session.getChannelStreamWriterResolver();
	}



	public SshdSocketAddress startLocalPortForwarding(int localPort, SshdSocketAddress remote) throws IOException {
		return session.startLocalPortForwarding(localPort, remote);
	}



	public List<NamedFactory<Signature>> getSignatureFactories() {
		return session.getSignatureFactories();
	}



	public <T> T computeAttributeIfAbsent(AttributeKey<T> key,
			Function<? super AttributeKey<T>, ? extends T> resolver) {
		return session.computeAttributeIfAbsent(key, resolver);
	}



	public void removeChannelListener(ChannelListener listener) {
		session.removeChannelListener(listener);
	}



	public void setChannelStreamWriterResolver(ChannelStreamWriterResolver resolver) {
		session.setChannelStreamWriterResolver(resolver);
	}



	public List<SshdSocketAddress> getStartedLocalPortForwards() {
		return session.getStartedLocalPortForwards();
	}



	public void setReservedSessionMessagesHandler(ReservedSessionMessagesHandler handler) {
		session.setReservedSessionMessagesHandler(handler);
	}



	public void setKeyIdentityProvider(KeyIdentityProvider provider) {
		session.setKeyIdentityProvider(provider);
	}



	public ChannelStreamWriterResolver resolveChannelStreamWriterResolver() {
		return session.resolveChannelStreamWriterResolver();
	}



	public String getSignatureFactoriesNameList() {
		return session.getSignatureFactoriesNameList();
	}



	public void setSignatureFactories(List<NamedFactory<Signature>> factories) {
		session.setSignatureFactories(factories);
	}



	public ChannelListener getChannelListenerProxy() {
		return session.getChannelListenerProxy();
	}



	public List<SshdSocketAddress> getBoundLocalPortForwards(int port) {
		return session.getBoundLocalPortForwards(port);
	}



	public void setUnknownChannelReferenceHandler(UnknownChannelReferenceHandler handler) {
		session.setUnknownChannelReferenceHandler(handler);
	}



	public List<String> getSignatureFactoriesNames() {
		return session.getSignatureFactoriesNames();
	}



	public ChannelStreamWriter resolveChannelStreamWriter(Channel channel, byte cmd) {
		return session.resolveChannelStreamWriter(channel, cmd);
	}



	public void addSessionListener(SessionListener listener) {
		session.addSessionListener(listener);
	}



	public void addPortForwardingEventListener(PortForwardingEventListener listener) {
		session.addPortForwardingEventListener(listener);
	}



	public void setSignatureFactoriesNameList(String names) {
		session.setSignatureFactoriesNameList(names);
	}



	public CloseFuture close(boolean immediately) {
		return session.close(immediately);
	}



	public List<UserAuthFactory> getUserAuthFactories() {
		return session.getUserAuthFactories();
	}



	public void setSignatureFactoriesNames(String... names) {
		session.setSignatureFactoriesNames(names);
	}



	public void removeSessionListener(SessionListener listener) {
		session.removeSessionListener(listener);
	}



	public void removePortForwardingEventListener(PortForwardingEventListener listener) {
		session.removePortForwardingEventListener(listener);
	}



	public UnknownChannelReferenceHandler resolveUnknownChannelReferenceHandler() {
		return session.resolveUnknownChannelReferenceHandler();
	}



	public SshdSocketAddress startLocalPortForwarding(SshdSocketAddress local, SshdSocketAddress remote)
			throws IOException {
		return session.startLocalPortForwarding(local, remote);
	}



	public List<Entry<SshdSocketAddress, SshdSocketAddress>> getLocalForwardsBindings() {
		return session.getLocalForwardsBindings();
	}



	public String getUserAuthFactoriesNameList() {
		return session.getUserAuthFactoriesNameList();
	}



	public void setSignatureFactoriesNames(Collection<String> names) {
		session.setSignatureFactoriesNames(names);
	}



	public SessionListener getSessionListenerProxy() {
		return session.getSessionListenerProxy();
	}



	public List<KeyExchangeFactory> getKeyExchangeFactories() {
		return session.getKeyExchangeFactories();
	}



	public List<String> getUserAuthFactoriesNames() {
		return session.getUserAuthFactoriesNames();
	}



	public PortForwardingEventListener getPortForwardingEventListenerProxy() {
		return session.getPortForwardingEventListenerProxy();
	}



	public boolean isLocalPortForwardingStartedForPort(int port) {
		return session.isLocalPortForwardingStartedForPort(port);
	}



	public HeartbeatType getSessionHeartbeatType() {
		return session.getSessionHeartbeatType();
	}



	public void setUserAuthFactories(List<UserAuthFactory> userAuthFactories) {
		session.setUserAuthFactories(userAuthFactories);
	}



	public void addCloseFutureListener(SshFutureListener<CloseFuture> listener) {
		session.addCloseFutureListener(listener);
	}



	public void setUserAuthFactoriesNameList(String names) {
		session.setUserAuthFactoriesNameList(names);
	}



	public void setKeyExchangeFactories(List<KeyExchangeFactory> keyExchangeFactories) {
		session.setKeyExchangeFactories(keyExchangeFactories);
	}



	public Duration getSessionHeartbeatInterval() {
		return session.getSessionHeartbeatInterval();
	}



	public int getAttributesCount() {
		return session.getAttributesCount();
	}



	public List<NamedFactory<Cipher>> getCipherFactories() {
		return session.getCipherFactories();
	}



	public void stopLocalPortForwarding(SshdSocketAddress local) throws IOException {
		session.stopLocalPortForwarding(local);
	}



	public void setUserAuthFactoriesNames(String... names) {
		session.setUserAuthFactoriesNames(names);
	}



	public AuthenticationIdentitiesProvider getRegisteredIdentities() {
		return session.getRegisteredIdentities();
	}



	public void disableSessionHeartbeat() {
		session.disableSessionHeartbeat();
	}



	public <T> T getAttribute(AttributeKey<T> key) {
		return session.getAttribute(key);
	}



	public PropertyResolver getParentPropertyResolver() {
		return session.getParentPropertyResolver();
	}



	public <T> T setAttribute(AttributeKey<T> key, T value) {
		return session.setAttribute(key, value);
	}



	public NavigableSet<Integer> getStartedRemotePortForwards() {
		return session.getStartedRemotePortForwards();
	}



	public String getCipherFactoriesNameList() {
		return session.getCipherFactoriesNameList();
	}



	public void removeCloseFutureListener(SshFutureListener<CloseFuture> listener) {
		session.removeCloseFutureListener(listener);
	}



	public SshdSocketAddress startRemotePortForwarding(SshdSocketAddress remote, SshdSocketAddress local)
			throws IOException {
		return session.startRemotePortForwarding(remote, local);
	}



	public PasswordIdentityProvider getPasswordIdentityProvider() {
		return session.getPasswordIdentityProvider();
	}



	public Map<String, Object> getProperties() {
		return session.getProperties();
	}



	public List<String> getCipherFactoriesNames() {
		return session.getCipherFactoriesNames();
	}



	public void setSessionHeartbeat(HeartbeatType type, TimeUnit unit, long count) {
		session.setSessionHeartbeat(type, unit, count);
	}



	public SshdSocketAddress getBoundRemotePortForward(int port) {
		return session.getBoundRemotePortForward(port);
	}



	public void setCipherFactories(List<NamedFactory<Cipher>> cipherFactories) {
		session.setCipherFactories(cipherFactories);
	}



	public void setCipherFactoriesNameList(String names) {
		session.setCipherFactoriesNameList(names);
	}



	public boolean isClosed() {
		return session.isClosed();
	}



	public <T> T removeAttribute(AttributeKey<T> key) {
		return session.removeAttribute(key);
	}



	public void setPasswordIdentityProvider(PasswordIdentityProvider provider) {
		session.setPasswordIdentityProvider(provider);
	}



	public void setSessionHeartbeat(HeartbeatType type, Duration interval) {
		session.setSessionHeartbeat(type, interval);
	}



	public byte[] getSessionId() {
		return session.getSessionId();
	}



	public FilterChain getFilterChain() {
		return session.getFilterChain();
	}



	public void setCipherFactoriesNames(String... names) {
		session.setCipherFactoriesNames(names);
	}



	public void addPasswordIdentity(String password) {
		session.addPasswordIdentity(password);
	}



	public boolean isClosing() {
		return session.isClosing();
	}



	public List<Entry<Integer, SshdSocketAddress>> getRemoteForwardsBindings() {
		return session.getRemoteForwardsBindings();
	}



	public boolean isServerSession() {
		return session.isServerSession();
	}



	public Buffer createBuffer(byte cmd) {
		return session.createBuffer(cmd);
	}



	public void setCipherFactoriesNames(Collection<String> names) {
		session.setCipherFactoriesNames(names);
	}



	public void clearAttributes() {
		session.clearAttributes();
	}



	public Collection<AttributeKey<?>> attributeKeys() {
		return session.attributeKeys();
	}



	public boolean isOpen() {
		return session.isOpen();
	}



	public String removePasswordIdentity(String password) {
		return session.removePasswordIdentity(password);
	}



	public boolean isRemotePortForwardingStartedForPort(int port) {
		return session.isRemotePortForwardingStartedForPort(port);
	}



	public String getClientVersion() {
		return session.getClientVersion();
	}



	public void close() throws IOException {
		session.close();
	}



	public Buffer createBuffer(byte cmd, int estimatedSize) {
		return session.createBuffer(cmd, estimatedSize);
	}



	public Map<KexProposalOption, String> getClientKexProposals() {
		return session.getClientKexProposals();
	}



	public void addPublicKeyIdentity(KeyPair key) {
		session.addPublicKeyIdentity(key);
	}



	public void stopRemotePortForwarding(SshdSocketAddress remote) throws IOException {
		session.stopRemotePortForwarding(remote);
	}



	public List<NamedFactory<Compression>> getCompressionFactories() {
		return session.getCompressionFactories();
	}



	public String getServerVersion() {
		return session.getServerVersion();
	}



	public boolean isEmpty() {
		return session.isEmpty();
	}



	public long getLongProperty(String name, long def) {
		return session.getLongProperty(name, def);
	}



	public KeyPair removePublicKeyIdentity(KeyPair kp) {
		return session.removePublicKeyIdentity(kp);
	}



	public SshdSocketAddress startDynamicPortForwarding(SshdSocketAddress local) throws IOException {
		return session.startDynamicPortForwarding(local);
	}



	public Buffer prepareBuffer(byte cmd, Buffer buffer) {
		return session.prepareBuffer(cmd, buffer);
	}



	public Map<KexProposalOption, String> getServerKexProposals() {
		return session.getServerKexProposals();
	}



	public String getCompressionFactoriesNameList() {
		return session.getCompressionFactoriesNameList();
	}



	public Long getLong(String name) {
		return session.getLong(name);
	}



	public int getIntProperty(String name, int def) {
		return session.getIntProperty(name, def);
	}



	public List<String> getCompressionFactoriesNames() {
		return session.getCompressionFactoriesNames();
	}



	public ServerKeyVerifier getServerKeyVerifier() {
		return session.getServerKeyVerifier();
	}



	public KexState getKexState() {
		return session.getKexState();
	}



	public Integer getInteger(String name) {
		return session.getInteger(name);
	}



	public void setCompressionFactories(List<NamedFactory<Compression>> compressionFactories) {
		session.setCompressionFactories(compressionFactories);
	}



	public Map<KexProposalOption, String> getKexNegotiationResult() {
		return session.getKexNegotiationResult();
	}



	public void stopDynamicPortForwarding(SshdSocketAddress local) throws IOException {
		session.stopDynamicPortForwarding(local);
	}



	public SocketAddress getConnectAddress() {
		return session.getConnectAddress();
	}



	public IoWriteFuture sendDebugMessage(boolean display, Object msg, String lang) throws IOException {
		return session.sendDebugMessage(display, msg, lang);
	}



	public String getNegotiatedKexParameter(KexProposalOption paramType) {
		return session.getNegotiatedKexParameter(paramType);
	}



	public void setCompressionFactoriesNameList(String names) {
		session.setCompressionFactoriesNameList(names);
	}



	public boolean getBooleanProperty(String name, boolean def) {
		return session.getBooleanProperty(name, def);
	}



	public void setServerKeyVerifier(ServerKeyVerifier serverKeyVerifier) {
		session.setServerKeyVerifier(serverKeyVerifier);
	}



	public void setCompressionFactoriesNames(String... names) {
		session.setCompressionFactoriesNames(names);
	}



	public Boolean getBoolean(String name) {
		return session.getBoolean(name);
	}



	public UserInteraction getUserInteraction() {
		return session.getUserInteraction();
	}



	public String getStringProperty(String name, String def) {
		return session.getStringProperty(name, def);
	}



	public void setCompressionFactoriesNames(Collection<String> names) {
		session.setCompressionFactoriesNames(names);
	}



	public HostConfigEntry getHostConfigEntry() {
		return session.getHostConfigEntry();
	}



	public CipherInformation getCipherInformation(boolean incoming) {
		return session.getCipherInformation(incoming);
	}



	public void setUserInteraction(UserInteraction userInteraction) {
		session.setUserInteraction(userInteraction);
	}



	public String getString(String name) {
		return session.getString(name);
	}



	public PasswordAuthenticationReporter getPasswordAuthenticationReporter() {
		return session.getPasswordAuthenticationReporter();
	}



	public Object getObject(String name) {
		return session.getObject(name);
	}



	public void setPasswordAuthenticationReporter(PasswordAuthenticationReporter reporter) {
		session.setPasswordAuthenticationReporter(reporter);
	}



	public AttributeRepository getConnectionContext() {
		return session.getConnectionContext();
	}



	public PublicKeyAuthenticationReporter getPublicKeyAuthenticationReporter() {
		return session.getPublicKeyAuthenticationReporter();
	}



	public Charset getCharset(String name, Charset defaultValue) {
		return session.getCharset(name, defaultValue);
	}



	public void setPublicKeyAuthenticationReporter(PublicKeyAuthenticationReporter reporter) {
		session.setPublicKeyAuthenticationReporter(reporter);
	}



	public CompressionInformation getCompressionInformation(boolean incoming) {
		return session.getCompressionInformation(incoming);
	}



	public AuthFuture auth() throws IOException {
		return session.auth();
	}



	public HostBasedAuthenticationReporter getHostBasedAuthenticationReporter() {
		return session.getHostBasedAuthenticationReporter();
	}



	public IoWriteFuture sendIgnoreMessage(byte... data) throws IOException {
		return session.sendIgnoreMessage(data);
	}



	public void setHostBasedAuthenticationReporter(HostBasedAuthenticationReporter reporter) {
		session.setHostBasedAuthenticationReporter(reporter);
	}



	public void setUserAuthFactoriesNames(Collection<String> names) {
		session.setUserAuthFactoriesNames(names);
	}



	public List<NamedFactory<Mac>> getMacFactories() {
		return session.getMacFactories();
	}



	public MacInformation getMacInformation(boolean incoming) {
		return session.getMacInformation(incoming);
	}



	public String getMacFactoriesNameList() {
		return session.getMacFactoriesNameList();
	}



	public IoWriteFuture writePacket(Buffer buffer) throws IOException {
		return session.writePacket(buffer);
	}



	public List<String> getMacFactoriesNames() {
		return session.getMacFactoriesNames();
	}



	public PublicKey getServerKey() {
		return session.getServerKey();
	}



	public void setMacFactories(List<NamedFactory<Mac>> macFactories) {
		session.setMacFactories(macFactories);
	}



	public void setMacFactoriesNameList(String names) {
		session.setMacFactoriesNameList(names);
	}



	public boolean isAuthenticated() {
		return session.isAuthenticated();
	}



	public void registerHostKey(PublicKey hostKey) {
		session.registerHostKey(hostKey);
	}



	public void setMacFactoriesNames(String... names) {
		session.setMacFactoriesNames(names);
	}



	public void setMacFactoriesNames(Collection<String> names) {
		session.setMacFactoriesNames(names);
	}



	public IoWriteFuture writePacket(Buffer buffer, Duration timeout) throws IOException {
		return session.writePacket(buffer, timeout);
	}



	public Collection<String> getRegisteredHostKeys() {
		return session.getRegisteredHostKeys();
	}



	public IoWriteFuture writePacket(Buffer buffer, long maxWaitMillis) throws IOException {
		return session.writePacket(buffer, maxWaitMillis);
	}



	public ClientChannel createChannel(String type) throws IOException {
		return session.createChannel(type);
	}



	public IoWriteFuture writePacket(Buffer buffer, long timeout, TimeUnit unit) throws IOException {
		return session.writePacket(buffer, timeout, unit);
	}



	public ClientChannel createChannel(String type, String subType) throws IOException {
		return session.createChannel(type, subType);
	}



	public ChannelShell createShellChannel() throws IOException {
		return session.createShellChannel();
	}



	public Buffer request(String request, Buffer buffer, long timeout, TimeUnit unit) throws IOException {
		return session.request(request, buffer, timeout, unit);
	}



	public ChannelShell createShellChannel(PtyChannelConfigurationHolder ptyConfig, Map<String, ?> env)
			throws IOException {
		return session.createShellChannel(ptyConfig, env);
	}



	public ChannelExec createExecChannel(String command) throws IOException {
		return session.createExecChannel(command);
	}



	public ChannelExec createExecChannel(String command, PtyChannelConfigurationHolder ptyConfig, Map<String, ?> env)
			throws IOException {
		return session.createExecChannel(command, ptyConfig, env);
	}



	public Buffer request(String request, Buffer buffer, Duration timeout) throws IOException {
		return session.request(request, buffer, timeout);
	}



	public ChannelExec createExecChannel(String command, Charset charset, PtyChannelConfigurationHolder ptyConfig,
			Map<String, ?> env) throws IOException {
		return session.createExecChannel(command, charset, ptyConfig, env);
	}



	public Buffer request(String request, Buffer buffer, long maxWaitMillis) throws IOException {
		return session.request(request, buffer, maxWaitMillis);
	}



	public ChannelExec createExecChannel(byte[] command, PtyChannelConfigurationHolder ptyConfig, Map<String, ?> env)
			throws IOException {
		return session.createExecChannel(command, ptyConfig, env);
	}



	public GlobalRequestFuture request(Buffer buffer, String request, ReplyHandler replyHandler) throws IOException {
		return session.request(buffer, request, replyHandler);
	}



	public String executeRemoteCommand(String command) throws IOException {
		return session.executeRemoteCommand(command);
	}



	public String executeRemoteCommand(String command, Duration timeout) throws IOException {
		return session.executeRemoteCommand(command, timeout);
	}



	public void exceptionCaught(Throwable t) {
		session.exceptionCaught(t);
	}



	public KeyExchangeFuture reExchangeKeys() throws IOException {
		return session.reExchangeKeys();
	}



	public <T extends Service> T getService(Class<T> clazz) {
		return session.getService(clazz);
	}



	public IoSession getIoSession() {
		return session.getIoSession();
	}



	public String executeRemoteCommand(String command, OutputStream stderr, Charset charset) throws IOException {
		return session.executeRemoteCommand(command, stderr, charset);
	}



	public SocketAddress getLocalAddress() {
		return session.getLocalAddress();
	}



	public SocketAddress getRemoteAddress() {
		return session.getRemoteAddress();
	}



	public TimeoutIndicator getTimeoutStatus() {
		return session.getTimeoutStatus();
	}



	public Duration getIdleTimeout() {
		return session.getIdleTimeout();
	}



	public Instant getIdleTimeoutStart() {
		return session.getIdleTimeoutStart();
	}



	public Instant resetIdleTimeout() {
		return session.resetIdleTimeout();
	}



	public Duration getAuthTimeout() {
		return session.getAuthTimeout();
	}



	public Instant getAuthTimeoutStart() {
		return session.getAuthTimeoutStart();
	}



	public Instant resetAuthTimeout() {
		return session.resetAuthTimeout();
	}



	public String executeRemoteCommand(String command, OutputStream stderr, Charset charset, Duration timeout)
			throws IOException {
		return session.executeRemoteCommand(command, stderr, charset, timeout);
	}



	public void setAuthenticated() throws IOException {
		session.setAuthenticated();
	}



	public void disconnect(int reason, String msg) throws IOException {
		session.disconnect(reason, msg);
	}



	public void startService(String name, Buffer buffer) throws Exception {
		session.startService(name, buffer);
	}



	public <T> T resolveAttribute(AttributeKey<T> key) {
		return session.resolveAttribute(key);
	}



	public void executeRemoteCommand(String command, OutputStream stdout, OutputStream stderr, Charset charset)
			throws IOException {
		session.executeRemoteCommand(command, stdout, stderr, charset);
	}



	public void executeRemoteCommand(String command, OutputStream stdout, OutputStream stderr, Charset charset,
			Duration timeout) throws IOException {
		session.executeRemoteCommand(command, stdout, stderr, charset, timeout);
	}



	public ChannelSubsystem createSubsystemChannel(String subsystem) throws IOException {
		return session.createSubsystemChannel(subsystem);
	}



	public ChannelDirectTcpip createDirectTcpipChannel(SshdSocketAddress local, SshdSocketAddress remote)
			throws IOException {
		return session.createDirectTcpipChannel(local, remote);
	}



	public ExplicitPortForwardingTracker createLocalPortForwardingTracker(int localPort, SshdSocketAddress remote)
			throws IOException {
		return session.createLocalPortForwardingTracker(localPort, remote);
	}



	public ExplicitPortForwardingTracker createLocalPortForwardingTracker(SshdSocketAddress local,
			SshdSocketAddress remote) throws IOException {
		return session.createLocalPortForwardingTracker(local, remote);
	}



	public ExplicitPortForwardingTracker createRemotePortForwardingTracker(SshdSocketAddress remote,
			SshdSocketAddress local) throws IOException {
		return session.createRemotePortForwardingTracker(remote, local);
	}



	public DynamicPortForwardingTracker createDynamicPortForwardingTracker(SshdSocketAddress local) throws IOException {
		return session.createDynamicPortForwardingTracker(local);
	}



	public Set<ClientSessionEvent> getSessionState() {
		return session.getSessionState();
	}



	public Set<ClientSessionEvent> waitFor(Collection<ClientSessionEvent> mask, long timeout) {
		return session.waitFor(mask, timeout);
	}



	public Set<ClientSessionEvent> waitFor(Collection<ClientSessionEvent> mask, Duration timeout) {
		return session.waitFor(mask, timeout);
	}



	public Map<Object, Object> getMetadataMap() {
		return session.getMetadataMap();
	}



	public ClientFactoryManager getFactoryManager() {
		return session.getFactoryManager();
	}



	public KeyExchangeFuture switchToNoneCipher() throws IOException {
		return session.switchToNoneCipher();
	}
	
	
	
	
	
	
}
