//go:build !windows
// +build !windows

package preflight

import (
	"os"
	"path/filepath"
	"testing"
)

func TestResolveDockerHost_ExplicitEnvWins(t *testing.T) {
	t.Setenv("DOCKER_HOST", "unix:///tmp/custom.sock")
	host, _ := resolveDockerHost("darwin") // goos should be ignored when env is set
	if host != "unix:///tmp/custom.sock" {
		t.Errorf("explicit DOCKER_HOST should win, got %q", host)
	}
}

func TestResolveDockerHost_FindsColimaOnDarwin(t *testing.T) {
	t.Setenv("DOCKER_HOST", "")

	dir := t.TempDir()
	home := filepath.Join(dir, "home")
	sock := filepath.Join(home, ".colima", "default", "docker.sock")
	if err := os.MkdirAll(filepath.Dir(sock), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(sock, []byte{}, 0o644); err != nil {
		t.Fatal(err)
	}
	t.Setenv("HOME", home)

	host, got := resolveDockerHost("darwin")
	if host != "unix://"+sock {
		t.Errorf("expected host to point at the Colima socket, got %q", host)
	}
	if got != sock {
		t.Errorf("expected socket path %q, got %q", sock, got)
	}
}

func TestResolveDockerHost_NoEnvNoColima(t *testing.T) {
	t.Setenv("DOCKER_HOST", "")
	dir := t.TempDir()
	t.Setenv("HOME", dir) // no .colima under here

	host, _ := resolveDockerHost("darwin")
	if host != "" {
		t.Errorf("expected empty host when no override and no Colima socket, got %q", host)
	}
}

func TestResolveDockerHost_LinuxNoOverride(t *testing.T) {
	t.Setenv("DOCKER_HOST", "")
	// On Linux (and any non-darwin), no Colima probe — we leave the
	// platform default socket (e.g. /var/run/docker.sock) alone.
	host, _ := resolveDockerHost("linux")
	if host != "" {
		t.Errorf("expected empty host on linux, got %q", host)
	}
}
