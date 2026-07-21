package logs

import (
	"context"
	"strings"
	"sync"
	"testing"
	"time"
)

func TestActivityBuffersAndFansOut(t *testing.T) {
	a := NewActivity(100)
	a.Emit("first")
	a.Emit("second")

	var mu sync.Mutex
	var got []string
	replay, lines, cancel := a.Subscribe()
	defer cancel()
	for _, l := range replay {
		got = append(got, l)
	}
	done := make(chan struct{})
	go func() {
		// Pull a bounded number of lines so the goroutine can exit even
		// though Subscribe's channel isn't closed (it never is — a slow
		// consumer gets dropped, not EOF'd).
		for i := 0; i < 2; i++ {
			select {
			case l := <-lines:
				mu.Lock()
				got = append(got, l)
				mu.Unlock()
			case <-time.After(time.Second):
				t.Errorf("timed out waiting for line %d", i)
				close(done)
				return
			}
		}
		close(done)
	}()

	a.Emit("third")
	a.Emit("fourth")
	<-done

	want := []string{"first", "second", "third", "fourth"}
	mu.Lock()
	defer mu.Unlock()
	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("lines = %v, want %v", got, want)
	}
}

func TestActivityRingBuffer(t *testing.T) {
	a := NewActivity(3)
	for i := 0; i < 5; i++ {
		a.Emitf("line-%d", i)
	}
	replay, _, cancel := a.Subscribe()
	defer cancel()
	want := []string{"line-2", "line-3", "line-4"}
	if strings.Join(replay, ",") != strings.Join(want, ",") {
		t.Errorf("replay = %v, want %v", replay, want)
	}
}

func TestActivityStreamStopsOnCancel(t *testing.T) {
	a := NewActivity(10)
	a.Emit("a")
	a.Emit("b")
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	var got []string
	a.Stream(ctx, func(l string) { got = append(got, l) })
	if len(got) != 2 {
		t.Errorf("replay length = %d, want 2 (lines: %v)", len(got), got)
	}
}

func TestEmitfAndStamped(t *testing.T) {
	a := NewActivity(10)
	a.Emitf("count=%d", 7)
	replay, _, cancel := a.Subscribe()
	defer cancel()
	if len(replay) != 1 || replay[0] != "count=7" {
		t.Errorf("Emitf got %v", replay)
	}
	a.EmitStamped("hello")
	replay, _, _ = a.Subscribe()
	if len(replay) != 2 || !strings.Contains(replay[1], "hello") {
		t.Errorf("EmitStamped got %v", replay)
	}
	// sanity: the stamped line starts with a HH:MM:SS-ish prefix.
	if len(replay[1]) < 10 || replay[1][8:10] != "  " {
		t.Errorf("stamped line missing prefix: %q", replay[1])
	}
}

// guard against an obvious regression: a fast producer must not block when
// subscribers are slow.
func TestActivityDropsForSlowSubscribers(t *testing.T) {
	a := NewActivity(10)
	replay, _, cancel := a.Subscribe()
	_ = replay
	for i := 0; i < 1000; i++ {
		a.Emitf("x-%d", i)
	}
	cancel()
	// no assertion on counts — the contract is "producer doesn't block". A
	// small sleep lets the runtime observe any panic; success is the
	// goroutine returning.
	time.Sleep(10 * time.Millisecond)
}
