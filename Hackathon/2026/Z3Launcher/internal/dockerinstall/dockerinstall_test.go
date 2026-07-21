package dockerinstall

import (
	"context"
	"strings"
	"testing"
)

func hasOnly(present ...string) func(string) bool {
	set := map[string]bool{}
	for _, p := range present {
		set[p] = true
	}
	return func(bin string) bool { return set[bin] }
}

func TestDetectDarwinHomebrew(t *testing.T) {
	p := Detect("darwin", hasOnly("brew"))
	if p.Method != "homebrew" || !p.Automatic() {
		t.Fatalf("expected homebrew automatic plan, got %+v", p)
	}
	if !strings.Contains(p.Command, "brew install") || !strings.Contains(p.Command, "colima") {
		t.Errorf("brew plan should install colima (macOS Docker runtime), got %q", p.Command)
	}
	if p.Elevated {
		t.Errorf("brew install should not need elevation")
	}
}

func TestDetectDarwinNoBrew(t *testing.T) {
	p := Detect("darwin", hasOnly())
	if p.Method != "homebrew-bootstrap" || !p.Automatic() {
		t.Fatalf("without brew we should bootstrap brew then install: %+v", p)
	}
	if !strings.Contains(p.Command, "install.sh") || !strings.Contains(p.Command, "colima") {
		t.Errorf("bootstrap command should install Homebrew then colima: %q", p.Command)
	}
	if p.Manual == "" {
		t.Errorf("manual install URL should still be present as a fallback")
	}
}

func TestDetectLinux(t *testing.T) {
	p := Detect("linux", hasOnly())
	if p.Method != "get.docker.com" || !p.Automatic() {
		t.Fatalf("expected get.docker.com plan, got %+v", p)
	}
	if !strings.Contains(p.Command, "get.docker.com") || !strings.Contains(p.Command, "sudo") {
		t.Errorf("linux command should use the convenience script with sudo: %q", p.Command)
	}
	if !p.Elevated {
		t.Errorf("linux install needs elevation")
	}
}

func TestDetectWindowsWinget(t *testing.T) {
	p := Detect("windows", hasOnly("winget"))
	if p.Method != "winget" || !strings.Contains(p.Command, "Docker.DockerDesktop") {
		t.Errorf("expected winget plan, got %+v", p)
	}
}

func TestDetectUnknownOS(t *testing.T) {
	p := Detect("plan9", hasOnly())
	if p.Automatic() {
		t.Errorf("unknown OS should be manual-only")
	}
}

func TestRunManualOnlyErrors(t *testing.T) {
	p := Detect("plan9", hasOnly()) // unknown OS => manual-only
	if err := p.Run(context.Background()); err == nil {
		t.Errorf("expected error running a manual-only plan")
	}
}

func TestRunStreamEmitsLines(t *testing.T) {
	// A harmless command exercises the streaming path without installing.
	p := Plan{OS: "linux", Method: "test", Command: "printf 'line one\\nline two\\n'"}
	var got []string
	if err := p.RunStream(context.Background(), func(l string) { got = append(got, l) }); err != nil {
		t.Fatalf("RunStream: %v", err)
	}
	if len(got) != 2 || got[0] != "line one" || got[1] != "line two" {
		t.Errorf("streamed lines = %v, want [line one, line two]", got)
	}
}

func TestRunStreamReportsFailure(t *testing.T) {
	p := Plan{OS: "linux", Method: "test", Command: "echo before; exit 7"}
	var got []string
	err := p.RunStream(context.Background(), func(l string) { got = append(got, l) })
	if err == nil {
		t.Errorf("expected error from a failing command")
	}
	if len(got) == 0 || got[0] != "before" {
		t.Errorf("expected to stream output before the failure, got %v", got)
	}
}

func TestRunStreamManualOnly(t *testing.T) {
	p := Detect("plan9", hasOnly()) // unknown OS => manual-only
	if err := p.RunStream(context.Background(), func(string) {}); err == nil {
		t.Errorf("manual-only plan should error from RunStream")
	}
}
