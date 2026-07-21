# Zenith 0.10 베타

실행 중인 zebrad가 RPC를 활성화한 상태여야 합니다.

# NIX 설치

```bash
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install) --no-daemon
sudo chown -R <username> /nix'
. /home/<username>/.nix-profile/etc/profile.d/nix.sh
```


다음 내용을 ~/.config/nix/nix.conf 또는 /etc/nix/nix.conf에 추가하세요:

`experimental-features = nix-command flakes`


# Zenith 설치

```bash
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master#gui --impure
nix profile install git+https://code.vergara.tech/Vergara_Tech/zenith?ref=master
```



# Zenith 실행


`zenithgui`

또는

`zenithserver`
