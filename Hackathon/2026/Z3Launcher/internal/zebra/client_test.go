package zebra

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

// rpcServer spins up an httptest server that decodes the JSON-RPC method and
// returns the canned result for it.
func rpcServer(t *testing.T, results map[string]any) *httptest.Server {
	t.Helper()
	return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		body, _ := io.ReadAll(r.Body)
		var req rpcRequest
		if err := json.Unmarshal(body, &req); err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}
		res, ok := results[req.Method]
		if !ok {
			_ = json.NewEncoder(w).Encode(rpcResponse{Error: &rpcError{Code: -32601, Message: "method not found"}})
			return
		}
		raw, _ := json.Marshal(res)
		_ = json.NewEncoder(w).Encode(map[string]any{"result": json.RawMessage(raw), "error": nil, "id": req.ID})
	}))
}

func boolPtr(b bool) *bool { return &b }

func TestGetBlockchainInfo(t *testing.T) {
	srv := rpcServer(t, map[string]any{
		"getblockchaininfo": map[string]any{
			"chain":                          "main",
			"blocks":                         2_500_000,
			"estimatedheight":                2_500_002,
			"verificationprogress":           0.9999,
			"bestblockhash":                  "0000abc",
			"initial_block_download_complete": true,
		},
	})
	defer srv.Close()

	bi, err := New(srv.URL).GetBlockchainInfo(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if bi.Chain != "main" || bi.Blocks != 2_500_000 || bi.EstimatedHeight != 2_500_002 {
		t.Errorf("unexpected info: %+v", bi)
	}
	if !bi.Ready() {
		t.Errorf("expected ready (IBD complete)")
	}
}

func TestSyncPct(t *testing.T) {
	cases := []struct {
		blocks, tip int64
		want        float64
	}{
		{0, 0, 0},
		{0, 100, 0},
		{50, 100, 50},
		{100, 100, 100},
		{120, 100, 100}, // clamp
	}
	for _, tc := range cases {
		bi := BlockchainInfo{Blocks: tc.blocks, EstimatedHeight: tc.tip}
		if got := bi.SyncPct(); got != tc.want {
			t.Errorf("SyncPct(blocks=%d tip=%d) = %v, want %v", tc.blocks, tc.tip, got, tc.want)
		}
	}
}

// On regtest Zebra reports a wall-clock-extrapolated estimatedheight (millions)
// while the chain has only a handful of blocks, yet verificationprogress is 1.0
// (fully synced). SyncPct must read 100%, not ~0%, so the dashboard's progress
// ring matches its "Sync Finished" state.
func TestSyncPctReadyNodeIs100(t *testing.T) {
	bi := BlockchainInfo{Blocks: 52, EstimatedHeight: 6_454_854, VerificationProgress: 1.0}
	if !bi.Ready() {
		t.Fatal("regtest node with verificationprogress=1.0 should be ready")
	}
	if got := bi.SyncPct(); got != 100 {
		t.Errorf("SyncPct on a ready regtest node = %v, want 100", got)
	}
}

func TestReadyFallback(t *testing.T) {
	// No IBD flag: ready iff within 2 blocks of the tip.
	if !(BlockchainInfo{Blocks: 99, EstimatedHeight: 100}).Ready() {
		t.Errorf("within 2 blocks should be ready via fallback")
	}
	if (BlockchainInfo{Blocks: 90, EstimatedHeight: 100}).Ready() {
		t.Errorf("10 blocks behind should not be ready")
	}
	// Explicit false overrides the proximity fallback.
	if (BlockchainInfo{Blocks: 100, EstimatedHeight: 100, InitialBlockDownloadComplete: boolPtr(false)}).Ready() {
		t.Errorf("explicit IBD=false should not be ready")
	}
}

func TestGetInfo(t *testing.T) {
	srv := rpcServer(t, map[string]any{
		"getinfo": map[string]any{
			"version":     5000000,
			"subversion":  "/Zebra:5.0.0/",
			"blocks":      2_500_000,
			"connections": 8,
		},
	})
	defer srv.Close()

	info, err := New(srv.URL).GetInfo(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if info.Connections != 8 || info.Subversion != "/Zebra:5.0.0/" {
		t.Errorf("unexpected getinfo: %+v", info)
	}
}

func TestRPCError(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_ = json.NewEncoder(w).Encode(rpcResponse{Error: &rpcError{Code: -8, Message: "boom"}})
	}))
	defer srv.Close()

	if _, err := New(srv.URL).GetBlockchainInfo(context.Background()); err == nil {
		t.Errorf("expected an error from a JSON-RPC error response")
	}
}
