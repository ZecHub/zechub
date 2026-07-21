//go:build darwin || linux

package disk

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"syscall"
)

// Probe reports filesystem usage for the filesystem that would back path.
// The path need not exist — when it doesn't, Probe walks up to the nearest
// existing ancestor (the disk we care about is the same in either case).
// This keeps first-run preflight useful: the data dir hasn't been created
// yet, but we still want to know how much room is on the disk that will
// eventually hold it.
func Probe(path string) (Usage, error) {
	resolved, err := existingAncestor(path)
	if err != nil {
		return Usage{Path: path}, err
	}
	var st syscall.Statfs_t
	if err := syscall.Statfs(resolved, &st); err != nil {
		return Usage{Path: path}, fmt.Errorf("statfs %s: %w", resolved, err)
	}
	// Bsize is int64 on Linux and uint32 on Darwin; uint64() handles both.
	bsize := uint64(st.Bsize)
	return Usage{
		Path:       path,
		TotalBytes: uint64(st.Blocks) * bsize,
		FreeBytes:  uint64(st.Bavail) * bsize, // Bavail = blocks available to non-root
	}, nil
}

// existingAncestor returns path if it exists, otherwise its nearest existing
// ancestor. It returns an error only when no ancestor exists (i.e. the path
// is rooted at a non-existent directory) — which would mean a deeper host
// problem than a missing data dir.
func existingAncestor(path string) (string, error) {
	cur := path
	for {
		if _, err := os.Stat(cur); err == nil {
			return cur, nil
		} else if !errors.Is(err, os.ErrNotExist) {
			return "", err
		}
		parent := filepath.Dir(cur)
		if parent == cur {
			return "", fmt.Errorf("no existing ancestor of %s", path)
		}
		cur = parent
	}
}
