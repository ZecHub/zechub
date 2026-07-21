package installjob

import (
	"context"
	"errors"
	"sync"
	"testing"
	"time"
)

// drain collects lines from a subscription until Done, then returns them.
func drain(sub Subscription) []string {
	var got []string
	got = append(got, sub.Replay...)
	for {
		select {
		case l := <-sub.Lines:
			got = append(got, l)
		case <-sub.Done:
			// flush any buffered remainder
			for {
				select {
				case l := <-sub.Lines:
					got = append(got, l)
				default:
					return got
				}
			}
		case <-time.After(2 * time.Second):
			return got
		}
	}
}

func TestRunEmitsLinesAndSucceeds(t *testing.T) {
	j := New()
	// Subscribe-after-Start is the contract; a gate lets us attach before the
	// run emits so we exercise the LIVE path, not just replay.
	proceed := make(chan struct{})
	ok := j.Start(func(_ context.Context, emit func(string)) error {
		<-proceed
		emit("step 1")
		emit("step 2")
		emit("step 3")
		return nil
	})
	if !ok {
		t.Fatal("Start returned false on an idle job")
	}
	sub := j.Subscribe()
	defer sub.Cancel()
	close(proceed)

	got := drain(sub)
	if len(got) != 3 || got[0] != "step 1" || got[2] != "step 3" {
		t.Errorf("lines = %v, want 3 ordered steps", got)
	}
	state, lines, errMsg := j.Status()
	if state != StateSucceeded {
		t.Errorf("state = %q, want succeeded", state)
	}
	if errMsg != "" {
		t.Errorf("errMsg = %q, want empty", errMsg)
	}
	if len(lines) != 3 {
		t.Errorf("buffered lines = %d, want 3", len(lines))
	}
}

func TestRunFailureRecordsError(t *testing.T) {
	j := New()
	done := make(chan struct{})
	j.Start(func(_ context.Context, emit func(string)) error {
		emit("trying…")
		close(done)
		return errors.New("boom")
	})
	<-done
	// Give the goroutine a moment to record terminal state.
	deadline := time.After(time.Second)
	for {
		state, _, errMsg := j.Status()
		if state == StateFailed {
			if errMsg != "boom" {
				t.Errorf("errMsg = %q, want boom", errMsg)
			}
			return
		}
		select {
		case <-deadline:
			t.Fatalf("state never became failed (got %q)", state)
		default:
			time.Sleep(time.Millisecond)
		}
	}
}

func TestSingleFlight(t *testing.T) {
	j := New()
	release := make(chan struct{})
	first := j.Start(func(_ context.Context, _ func(string)) error {
		<-release
		return nil
	})
	second := j.Start(func(_ context.Context, _ func(string)) error { return nil })
	if !first || second {
		t.Errorf("expected first=true, second=false; got first=%v second=%v", first, second)
	}
	close(release)
}

func TestLateSubscriberGetsReplay(t *testing.T) {
	j := New()
	ran := make(chan struct{})
	j.Start(func(_ context.Context, emit func(string)) error {
		emit("a")
		emit("b")
		close(ran)
		return nil
	})
	<-ran
	// Subscribe after the run has emitted (and likely finished): replay must
	// still include the buffered lines.
	sub := j.Subscribe()
	defer sub.Cancel()
	got := drain(sub)
	if len(got) < 2 || got[0] != "a" || got[1] != "b" {
		t.Errorf("late subscriber replay = %v, want [a b ...]", got)
	}
}

func TestConcurrentSubscribers(t *testing.T) {
	j := New()
	proceed := make(chan struct{})
	j.Start(func(_ context.Context, emit func(string)) error {
		<-proceed
		for n := 0; n < 10; n++ {
			emit("line")
		}
		return nil
	})

	var wg sync.WaitGroup
	results := make([][]string, 5)
	subs := make([]Subscription, 5)
	for i := range subs {
		subs[i] = j.Subscribe()
	}
	for i := range subs {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			defer subs[i].Cancel()
			results[i] = drain(subs[i])
		}(i)
	}
	close(proceed)
	wg.Wait()
	for i, r := range results {
		if len(r) == 0 {
			t.Errorf("subscriber %d got no lines", i)
		}
	}
}
