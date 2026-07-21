package logs

import (
	"context"
	"errors"
	"strings"
	"testing"
)

func TestStreamEmitsEachLine(t *testing.T) {
	var got []string
	err := Stream(context.Background(), strings.NewReader("alpha\nbeta\ngamma\n"), func(line string) {
		got = append(got, line)
	})
	if err != nil {
		t.Fatalf("Stream: %v", err)
	}
	want := []string{"alpha", "beta", "gamma"}
	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("lines = %v, want %v", got, want)
	}
}

func TestStreamStopsOnCancel(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel() // already cancelled: no line should be emitted

	var got []string
	err := Stream(ctx, strings.NewReader("one\ntwo\n"), func(line string) {
		got = append(got, line)
	})
	if !errors.Is(err, context.Canceled) {
		t.Errorf("err = %v, want context.Canceled", err)
	}
	if len(got) != 0 {
		t.Errorf("expected no emits after cancel, got %v", got)
	}
}

func TestStreamHandlesNoTrailingNewline(t *testing.T) {
	var got []string
	if err := Stream(context.Background(), strings.NewReader("solo"), func(l string) { got = append(got, l) }); err != nil {
		t.Fatal(err)
	}
	if len(got) != 1 || got[0] != "solo" {
		t.Errorf("got %v, want [solo]", got)
	}
}
