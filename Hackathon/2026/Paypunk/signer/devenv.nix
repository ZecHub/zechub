{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  # ── Rust ──────────────────────────────────────────────────────────
  languages.rust = {
    enable = true;
    channel = "stable";
    targets = [
      "aarch64-linux-android"
      "armv7-linux-androideabi"
      "i686-linux-android"
      "x86_64-linux-android"
    ];
    components = ["rustc" "cargo" "clippy" "rustfmt" "rust-analyzer" "rust-src"];
  };

  # ── JavaScript / Node / pnpm ──────────────────────────────────────
  languages.javascript = {
    enable = true;
    pnpm.enable = true;
    pnpm.install.enable = false; # we'll run install manually after scaffold
    nodejs.enable = true;
    package = pkgs.nodejs_22;
  };

  # ── Android SDK + NDK ─────────────────────────────────────────────
  android = {
    enable = true;
    platforms.version = ["34" "36"];
    buildTools.version = ["34.0.0" "35.0.0"]; # 36 platform is fine with these build-tools
    ndk.enable = true;
    # Accept all required licenses
    extraLicenses = [
      "android-sdk-preview-license"
      "android-googletv-license"
      "android-sdk-arm-dbt-license"
      "google-gdk-license"
      "intel-android-extra-license"
      "intel-android-sysimage-license"
      "mips-android-sysimage-license"
    ];
    # We don't need emulator for physical-device workflow
    emulator.enable = false;
    systemImages.enable = false;
    sources.enable = false;
    cmdLineTools.version = "12.0";
  };

  # ── Java (JDK 17 for Android compatibility) ──────────────────────────
  languages.java = {
    enable = true;
    jdk.package = pkgs.jdk17;
  };

  packages = with pkgs; [
    cargo-tauri
    pkg-config
    # Tauri Linux system deps (from NixOS wiki)
    webkitgtk_4_1
    librsvg
    libsoup_3
    openssl
    curl
    wget
    file
    # For wayland/waypipe forwarded display
    xdotool
    # Android debugging
    android-tools
  ];

  # ── Environment variables ─────────────────────────────────────────
  env = {
    # Android — ANDROID_HOME and ANDROID_NDK_ROOT are set by devenv's android module.
    NDK_HOME = config.env.ANDROID_NDK_ROOT;
    # Allow Gradle to write its cache
    GRADLE_USER_HOME = "${config.env.DEVENV_STATE}/gradle";
    ANDROID_USER_HOME = "${config.env.DEVENV_STATE}/android";
    # Vite / Tauri dev server binds to 0.0.0.0 for network-reachable dev
    VITE_HOST = "0.0.0.0";
  };

  # ── Shell hooks ───────────────────────────────────────────────────
  enterShell = ''
    export NDK_HOME="$(ls -d "$ANDROID_NDK_ROOT"*/ 2>/dev/null | sort -V | tail -n1)"
    export NDK_HOME="''${NDK_HOME:-$ANDROID_NDK_ROOT}"
    echo "🦀 PayPunk Signer dev environment ready"
    echo "   Rust:  $(rustc --version)"
    echo "   Node:  $(node --version)"
    echo "   pnpm:  $(pnpm --version)"
    echo "   Java:  $(java -version 2>&1 | head -1)"
    echo "   NDK:   $NDK_HOME"
    echo ""
    echo "   Run  pnpm dev          → browser-only (mock data)"
    echo "   Run  cargo tauri dev   → desktop webview (full IPC)"
    echo "   Run  cargo tauri android dev → physical phone (full IPC)"
  '';

  # ── Scripts ───────────────────────────────────────────────────────
  scripts = {
    fix-udev.description = "Install udev rules so adb can see USB-connected Pixel/Android devices.";
    fix-udev.exec = ''
      RULES_FILE="/etc/udev/rules.d/51-android.rules"
      echo "SUBSYSTEM==\"usb\", ATTR{idVendor}==\"18d1\", MODE=\"0666\", GROUP=\"plugdev\"" | sudo tee "$RULES_FILE" >/dev/null
      sudo udevadm control --reload-rules
      sudo udevadm trigger
      adb kill-server && adb start-server
      echo "✅ udev rules installed. Reconnect your device if it still shows 'no permissions'."
    '';
    dev-browser.exec = "pnpm dev";
    dev-tauri.exec = "cargo tauri dev";
    dev-android.exec = "cargo tauri android dev";
    build-android.exec = "cargo tauri android build --apk";
    build-android-release.exec = ''
            if [ -z "''${KEYSTORE_PASSWORD:-}" ]; then
              echo "ERROR: KEYSTORE_PASSWORD not set"
      ajkchsljkADFHCP:IKLB      exit 1
            fi
            if [ -z "''${KEY_PASSWORD:-}" ]; then
              echo "ERROR: KEY_PASSWORD not set"
              exit 1
            fi
            cargo tauri android build --apk
    '';
  };
}
