package preflight

import (
	"fmt"
	"sort"
	"strings"
)

// ExistingContainer describes a project container found before the launcher has
// started the stack this session — i.e. a leftover from a previous run. It is a
// plain value (not the compose package's type) so this package stays free of a
// compose import, which would form a cycle.
type ExistingContainer struct {
	Service string
	Name    string
	State   string
	Image   string
}

// oneShotServices are the regtest/init helper containers that run once and exit
// 0 by design. A normal exited one-shot is NOT a stale stack, so it must not
// trip the warning on every regtest preflight.
var oneShotServices = map[string]bool{
	"mine-genesis":    true,
	"zallet-init":     true,
	"zallet-mnemonic": true,
}

// StaleStackCheck flags genuinely-problematic leftover containers from a
// previous run — image drift, or a long-lived service stuck in an abnormal state
// (created/exited/dead/restarting/paused) — so the dashboard can offer Reset. A
// clean stack running on the pinned images is being adopted, not "stale", and a
// normally-exited one-shot is ignored; both return ok=false. pinned maps a
// compose service name to its pinned image (services absent are not drift-checked).
func StaleStackCheck(containers []ExistingContainer, pinned map[string]string) (Check, bool) {
	if len(containers) == 0 {
		return Check{}, false
	}
	sort.Slice(containers, func(i, j int) bool { return containers[i].Service < containers[j].Service })

	var problems []string
	var drift []string
	for _, c := range containers {
		label := c.Service
		if label == "" {
			label = c.Name
		}
		// Image drift on a tracked, long-lived service is always worth flagging.
		if want, ok := pinned[c.Service]; ok && want != "" && c.Image != "" && c.Image != want {
			drift = append(drift, fmt.Sprintf("%s is on %s, pinned is %s", c.Service, c.Image, want))
			problems = append(problems, fmt.Sprintf("%s (%s)", label, c.State))
			continue
		}
		// A normally-exited one-shot is expected, not stale.
		if oneShotServices[c.Service] && c.State == "exited" {
			continue
		}
		// A service running on its pinned image is a healthy adopted stack.
		if c.State == "running" {
			continue
		}
		// Anything else (created / exited long-lived / dead / restarting / paused)
		// is a half-broken leftover.
		problems = append(problems, fmt.Sprintf("%s (%s)", label, c.State))
	}

	if len(problems) == 0 {
		return Check{}, false
	}
	msg := fmt.Sprintf("Found %d container(s) from a previous run that look stale: %s.", len(problems), strings.Join(problems, ", "))
	if len(drift) > 0 {
		msg += " Outdated image(s): " + strings.Join(drift, "; ") + "."
	}
	return Check{
		Name:    "stale-stack",
		Status:  Warn,
		Message: msg,
		Hint:    "Click \"Clear stale containers\" (or POST /api/clear) to remove them while keeping your synced chain and wallet data; otherwise Start may reuse them. Do NOT use Reset for this — Reset (POST /api/reset) also deletes chain state and the wallet, and is only for starting over from scratch.",
	}, true
}
