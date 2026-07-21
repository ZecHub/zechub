{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  languages.rust.enable = true;

  packages = with pkgs; [
    bc
    mdbook
    mdbook-mermaid
  ];

  scripts = {
    setup.exec = "${pkgs.bash}/bin/bash scripts/setup-test-wallet.sh \"$@\"";
    ethereum.exec = "${pkgs.bash}/bin/bash scripts/start-ethereum.sh";
    zcash.exec = "${pkgs.bash}/bin/bash scripts/start-zcash.sh";
    bal.exec = "${pkgs.bash}/bin/bash scripts/get-balance.sh";
    kp.exec = "${pkgs.bash}/bin/bash scripts/key-daemon.sh";
    pp.exec = "${pkgs.bash}/bin/bash scripts/wallet-daemon.sh";
    tui.exec = "${pkgs.bash}/bin/bash scripts/ui.sh";
    cb.exec = "cargo build";
    ct.exec = "cargo test";
    docs.exec = "mdbook build docs";
    docs-serve.exec = "mdbook serve docs --open";
  };
}
