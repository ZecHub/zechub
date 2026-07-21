//go:build !darwin && !linux

package disk

import "errors"

// Probe is unsupported outside darwin/linux. The launcher targets a Docker host
// (macOS/Linux); Windows support can use GetDiskFreeSpaceEx if needed later.
func Probe(path string) (Usage, error) {
	return Usage{Path: path}, errors.New("disk probe not supported on this platform")
}
