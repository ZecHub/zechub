package endpoints

import (
	"testing"

	"github.com/raycreatives/z3-launcher/internal/config"
)

func find(s Surfaced, name string) (Endpoint, bool) {
	for _, e := range s.Endpoints {
		if e.Name == name {
			return e, true
		}
	}
	return Endpoint{}, false
}

func TestBuildURLs(t *testing.T) {
	cfg := config.Default("/data")
	s := Build(cfg, true)

	if !s.Ready {
		t.Errorf("expected ready=true")
	}
	if len(s.Endpoints) != 4 {
		t.Fatalf("got %d endpoints, want 4", len(s.Endpoints))
	}

	cases := map[string]struct {
		url, proto string
	}{
		"Zebra JSON-RPC": {"http://127.0.0.1:18232", "jsonrpc"},
		"Zebra health":   {"http://127.0.0.1:8080/ready", "http"},
		"Zaino gRPC":     {"127.0.0.1:8137", "grpc"},
		"Zaino JSON-RPC": {"http://127.0.0.1:8237", "jsonrpc"},
	}
	for name, want := range cases {
		e, ok := find(s, name)
		if !ok {
			t.Errorf("missing endpoint %q", name)
			continue
		}
		if e.URL != want.url {
			t.Errorf("%s URL = %q, want %q", name, e.URL, want.url)
		}
		if e.Proto != want.proto {
			t.Errorf("%s proto = %q, want %q", name, e.Proto, want.proto)
		}
	}
}

func TestBuildReadyFlag(t *testing.T) {
	s := Build(config.Default("/data"), false)
	if s.Ready {
		t.Errorf("expected ready=false")
	}
}

func TestZainoGRPCHasWalletHint(t *testing.T) {
	s := Build(config.Default("/data"), true)
	e, ok := find(s, "Zaino gRPC")
	if !ok || e.Hint == "" {
		t.Errorf("Zaino gRPC endpoint should carry a wallet hint, got %+v", e)
	}
}
