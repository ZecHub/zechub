// Package endpoints surfaces the connection URLs a developer points a wallet or
// app at (plan ticket Z3-13) — the developer payoff. URLs are always returned;
// the Ready flag tells the UI when they're actually usable.
package endpoints

import (
	"fmt"

	"github.com/raycreatives/z3-launcher/internal/config"
)

// Endpoint is a single connection target.
type Endpoint struct {
	Name  string `json:"name"`
	URL   string `json:"url"`
	Proto string `json:"proto"` // jsonrpc, grpc, or http
	Hint  string `json:"hint,omitempty"`
}

// Surfaced is the endpoint-surfacing API payload.
type Surfaced struct {
	Ready     bool       `json:"ready"`
	Endpoints []Endpoint `json:"endpoints"`
}

// Build returns the surfaced endpoints for the given config. ready reflects
// whether the stack is synced and the endpoints are usable.
func Build(cfg config.Config, ready bool) Surfaced {
	host := "127.0.0.1"
	return Surfaced{
		Ready: ready,
		Endpoints: []Endpoint{
			{
				Name:  "Zebra JSON-RPC",
				URL:   fmt.Sprintf("http://%s:%d", host, cfg.Ports.ZebraRPC),
				Proto: "jsonrpc",
			},
			{
				Name:  "Zebra health",
				URL:   fmt.Sprintf("http://%s:%d/ready", host, cfg.Ports.ZebraHealth),
				Proto: "http",
			},
			{
				Name:  "Zaino gRPC",
				URL:   fmt.Sprintf("%s:%d", host, cfg.Ports.ZainoGRPC),
				Proto: "grpc",
				Hint:  "point a lightwalletd-compatible wallet (e.g. Zingo) here",
			},
			{
				Name:  "Zaino JSON-RPC",
				URL:   fmt.Sprintf("http://%s:%d", host, cfg.Ports.ZainoJSONRPC),
				Proto: "jsonrpc",
			},
		},
	}
}
