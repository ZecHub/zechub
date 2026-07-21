package climax

import (
	"context"
	"testing"
)

func TestInspectNoWallet(t *testing.T) {
	// We don't set ZingoPath and there's no zingo on the test PATH, so the
	// status should report "no wallet found" and a clear message.
	r := &Runner{ZainoGRPC: "127.0.0.1:1"} // bogus port to skip the zaino check
	st := r.Inspect(context.Background())
	if st.WalletFound {
		t.Errorf("WalletFound should be false on a test machine without zingo")
	}
	if st.Ready {
		t.Errorf("Ready should be false when no wallet is found")
	}
	if st.Message == "" {
		t.Errorf("Message should not be empty")
	}
}

func TestInspectZainoUnreachable(t *testing.T) {
	// 1 is reserved and always closed, so the zaino probe should report
	// unreachable regardless of wallet state.
	r2 := &Runner{ZainoGRPC: "127.0.0.1:1"}
	if r2.zainoReachable(context.Background()) {
		t.Errorf("Zaino probe should report unreachable on a closed port")
	}
}

func TestRunNoWallet(t *testing.T) {
	r := &Runner{ZainoGRPC: "127.0.0.1:1"}
	res := r.Run(context.Background())
	if res.Mode != "no-wallet" {
		t.Errorf("Mode = %q, want no-wallet", res.Mode)
	}
	if res.Message == "" {
		t.Errorf("Message should not be empty")
	}
}

func TestLooksLikePositiveBalance(t *testing.T) {
	cases := []struct {
		in   string
		want bool
	}{
		{"{\"balance\": 1.5}", true},
		{"{\"balance\": 0}", false},
		{"balance: 0", false},
		{"balance: 12.345 taddr, 0.0 zaddr", true},
		{"", false},
		{"no funds here", false},
	}
	for _, tc := range cases {
		got := looksLikePositiveBalance([]byte(tc.in))
		if got != tc.want {
			t.Errorf("looksLikePositiveBalance(%q) = %v, want %v", tc.in, got, tc.want)
		}
	}
}

func TestTail(t *testing.T) {
	in := []byte("hello world")
	got := tail(in, 5)
	if got != "world" {
		t.Errorf("tail(in, 5) = %q, want %q", got, "world")
	}
	got = tail(in, 100)
	if got != "hello world" {
		t.Errorf("tail(in, 100) = %q, want %q", got, "hello world")
	}
}

func TestNew(t *testing.T) {
	r := New("127.0.0.1:8137")
	if r.ZainoGRPC != "127.0.0.1:8137" {
		t.Errorf("ZainoGRPC = %q", r.ZainoGRPC)
	}
	if r.Timeout == 0 {
		t.Errorf("Timeout should default to non-zero")
	}
	if r.OutputTailBytes == 0 {
		t.Errorf("OutputTailBytes should default to non-zero")
	}
}
