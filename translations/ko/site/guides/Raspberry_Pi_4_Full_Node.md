<a href="https://github.com/zechub/zechub/edit/main/site/guides/Raspberry_Pi_4_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 라즈베리 파이 4: *zcashd* 전체 노드 가이드

이 가이드의 목적은 저전력 라즈베리 파이 4에서 전체 노드를 실행하려는 Zcash 사용자들에게 도움을 주는 것입니다.

<img src="https://user-images.githubusercontent.com/81990132/197372541-dcd886ab-a3d0-4614-b490-0294ddf3ffae.png" alt="zcashd" width="700" height="700"/>

## 동영상

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SGYrzhs1l2k"
    title="How to compile Zcash Node on Raspberry Pi!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 지원

이 가이드가 유용하다고 생각되면, ZecHub을 지원하기 위해 ZEC 기부를 고려해 주세요:

`u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89`

## 배우게 될 내용

```markdown
* 부팅 가능한 Ubuntu Server 마이크로SD 카드를 만드는 방법
* 라즈베리 파이 4에서 인터넷 연결을 설정하는 방법
* 라즈베리 파이 4에 원격으로 액세스하는 방법
* zcashd를 설치하는 방법
* zcashd를 설정하는 방법
* zcashd를 사용하는 방법
```

## 사전 조건

> [8GB 라즈베리 파이 4 Canakit](https://www.canakit.com/raspberry-pi-4-starter-max-kit.html) 또는 동등한 제품

> 마이크로SD 카드 드라이브가 있는 컴퓨터

> 와이파이나 인터넷 연결이 가능한 이더넷 케이블

> USB3 지원 외부 SSD/HDD

##### 참고: 서버를 보호하는 것은 결코 간단하지 않습니다. 이 가이드에서 다루지 않은 팁/추천/최선의 실천 방법은 *절대* PR을 생성하여 이 가이드가 최신 상태를 유지하도록 도와주세요.

### SD 카드 준비

이 단계에서는 라즈베리 파이 4가 부팅할 수 있는 *부팅 가능한* SD 카드를 만들 것입니다. 컴퓨터에 마이크로SD 카드를 삽입하세요. Canakit 또는 다른 동등한 어댑터를 사용해야 할 수도 있습니다. 운영 체제에 맞는 Raspberry Pi Imager를 설치하세요. 현재 사용 중인 OS의 버전을 다운로드합니다.

     > [Ubuntu](https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb)
     
     > [Windows](https://downloads.raspberrypi.org/imager/imager_latest.exe)
     
     > [macOS](https://downloads.raspberrypi.org/imager/imager_latest.dmg)

예를 들어, 리눅스에서 다운로드 후 다음을 입력합니다:

`sudo dpkg -i imager_latest_amd64.deb`

Raspberry Pi Imager를 실행합니다.

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

OS와 저장 장치를 선택합니다. 라즈베리 파이 4는 64비트이므로 "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit)를 추천합니다. 저장을 클릭하고 SD 카드를 선택하세요. SD 카드에 쓰기 전, 하단 오른쪽 근처의 흰색 기어 아이콘을 클릭하여 고급 옵션을 클릭합니다.

<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>

여기서 업데이트할 수 있습니다:

```markdown
* 라즈베리 파이 4의 호스트 이름
* SSH 활성화
* 사용자 이름 및 비밀번호 생성
* 필요 시 Wi-Fi를 활성화하고 구성
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

작성 완료 후 "Write"를 클릭합니다.

### Ubuntu Server 부팅

추가 모니터와 키보드가 있다면 지금 연결하세요. 참고: 이 것은 선택 사항입니다. 방금 포맷한 SD 카드를 라즈베리 파이 4에 삽입하고 외부 SSD/HDD도 USB3 포트에 연결합니다. 전원 코드를 꽂고 켜세요.

### 라즈베리 파이 4에 원격으로 연결

이제 라즈베리 파이 4에 연결해야 합니다. 필요한 사항은 다음과 같습니다:

```markdown
* 사용자 이름 및 비밀번호 (이전 단계에서 생성한 것)
* IP 주소를 사용하여 SSH로 연결할 수 있도록
* 모니터, 키보드 (선택사항)
* 만약 직접 Pi에 모니터와 키보드가 연결되어 있다면 이 섹션의 나머지는 건너뛸 수 있습니다.
```

IP 주소를 찾는 두 가지 방법은 라우터 관리자 페이지 또는 nmap을 사용하는 것입니다. 라우터를 사용할 경우 제조사에 따라 다릅니다. 구글 검색으로 간단히 확인하세요. nmap을 사용할 경우, 먼저 설치되어 있는지 확인합니다:

     `sudo apt-get install nmap`
     
현재 컴퓨터의 IP 주소를 찾고 첫 세 섹션을 메모해 둡니다. 일반적으로 192.168.1.xxx 또는 192.168.50.xxx입니다. 다음 명령어로 nmap에 입력합니다:
          
`sudo nmap -sn 192.168.50.0/24`

또는

`sudo nmap -sn 192.168.1.0/24`

이 명령은 홈 네트워크에 연결된 모든 장치를 표시하며, 라즈베리 파이 4의 IP 주소 / MAC 주소를 보여줄 것입니다. 사용자 이름, 비밀번호 및 IP 주소를 사용하여 이제 SSH로 로그인할 수 있습니다

```markdown
* ssh <username>@<ip address of your pi> 참고: 여기에 *당신의* 사용자 이름과 *당신의* IP 주소와 *당신의* 비밀번호를 입력해야 합니다.
* 예시: `ssh ubuntu@192.168.1.25` 여기서 사용자 이름은 *ubuntu*이고 IP 주소는 192.168.1.25입니다.
```

  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

사용 중인 라즈베리 파이의 버전을 알고 싶다면 다음 명령어를 사용하세요:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### *zcashd* 설치

zcashd를 설치하는 두 가지 방법은 사전 컴파일된 바이너리를 다운로드하거나 zcashd를 직접 소스에서 컴파일하는 것입니다. 저는 *강력히 추천*합니다. 직접 컴파일할 경우, 크로스 컴파일을 강력히 권장합니다. 크로스 컴파일은 한 플랫폼에서 다른 플랫폼에서 실행될 수 있는 바이너리를 빌드하는 것입니다. 그 이유 중 하나는 라즈베리 파이 4가 저전력으로 인해 매우 느릴 수 있기 때문입니다! 주 컴퓨터를 사용하여 이를 도와주세요. 최신 릴리스를 여기서 얻을 수 있습니다 [여기](https://github.com/zcash/zcash/releases). 크로스 컴파일을 위해 필요한 패키지가 설치되어 있는지 확인해야 합니다. 다음을 설치하세요:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

다운로드한 후 다음을 입력하세요:

`sudo dpkg -i imager_latest_amd64.deb`

Raspberry Pi Imager를 열어주세요

`rpi-imager`

<img src="https://user-images.githubusercontent.com/81990132/197372069-fb9f7417-d320-42cf-ad65-38d630512985.png" alt="rpi imager" width="400" height="400"/>

OS와 저장 장치를 선택하세요. 라즈베리 파이 4는 64비트이므로 "Other general-purpose OS" => Ubuntu => Ubuntu Server 24.04.3 LTS (64 bit)를 추천합니다. 저장을 클릭하고 SD 카드를 선택하세요. SD 카드에 쓰기 전에 하단 오른쪽 근처의 흰색 기어 아이콘을 클릭하여 고급 옵션을 클릭하세요.


<img src="https://user-images.githubusercontent.com/81990132/197372159-1169c6f4-f6aa-4f44-9679-fe7aa542bbd3.png" alt="gear" width="200" height="200"/>



여기서 업데이트할 수 있습니다:

```markdown
* 라즈베리 파이 4의 호스트 이름
* SSH 활성화
* 사용자 이름 및 비밀번호 생성
* 필요 시 Wi-Fi를 활성화하고 구성
```
 
<img src="https://user-images.githubusercontent.com/81990132/197372149-8b85bfac-e473-4808-87cd-f27f15d05de8.png" alt="advanced" width="400" height="400"/>

 
작성 완료 후 "Write"를 클릭합니다.

### Ubuntu Server 부팅

추가 모니터와 키보드가 있다면 지금 연결하세요. 참고: 이 것은 선택 사항입니다. 방금 포맷한 SD 카드를 라즈베리 파이 4에 삽입하고 외부 SSD/HDD도 USB3 포트에 연결합니다. 전원 코드를 꽂고 켜세요.

### 라즈베리 파이 4에 원격으로 연결

이제 라즈베리 파이 4에 연결해야 합니다. 필요한 사항은 다음과 같습니다:

```markdown
* 사용자 이름 및 비밀번호 (이전 단계에서 생성한 것)
* IP 주소를 사용하여 SSH로 연결할 수 있도록
* 모니터, 키보드 (선택사항)
* 만약 직접 Pi에 모니터와 키보드가 연결되어 있다면 이 섹션의 나머지는 건너뛸 수 있습니다.
```

IP 주소를 찾는 두 가지 방법은 라우터 관리자 페이지 또는 nmap을 사용하는 것입니다. 라우터를 사용할 경우 제조사에 따라 다릅니다. 구글 검색으로 간단히 확인하세요. nmap을 사용할 경우, 먼저 설치되어 있는지 확인합니다:

     `sudo apt-get install nmap`
     
현재 컴퓨터의 IP 주소를 찾고 첫 세 섹션을 메모해 둡니다. 일반적으로 192.168.1.xxx 또는 192.168.50.xxx입니다. 다음 명령어로 nmap에 입력합니다:
          
`sudo nmap -sn 192.168.50.0/24`

또는

`sudo nmap -sn 192.168.1.0/24`

이 명령은 홈 네트워크에 연결된 모든 장치를 표시하며, 라즈베리 파이 4의 IP 주소 / MAC 주소를 보여줄 것입니다. 사용자 이름, 비밀번호 및 IP 주소를 사용하여 이제 SSH로 로그인할 수 있습니다

```markdown
* ssh <username>@<ip address of your pi> 참고: 여기에 *당신의* 사용자 이름과 *당신의* IP 주소와 *당신의* 비밀번호를 입력해야 합니다.
* 예시: `ssh ubuntu@192.168.1.25` 여기서 사용자 이름은 *ubuntu*이고 IP 주소는 192.168.1.25입니다.
```

  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

사용 중인 라즈베리 파이의 버전을 알고 싶다면 다음 명령어를 사용하세요:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### *zcashd* 설치

zcashd를 설치하는 두 가지 방법은 사전 컴파일된 바이너리 다운로드 또는 소스에서 zcashd 컴파일입니다. 저는 *매우* 소스에서 컴파일하는 것을 추천합니다. 직접 컴파일할 경우 교차 컴파일을 강력히 권장합니다. 교차 컴파일은 한 플랫폼에서 다른 플랫폼에 실행될 수 있는 바이너리를 빌드하는 것입니다. 이는 라즈베리 파이 4가 저전력으로 인해 매우 느리기 때문입니다. 주요 컴퓨터를 활용하여 이를 도와줄 수 있습니다. 최신 릴리스를 여기에서 얻을 수 있습니다 [https://github.com/zcash/zcash/releases](https://github.com/zcash/zcash/releases). 교차 컴파일하기 위해 필요한 패키지가 있는지 확인해야 합니다. 다음을 설치하세요:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

다음으로 새로 다운로드한 zcashd 릴리스 디렉토리로 이동하고 실행하세요:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### *zcashd* 설정

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

이제 zcashd 바이너리 파일을 라즈베리 파이 4로 전송해야 합니다. Zcashd v5.3 기준으로 필요한 파일은 다음과 같습니다:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

이 파일들은 자신이 직접 컴파일한 경우, 최신 릴리스 다운로드 위치의 /src 디렉토리에 있습니다. 그렇지 않으면 사전 컴파일된 파일은 다운로드한 위치에 있습니다. 전송을 달성하는 두 가지 방법은 SFTP 사용 또는 외부 드라이브 사용입니다.

#### SFTP

```bash
sftp username@<ip of RaspberryPi4>
put zcash*
```
   
#### 외부 복사
     
외부 드라이브에 파일을 복사한 후 라즈베리 파이 4에 연결하세요. 이미 전체 노드가 동기화되어 있고 시간을 절약하고 싶다면, 블록과 chainstate 데이터도 복사할 수 있습니다.
   
` cd ~/.zcash/`
     
다음 명령어를 실행하세요:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
외부 SSD/HHD에 blocks 및 chainstate .gz 파일을 복사합니다. 다음으로 Media 폴더에서 외부 SSD/HDD를 마운트하여 보고 싶습니다:

```markdown
lsblk는 연결된 드라이브를 표시합니다. 대부분은 sda 형식입니다.
id는 사용자 및 그룹 ID를 표시합니다.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
`sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
소유자와 파일의 권한을 주의 깊게 확인하세요.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
기타 컴퓨터에서 blocks 및 chainstate .gz 파일을 복사했다면 지금 압축을 풀어주세요. 외부 드라이브의 .zcash 폴더에 있어야 합니다.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


/media/portableHD/.zcash/zcash.conf 설정

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="advanced" width="400" height="400"/>

 
이제 완료되면 Write를 클릭하세요.


### Ubuntu Server 부팅

추가 모니터와 키보드가 있다면 지금 연결하세요. 참고: 이는 선택 사항입니다. 방금 포맷한 SD 카드를 라즈베리 파이 4에 삽입하고 외부 SSD/HHD도 USB3 포트에 연결하세요. 또한 전원 코드를 꽂고 켜세요.

### Raspberry Pi 4에 원격으로 연결

이제 Raspberry Pi 4에 연결해야 합니다. 필요한 사항:

```markdown
* 사용자 이름 및 비밀번호 (이전 단계에서)
* IP 주소로 SSH 사용
* 모니터, 키보드 (선택 사항)
* 만약 모니터와 키보드가 직접 Pi에 연결되어 있다면 이 섹션의 나머지는 건너뛸 수 있습니다.
```

IP 주소를 찾는 두 가지 방법은 라우터 관리자 페이지 또는 nmap을 사용하는 것입니다. 라우터를 사용하는 경우 제조사에 따라 다르므로 간단한 구글 검색으로 세부 정보를 확인하세요. nmap을 사용하려면 먼저 설치되어 있는지 확인해야 합니다:

     `sudo apt-get install nmap`
     
현재 컴퓨터의 IP 주소를 찾아서 처음 세 개의 섹션을 메모해주세요. 일반적으로 192.168.1.xxx 또는 192.168.50.xxx입니다. 다음 명령어로 nmap에 입력하세요:
          
`sudo nmap -sn 192.168.50.0/24`

또는

`sudo nmap -sn 192.168.1.0/2线`

이렇게 하면 홈 네트워크에 연결된 모든 장치가 표시되며, Raspberry Pi 4의 IP 주소 / MAC 주소도 드러납니다. 사용자 이름, 비밀번호 및 IP 주소를 사용하여 이제 SSH로 로그인할 수 있습니다

```markdown
* ssh <username>@<ip address of your pi> 참고: 여기에 *당신의* 사용자 이름과 *당신의* IP 주소와 *당신의* 비밀번호를 입력해야 합니다.
* 예시: `ssh ubuntu@192.168.1.25` 여기서 사용자 이름은 *ubuntu*이고 IP 주소는 192.168.1.25입니다.
```


  <img src="https://user-images.githubusercontent.com/81990132/197372846-e1279388-eaaa-4fbb-8d5d-f9928cb45195.png" alt="sshLogin" width="400" height="400"/>
       

어떤 버전의 라즈베리 파이를 사용하는지 궁금하다면 다음 명령어를 실행하세요:

     `cat /sys/firmware/devicetree/base/model ; echo`

  <img src="https://user-images.githubusercontent.com/81990132/197689888-367c8eb3-2667-4c8c-85b3-44d46afe07a7.png" alt="which" width="700" height="400"/>

         

### *zcashd* 설치

zcashd를 설치하는 두 가지 방법은 사전 컴파일된 바이너리 다운로드 또는 소스에서 zcashd 컴파일입니다. 저는 *매우* 소스에서 컴파일하는 것을 추천합니다. 직접 컴파일할 경우 교차 컴파일을 강력히 권장합니다. 교차 컴파일은 한 플랫폼에서 다른 플랫폼에 실행될 수 있는 바이너리를 빌드하는 것입니다. 하나의 이유는 라즈베리 파이 4가 저전력으로 인해 매우 느리기 때문입니다. 주요 컴퓨터를 활용하여 이를 도와줄 수 있습니다. 최신 릴리스를 여기에서 얻을 수 있습니다 [https://github.com/zcash/zcash/releases](https://github.com/zcash/zcash/releases). 교차 컴파일하기 위해 필요한 패키지가 있는지 확인해야 합니다. 다음을 설치하세요:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python3 python3-zmq zlib1g-dev curl bsdmainutils automake libtinfo5
sudo apt-get install gcc-aarch64-linux-gnu
```

다음으로 새로 다운로드한 zcashd 릴리스 디렉토리로 이동하고 실행하세요:

`HOST=aarch64-linux-gnu ./zcutil/build.sh`
          

### *zcashd* 설정

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/9t2LX3HFldw"
    title="Zcashd Wallet Tool - Generate & Import Private Key"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

이제 zcashd 이진 파일을 Raspberry Pi 4로 전송해야 합니다. Zcashd v5.3 기준으로 필요한 파일은 다음과 같습니다:

```markdown
zcashd
zcash-cli
zcash-tx
zcash-gtest
zcash-inspect
zcashd-wallet-tool
fetch-params.sh
```

이 파일들은你自己가 직접 컴파일했다면 최신 릴리스 다운로드 위치의 /src 디렉토리에 있습니다. 그렇지 않다면 사전 컴파일된 파일은 다운로드한 위치에 있습니다. 전송을 달성하는 두 가지 방법은 SFTP를 사용하거나 외부 드라이브를 사용하는 것입니다.

#### SFTP

```bash
sftp username@<RaspberryPi4의 IP>
put zcash*
```
   
#### 외부 복사
     
먼저 Raspberry Pi 4에 연결하기 전에 외부 드라이브에 파일을 복사하세요. 이미 전체 노드가 동기화되어 있고 시간을 절약하고 싶다면 블록과 chainstate 데이터도 복사할 수 있습니다.
   
` cd ~/.zcash/`
     
간단히 실행하세요:

```bash
tar -zcvf blocks.tar.gz /blocks
tar -zcvf chainstate.tar.gz /chainstate
```
     
블록 및 chainstate .gz 파일을 외부 SSD/HHD에 복사합니다. 다음으로 Media 폴더에서 외부 SSD/HDD를 마운트하여 보고 싶습니다:

```markdown
lsblk는 연결된 모든 드라이브를 표시합니다. 대부분은 sda 형식입니다.
id는 사용자 및 그룹 ID를 표시합니다.
```
          
<img src="https://user-images.githubusercontent.com/81990132/197372643-abef88fd-9177-4bf9-abda-3c221188cd10.png" alt="lsblk" width="400" height="400"/>


          
          `sudo mount -o umask=0077,gid=<groupid>,uid=<userid> /dev/sda1 /media/portableHD/`
          
두 사람이 폴더/파일을 소유하고 있는지 확인하고 퍼미션도 주의 깊게 살펴보세요.

```bash
sudo chown -R <username>: portableHD
sudo chmod -R 600 portableHD/
```
     
이전 컴퓨터에서 블록 및 chainstate .gz 파일을 복사했다면 지금 해제하세요. 외부 드라이브의 .zcash 폴더에 있어야 합니다.

```bash
tar - xvzf blocks.tar.gz
tar - xvzf chainstate.tar.gz
```


Setup /media/portableHD/.zcash/zcash.conf

<img src="https://user-images.githubusercontent.com/81990132/197373699-18cc2c9f-b47d-44e9-9e6b-4c5cccf78d9e.png" alt="zconf" width="700" height="400"/>


 
주의: 우리는 datadir을 외부 SSD/HDD로 이동했는데, 그곳은 훨씬 더 많은 공간이 있습니다. 기본 .zcash 폴더 위치가 변경되었으므로 *zcashd*에게 이를 알려줘야 합니다. 이는 심볼릭 링크를 사용하여 수행할 수 있습니다:

```markdown
cp -rp ~/.zcash/* /new_dir         // Make copy of datadir or supply with an external HD
rm -rf ~/.zcash                    // Remove default folder
ln -s /media/portableHD/ ~/.zcash  // Symbolic link new data location to the default so zcashd is happy
```
   

Run fetch-params.sh 스크립트를 실행하여 zcashd에 필요한 데이터를 다운로드합니다.
   
    `./fetch-params.sh`


Start a new 'screen' [ program in linux ]. Open zcashd with -datadir set:

```bash
screen -S zcashScreen`     
./zcashd -datadir=/media/portableHD/.zcash/
```
     
Detach the screen:

`Ctrl+a , Ctrl+d`


Create an alias so you dont have to type out all these extra data location commands

     `alias zcash-cli="./zcash-cli -datadir=/media/portableHD/.zcash/"`


Ready to use!

    `zcash-cli getblockchaininfo`

  <img src="https://user-images.githubusercontent.com/81990132/197373098-672aa228-d180-47ea-8a7c-c58dc3882426.png" alt="getblockchaininfo" width="400" height="400"/>



### *zcashd* 사용

<iframe class="w-full h-auto md:h-96" src="https://www.youtube.com/embed/KNhd1KC0Bqk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

이제 노드 상태를 확인하려면 어떻게 해야 하나요?

     `tail -n 500 <path to>/.zcash/debug.log`

  <img src="https://user-images.githubusercontent.com/81990132/197684416-9a083de4-4a62-4fe8-9cab-798781b38cd2.png" alt="status" width="700" height="400"/>


  
     
현재 높이를 로그에서 얻는 방법

     `tail -n 10 <path to>/.zcash/debug.log | grep -o  'height=[^b]*'`

  <img src="https://user-images.githubusercontent.com/81990132/199630447-6a6cd491-0cb3-47f8-95f0-45f6b6555870.png" alt="logHeight" width="500" height="400"/>


     
     `zcash-cli getinfo`
  
<img src="https://user-images.githubusercontent.com/81990132/199646508-132da0eb-899e-49a6-8b31-e9011e159700.png" alt="getInfo" width="400" height="400"/>

     
     
메모를 보내는 방법은 어떻게 하나요? 여기서 보는 것처럼 [here](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html), *ascii2hex*와 *hex2ascii*를 다운로드하고 실행 가능한 파일로 만듭니다 

`chmod +x ascii2hex hex2ascii`
          
메모를 생성하고 헥스로 변환합니다. 다시 ASCII로 변환하여 테스트할 수 있습니다.
          
<img src="https://user-images.githubusercontent.com/81990132/199646812-782142d6-8846-443a-8dd9-4f332e49d3e9.png" alt="asciiGOOD" width="400" height="400"/>


  
Sapling을 사용하여 위에서 생성한 메모의 헥스 버전으로 z2z 거래를 만듭니다

`zcash-cli z_sendmany "ztestsapling1kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgt" "[{\"address\": \"ztestsapling2kg3u0y7szv6509732at34alct46cyn0g26kppgf2a7h5tpqxldtwm7cmhf8rqmhgtmpakcz5mdv\",\"amount\": 0.0001, \"memo\":\"5A656348756221\"}]"`

zcashScreen을 다시 시작하려면 어떻게 해야 하나요?

`screen -r zcashScreen`
     
zcashd를 중지하려면 어떻게 해야 하나요?

`zcash-cli stop`
     
UA를 생성하려면 어떻게 해야 하나요?

`zcash-cli z_getnewaccount`
     
  <img src="https://user-images.githubusercontent.com/81990132/202352436-04c17be2-e914-4b9b-95d1-00cf6fc496d3.png" alt="newAccount" width="400" height="400"/>

    
이제 *당신의* 요구에 따라 UA 수신자(Receiver)를 생성하세요. 이는 Orchard만, Orchard + Sapling, 그리고 마지막으로 Orchard + Sapling + Transparent입니다. 참고로 수신자의 차이점은 길이에 따라 구분할 수 있습니다.
     
<img src="https://user-images.githubusercontent.com/81990132/202354319-2da6be33-ca95-4
