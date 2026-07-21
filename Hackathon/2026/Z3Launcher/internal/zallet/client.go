// Package zallet provides a JSON-RPC client for the Zallet wallet service.
// Zallet is the alpha-stage CLI wallet that replaces zcashd's built-in wallet,
// completing the Z3 stack (Zebra + Zaino + Zallet). It exposes zcashd-compatible
// JSON-RPC methods at its configured port (default 28232).
//
// The client wraps individual RPC methods with typed Go helpers and a generic
// Call method for arbitrary RPC passthrough. Every method treats "method not
// found" as a typed sentinel (ErrMethodNotFound) so callers can degrade
// gracefully — Zallet is alpha and many methods may not be implemented yet.
package zallet

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"strings"
	"time"
)

// ErrMethodNotFound is returned when Zallet responds with a "method not found"
// RPC error. Callers should catch this to degrade gracefully.
var ErrMethodNotFound = errors.New("zallet: RPC method not found")

// Client talks to a Zallet JSON-RPC endpoint.
type Client struct {
	URL      string // e.g. http://127.0.0.1:28232
	User     string // RPC auth username (empty = no auth)
	Password string // RPC auth password
	HTTP     *http.Client
}

// New returns a Client pointed at the given URL.
func New(url string) *Client {
	return &Client{
		URL: url,
		HTTP: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

type rpcRequest struct {
	JSONRPC string `json:"jsonrpc"`
	ID      string `json:"id"`
	Method  string `json:"method"`
	Params  []any  `json:"params"`
}

// RPCError is the error object from a JSON-RPC response.
type RPCError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type rpcResponse struct {
	Result json.RawMessage `json:"result"`
	Error  *RPCError       `json:"error"`
}

// CallRaw invokes a JSON-RPC method with raw params (array or object). This
// is the generic passthrough used by the wallet proxy endpoint — it preserves
// named params for methods like z_getnewaccount.
func (c *Client) CallRaw(ctx context.Context, method string, params json.RawMessage) (json.RawMessage, error) {
	if params == nil {
		params = json.RawMessage("[]")
	}
	body, err := json.Marshal(map[string]any{
		"jsonrpc": "1.0",
		"id":      "z3launcher",
		"method":  method,
		"params":  json.RawMessage(params),
	})
	if err != nil {
		return nil, err
	}
	return c.doRPC(ctx, method, body)
}

// Call invokes an arbitrary JSON-RPC method and returns the raw result.
func (c *Client) Call(ctx context.Context, method string, params []any) (json.RawMessage, error) {
	if params == nil {
		params = []any{}
	}
	body, err := json.Marshal(rpcRequest{JSONRPC: "1.0", ID: "z3launcher", Method: method, Params: params})
	if err != nil {
		return nil, err
	}
	return c.doRPC(ctx, method, body)
}

// doRPC sends a pre-marshalled JSON-RPC body and decodes the response.
func (c *Client) doRPC(ctx context.Context, method string, body []byte) (json.RawMessage, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.URL, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	if c.User != "" {
		req.SetBasicAuth(c.User, c.Password)
	}
	resp, err := c.HTTP.Do(req)
	if err != nil {
		return nil, fmt.Errorf("zallet %s: %w", method, err)
	}
	defer resp.Body.Close()
	data, err := io.ReadAll(io.LimitReader(resp.Body, 8<<20))
	if err != nil {
		return nil, fmt.Errorf("zallet %s: read: %w", method, err)
	}
	var rr rpcResponse
	if err := json.Unmarshal(data, &rr); err != nil {
		return nil, fmt.Errorf("zallet %s: decode: %w", method, err)
	}
	if rr.Error != nil {
		if rr.Error.Code == -32601 || strings.Contains(strings.ToLower(rr.Error.Message), "method not found") {
			return nil, ErrMethodNotFound
		}
		return nil, fmt.Errorf("zallet %s: rpc error %d: %s", method, rr.Error.Code, rr.Error.Message)
	}
	return rr.Result, nil
}

// Ping checks if Zallet is reachable via a TCP connect.
func (c *Client) Ping(ctx context.Context) error {
	// Extract host:port from URL for TCP dial.
	host := strings.TrimPrefix(c.URL, "http://")
	host = strings.TrimPrefix(host, "https://")
	host = strings.TrimSuffix(host, "/")
	d := net.Dialer{Timeout: 3 * time.Second}
	conn, err := d.DialContext(ctx, "tcp", host)
	if err != nil {
		return fmt.Errorf("zallet unreachable at %s: %w", host, err)
	}
	_ = conn.Close()
	return nil
}

// GetInfo calls getinfo and returns the raw result.
func (c *Client) GetInfo(ctx context.Context) (json.RawMessage, error) {
	return c.Call(ctx, "getinfo", nil)
}

// GetBalance returns the wallet balance via getbalance.
func (c *Client) GetBalance(ctx context.Context) (json.RawMessage, error) {
	return c.Call(ctx, "getbalance", nil)
}

// ListAddresses returns wallet addresses via listaddresses.
func (c *Client) ListAddresses(ctx context.Context) (json.RawMessage, error) {
	return c.Call(ctx, "listaddresses", nil)
}

// GetNewAddress creates a new address. addrType can be empty for the default.
func (c *Client) GetNewAddress(ctx context.Context) (json.RawMessage, error) {
	return c.Call(ctx, "getnewaddress", nil)
}

// ListTransactions returns recent transactions.
func (c *Client) ListTransactions(ctx context.Context, count int) (json.RawMessage, error) {
	if count <= 0 {
		count = 10
	}
	return c.Call(ctx, "listtransactions", []any{"", count})
}
