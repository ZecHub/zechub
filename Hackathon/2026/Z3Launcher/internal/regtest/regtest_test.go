package regtest

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// fakeZcashd is a minimal zcashd regtest stand-in for unit tests.
type fakeZcashd struct {
	t            *testing.T
	height       int64
	nextAddr     int
	balanceCalls int
}

func (f *fakeZcashd) handle(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	var req struct {
		Method string `json:"method"`
	}
	_ = json.Unmarshal(body, &req)
	switch req.Method {
	case "getblockcount":
		_ = json.NewEncoder(w).Encode(map[string]any{"result": f.height})
	case "getnewaddress":
		f.nextAddr++
		out := "zt1fake" + strings.Repeat("a", f.nextAddr)
		_ = json.NewEncoder(w).Encode(map[string]any{"result": out})
	case "getbalance":
		f.balanceCalls++
		bal := 0.0
		if f.balanceCalls > 1 {
			bal = 1.5
		}
		_ = json.NewEncoder(w).Encode(map[string]any{"result": bal})
	case "generate":
		var req rpcRequest
		_ = json.Unmarshal(body, &req)
		if len(req.Params) > 0 {
			if n, ok := req.Params[0].(float64); ok {
				f.height += int64(n)
			}
		}
		_ = json.NewEncoder(w).Encode(map[string]any{"result": nil})
	default:
		_ = json.NewEncoder(w).Encode(map[string]any{"error": map[string]any{"code": -1, "message": "unknown method: " + req.Method}})
	}
}

func newFakeServer(t *testing.T) (*httptest.Server, *fakeZcashd) {
	t.Helper()
	f := &fakeZcashd{t: t}
	s := httptest.NewServer(http.HandlerFunc(f.handle))
	t.Cleanup(s.Close)
	return s, f
}

func TestPing(t *testing.T) {
	s, _ := newFakeServer(t)
	seeder := New(s.URL, s.Client())
	if err := seeder.Ping(context.Background()); err != nil {
		t.Fatalf("ping: %v", err)
	}
}

func TestGetNewAddress(t *testing.T) {
	s, f := newFakeServer(t)
	seeder := New(s.URL, s.Client())
	addr, err := seeder.GetNewAddress(context.Background())
	if err != nil {
		t.Fatalf("new address: %v", err)
	}
	if !strings.HasPrefix(addr, "zt1fake") {
		t.Errorf("addr = %q, want zt1fake prefix", addr)
	}
	if f.nextAddr != 1 {
		t.Errorf("nextAddr = %d, want 1", f.nextAddr)
	}
}

func TestBlockCount(t *testing.T) {
	s, f := newFakeServer(t)
	f.height = 42
	seeder := New(s.URL, s.Client())
	n, err := seeder.BlockCount(context.Background())
	if err != nil {
		t.Fatalf("blockcount: %v", err)
	}
	if n != 42 {
		t.Errorf("count = %d, want 42", n)
	}
}

func TestSeed(t *testing.T) {
	s, f := newFakeServer(t)
	f.height = 0
	seeder := New(s.URL, s.Client())
	seeder.Logger = func(msg string) { t.Log("seeder:", msg) }
	res, err := seeder.Seed(context.Background())
	if err != nil {
		t.Fatalf("seed: %v", err)
	}
	if res.MinedBlocks != DefaultMineCount {
		t.Errorf("mined = %d, want %d", res.MinedBlocks, DefaultMineCount)
	}
	if len(res.Accounts) != DefaultFundedAccounts {
		t.Errorf("funded accounts = %d, want %d", len(res.Accounts), DefaultFundedAccounts)
	}
	// All funded addresses should be distinct.
	seen := map[string]bool{}
	for _, a := range res.Accounts {
		if seen[a.Address] {
			t.Errorf("duplicate address: %s", a.Address)
		}
		seen[a.Address] = true
	}
}
