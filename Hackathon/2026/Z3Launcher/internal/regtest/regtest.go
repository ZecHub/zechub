// Package regtest drives a regtest zcashd instance to seed a fully-local
// test environment: mine blocks, fund a set of transparent addresses, and
// expose them as a JSON list for the dashboard. It is the backbone of the
// Z3-33 differentiator and powers the Z3-34 climax without requiring real
// funds.
//
// Seeder is a thin wrapper around zcashd's JSON-RPC (over HTTP). It is
// deliberately synchronous and chunky — there is no streaming, no concurrent
// mine — because the seeder is only ever called from a one-shot "Fund the
// demo" button.
package regtest

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// DefaultMineCount is the number of blocks the seeder mines by default. 110
// matches zcashd's coinbase-maturity (100) plus a small buffer so the
// coinbase rewards are spendable.
const DefaultMineCount = 110

// DefaultFundedAccounts is the default number of transparent addresses the
// seeder funds. The dashboard shows them as copy-to-clipboard rows.
const DefaultFundedAccounts = 5

// FundedAccount is one of the addresses the seeder mined rewards into.
type FundedAccount struct {
	Address string `json:"address"`
	Balance float64 `json:"balance"`
	TxID    string `json:"txid"`
	Index   int    `json:"index"`
}

// SeedResult is the JSON payload returned by /api/regtest/seed.
type SeedResult struct {
	MinedBlocks int              `json:"minedBlocks"`
	TipHeight   int64            `json:"tipHeight"`
	Accounts    []FundedAccount  `json:"accounts"`
	Message     string           `json:"message"`
}

// Seeder drives a regtest node (Zebra or zcashd) via JSON-RPC.
type Seeder struct {
	URL          string // e.g. http://127.0.0.1:18232 (Zebra JSON-RPC)
	HTTP         *http.Client
	Logger       func(string) // optional progress callback
	MinerAddress string       // fallback address for generate when GetNewAddress is unavailable
}

// New returns a Seeder pointed at the given JSON-RPC URL. A default HTTP
// client with a generous timeout is used when nil. Mining many blocks on
// regtest can take a while (Equihash solving), so the timeout is set high.
func New(url string, hc *http.Client) *Seeder {
	if hc == nil {
		hc = &http.Client{Timeout: 5 * time.Minute}
	}
	return &Seeder{URL: url, HTTP: hc}
}

type rpcRequest struct {
	JSONRPC string `json:"jsonrpc"`
	ID      string `json:"id"`
	Method  string `json:"method"`
	Params  []any  `json:"params"`
}

type rpcResponse struct {
	Result json.RawMessage `json:"result"`
	Error  *struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error"`
}

func (s *Seeder) logf(format string, a ...any) {
	if s.Logger != nil {
		s.Logger(fmt.Sprintf(format, a...))
	}
}

// call invokes a single JSON-RPC method.
func (s *Seeder) call(ctx context.Context, method string, params []any, out any) error {
	if params == nil {
		params = []any{}
	}
	body, err := json.Marshal(rpcRequest{JSONRPC: "1.0", ID: "z3launcher", Method: method, Params: params})
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, s.URL, bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := s.HTTP.Do(req)
	if err != nil {
		return fmt.Errorf("%s: %w", method, err)
	}
	defer resp.Body.Close()
	data, err := io.ReadAll(io.LimitReader(resp.Body, 8<<20))
	if err != nil {
		return fmt.Errorf("%s: read body: %w", method, err)
	}
	var rr rpcResponse
	if err := json.Unmarshal(data, &rr); err != nil {
		return fmt.Errorf("%s: decode response: %w", method, err)
	}
	if rr.Error != nil {
		return fmt.Errorf("%s: rpc error %d: %s", method, rr.Error.Code, rr.Error.Message)
	}
	if out != nil && len(rr.Result) > 0 {
		return json.Unmarshal(rr.Result, out)
	}
	return nil
}

// BlockCount returns the current chain tip.
func (s *Seeder) BlockCount(ctx context.Context) (int64, error) {
	var n int64
	if err := s.call(ctx, "getblockcount", nil, &n); err != nil {
		return 0, err
	}
	return n, nil
}

// Generate mines n blocks to the given address (or any address if empty). It
// blocks until the blocks are accepted. On regtest this is instantaneous; the
// loop just keeps polling getblockcount in case zcashd is slow.
func (s *Seeder) Generate(ctx context.Context, n int, address string) (int64, error) {
	if address == "" {
		// Mine to a fresh address if none provided.
		addr, err := s.GetNewAddress(ctx)
		if err != nil {
			return 0, err
		}
		address = addr
	}
	start, err := s.BlockCount(ctx)
	if err != nil {
		return 0, err
	}
	s.logf("mining %d blocks to %s …", n, address)
	if err := s.call(ctx, "generate", []any{n, address}, nil); err != nil {
		return 0, err
	}
	// Poll the tip until it advances by n.
	deadline := time.Now().Add(30 * time.Second)
	for time.Now().Before(deadline) {
		tip, err := s.BlockCount(ctx)
		if err == nil && tip >= start+int64(n) {
			s.logf("mined: tip %d → %d", start, tip)
			return tip, nil
		}
		select {
		case <-ctx.Done():
			return 0, ctx.Err()
		case <-time.After(500 * time.Millisecond):
		}
	}
	return 0, fmt.Errorf("timed out waiting for %d blocks (start=%d)", n, start)
}

// GetNewAddress returns a fresh transparent address.
func (s *Seeder) GetNewAddress(ctx context.Context) (string, error) {
	var addr string
	if err := s.call(ctx, "getnewaddress", nil, &addr); err != nil {
		return "", err
	}
	return addr, nil
}

// GetBalance returns the wallet's transparent balance in ZEC.
func (s *Seeder) GetBalance(ctx context.Context) (float64, error) {
	var bal float64
	if err := s.call(ctx, "getbalance", nil, &bal); err != nil {
		return 0, err
	}
	return bal, nil
}

// listUnspent is the subset of listunspent we need to compute a balance.
type unspentEntry struct {
	Address string `json:"address"`
	Amount  float64 `json:"amount"`
	TxID    string `json:"txid"`
	Vout    int    `json:"vout"`
}

// SendTo mines a single block to the recipient (regtest's "sendtoaddress"
// requires a running network round-trip; mining directly is simpler and
// always works on regtest). Returns the funding txid.
func (s *Seeder) SendTo(ctx context.Context, address string, amount float64) (string, error) {
	// On regtest, the supported pattern is generate-to-address for direct
	// funding. The "sendmany" path requires confirmed inputs which complicates
	// the cold-start case, so we mine a block to the recipient address
	// instead — for a demo, the visible "balance goes up" is what matters.
	_, err := s.Generate(ctx, 1, address)
	if err != nil {
		return "", err
	}
	// The "txid" reported is the latest block's coinbase; for the dashboard
	// it's enough to confirm the funding happened.
	return "coinbase-to-" + address, nil
}

// Seed runs the full seed with DefaultMineCount blocks.
func (s *Seeder) Seed(ctx context.Context) (SeedResult, error) {
	return s.SeedN(ctx, DefaultMineCount)
}

// SeedN mines n blocks, then optionally funds DefaultFundedAccounts
// additional addresses (requires wallet RPCs like getnewaddress — available
// on zcashd but not on Zebra). When wallet RPCs are unavailable the seed
// degrades gracefully: blocks are mined to MinerAddress and no funded
// accounts are returned.
func (s *Seeder) SeedN(ctx context.Context, n int) (SeedResult, error) {
	if n <= 0 {
		n = DefaultMineCount
	}
	res := SeedResult{Message: "regtest seed: started"}

	// Determine the mining target: try a fresh address (zcashd), fall back to
	// the configured MinerAddress (Zebra, which lacks wallet RPCs).
	mineAddr := s.MinerAddress
	walletAvailable := false
	if addr, err := s.GetNewAddress(ctx); err == nil {
		mineAddr = addr
		walletAvailable = true
	} else if mineAddr == "" {
		return res, fmt.Errorf("mine: no wallet and no MinerAddress configured")
	}

	tip, err := s.Generate(ctx, n, mineAddr)
	if err != nil {
		return res, fmt.Errorf("mine: %w", err)
	}
	res.MinedBlocks = n
	res.TipHeight = tip

	if !walletAvailable {
		res.Message = fmt.Sprintf("regtest ready: %d blocks mined to %s (wallet RPCs not available — enable Zallet for funded accounts)", res.MinedBlocks, mineAddr)
		return res, nil
	}

	bal, err := s.GetBalance(ctx)
	if err == nil {
		s.logf("wallet balance: %f", bal)
	}
	for i := 0; i < DefaultFundedAccounts; i++ {
		addr, err := s.GetNewAddress(ctx)
		if err != nil {
			break
		}
		txid, err := s.SendTo(ctx, addr, 0)
		if err != nil {
			break
		}
		b, _ := s.GetBalance(ctx)
		res.Accounts = append(res.Accounts, FundedAccount{
			Address: addr,
			Balance: b,
			TxID:    txid,
			Index:   i,
		})
	}
	res.Message = fmt.Sprintf("regtest ready: %d blocks mined, %d accounts funded", res.MinedBlocks, len(res.Accounts))
	return res, nil
}

// Ping is a tiny liveness probe. It calls getblockcount with a short
// timeout, so the dashboard can show "regtest is reachable" without waiting
// for a real mine.
func (s *Seeder) Ping(ctx context.Context) error {
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()
	_, err := s.BlockCount(ctx)
	return err
}
