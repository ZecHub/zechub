// Package web embeds the built React dashboard (web/dist) into the Go binary so
// the whole tool ships as one executable. Run `npm run build` (or `make build`)
// to regenerate dist before building the binary.
package web

import (
	"embed"
	"io/fs"
)

//go:embed all:dist
var dist embed.FS

// Assets returns the built SPA filesystem rooted at dist/, and true if a real
// build is present (index.html exists). When false, the server falls back to a
// plain API-only notice.
func Assets() (fs.FS, bool) {
	sub, err := fs.Sub(dist, "dist")
	if err != nil {
		return nil, false
	}
	if _, err := fs.Stat(sub, "index.html"); err != nil {
		return nil, false
	}
	return sub, true
}
