// Package zaino probes the Zaino indexer's health. Zaino exposes a
// lightwalletd-compatible gRPC interface (:8137) and a JSON-RPC interface
// (:8237). To stay dependency-free we probe health over JSON-RPC (a lightweight
// getinfo call) and fall back to a TCP dial of the gRPC port. A full
// GetLightdInfo gRPC probe can be added later if richer detail is needed.
package zaino

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net"
	"net/http"
	"time"
)

// Client probes a Zaino instance.
type Client struct {
	jsonRPCURL string // e.g. http://127.0.0.1:8237
	grpcAddr   string // e.g. 127.0.0.1:8137
	http       *http.Client
	dialer     *net.Dialer
}

// Option configures a Client.
type Option func(*Client)

// WithHTTPClient overrides the default HTTP client.
func WithHTTPClient(h *http.Client) Option { return func(c *Client) { c.http = h } }

// WithDialer overrides the default TCP dialer (used by tests).
func WithDialer(d *net.Dialer) Option { return func(c *Client) { c.dialer = d } }

// New returns a Client. Either endpoint may be empty to disable that probe.
func New(jsonRPCURL, grpcAddr string, opts ...Option) *Client {
	c := &Client{
		jsonRPCURL: jsonRPCURL,
		grpcAddr:   grpcAddr,
		http:       &http.Client{Timeout: 5 * time.Second},
		dialer:     &net.Dialer{Timeout: 2 * time.Second},
	}
	for _, o := range opts {
		o(c)
	}
	return c
}

// Healthy reports whether Zaino appears to be up and serving. It returns
// (false, nil) — not an error — for "not reachable yet", since that is a normal
// transient state while Zebra is still syncing.
func (c *Client) Healthy(ctx context.Context) (bool, error) {
	if c.jsonRPCAlive(ctx) {
		return true, nil
	}
	if c.grpcAddr != "" && c.tcpAlive(ctx) {
		return true, nil
	}
	return false, nil
}

// jsonRPCAlive returns true if the JSON-RPC endpoint answers with any
// well-formed JSON-RPC response (a result or an error both mean it's serving).
func (c *Client) jsonRPCAlive(ctx context.Context) bool {
	if c.jsonRPCURL == "" {
		return false
	}
	body := []byte(`{"jsonrpc":"1.0","id":"z3launcher","method":"getinfo","params":[]}`)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.jsonRPCURL, bytes.NewReader(body))
	if err != nil {
		return false
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.http.Do(req)
	if err != nil {
		return false
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(io.LimitReader(resp.Body, 1<<20))
	if err != nil {
		return false
	}
	var m map[string]json.RawMessage
	if json.Unmarshal(data, &m) != nil {
		return false
	}
	_, hasResult := m["result"]
	_, hasError := m["error"]
	return hasResult || hasError
}

// tcpAlive returns true if the gRPC port accepts a TCP connection.
func (c *Client) tcpAlive(ctx context.Context) bool {
	conn, err := c.dialer.DialContext(ctx, "tcp", c.grpcAddr)
	if err != nil {
		return false
	}
	_ = conn.Close()
	return true
}
