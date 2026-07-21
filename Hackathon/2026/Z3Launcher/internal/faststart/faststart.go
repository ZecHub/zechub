// Package faststart implements the launcher's headline feature (differentiator
// #1): attaching an existing, pre-synced Zebra state directory so the stack is
// "ready in minutes" instead of a 1–3-day cold sync.
//
// Zebra stores chain state on disk at:
//
//	<cache_dir>/state/v<MAJOR>/<network>/
//
// where the major DB-format version is the directory component (e.g. "v25") and
// a "version" file inside the leaf holds the minor.patch (e.g. "0.0"). A major
// mismatch between the snapshot and the running Zebra forces a full resync, so
// fast-start validates the major version before attaching. The snapshot is
// mounted directly (no multi-GB copy): we point Zebra's cache mount at the
// discovered cache root.
package faststart

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// StateInfo describes a discovered Zebra state cache.
type StateInfo struct {
	Source       string `json:"source"`       // the path the user pointed at
	CacheRoot    string `json:"cacheRoot"`    // dir to mount as /home/zebra/.cache/zebra
	StatePath    string `json:"statePath"`    // .../state/v<N>/<network>
	MajorVersion int    `json:"majorVersion"` // DB format major version
	MinorPatch   string `json:"minorPatch,omitempty"`
	Network      string `json:"network"`
}

// FullVersion renders the on-disk format version, e.g. "v25.0.0".
func (s StateInfo) FullVersion() string {
	if s.MinorPatch == "" {
		return fmt.Sprintf("v%d", s.MajorVersion)
	}
	return fmt.Sprintf("v%d.%s", s.MajorVersion, s.MinorPatch)
}

// NotFoundError indicates no Zebra state for the network was found under source.
type NotFoundError struct {
	Source  string
	Network string
}

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("no Zebra %s state found under %s (expected a state/v<N>/%s directory)",
		e.Network, e.Source, e.Network)
}

// parseMajor extracts N from a "vN" directory name.
func parseMajor(name string) (int, bool) {
	if len(name) < 2 || name[0] != 'v' {
		return 0, false
	}
	n, err := strconv.Atoi(name[1:])
	if err != nil || n <= 0 {
		return 0, false
	}
	return n, true
}

func isDir(p string) bool {
	fi, err := os.Stat(p)
	return err == nil && fi.IsDir()
}

// hasRocksDBState reports whether leaf actually contains a Zebra/RocksDB state
// database, not just an empty or half-copied directory. RocksDB always writes a
// CURRENT pointer file plus at least one MANIFEST-NNNNNN; requiring both stops an
// empty/partial rsync from validating as "ready to attach" (which would silently
// trigger a multi-day cold sync after claiming success).
func hasRocksDBState(leaf string) bool {
	if fi, err := os.Stat(filepath.Join(leaf, "CURRENT")); err != nil || fi.IsDir() {
		return false
	}
	entries, err := os.ReadDir(leaf)
	if err != nil {
		return false
	}
	for _, e := range entries {
		if !e.IsDir() && strings.HasPrefix(e.Name(), "MANIFEST-") {
			return true
		}
	}
	return false
}

// scanStateDir looks for stateDir/v<N>/<network> and returns the leaf path and
// the highest major version found.
func scanStateDir(stateDir, network string) (leaf string, major int, ok bool) {
	entries, err := os.ReadDir(stateDir)
	if err != nil {
		return "", 0, false
	}
	best := -1
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		m, isVersion := parseMajor(e.Name())
		if !isVersion {
			continue
		}
		candidate := filepath.Join(stateDir, e.Name(), network)
		if isDir(candidate) && hasRocksDBState(candidate) && m > best {
			best = m
			leaf = candidate
		}
	}
	if best < 0 {
		return "", 0, false
	}
	return leaf, best, true
}

// Inspect locates a Zebra state cache for the given network within source.
// source may be the cache root (which contains a state/ directory) or the
// state/ directory itself.
func Inspect(source, network string) (StateInfo, error) {
	if network == "" {
		return StateInfo{}, errors.New("network must be specified")
	}
	source = filepath.Clean(source)
	for _, stateDir := range []string{filepath.Join(source, "state"), source} {
		leaf, major, ok := scanStateDir(stateDir, network)
		if !ok {
			continue
		}
		// leaf == <root>/state/v<N>/<network>; the cache root is three levels up.
		cacheRoot := filepath.Dir(filepath.Dir(filepath.Dir(leaf)))
		info := StateInfo{
			Source:       source,
			CacheRoot:    cacheRoot,
			StatePath:    leaf,
			MajorVersion: major,
			Network:      network,
		}
		if v, err := os.ReadFile(filepath.Join(leaf, "version")); err == nil {
			info.MinorPatch = strings.TrimSpace(string(v))
		}
		return info, nil
	}
	return StateInfo{}, &NotFoundError{Source: source, Network: network}
}

// Result is the outcome of validating a discovered state against the running
// Zebra's expected DB-format major version.
type Result struct {
	Info          StateInfo `json:"info"`
	ExpectedMajor int       `json:"expectedMajor"`
	MajorChecked  bool      `json:"majorChecked"`
	MajorMatches  bool      `json:"majorMatches"`
	Usable        bool      `json:"usable"`
	Message       string    `json:"message"`
}

// Validate assesses whether the discovered state can be attached without a full
// resync. expectedMajor <= 0 means the pinned Zebra image's format version is
// unknown, so the major check is skipped and attach is allowed with a caveat.
func Validate(info StateInfo, expectedMajor int) Result {
	r := Result{Info: info, ExpectedMajor: expectedMajor}
	if expectedMajor <= 0 {
		r.Usable = true
		r.Message = fmt.Sprintf(
			"attaching %s state (format %s); the pinned Zebra format version is unknown, so Zebra will resync if they differ",
			info.Network, info.FullVersion())
		return r
	}
	r.MajorChecked = true
	r.MajorMatches = info.MajorVersion == expectedMajor
	r.Usable = r.MajorMatches
	if r.MajorMatches {
		r.Message = fmt.Sprintf("state format %s matches Zebra (v%d) — ready to attach",
			info.FullVersion(), expectedMajor)
	} else {
		r.Message = fmt.Sprintf("state format %s does NOT match Zebra (v%d) — a full resync would be required",
			info.FullVersion(), expectedMajor)
	}
	return r
}
