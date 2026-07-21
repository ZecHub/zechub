package logs

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// Activity is an in-memory, fan-out log of launcher lifecycle events: the
// output of the `docker compose` commands the orchestrator runs (up, down,
// stop, restart) plus human-readable phase markers ("Starting Zebra…").
//
// It exists because container logs (`docker compose logs -f`) only cover what
// happens *after* a container is running. The interesting early output — image
// pulls, container creation, and failures like a bind-mount chown error — all
// happen during `up` and would otherwise never reach the dashboard's activity
// log. The launcher tees that output here so the UI can show real progress
// instead of a silent "command accepted".
//
// A bounded ring buffer lets a freshly-connected client replay recent activity
// (so opening the dashboard after a Start still shows what happened). Slow
// subscribers drop lines rather than stalling the producer.
type Activity struct {
	mu     sync.Mutex
	buf    []string
	maxBuf int
	subs   map[chan string]struct{}
}

// NewActivity returns an Activity that retains up to maxBuf recent lines for
// replay. A non-positive maxBuf defaults to 500.
func NewActivity(maxBuf int) *Activity {
	if maxBuf <= 0 {
		maxBuf = 500
	}
	return &Activity{maxBuf: maxBuf, subs: make(map[chan string]struct{})}
}

// Emit publishes a single line to the buffer and all live subscribers.
func (a *Activity) Emit(line string) {
	a.mu.Lock()
	a.buf = append(a.buf, line)
	if len(a.buf) > a.maxBuf {
		a.buf = a.buf[len(a.buf)-a.maxBuf:]
	}
	for ch := range a.subs {
		select {
		case ch <- line:
		default: // slow subscriber: drop rather than stall the producer
		}
	}
	a.mu.Unlock()
}

// Emitf is a printf-style convenience around Emit.
func (a *Activity) Emitf(format string, args ...any) {
	a.Emit(fmt.Sprintf(format, args...))
}

// EmitStamped prefixes the line with a short HH:MM:SS timestamp so the activity
// log reads like a console transcript.
func (a *Activity) EmitStamped(line string) {
	a.Emit(time.Now().Format("15:04:05") + "  " + line)
}

// Subscribe registers a live subscriber. Replay holds the buffered lines at
// subscription time; Lines streams subsequent lines. Registration and replay
// are atomic with respect to Emit so no line is lost or duplicated across the
// boundary. Call Cancel to unsubscribe.
func (a *Activity) Subscribe() (replay []string, lines <-chan string, cancel func()) {
	a.mu.Lock()
	defer a.mu.Unlock()
	ch := make(chan string, 1024)
	a.subs[ch] = struct{}{}
	replay = append([]string(nil), a.buf...)
	cancel = func() {
		a.mu.Lock()
		delete(a.subs, ch)
		a.mu.Unlock()
	}
	return replay, ch, cancel
}

// Stream pumps the activity feed (replay + live) to emit until ctx is done.
func (a *Activity) Stream(ctx context.Context, emit func(line string)) {
	replay, lines, cancel := a.Subscribe()
	defer cancel()
	for _, l := range replay {
		emit(l)
	}
	for {
		select {
		case <-ctx.Done():
			return
		case l := <-lines:
			emit(l)
		}
	}
}
