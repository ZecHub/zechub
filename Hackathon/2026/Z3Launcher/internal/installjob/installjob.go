// Package installjob runs a single long-lived streaming task (the Docker
// install) and fans its output out to live subscribers. It exists so the
// dashboard can trigger a Docker install and watch progress in real time.
//
// Two properties matter for correctness:
//   - Single-flight: only one install runs at a time; a second Start is a no-op.
//   - Disconnect-safe: the run uses a background context, so a browser closing
//     the SSE stream never aborts an in-flight install (which could otherwise
//     leave Docker half-installed).
package installjob

import (
	"context"
	"sync"
)

// State is the lifecycle state of the job.
type State string

const (
	StateIdle      State = "idle"
	StateRunning   State = "running"
	StateSucceeded State = "succeeded"
	StateFailed    State = "failed"
)

// Job is a single-flight streaming task.
type Job struct {
	mu     sync.Mutex
	state  State
	lines  []string
	errMsg string
	subs   map[chan string]struct{}
	done   chan struct{}
}

// New returns an idle Job.
func New() *Job {
	d := make(chan struct{})
	close(d) // idle: nothing in flight, so "done" is already satisfied
	return &Job{state: StateIdle, subs: make(map[chan string]struct{}), done: d}
}

// Start begins run if no run is in flight; it returns false if one already is.
// run receives a context (background — survives client disconnects) and an emit
// callback to push output lines.
func (j *Job) Start(run func(ctx context.Context, emit func(string)) error) bool {
	j.mu.Lock()
	if j.state == StateRunning {
		j.mu.Unlock()
		return false
	}
	j.state = StateRunning
	j.lines = nil
	j.errMsg = ""
	j.done = make(chan struct{})
	done := j.done
	j.mu.Unlock()

	go func() {
		err := run(context.Background(), j.emit)
		j.mu.Lock()
		if err != nil {
			j.state = StateFailed
			j.errMsg = err.Error()
		} else {
			j.state = StateSucceeded
		}
		close(done)
		j.mu.Unlock()
	}()
	return true
}

func (j *Job) emit(line string) {
	j.mu.Lock()
	j.lines = append(j.lines, line)
	for ch := range j.subs {
		select {
		case ch <- line:
		default: // slow subscriber: drop a line rather than stall the install
		}
	}
	j.mu.Unlock()
}

// Subscription is a live view of the job.
type Subscription struct {
	Replay []string      // lines buffered before this subscription
	Lines  <-chan string // subsequent lines
	Done   <-chan struct{}
	Cancel func()
}

// Subscribe registers a live subscriber. The replay and registration are
// atomic with respect to emit, so no line is lost or duplicated across the
// replay/live boundary.
func (j *Job) Subscribe() Subscription {
	j.mu.Lock()
	defer j.mu.Unlock()
	ch := make(chan string, 1024)
	j.subs[ch] = struct{}{}
	replay := append([]string(nil), j.lines...)
	cancel := func() {
		j.mu.Lock()
		delete(j.subs, ch)
		j.mu.Unlock()
	}
	return Subscription{Replay: replay, Lines: ch, Done: j.done, Cancel: cancel}
}

// Status returns the current state, a copy of the buffered lines, and the error
// message (empty unless failed).
func (j *Job) Status() (State, []string, string) {
	j.mu.Lock()
	defer j.mu.Unlock()
	return j.state, append([]string(nil), j.lines...), j.errMsg
}
