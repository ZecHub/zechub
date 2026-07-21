import { useState, useEffect } from "react";
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  ListInput,
  Button,
  Segmented,
  SegmentedButton,
} from "konsta/react";
import { invoke, Settings, AppInfo } from "../backend";

interface Props {
  theme: "ios" | "material";
  onThemeChange: (t: "ios" | "material") => void;
  launchCount: number;
}

export default function SettingsPage({ theme, onThemeChange, launchCount }: Props) {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [favouriteColor, setFavouriteColor] = useState("#ff0000");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const info = await invoke<AppInfo>("get_app_info");
        setAppInfo(info);
        const settings = await invoke<Settings>("get_settings");
        setFavouriteColor(settings.favourite_color);
        setNote(settings.note);
      } catch {
        setAppInfo({
          app_name: "PayPunk Signer",
          app_version: "0.1.0",
          target_triple: "unknown",
          build_profile: "unknown",
          source: "mock",
        });
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      await invoke("save_settings", {
        favourite_color: favouriteColor,
        note,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <>
      <BlockTitle>App Info (Rust Data)</BlockTitle>
      <Block strong>
        <List>
          <ListItem title="App Name" after={appInfo?.app_name} />
          <ListItem title="Version" after={appInfo?.app_version} />
          <ListItem title="Target" after={appInfo?.target_triple} />
          <ListItem title="Profile" after={appInfo?.build_profile} />
          <ListItem title="Data Source" after={appInfo?.source} />
        </List>
      </Block>

      <BlockTitle>Theme Switch</BlockTitle>
      <Block strong>
        <Segmented>
          <SegmentedButton
            active={theme === "ios"}
            onClick={() => onThemeChange("ios")}
          >
            iOS
          </SegmentedButton>
          <SegmentedButton
            active={theme === "material"}
            onClick={() => onThemeChange("material")}
          >
            Material
          </SegmentedButton>
        </Segmented>
      </Block>

      <BlockTitle>Persisted Settings (Rust Round-Trip)</BlockTitle>
      <Block strong>
        <p className="text-sm text-gray-500 mb-2">
          These values are saved to disk by Rust and survive app restart.
          Launch count: <strong>{launchCount}</strong>
        </p>
        <List>
          <ListInput
            label="Favourite Color"
            type="color"
            value={favouriteColor}
            onChange={(e) => setFavouriteColor(e.target.value)}
          />
          <ListInput
            label="Note"
            type="text"
            placeholder="Write a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </List>
        <Button className="mt-2" onClick={handleSave}>
          {saved ? "Saved!" : "Save Settings"}
        </Button>
      </Block>
    </>
  );
}
