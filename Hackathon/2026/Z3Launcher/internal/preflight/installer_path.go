package preflight

import "os/exec"

// defaultLookPath is the default lookPath; tests can override pathHas to
// return canned answers.
var defaultLookPath = func(bin string) bool {
	_, err := exec.LookPath(bin)
	return err == nil
}
