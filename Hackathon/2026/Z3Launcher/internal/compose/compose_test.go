package compose

import (
	"context"
	"reflect"
	"sync"
	"testing"
)

// rangingRunner ranges the env map the way dockerEnv does, so the race detector
// can observe any unsynchronized read against a concurrent SetEnv write.
type rangingRunner struct{}

func (rangingRunner) Run(_ context.Context, env map[string]string, _ ...string) ([]byte, error) {
	n := 0
	for range env {
		n++
	}
	return nil, nil
}

// TestEnvConcurrentAccessRace pins the critical fix: the Zallet toggle's SetEnv
// must never race a docker invocation reading the env. Run with -race.
func TestEnvConcurrentAccessRace(t *testing.T) {
	c := New("z3", "f.yml", map[string]string{"A": "1"}, rangingRunner{})
	var wg sync.WaitGroup
	for i := 0; i < 6; i++ {
		wg.Add(2)
		go func() {
			defer wg.Done()
			for j := 0; j < 2000; j++ {
				c.SetEnv("COMPOSE_PROFILES", "zallet")
			}
		}()
		go func() {
			defer wg.Done()
			for j := 0; j < 2000; j++ {
				_, _ = c.ContainerStates(context.Background())
			}
		}()
	}
	wg.Wait()
}

// fakeRunner records the arguments and environment it is invoked with.
type fakeRunner struct {
	calls [][]string
	env   map[string]string
	out   []byte
	err   error
}

func (f *fakeRunner) Run(_ context.Context, env map[string]string, args ...string) ([]byte, error) {
	f.calls = append(f.calls, args)
	f.env = env
	return f.out, f.err
}

func (f *fakeRunner) last() []string {
	if len(f.calls) == 0 {
		return nil
	}
	return f.calls[len(f.calls)-1]
}

func newTestCompose(f *fakeRunner) *Compose {
	return New("z3", "deploy/compose/docker-compose.yml", map[string]string{"NETWORK_NAME": "Mainnet"}, f)
}

func assertArgs(t *testing.T, got, want []string) {
	t.Helper()
	if !reflect.DeepEqual(got, want) {
		t.Errorf("args =\n  %v\nwant\n  %v", got, want)
	}
}

func TestUpArgs(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)
	ctx := context.Background()

	if _, err := c.Up(ctx, "zebra"); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "up", "-d", "--remove-orphans", "zebra",
	})

	if _, err := c.Up(ctx); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "up", "-d", "--remove-orphans",
	})
}

func TestRunArgs(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)

	if _, err := c.Run(context.Background(), "zallet-init"); err != nil {
		t.Fatal(err)
	}
	// Foreground one-shot: --rm cleans up, --no-deps isolates it, -T avoids a
	// pseudo-TTY. No -d, so the real exit code propagates.
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml",
		"run", "--rm", "--no-deps", "-T", "zallet-init",
	})
}

func TestDownArgs(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)
	ctx := context.Background()

	if _, err := c.Down(ctx, false); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "down", "--remove-orphans",
	})

	if _, err := c.Down(ctx, true); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "down", "-v", "--remove-orphans",
	})
}

func TestRestartAndStopArgs(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)
	ctx := context.Background()

	if _, err := c.Restart(ctx, "zaino"); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "restart", "zaino",
	})

	if _, err := c.Stop(ctx); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "stop",
	})
}

func TestPSArgs(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)

	if _, err := c.PS(context.Background()); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "ps", "--format", "json",
	})
}

func TestContainerStatesArgs(t *testing.T) {
	f := &fakeRunner{out: []byte("")}
	c := newTestCompose(f)

	if _, err := c.ContainerStates(context.Background()); err != nil {
		t.Fatal(err)
	}
	// Must pass -a so stopped/exited containers are included.
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "ps", "-a", "--format", "json",
	})
}

func TestContainerStatesParsesNDJSON(t *testing.T) {
	out := `{"Service":"zebra","State":"running","Health":""}
{"Service":"zaino","State":"exited","Health":""}`
	f := &fakeRunner{out: []byte(out)}
	c := newTestCompose(f)

	states, err := c.ContainerStates(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if states["zebra"] != "running" || states["zaino"] != "exited" {
		t.Errorf("states = %v, want zebra=running zaino=exited", states)
	}
}

func TestContainerStatesParsesArray(t *testing.T) {
	out := `[{"Service":"zebra","State":"running"},{"Service":"zaino","State":"created"}]`
	f := &fakeRunner{out: []byte(out)}
	c := newTestCompose(f)

	states, err := c.ContainerStates(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if states["zebra"] != "running" || states["zaino"] != "created" {
		t.Errorf("states = %v, want zebra=running zaino=created", states)
	}
}

func TestContainerStatesEmpty(t *testing.T) {
	f := &fakeRunner{out: []byte("")}
	c := newTestCompose(f)

	states, err := c.ContainerStates(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if len(states) != 0 {
		t.Errorf("states = %v, want empty", states)
	}
}

func TestLogsArgs(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)
	ctx := context.Background()

	if _, err := c.Logs(ctx, "zebra", 100); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml",
		"logs", "--no-color", "--tail", "100", "zebra",
	})

	if _, err := c.Logs(ctx, "", 0); err != nil {
		t.Fatal(err)
	}
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml", "logs", "--no-color",
	})
}

func TestEnvForwarded(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)
	if _, err := c.Up(context.Background()); err != nil {
		t.Fatal(err)
	}
	if f.env["NETWORK_NAME"] != "Mainnet" {
		t.Errorf("env not forwarded to runner: got %v", f.env)
	}
}

func TestLogsFollowArgs(t *testing.T) {
	base := []string{"compose", "-p", "z3", "-f", "dc.yml"}

	got := logsFollowArgs(base, "zebra")
	want := []string{"compose", "-p", "z3", "-f", "dc.yml", "logs", "-f", "--no-color", "zebra"}
	assertArgs(t, got, want)

	// The base slice must not be mutated by the append.
	if len(base) != 5 {
		t.Errorf("base slice was mutated: %v", base)
	}

	all := logsFollowArgs(base, "")
	assertArgs(t, all, []string{"compose", "-p", "z3", "-f", "dc.yml", "logs", "-f", "--no-color"})
}

// TestBaseArgsNoAliasing guards against a subtle slice-aliasing bug: two
// sequential calls must not corrupt each other's argument slices.
func TestBaseArgsNoAliasing(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)
	ctx := context.Background()
	_, _ = c.Up(ctx, "zebra")
	_, _ = c.Up(ctx, "zaino")
	if got := f.calls[0]; got[len(got)-1] != "zebra" {
		t.Errorf("first call mutated: %v", got)
	}
	if got := f.calls[1]; got[len(got)-1] != "zaino" {
		t.Errorf("second call wrong: %v", got)
	}
}

func TestDownActivatesAllProfiles(t *testing.T) {
	f := &fakeRunner{}
	c := newTestCompose(f)
	c.AllProfiles = []string{"zallet", "regtest"}
	if _, err := c.Down(context.Background(), true); err != nil {
		t.Fatal(err)
	}
	// --profile flags must precede the `down` subcommand so the teardown removes
	// profile-gated services (zallet) and frees their volumes.
	assertArgs(t, f.last(), []string{
		"compose", "-p", "z3", "-f", "deploy/compose/docker-compose.yml",
		"--profile", "zallet", "--profile", "regtest", "down", "-v", "--remove-orphans",
	})
}
