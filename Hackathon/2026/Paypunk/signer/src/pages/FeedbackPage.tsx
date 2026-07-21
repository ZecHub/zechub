import { useState, useEffect } from "react";
import {
  Block,
  BlockTitle,
  Button,
  Preloader,
  Progressbar,
  Fab,
  Badge,
  Notification,
} from "konsta/react";
import { listen, TimerTick } from "../backend";

export default function FeedbackPage() {
  const [notifOpened, setNotifOpened] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timerTick, setTimerTick] = useState(0);

  useEffect(() => {
    let unlisten: (() => void) | undefined;

    (async () => {
      unlisten = await listen<TimerTick>("timer-tick", (payload) => {
        setTimerTick(payload.tick);
        setProgress((payload.tick % 100));
      });
    })();

    return () => {
      unlisten?.();
    };
  }, []);

  return (
    <>
      <BlockTitle>Timer (Rust Event)</BlockTitle>
      <Block strong>
        <p className="text-sm text-gray-500">
          Live counter emitted from Rust via <code>app.emit("timer-tick")</code>:
        </p>
        <p className="text-3xl font-bold text-center my-4">{timerTick}</p>
        <Progressbar progress={progress} />
        <p className="text-xs text-gray-400 text-center mt-1">
          Progress: {progress}%
        </p>
      </Block>

      <BlockTitle>Preloader</BlockTitle>
      <Block strong>
        <div className="flex gap-4 items-center">
          <Preloader />
          <Preloader size="w-8 h-8" />
          <Preloader size="w-12 h-12" />
          <Preloader />
        </div>
      </Block>

      <BlockTitle>Progressbar</BlockTitle>
      <Block strong>
        <div className="space-y-2">
          <Progressbar progress={30} />
          <Progressbar progress={60} />
          <Progressbar progress={90} />
          <Progressbar />
        </div>
      </Block>

      <BlockTitle>Badges</BlockTitle>
      <Block strong>
        <div className="flex gap-2 items-center">
          <Badge>1</Badge>
          <Badge>99+</Badge>
          <Badge>New</Badge>
          <Badge>!</Badge>
        </div>
      </Block>

      <BlockTitle>Notifications</BlockTitle>
      <Block strong>
        <Button onClick={() => setNotifOpened(true)}>
          Show Notification
        </Button>
      </Block>

      <Notification
        opened={notifOpened}
        title="Notification"
        subtitle="Konsta UI"
        text="This is a Konsta UI notification component."
        onClose={() => setNotifOpened(false)}
      />

      <div className="relative h-20">
        <Fab
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          }
          className="absolute bottom-4 right-4"
        />
      </div>
    </>
  );
}
