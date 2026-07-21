// Package disk reports filesystem usage for the chain-state data directory,
// feeding the dashboard's disk-free gauge and the low-disk error state.
package disk

// Usage describes the capacity of the filesystem backing a path.
type Usage struct {
	Path       string `json:"path"`
	TotalBytes uint64 `json:"totalBytes"`
	FreeBytes  uint64 `json:"freeBytes"`
}

// UsedBytes returns the number of bytes in use (Total - Free), clamped at 0.
func (u Usage) UsedBytes() uint64 {
	if u.TotalBytes < u.FreeBytes {
		return 0
	}
	return u.TotalBytes - u.FreeBytes
}

// FreePct returns free space as a percentage of total in [0,100].
func (u Usage) FreePct() float64 {
	if u.TotalBytes == 0 {
		return 0
	}
	return float64(u.FreeBytes) / float64(u.TotalBytes) * 100
}
