package server

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"time"
)

type fakeCtrl struct {
	mu     sync.Mutex
	calls  []string
	failOn string
}

func (c *fakeCtrl) record(name string) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.calls = append(c.calls, name)
	if c.failOn == name {
		return errors.New("boom")
	}
	return nil
}
func (c *fakeCtrl) Start(context.Context) error   { return c.record("start") }
func (c *fakeCtrl) Stop(context.Context) error    { return c.record("stop") }
func (c *fakeCtrl) Restart(context.Context) error { return c.record("restart") }
func (c *fakeCtrl) Reset(context.Context) error   { return c.record("reset") }
func (c *fakeCtrl) Clear(context.Context) error   { return c.record("clear") }

type fakeLogs struct {
	data string
	err  error
}

func (f fakeLogs) Tail(context.Context, string) (io.ReadCloser, error) {
	if f.err != nil {
		return nil, f.err
	}
	return io.NopCloser(strings.NewReader(f.data)), nil
}

func okStatus() StatusFunc {
	return func(context.Context) (any, error) {
		return map[string]any{
			"network": "mainnet", "ready": true, "syncPct": 99.9, "height": 2_500_000,
		}, nil
	}
}

func TestHandleStatusOK(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/status", nil))

	if rec.Code != http.StatusOK {
		t.Fatalf("status code = %d, want 200", rec.Code)
	}
	var m map[string]any
	if err := json.Unmarshal(rec.Body.Bytes(), &m); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if m["network"] != "mainnet" || m["syncPct"] != 99.9 {
		t.Errorf("unexpected status: %v", m)
	}
}

func TestHandleStatusError(t *testing.T) {
	bad := StatusFunc(func(context.Context) (any, error) { return nil, errors.New("zebra unreachable") })
	srv := New(bad, &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/status", nil))
	if rec.Code != http.StatusServiceUnavailable {
		t.Errorf("status code = %d, want 503", rec.Code)
	}
}

// postReq builds a same-origin POST that satisfies the loopback CSRF guard.
func postReq(target string) *http.Request {
	r := httptest.NewRequest(http.MethodPost, target, nil)
	r.Host = "127.0.0.1"
	return r
}

// postReqJSON is postReq with a JSON body (e.g. the reset confirmation token).
func postReqJSON(target, body string) *http.Request {
	r := httptest.NewRequest(http.MethodPost, target, strings.NewReader(body))
	r.Host = "127.0.0.1"
	r.Header.Set("Content-Type", "application/json")
	return r
}

// TestGuardBlocksCrossOriginMutations verifies the CSRF / DNS-rebinding guard:
// a destructive POST from a non-loopback Host or cross-site Origin is refused,
// while a same-origin loopback POST is allowed through.
func TestGuardBlocksCrossOriginMutations(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)

	// Non-loopback Host (DNS-rebinding) → 403.
	rec := httptest.NewRecorder()
	bad := httptest.NewRequest(http.MethodPost, "/api/reset", nil)
	bad.Host = "evil.example.com"
	srv.Handler().ServeHTTP(rec, bad)
	if rec.Code != http.StatusForbidden {
		t.Errorf("non-loopback Host: code = %d, want 403", rec.Code)
	}

	// Loopback Host but cross-site Origin → 403.
	rec = httptest.NewRecorder()
	xorigin := postReq("/api/reset")
	xorigin.Header.Set("Origin", "http://evil.example.com")
	srv.Handler().ServeHTTP(rec, xorigin)
	if rec.Code != http.StatusForbidden {
		t.Errorf("cross-origin: code = %d, want 403", rec.Code)
	}

	// Same-origin loopback with the reset confirmation → allowed (202).
	rec = httptest.NewRecorder()
	ok := postReqJSON("/api/reset", `{"confirm":"RESET"}`)
	ok.Header.Set("Origin", "http://127.0.0.1:8088")
	ok.Header.Set("Sec-Fetch-Site", "same-origin")
	srv.Handler().ServeHTTP(rec, ok)
	if rec.Code != http.StatusAccepted {
		t.Errorf("same-origin: code = %d, want 202", rec.Code)
	}

	// GET is never guarded.
	rec = httptest.NewRecorder()
	get := httptest.NewRequest(http.MethodGet, "/api/status", nil)
	get.Host = "evil.example.com"
	srv.Handler().ServeHTTP(rec, get)
	if rec.Code != http.StatusOK {
		t.Errorf("GET status: code = %d, want 200", rec.Code)
	}
}

func TestLifecycleActions(t *testing.T) {
	ctrl := &fakeCtrl{}
	srv := New(okStatus(), ctrl, fakeLogs{}, nil, time.Second)

	for _, path := range []string{"/api/start", "/api/stop", "/api/restart", "/api/clear", "/api/reset"} {
		rec := httptest.NewRecorder()
		req := postReq(path)
		if path == "/api/reset" {
			req = postReqJSON(path, `{"confirm":"RESET"}`) // reset requires confirmation
		}
		srv.Handler().ServeHTTP(rec, req)
		if rec.Code != http.StatusAccepted {
			t.Errorf("%s: code = %d, want 202", path, rec.Code)
		}
	}
	want := []string{"start", "stop", "restart", "clear", "reset"}
	if strings.Join(ctrl.calls, ",") != strings.Join(want, ",") {
		t.Errorf("controller calls = %v, want %v", ctrl.calls, want)
	}
}

func TestLifecycleActionError(t *testing.T) {
	ctrl := &fakeCtrl{failOn: "reset"}
	srv := New(okStatus(), ctrl, fakeLogs{}, nil, time.Second)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, postReqJSON("/api/reset", `{"confirm":"RESET"}`))
	if rec.Code != http.StatusInternalServerError {
		t.Errorf("code = %d, want 500", rec.Code)
	}
}

func TestStreamSendsInitialEvent(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)

	// Cancel before serving: the handler writes the initial event, then the
	// loop sees ctx.Done and returns — no goroutine/sleep needed.
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	req := httptest.NewRequest(http.MethodGet, "/api/stream", nil).WithContext(ctx)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, req)

	if ct := rec.Header().Get("Content-Type"); ct != "text/event-stream" {
		t.Errorf("Content-Type = %q, want text/event-stream", ct)
	}
	body := rec.Body.String()
	if !strings.Contains(body, "event: status") {
		t.Errorf("stream body missing status event: %q", body)
	}
	if !strings.Contains(body, `"network":"mainnet"`) {
		t.Errorf("stream body missing payload: %q", body)
	}
}

func TestHandleLogsStreamsLines(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{data: "line one\nline two\n"}, nil, time.Second)
	req := httptest.NewRequest(http.MethodGet, "/api/logs?service=zebra", nil)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, req) // reader EOFs, so this returns

	if ct := rec.Header().Get("Content-Type"); ct != "text/event-stream" {
		t.Errorf("Content-Type = %q, want text/event-stream", ct)
	}
	body := rec.Body.String()
	for _, want := range []string{"event: log", "line one", "line two", `"service":"zebra"`} {
		if !strings.Contains(body, want) {
			t.Errorf("log stream missing %q in:\n%s", want, body)
		}
	}
}

func TestHandleLogsError(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{err: errors.New("no such service")}, nil, time.Second)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/logs?service=nope", nil))
	if rec.Code != http.StatusServiceUnavailable {
		t.Errorf("code = %d, want 503", rec.Code)
	}
}

func TestInspectDisabledByDefault(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/faststart/inspect?path=/x", nil))
	if rec.Code != http.StatusServiceUnavailable {
		t.Errorf("code = %d, want 503 when no inspector set", rec.Code)
	}
}

func TestInspectRequiresPath(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	srv.SetInspector(InspectFunc(func(context.Context, string) (any, error) {
		return map[string]string{"ok": "yes"}, nil
	}))
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/faststart/inspect", nil))
	if rec.Code != http.StatusBadRequest {
		t.Errorf("code = %d, want 400 for missing path", rec.Code)
	}
}

func TestInspectReturnsResult(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	srv.SetInspector(InspectFunc(func(_ context.Context, path string) (any, error) {
		return map[string]any{"cacheRoot": path, "majorVersion": 25, "usable": true}, nil
	}))
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/faststart/inspect?path=/snap", nil))
	if rec.Code != http.StatusOK {
		t.Fatalf("code = %d, want 200", rec.Code)
	}
	if !strings.Contains(rec.Body.String(), `"cacheRoot":"/snap"`) {
		t.Errorf("unexpected body: %s", rec.Body.String())
	}
}

func TestInspectError(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	srv.SetInspector(InspectFunc(func(context.Context, string) (any, error) {
		return nil, errors.New("no state found")
	}))
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/faststart/inspect?path=/empty", nil))
	if rec.Code != http.StatusUnprocessableEntity {
		t.Errorf("code = %d, want 422", rec.Code)
	}
}

func TestHealthz(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/healthz", nil))
	if rec.Code != http.StatusOK || rec.Body.String() != "ok" {
		t.Errorf("healthz = %d %q", rec.Code, rec.Body.String())
	}
}

func TestInstallStreamEndToEnd(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	srv.SetInstallRunner(func(_ context.Context, emit func(string)) error {
		emit("detecting platform")
		emit("installing docker")
		return nil
	})

	// Start the install (POST = consent).
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, postReq("/api/install-docker"))
	if rec.Code != http.StatusAccepted {
		t.Fatalf("start code = %d, want 202; body=%s", rec.Code, rec.Body.String())
	}

	// Watch the stream — replays + live + terminal done event. The runner is
	// finite, so the handler terminates on Done without hanging.
	rec2 := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec2, httptest.NewRequest(http.MethodGet, "/api/install-docker/stream", nil))
	body := rec2.Body.String()
	for _, want := range []string{"event: log", "installing docker", "event: done", `"state":"succeeded"`} {
		if !strings.Contains(body, want) {
			t.Errorf("install stream missing %q in:\n%s", want, body)
		}
	}
}

func TestInstallFailureSurfacedInStream(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	srv.SetInstallRunner(func(_ context.Context, emit func(string)) error {
		emit("trying")
		return errors.New("install blew up")
	})
	srv.Handler().ServeHTTP(httptest.NewRecorder(), postReq("/api/install-docker"))

	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/api/install-docker/stream", nil))
	body := rec.Body.String()
	if !strings.Contains(body, `"state":"failed"`) || !strings.Contains(body, "install blew up") {
		t.Errorf("expected failure surfaced in stream:\n%s", body)
	}
}

func TestInstallUnavailableWithoutRunner(t *testing.T) {
	srv := New(okStatus(), &fakeCtrl{}, fakeLogs{}, nil, time.Second)
	for _, tc := range []struct{ method, path string }{
		{http.MethodPost, "/api/install-docker"},
		{http.MethodGet, "/api/install-docker/stream"},
	} {
		rec := httptest.NewRecorder()
		req := httptest.NewRequest(tc.method, tc.path, nil)
		req.Host = "127.0.0.1"
		srv.Handler().ServeHTTP(rec, req)
		if rec.Code != http.StatusServiceUnavailable {
			t.Errorf("%s %s code = %d, want 503", tc.method, tc.path, rec.Code)
		}
	}
}

// TestResetRequiresConfirmation: the destructive reset must be refused without
// the typed confirmation, and must not call the controller.
func TestResetRequiresConfirmation(t *testing.T) {
	ctrl := &fakeCtrl{}
	srv := New(okStatus(), ctrl, fakeLogs{}, nil, time.Second)

	// No body → 400, controller untouched.
	rec := httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, postReq("/api/reset"))
	if rec.Code != http.StatusBadRequest {
		t.Errorf("unconfirmed reset: code = %d, want 400", rec.Code)
	}
	// Wrong token → 400.
	rec = httptest.NewRecorder()
	srv.Handler().ServeHTTP(rec, postReqJSON("/api/reset", `{"confirm":"nope"}`))
	if rec.Code != http.StatusBadRequest {
		t.Errorf("wrong token: code = %d, want 400", rec.Code)
	}
	for _, c := range ctrl.calls {
		if c == "reset" {
			t.Fatal("controller.Reset must not run without confirmation")
		}
	}
}
