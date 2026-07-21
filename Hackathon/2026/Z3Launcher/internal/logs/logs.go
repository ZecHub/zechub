// Package logs streams container log output line by line. The Docker-specific
// log source (docker compose logs -f) is wired in elsewhere; this package holds
// the testable line-scanning loop that drives the dashboard's log viewer.
package logs

import (
	"bufio"
	"context"
	"io"
)

const maxLineBytes = 1 << 20 // 1 MiB guard against pathological lines

// Stream scans r line by line, calling emit for each line, until EOF, a read
// error, or ctx cancellation. The context is checked before each emit so a
// disconnected client stops the stream promptly.
func Stream(ctx context.Context, r io.Reader, emit func(line string)) error {
	sc := bufio.NewScanner(r)
	sc.Buffer(make([]byte, 0, 64*1024), maxLineBytes)
	for sc.Scan() {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}
		emit(sc.Text())
	}
	return sc.Err()
}
