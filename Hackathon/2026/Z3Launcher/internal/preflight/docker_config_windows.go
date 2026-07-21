//go:build windows
// +build windows

package preflight

// On Windows the macOS/Linux Docker Desktop "broken credential helper" failure
// mode this diagnostic targets does not apply, and the real implementation in
// docker_config.go is excluded by its !windows build tag. These stubs let
// checkDockerCredentialHelper compile and short-circuit to "healthy" so the
// whole package (and the cross-compiled Windows binary) builds.

func dockerConfigPath() string { return "" }

func readMissingHelper(string) (string, bool) { return "", false }
