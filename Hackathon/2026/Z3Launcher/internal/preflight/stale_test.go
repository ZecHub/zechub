package preflight

import "testing"

func TestStaleStackCheck_None(t *testing.T) {
	if _, ok := StaleStackCheck(nil, nil); ok {
		t.Fatal("expected ok=false for no containers")
	}
	if _, ok := StaleStackCheck([]ExistingContainer{}, nil); ok {
		t.Fatal("expected ok=false for empty slice")
	}
}

func TestStaleStackCheck_ReportsAbnormalButAdoptsRunning(t *testing.T) {
	chk, ok := StaleStackCheck([]ExistingContainer{
		{Service: "zaino", State: "created", Image: "zingodevops/zainod:0.4.1"},
		{Service: "zebra", State: "running", Image: "zfnd/zebra:5.2.0"},
	}, map[string]string{"zebra": "zfnd/zebra:5.2.0", "zaino": "zingodevops/zainod:0.4.1"})
	if !ok {
		t.Fatal("expected ok=true (zaino is stuck in created)")
	}
	if chk.Name != "stale-stack" || chk.Status != Warn {
		t.Fatalf("unexpected check: %+v", chk)
	}
	// zaino (created) is flagged; zebra (running on the pinned image) is adopted.
	if !contains(chk.Message, "zaino (created)") {
		t.Fatalf("message should flag zaino: %s", chk.Message)
	}
	if contains(chk.Message, "zebra (running)") {
		t.Fatalf("running-on-pinned zebra should not be flagged: %s", chk.Message)
	}
}

func TestStaleStackCheck_CleanRunningStackNotStale(t *testing.T) {
	_, ok := StaleStackCheck([]ExistingContainer{
		{Service: "zebra", State: "running", Image: "zfnd/zebra:5.2.0"},
		{Service: "zaino", State: "running", Image: "zingodevops/zainod:0.4.1"},
		{Service: "mine-genesis", State: "exited", Image: "curlimages/curl:8.13.0"},
	}, map[string]string{"zebra": "zfnd/zebra:5.2.0", "zaino": "zingodevops/zainod:0.4.1"})
	if ok {
		t.Fatal("a clean running stack with a normally-exited one-shot is not stale")
	}
}

func TestStaleStackCheck_FlagsImageDrift(t *testing.T) {
	chk, ok := StaleStackCheck([]ExistingContainer{
		{Service: "zebra", State: "running", Image: "zfnd/zebra:5.0.0"},
	}, map[string]string{"zebra": "zfnd/zebra:5.2.0"})
	if !ok {
		t.Fatal("expected ok=true")
	}
	if !contains(chk.Message, "zebra is on zfnd/zebra:5.0.0, pinned is zfnd/zebra:5.2.0") {
		t.Fatalf("drift not reported: %s", chk.Message)
	}
}

func contains(s, sub string) bool {
	return len(s) >= len(sub) && (s == sub || indexOf(s, sub) >= 0)
}

func indexOf(s, sub string) int {
	for i := 0; i+len(sub) <= len(s); i++ {
		if s[i:i+len(sub)] == sub {
			return i
		}
	}
	return -1
}
