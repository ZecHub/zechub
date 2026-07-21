// Package zebra is a small JSON-RPC client for a Zebra full node. It covers the
// handful of methods the launcher needs for sync/health telemetry —
// getblockchaininfo and getinfo — and computes a sync percentage and a
// readiness signal from them.
package zebra

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// Client talks to a Zebra node's JSON-RPC endpoint.
type Client struct {
	url        string
	http       *http.Client
	user, pass string // optional HTTP basic auth (Zebra cookie/user-pass)
}

// Option configures a Client.
type Option func(*Client)

// WithHTTPClient overrides the default HTTP client.
func WithHTTPClient(h *http.Client) Option { return func(c *Client) { c.http = h } }

// WithBasicAuth sets HTTP basic auth credentials.
func WithBasicAuth(user, pass string) Option {
	return func(c *Client) { c.user, c.pass = user, pass }
}

// New returns a Client for the given JSON-RPC URL (e.g. http://127.0.0.1:18232).
func New(url string, opts ...Option) *Client {
	c := &Client{url: url, http: &http.Client{Timeout: 10 * time.Second}}
	for _, o := range opts {
		o(c)
	}
	return c
}

type rpcRequest struct {
	JSONRPC string `json:"jsonrpc"`
	ID      string `json:"id"`
	Method  string `json:"method"`
	Params  []any  `json:"params"`
}

type rpcError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func (e *rpcError) Error() string {
	return fmt.Sprintf("zebra rpc error %d: %s", e.Code, e.Message)
}

type rpcResponse struct {
	Result json.RawMessage `json:"result"`
	Error  *rpcError       `json:"error"`
	ID     string          `json:"id"`
}

// call performs a single JSON-RPC call and unmarshals the result into out.
func (c *Client) call(ctx context.Context, method string, params []any, out any) error {
	if params == nil {
		params = []any{}
	}
	body, err := json.Marshal(rpcRequest{JSONRPC: "1.0", ID: "z3launcher", Method: method, Params: params})
	if err != nil {
		return fmt.Errorf("encode %s request: %w", method, err)
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.url, bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	if c.user != "" {
		req.SetBasicAuth(c.user, c.pass)
	}

	resp, err := c.http.Do(req)
	if err != nil {
		return fmt.Errorf("%s: %w", method, err)
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(io.LimitReader(resp.Body, 8<<20))
	if err != nil {
		return fmt.Errorf("%s: read body: %w", method, err)
	}

	// A non-2xx status means auth rejection, a wrong endpoint, or a foreign
	// responder — not a valid RPC reply. Surface it (with a short body snippet)
	// rather than letting it decode to a misleading zero-value success.
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		snippet := string(data)
		if len(snippet) > 200 {
			snippet = snippet[:200]
		}
		return fmt.Errorf("%s: http %d: %s", method, resp.StatusCode, strings.TrimSpace(snippet))
	}

	var rr rpcResponse
	if err := json.Unmarshal(data, &rr); err != nil {
		return fmt.Errorf("%s: decode response (status %d): %w", method, resp.StatusCode, err)
	}
	if rr.Error != nil {
		return rr.Error
	}
	if out != nil && len(rr.Result) > 0 {
		if err := json.Unmarshal(rr.Result, out); err != nil {
			return fmt.Errorf("%s: decode result: %w", method, err)
		}
	}
	return nil
}

// BlockchainInfo is the subset of getblockchaininfo the launcher uses.
type BlockchainInfo struct {
	Chain                string  `json:"chain"`
	Blocks               int64   `json:"blocks"`
	EstimatedHeight      int64   `json:"estimatedheight"`
	VerificationProgress float64 `json:"verificationprogress"`
	BestBlockHash        string  `json:"bestblockhash"`
	// Pointer so we can distinguish "absent" (nil) from explicit false.
	InitialBlockDownloadComplete *bool `json:"initial_block_download_complete"`
}

// SyncPct returns sync progress in the range [0,100], computed as blocks over
// the estimated chain tip. Returns 0 when the tip is unknown.
//
// A ready node is always 100%: on regtest estimatedheight is extrapolated from
// the wall clock (millions of blocks) while the chain only has a handful, so
// blocks/estimatedheight would read ~0% even though the node is fully synced.
// Anchoring to Ready() makes the dashboard show 100% instead of 0% there, and
// is correct everywhere else too (a synced node is 100% by definition).
func (b BlockchainInfo) SyncPct() float64 {
	if b.Ready() {
		return 100
	}
	if b.EstimatedHeight <= 0 {
		return 0
	}
	pct := float64(b.Blocks) / float64(b.EstimatedHeight) * 100
	switch {
	case pct < 0:
		return 0
	case pct > 100:
		return 100
	default:
		return pct
	}
}

// Ready reports whether Zebra has finished its initial block download. It
// checks (in order):
//  1. The explicit initial_block_download_complete flag (if present).
//  2. verificationprogress >= 1.0 (Zebra reports this as 1.0 on regtest even
//     at height 0, because the node IS fully synced — there's nothing to sync).
//  3. "within 2 blocks of the estimated tip" (the ready_max_blocks_behind
//     fallback). This can give false negatives on regtest where estimatedheight
//     is extrapolated from the current time and can be millions.
func (b BlockchainInfo) Ready() bool {
	if b.InitialBlockDownloadComplete != nil {
		return *b.InitialBlockDownloadComplete
	}
	if b.VerificationProgress >= 1.0 {
		return true
	}
	return b.EstimatedHeight > 0 && b.EstimatedHeight-b.Blocks <= 2
}

// GetBlockchainInfo calls getblockchaininfo.
func (c *Client) GetBlockchainInfo(ctx context.Context) (*BlockchainInfo, error) {
	var bi BlockchainInfo
	if err := c.call(ctx, "getblockchaininfo", nil, &bi); err != nil {
		return nil, err
	}
	return &bi, nil
}

// Info is the subset of getinfo the launcher uses.
type Info struct {
	Version     int64  `json:"version"`
	Subversion  string `json:"subversion"`
	Blocks      int64  `json:"blocks"`
	Connections int64  `json:"connections"`
	Difficulty  float64 `json:"difficulty"`
	Errors      string `json:"errors"`
}

// GetInfo calls getinfo.
func (c *Client) GetInfo(ctx context.Context) (*Info, error) {
	var info Info
	if err := c.call(ctx, "getinfo", nil, &info); err != nil {
		return nil, err
	}
	return &info, nil
}
