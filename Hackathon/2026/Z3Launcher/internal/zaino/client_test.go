package zaino

import (
	"context"
	"net"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthyViaJSONRPCResult(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write([]byte(`{"result":{"version":1},"error":null,"id":"x"}`))
	}))
	defer srv.Close()

	ok, err := New(srv.URL, "").Healthy(context.Background())
	if err != nil || !ok {
		t.Errorf("Healthy = (%v, %v), want (true, nil)", ok, err)
	}
}

func TestHealthyViaJSONRPCError(t *testing.T) {
	// An error response still proves Zaino is serving.
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write([]byte(`{"result":null,"error":{"code":-1,"message":"nope"},"id":"x"}`))
	}))
	defer srv.Close()

	ok, _ := New(srv.URL, "").Healthy(context.Background())
	if !ok {
		t.Errorf("expected healthy via JSON-RPC error response")
	}
}

func TestHealthyViaTCPFallback(t *testing.T) {
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	defer ln.Close()

	// No JSON-RPC endpoint; the open gRPC port should satisfy the TCP fallback.
	ok, _ := New("", ln.Addr().String()).Healthy(context.Background())
	if !ok {
		t.Errorf("expected healthy via TCP dial of open port")
	}
}

func TestUnhealthyWhenNothingListening(t *testing.T) {
	// Grab a port then close it so the dial is refused deterministically.
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	addr := ln.Addr().String()
	ln.Close()

	ok, _ := New("", addr).Healthy(context.Background())
	if ok {
		t.Errorf("expected unhealthy when nothing is listening")
	}
}

func TestHealthyJSONRPCMalformedIsNotHealthy(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write([]byte(`not json`))
	}))
	defer srv.Close()

	ok, _ := New(srv.URL, "").Healthy(context.Background())
	if ok {
		t.Errorf("malformed response should not be considered healthy")
	}
}
