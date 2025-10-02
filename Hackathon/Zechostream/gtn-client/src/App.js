import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Stack,
  AppBar,
  Toolbar,
  Chip,
  FormHelperText
} from '@mui/material';

export default function ZechoStreamClient() {
  const [ws, setWs] = useState(null);
  const [currentPrivateKey, setCurrentPrivateKey] = useState(null);
  const [currentPublicKey, setCurrentPublicKey] = useState(null);
  const [selectedRelay, setSelectedRelay] = useState(null);
  const [relayReservationToken, setRelayReservationToken] = useState(null);
  const [broadcasterUuid, setBroadcasterUuid] = useState(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [availableRelays, setAvailableRelays] = useState([]);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);
  const [expiryWarning, setExpiryWarning] = useState("");
  const [streamId, setStreamId] = useState('');
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  const [discoveryApiUrl, setDiscoveryApiUrl] = useState('http://127.0.0.1:8080/v1/relays');
  const [connectionStatus, setConnectionStatus] = useState('Ready');
  const [statusType, setStatusType] = useState('info');
  const [streamLog, setStreamLog] = useState('');
  const [selectedRelayIndex, setSelectedRelayIndex] = useState(-1);

  const audioContextRef = useRef(null);
  const mediaStreamSourceRef = useRef(null);
  const processorNodeRef = useRef(null);
  const recordingStreamRef = useRef(null);
  const audioBufferQueue = useRef([]);
  const isPlayingRef = useRef(false);

  const theme = {
    primary: '#F4B728',
    secondary: '#231F20',
    background: '#0A0A0A',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#E8E8E8',
    textSecondary: '#A0A0A0',
    border: '#333333',
    accent: '#FFD700',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336'
  };

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 48000
    });
    log("Audio system initialized");
    generateKeypair();
  }, []);

  const handleBinaryAudio = async (arrayBuffer) => {
    try {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const int16Data = new Int16Array(arrayBuffer);
      const float32Data = new Float32Array(int16Data.length);
      for (let i = 0; i < int16Data.length; i++) {
        float32Data[i] = int16Data[i] / 32768;
      }

      const audioBuffer = audioContextRef.current.createBuffer(1, float32Data.length, 48000);
      audioBuffer.getChannelData(0).set(float32Data);

      audioBufferQueue.current.push(audioBuffer);

      if (!isPlayingRef.current) {
        playAudioQueue();
      }
    } catch (error) {
      log(`Audio decode error: ${error.message}`);
    }
  };

  const playAudioQueue = async () => {
    if (audioBufferQueue.current.length === 0 || isPlayingRef.current) return;

    isPlayingRef.current = true;

    while (audioBufferQueue.current.length > 0) {
      const audioBuffer = audioBufferQueue.current.shift();

      await new Promise((resolve) => {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => resolve();
        source.start();
      });
    }

    isPlayingRef.current = false;
  };

  const log = (message) => {
    console.log(message);
    const timestamp = new Date().toLocaleTimeString();
    setStreamLog(prev => `${timestamp}: ${message}\n${prev}`.split('\n').slice(0, 100).join('\n'));
  };

  const showStatus = (message, type = 'info') => {
    setConnectionStatus(message);
    setStatusType(type);
  };

  const arrayBufferToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const generateKeypair = async () => {
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign", "verify"]
      );

      const privateKeyBuffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      const publicKeyBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);

      const privKey = arrayBufferToHex(privateKeyBuffer);
      const pubKey = arrayBufferToHex(publicKeyBuffer);
      const uuid = arrayBufferToHex(crypto.getRandomValues(new Uint8Array(16)));

      setCurrentPrivateKey(privKey);
      setCurrentPublicKey(pubKey);
      setBroadcasterUuid(uuid);
      setPrivateKeyInput(privKey);
      log("Keypair generated");
    } catch (error) {
      log(`Keypair generation failed: ${error.message}`);
    }
  };

  const discoverRelays = async () => {
    try {
      const response = await fetch(discoveryApiUrl);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const relays = await response.json();

      if (Array.isArray(relays) && relays.length > 0) {
        setAvailableRelays(relays);
        log(`Found ${relays.length} relays`);
        showStatus(`Found ${relays.length} relays`, 'success');
      } else {
        setAvailableRelays([]);
        log("No relays found");
        showStatus('No relays found', 'warning');
      }
    } catch (error) {
      log(`Discovery failed: ${error.message}`);
      showStatus(`Discovery failed: ${error.message}`, 'error');
    }
  };

  const selectRelay = (index) => {
    if (!availableRelays[index]) return;
    setSelectedRelay(availableRelays[index]);
    setSelectedRelayIndex(index);
    log(`Selected relay: ${availableRelays[index].payment_address}`);
  };

  const reserveSelectedRelay = async () => {
    if (!selectedRelay) {
      log("No relay selected");
      showStatus("Select a relay first", "error");
      return;
    }

    if (!currentPublicKey) {
      log("Generate keypair first");
      showStatus("Generate keypair first", "error");
      return;
    }

    try {
      const reserveUrl = `http://${selectedRelay.endpoints.discovery}/v1/relays/reserve`;
      const requestData = { session_pk: currentPublicKey };

      const response = await fetch(reserveUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const token = await response.text();
        setRelayReservationToken(token);
        log("Relay reserved");
        showStatus("Relay reserved", "success");
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      log(`Reservation failed: ${error.message}`);
      showStatus(`Reservation failed: ${error.message}`, 'error');
    }
  };

  function handleDecoded(decoded) {
    switch (decoded.type) {
      case "Notification": {
        const { stream_id, broadcaster_pk, notification_type } = decoded;

        if (typeof notification_type === "string") {
          if (notification_type === "ClearExpiryWarning") {
            log(`Expiry warning cleared for ${stream_id}`);
            if (currentPublicKey === broadcaster_pk) {
              setShowExpiryWarning(false);
              setExpiryWarning("");
            }
          }
        } else if (notification_type.ExpiryWarning) {
          log(`Expiry warning: ${notification_type.ExpiryWarning.warning}`);
          if (currentPublicKey === broadcaster_pk) {
            setExpiryWarning(notification_type.ExpiryWarning.warning);
            setShowExpiryWarning(true);
          }
        }
        break;
      }

      default:
        log(`Unhandled event type: ${decoded.type}`);
    }
  }

  const connectAsBroadcaster = () => {
    if (!streamId.trim()) {
      showStatus("Enter stream ID", "error");
      return;
    }
    if (!selectedRelay) {
      showStatus("Select and reserve relay first", "error");
      return;
    }
    if (!broadcasterUuid) {
      showStatus("Generate keypair first", "error");
      return;
    }
    const wsUrl = `ws://${selectedRelay.endpoints.stream}/v1/stream/${streamId}`;
    connectWebSocket(wsUrl, "broadcaster");
  };

  const connectAsListener = async () => {
    if (!streamId.trim()) {
      showStatus("Enter stream ID", "error");
      return;
    }
    if (!selectedRelay) {
      showStatus("Select and reserve relay first", "error");
      return;
    }
    const wsUrl = `ws://${selectedRelay.endpoints.stream}/v1/listen/${streamId}`;
    connectWebSocket(wsUrl, "listener");
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
      log("Audio enabled");
    }
  };

  const connectWebSocket = (wsUrl, role) => {
    log(`Connecting as ${role}...`);

    try {
      const newWs = new WebSocket(wsUrl);
      newWs.binaryType = "arraybuffer";

      newWs.onopen = () => {
        showStatus(`Connected as ${role}`, "success");
        log(`Connected as ${role}`);

        if (role === "broadcaster") {
          const announceEvent = {
            type: "BroadcasterAnnounce",
            stream_id: streamId,
            broadcaster_uuid: broadcasterUuid
          };

          const jsonString = JSON.stringify(announceEvent);
          log(`Sending announcement`);

          try {
            newWs.send(jsonString);
            log("Announcement sent");
          } catch (error) {
            log(`Failed to send announcement: ${error.message}`);
          }
        }
      };

      newWs.onmessage = async (event) => {
        if (typeof event.data === "string") {
          try {
            const decoded = JSON.parse(event.data);
            log(`Received: ${decoded.type}`);
            handleDecoded(decoded);
          } catch (error) {
            log(`Parse error: ${error.message}`);
          }
        } else if (event.data instanceof ArrayBuffer) {
          await handleBinaryAudio(event.data);
        }
      };

      newWs.onclose = (event) => {
        const closeMsg = `Disconnected - Code: ${event.code}`;
        showStatus(closeMsg, "info");
        log(closeMsg);
        cleanupAudio();
      };

      newWs.onerror = (error) => {
        showStatus("Connection error", "error");
        log(`WebSocket error: ${error.type || "Unknown error"}`);
        cleanupAudio();
      };

      setWs(newWs);
    } catch (error) {
      showStatus(`Connection failed: ${error.message}`, "error");
      log(`Connection failed: ${error.message}`);
    }
  };

  const startAudioCapture = async () => {
    try {
      if (audioContextRef.current && mediaStreamSourceRef.current) {
        log('Audio capture already active');
        return;
      }

      const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
      log(`Microphone permission: ${permissionStatus.state}`);
      if (permissionStatus.state === 'denied') {
        throw new Error('Microphone access denied');
      }

      if (recordingStreamRef.current || audioContextRef.current) {
        log('Cleaning up existing audio resources');
        cleanupAudio();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordingStreamRef.current = stream;

      const tracks = stream.getAudioTracks();
      log(`Audio tracks: ${tracks.length}`);

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 48000
      });
      log('AudioContext initialized');

      mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);

      const bufferSize = 2048;
      processorNodeRef.current = audioContextRef.current.createScriptProcessor(bufferSize, 1, 1);

      processorNodeRef.current.onaudioprocess = (event) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          const inputData = event.inputBuffer.getChannelData(0);
          const pcmInt16 = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            pcmInt16[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
          }
          ws.send(pcmInt16.buffer);
        }
      };

      mediaStreamSourceRef.current.connect(processorNodeRef.current);
      processorNodeRef.current.connect(audioContextRef.current.destination);

      tracks.forEach(track => {
        track.onended = () => {
          log(`Audio track ended: ${track.label}`);
          cleanupAudio();
        };
      });

      log('Audio capture started');
    } catch (error) {
      log(`Audio capture error: ${error.message}`);
      cleanupAudio();
    }
  };

  const startBroadcast = async () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      log("No WebSocket connection");
      return;
    }

    try {
      await startAudioCapture();
      setIsBroadcasting(true);
      log("Broadcasting started");
      showStatus("Broadcasting", "success");
    } catch (error) {
      log(`Failed to start broadcast: ${error.message}`);
    }
  };

  const stopBroadcast = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      log("No WebSocket connection");
      return;
    }

    const finalizeEvent = {
      type: "Finalize",
      stream_id: streamId
    };

    ws.send(JSON.stringify(finalizeEvent));
    log(`Finalized stream ${streamId}`);
    cleanupAudio();
    setIsBroadcasting(false);
    showStatus("Stopped", "info");
  };

  const cleanupAudio = () => {
    if (processorNodeRef.current) {
      processorNodeRef.current.disconnect();
      processorNodeRef.current = null;
    }
    if (mediaStreamSourceRef.current) {
      mediaStreamSourceRef.current.disconnect();
      mediaStreamSourceRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (recordingStreamRef.current) {
      const tracks = recordingStreamRef.current.getAudioTracks();
      tracks.forEach(track => track.stop());
      recordingStreamRef.current = null;
    }
    setIsBroadcasting(false);
    log('Audio cleanup completed');
  };

  const disconnect = () => {
    if (ws) {
      if (isBroadcasting) {
        stopBroadcast();
      }
      ws.close();
      setWs(null);
    }
    showStatus("Disconnected", "info");
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.background, color: theme.text }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: theme.background, borderBottom: `1px solid ${theme.border}` }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: theme.primary, fontWeight: 700, fontFamily: 'monospace', letterSpacing: '2px' }}>
            ZECHOSTREAM - Censorship Resistant and Private Streaming
          </Typography>
          <Chip
            label={connectionStatus}
            size="small"
            sx={{
              bgcolor: 'transparent',
              color: statusType === 'success' ? theme.success :
                statusType === 'error' ? theme.error :
                statusType === 'warning' ? theme.warning : theme.textSecondary,
              border: `1px solid ${statusType === 'success' ? theme.success :
                statusType === 'error' ? theme.error :
                statusType === 'warning' ? theme.warning : theme.border}`,
              fontFamily: 'monospace',
              fontSize: '0.7rem'
            }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {showExpiryWarning && (
          <Alert severity="warning" sx={{ mb: 4, bgcolor: theme.surface, color: theme.text, border: `1px solid ${theme.warning}` }}>
            {expiryWarning}
          </Alert>
        )}

        <Stack spacing={6}>
          {/* Discovery */}
          <Box>
            <Typography variant="overline" sx={{ color: theme.textSecondary, letterSpacing: '2px', fontSize: '0.7rem', mb: 2, display: 'block' }}>
              NETWORK - Connect to the relay network through a node
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Discovery API URL"
                value={discoveryApiUrl}
                onChange={(e) => setDiscoveryApiUrl(e.target.value)}
                sx={{
                  '& .MuiInput-root': {
                    color: theme.text,
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    '&:before': { borderBottomColor: theme.border },
                    '&:hover:not(.Mui-disabled):before': { borderBottomColor: theme.primary },
                    '&:after': { borderBottomColor: theme.primary }
                  }
                }}
              />
              <Button
                variant="text"
                onClick={discoverRelays}
                sx={{
                  color: theme.primary,
                  textTransform: 'none',
                  fontFamily: 'monospace',
                  justifyContent: 'flex-start',
                  px: 0,
                  '&:hover': { bgcolor: 'transparent', color: theme.accent }
                }}
              >
                &gt; discover_relays
              </Button>
              <FormHelperText>
                Enter a valid relay node endpoint and discover relays.
              </FormHelperText>
            </Stack>
          </Box>

          {/* Authentication */}
          <Box>
            <Typography variant="overline" sx={{ color: theme.textSecondary, letterSpacing: '2px', fontSize: '0.7rem', mb: 2, display: 'block' }}>
              AUTHENTICATION - Generate a keypair to broadcast or listen to a broadcast
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="text"
                onClick={generateKeypair}
                sx={{
                  color: theme.primary,
                  textTransform: 'none',
                  fontFamily: 'monospace',
                  justifyContent: 'flex-start',
                  px: 0,
                  '&:hover': { bgcolor: 'transparent', color: theme.accent }
                }}
              >
                &gt; generate_keypair
              </Button>
              {currentPublicKey && (
                <Box sx={{ pl: 2, borderLeft: `2px solid ${theme.border}` }}>
                  <Typography variant="caption" sx={{ color: theme.textSecondary, fontFamily: 'monospace', fontSize: '0.7rem', display: 'block' }}>
                    public key: {currentPublicKey}
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.textSecondary, fontFamily: 'monospace', fontSize: '0.7rem', display: 'block' }}>
                    uuid: {broadcasterUuid}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          {/* Relays */}
          {availableRelays.length > 0 && (
            <Box>
              <Typography variant="overline" sx={{ color: theme.textSecondary, letterSpacing: '2px', fontSize: '0.7rem', mb: 2, display: 'block' }}>
                RELAYS ({availableRelays.length})
              </Typography>
              <Stack spacing={1}>
                {availableRelays.map((relay, index) => (
                  <Box
                    key={relay.peer_id}
                    onClick={() => selectRelay(index)}
                    sx={{
                      py: 1.5,
                      px: 2,

                      borderLeft: `2px solid ${selectedRelayIndex === index ? theme.primary : 'transparent'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { borderLeftColor: theme.primary, bgcolor: theme.surface }
                    }}
                  >
                    <Typography variant="body2" sx={{ color: selectedRelayIndex === index ? theme.text : theme.textSecondary, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      Peer ID: {relay.peer_id}
                    </Typography>
                    <Typography variant="body2" sx={{ color: selectedRelayIndex === index ? theme.text : theme.textSecondary, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      Payment Address: {relay.payment_address}
                    </Typography>
                    <Typography variant="body2" sx={{ color: selectedRelayIndex === index ? theme.text : theme.textSecondary, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      Discovery Endpoint: http://{relay.endpoints.discovery} (Use the discovery API to interact with this node)
                    </Typography>
                    <Typography variant="body2" sx={{ color: selectedRelayIndex === index ? theme.text : theme.textSecondary, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      Stream Endpoint: http://{relay.endpoints.stream} (Use the streaming endpoint to broadcast or listen to a stream i.e. {`http://${relay.endpoints.stream}/STREAM_ID`})
                    </Typography>
                  </Box>
                ))}
              </Stack>
              {selectedRelay && (
                <Button
                  variant="text"
                  onClick={reserveSelectedRelay}
                  disabled={!!relayReservationToken}
                  sx={{
                    color: relayReservationToken ? theme.success : theme.primary,
                    textTransform: 'none',
                    fontFamily: 'monospace',
                    justifyContent: 'flex-start',
                    px: 0,
                    mt: 2,
                    '&:hover': { bgcolor: 'transparent', color: theme.accent },
                    '&:disabled': { color: theme.success }
                  }}
                >
                  {relayReservationToken ? '✓ reserved' : '> reserve_relay'}
                </Button>
              )}
            </Box>
          )}

          {/* Streaming */}
          <Box>
            <Typography variant="overline" sx={{ color: theme.textSecondary, letterSpacing: '2px', fontSize: '0.7rem', mb: 2, display: 'block' }}>
              STREAM
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="stream_id"
                value={streamId}
                onChange={(e) => setStreamId(e.target.value)}
                sx={{
                  '& .MuiInput-root': {
                    color: theme.text,
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    '&:before': { borderBottomColor: theme.border },
                    '&:hover:not(.Mui-disabled):before': { borderBottomColor: theme.primary },
                    '&:after': { borderBottomColor: theme.primary }
                  }
                }}
              />
              <Stack direction="row" spacing={3}>
                <Button
                  variant="text"
                  onClick={connectAsBroadcaster}
                  disabled={!!ws}
                  sx={{
                    color: theme.error,
                    textTransform: 'none',
                    fontFamily: 'monospace',
                    px: 0,
                    '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
                    '&:disabled': { color: theme.textSecondary }
                  }}
                >
                  &gt; broadcast
                </Button>
                <Button
                  variant="text"
                  onClick={connectAsListener}
                  disabled={!!ws}
                  sx={{
                    color: theme.success,
                    textTransform: 'none',
                    fontFamily: 'monospace',
                    px: 0,
                    '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
                    '&:disabled': { color: theme.textSecondary }
                  }}
                >
                  &gt; listen
                </Button>
                {ws && (
                  <Button
                    variant="text"
                    onClick={disconnect}
                    sx={{
                      color: theme.textSecondary,
                      textTransform: 'none',
                      fontFamily: 'monospace',
                      px: 0,
                      '&:hover': { bgcolor: 'transparent', color: theme.text }
                    }}
                  >
                    &gt; disconnect
                  </Button>
                )}
              </Stack>

              {ws && connectionStatus.includes("broadcaster") && (
                <Box sx={{ pl: 2, borderLeft: `2px solid ${theme.border}`, mt: 2 }}>
                  <Stack direction="row" spacing={3}>
                    <Button
                      variant="text"
                      onClick={startBroadcast}
                      disabled={isBroadcasting}
                      sx={{
                        color: isBroadcasting ? theme.textSecondary : theme.success,
                        textTransform: 'none',
                        fontFamily: 'monospace',
                        px: 0,
                        '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
                        '&:disabled': { color: theme.textSecondary }
                      }}
                    >
                      {isBroadcasting ? '● broadcasting' : '&gt; start'}
                    </Button>
                    <Button
                      variant="text"
                      onClick={stopBroadcast}
                      disabled={!isBroadcasting}
                      sx={{
                        color: theme.error,
                        textTransform: 'none',
                        fontFamily: 'monospace',
                        px: 0,
                        '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
                        '&:disabled': { color: theme.textSecondary }
                      }}
                    >
                      &gt; stop
                    </Button>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>

          {/* Log */}
          <Box>
            <Typography variant="overline" sx={{ color: theme.textSecondary, letterSpacing: '2px', fontSize: '0.7rem', mb: 2, display: 'block' }}>
              LOG
            </Typography>
            <Box sx={{
              bgcolor: theme.surface,
              border: `1px solid ${theme.border}`,
              p: 2,
              maxHeight: '300px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: theme.textSecondary,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {streamLog || 'No events'}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
