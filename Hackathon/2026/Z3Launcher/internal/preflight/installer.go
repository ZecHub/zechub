package preflight

import (
	"context"
	"fmt"
	"runtime"

	"github.com/raycreatives/z3-launcher/internal/dockerinstall"
)

// InstallResult is the response from a consent-gated Docker install attempt.
type InstallResult struct {
	Started   bool   `json:"started"`
	Platform  string `json:"platform"`
	Method    string `json:"method"`
	Command   string `json:"command,omitempty"`
	Manual    string `json:"manual,omitempty"`
	Elevated  bool   `json:"elevated"`
	Automatic bool   `json:"automatic"`
	Note      string `json:"note,omitempty"`
	Message   string `json:"message"`
}

// Installer wraps dockerinstall.Plan with the consent gate described in plan
// §11.2. It refuses to run on macOS/Windows (Docker Desktop cannot be
// installed-and-started headlessly) and requires an explicit Confirm before
// running the install on Linux.
type Installer struct {
	Plan    dockerinstall.Plan
	Confirm func(p dockerinstall.Plan) bool // returns true if user opts in
	Run     func(ctx context.Context, p dockerinstall.Plan) error
	GOOS    string // for tests
}

// NewInstaller builds an Installer with the standard consent gate. The Confirm
// hook is the one place that prints the command and waits for a y/N. The Run
// hook defaults to dockerinstall.Plan.Run.
func NewInstaller() *Installer {
	return &Installer{
		GOOS: runtime.GOOS,
		Run:  func(ctx context.Context, p dockerinstall.Plan) error { return p.Run(ctx) },
	}
}

// Inspect returns the install plan for the current platform without running
// it. The dashboard's "Install Docker for me" button calls this to surface the
// command it would run before showing a confirmation.
func (i *Installer) Inspect() InstallResult {
	plan := i.plan()
	return InstallResult{
		Started:   false,
		Platform:  plan.OS,
		Method:    plan.Method,
		Command:   plan.Command,
		Manual:    plan.Manual,
		Elevated:  plan.Elevated,
		Automatic: plan.Automatic(),
		Note:      plan.Note,
		Message:   describe(plan),
	}
}

// Apply runs the consent-gated install. It returns the InstallResult and any
// error from the underlying install. The caller is responsible for ensuring
// the user has actually opted in (typically by populating Confirm).
func (i *Installer) Apply(ctx context.Context) (InstallResult, error) {
	plan := i.plan()
	res := InstallResult{
		Platform:  plan.OS,
		Method:    plan.Method,
		Command:   plan.Command,
		Manual:    plan.Manual,
		Elevated:  plan.Elevated,
		Automatic: plan.Automatic(),
		Note:      plan.Note,
	}
	if !plan.Automatic() {
		res.Message = "no automatic installer is available for this platform; install manually"
		return res, fmt.Errorf("no automatic installer for %s; see %s", plan.OS, plan.Manual)
	}
	if i.Confirm != nil && !i.Confirm(plan) {
		res.Message = "install declined by user"
		return res, nil
	}
	res.Started = true
	if err := i.Run(ctx, plan); err != nil {
		res.Message = "install failed: " + err.Error()
		return res, err
	}
	res.Message = "install completed; re-run preflight to verify"
	return res, nil
}

func (i *Installer) plan() dockerinstall.Plan {
	if i.Plan.OS != "" {
		return i.Plan
	}
	return dockerinstall.Detect(i.GOOS, func(bin string) bool {
		return pathHas(bin)
	})
}

func describe(p dockerinstall.Plan) string {
	if !p.Automatic() {
		return "manual install required; see " + p.Manual
	}
	if p.Note != "" {
		return "ready to run: " + p.Command + " — " + p.Note
	}
	return "ready to run: " + p.Command
}

// pathHas is a tiny wrapper around exec.LookPath so the Installer is testable
// without touching the real PATH. Indirected so tests can swap it.
var pathHas = func(bin string) bool { return lookPath(bin) }

func lookPath(bin string) bool {
	// Implemented in installer_path.go to keep this file's imports narrow.
	return defaultLookPath(bin)
}
