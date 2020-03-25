---
layout  : wiki
title   : VNC
summary : VNC
date    : 2020-03-25 11:53:37 +0900
updated : 2020-03-25 19:19:10 +0900
tags    : vnc, graphical desktop-sharing
toc     : true
public  : true
parent  : Setup
latex   : false
---
* TOC
{:toc}


## 개념

![VNC]({{ site.url }}/wiki/img/vnc.gif?style=centerimg)
{:.image-caption}
*Figure 1. VNC*
[출처](https://web.archive.org/web/20000815062816/http://www.uk.research.att.com/vnc/collage.gif)

![VNC]({{ site.url }}/wiki/img/vnc_handshake.png?style=centerimg)
{:.image-caption}
*Figure 2. VNC Handshake*
[출처](https://www.etsi.org/deliver/etsi_ts/103500_103599/10354402/01.03.00_60/ts_10354402v010300p.pdf)

* In computing, Virtual Network Computing (VNC) is a graphical desktop-sharing system that uses the Remote Frame Buffer protocol (RFB) to remotely control another computer [위키](https://en.wikipedia.org/wiki/Virtual_Network_Computing){:target="_blank"}
    * RFB 프로토콜을 이용하기때문에 VNC Client는 server와 다른 벤더의 제품을 써도 되었다.
    * RFB 프로토콜: By default, a viewer/client uses TCP port 5900 to connect to a server (or 5800 for browser access), but can also be set to use any other port. [위키](https://en.wikipedia.org/wiki/RFB_protocol){:target="_blank"}
* [Virtual Network Computing(오리지널)](https://web.archive.org/web/20000815062533/http://www.uk.research.att.com/vnc/index.html){:target="_blank"}

## 용도와 목적
* 개발자의 DB query 용으로 mysql workbench를 vncserver로 구성
* 개발자 개인별 VNC Desktop 을 제공
* 보안 필수조건인 Query 결과 copy & paste 방지

## 구성
### 구성 필요사항
* CentOS7
* X 구성 (GUI GNONE Desktop)
* tigervnc-server.x86_64
* mysql workbench

## Install
### 패키지 설치

```sh
  yum groupinstall -y "Server with GUI"
  yum groupinstall "GNOME Desktop"
  yum install tigervnc-server
  yum install dconf-editor
  yum erase libvirt-daemon (group install시 설치되는 libvirt 삭제 필요함.)
```

### mysql workbench 설치 (참조)
```sh
  https://yoursyun.tistory.com/entry/centos-에서-mysql-workbench-설치하기
  https://www.linuxhelp.com/how-to-install-mysql-workbench-on-centos-7-new
```

### tigervnc 설치 참조
```sh
  https://idchowto.com/?p=33953
  https://www.tecmint.com/install-and-configure-vnc-server-in-centos-7/
```


## vncserver 설정
### vnc Desktop 해상도 수정

```sh
  vi /usr/bin/vncserver
  $geometry = "1280x768"; (로 수정)
```

### vncserver text copy&paste 방지설정
* systemd로 등록하고 데몬 관리시, 하기 systemd 템플릿에서 start옵션을 변경 한다.

```sh
  vi /lib/systemd/system/vncserver@.service
  ExecStart=/usr/sbin/runuser -l <USER> -c "/usr/bin/vncserver -AcceptCutText=0 -SendCutText=0 -ClientWaitTimeMillis=300000 %i"
```


## 운영
### 1. vncserver login
```sh
  ssh -i stage-master.pem ec2-user@10.212.151.193
```

### 2. Linux 시스템 계정 생성 생성
* 개발자 개인별 계정을 생성해야, 개인별 vnc Desktop이 생성된다.

```sh
  useradd username
  passwd username ( 패스워드는 아무거나 구성한다.)
  passwd -e usename ( 패스워드를 expire로 만들고 첫 로그인시 본인이 직접 변경하도록 한다.)
```

### 3. 개인별 vncserver 생성
* 개인별 vncserver를 설정하고, systemd에 등록하는 운영 스크립트를 사용한다.

```sh
  cd /$HOME/vncserver
  
  usage : ./add_vncuser USERNAME
  > 계정별 systemd 스크립트를 자동으로 생성한다.
  > 계정별 vncserver 설정및 password설정을 자동으로 진행한다.
  
  systemctl start vncserver@:NUM.service 으로 각 유저별 데몬 실행.
```

### 4. vncuser 삭제시
    * /home/USER/.vnc 폴더 삭제
    * /tmp/X11-unix/USER 파일 삭제
    * systemctl disable vncserver@:NUM.service systemd 서비스에서 제거


# VNC Server X 세팅
## Issue 1
### 증상
vnc client로 접속했던 사용자에게 오류가 발생하는 문제가 생김
* 로그인 하려는데 아무것도 안 만지는데 자동으로 next 버튼이 클릭
* vnc server를 재시작해도 문제가 발생
* 확인해보니 GNOME을 기존에 사용했었는데 yum update로 systemd가 업데이트 되고 나서
* PIDFILE을 각 계정별로 두고서 처리했는데 update로 인한 패치로 저 부분이 먹히질 않았던 것이 문제

```sh
$ cat /etc/systemd/system/vncserver@\:9.service 
[Unit]
Description=Remote desktop service (VNC)
After=syslog.target network.target

[Service]
Type=forking
User=amir.s

# Clean any existing files in /tmp/.X11-unix environment
ExecStartPre=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'

# Start vnc server
#ExecStart=/usr/sbin/runuser -l amir.s -c "/usr/bin/vncserver -rfbport 5909 -rfbwait 30000 -AcceptCutText=1 -SendCutText=0 -ClientWaitTimeMillis=300000 %i"
#PIDFile=/home/amir.s/.vnc/%H%i.pid
ExecStart=/usr/bin/vncserver -rfbport 5909 -rfbwait 30000 -AcceptCutText=1 -SendCutText=0 -ClientWaitTimeMillis=300000 %i

# Stop vnc server
ExecStop=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'

[Install]
WantedBy=multi-user.target
```

### 해결
#### GNOME에서 Cinnamon으로 가상데스트톱으로 교체
* cinnamon 있는지 확인
```sh
yum list cinnamon
yum list cinnamon-settings\*
```

* 각 User 별로 설정필요
```sh
$ cd /home/new_user/.vnc

$ cat config
geometry=2048x1152
```

* 여기서 cinnamon을 사용하도록 설정 필요
```sh
$ cat xstartup
#!/bin/sh

unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
OS=`uname -s`

#/etc/X11/xinit/xinitrc <--- 1차 실패
#vncserver -kill $DISPLAY <- 1차에 이것이 안먹힘

#exec cinnamon-session  <--- 2차 실패

exec cinnamon-session-cinnamon2d  # <--- 정상
```

* 특이점: Gnome일때는 memory를 많이 썼는데 Cinnamon은 CPU를 많이 쓴다.

## Issue 2
### 증상
* 아직 해결되지 않음
* 예를 들어서 20명의 사용자가 등록되어 있다. 각각의 서비스를 기동해둔 경우

    * 7번을 배정받은 사용자인 경우
```sh
/usr/bin/Xvnc :7 -geometry 2048x1152 -auth /home/user7/.Xauthority -desktop prod3-mgmt-vnc:7 (user7) -fp catalogue:/etc/X11/fontpath.d -pn -rfbauth /home/user7/.vnc/passwd -rfbport 5907 -rfbwait 30000 -rfbport 5907 -rfbwait 30000 -AcceptCutText=1 -SendCutText=0 -ClientWaitTimeMillis=300000 :7
```

    * 이런식으로 1 ~ 20까지 존재한다.

### 확인
* 문제는 중간에 퇴사자가 발생해서 12번이 빠지게 되면 저 숫자들이 꼬이면서 오동작한다.
* 저 숫자 :7은 7번 사용자에게 할당되서 올라가도록 유의해야한다. (원인은 아직 못찾음)

    * 중간에 퇴사자 user3이 발생해서 삭제하고 7번 사용자의 vnc 서비스를 재시작한 경우
    * 이런식으로 7번 사용자가 3번으로 뜨게 되면 실제 가상 desktop을 실행했을때 오동작했었다.
```sh
/usr/bin/Xvnc :3 -geometry 2048x1152 -auth /home/user7/.Xauthority -desktop prod3-mgmt-vnc:3 (user7) -fp catalogue:/etc/X11/fontpath.d -pn -rfbauth /home/user7/.vnc/passwd -rfbport 5907 -rfbwait 30000 -rfbport 5907 -rfbwait 30000 -AcceptCutText=1 -SendCutText=0 -ClientWaitTimeMillis=300000 :3
```


# 관리 자동화 script
## vnc user (계정 추가)

```sh
#!/bin/bash
if [ -z "$1" ]; then
  echo "usage : ./add_vnc_user USERNAME "
  exit 1
fi

useradd $1
echo "VNCUSER!@#asdf" |passwd --stdin $1
passwd -e $1

rm -rf /home/$1/.vnc

#CUR_SVR=`ls /etc/systemd/system |grep vncserver |cut -d: -f2 |cut -d"." -f1 |sort -n |tail -n 1`
#NEXT_SVR=$((CUR_SVR+1))
#NEXT_PORT=$((CUR_SVR+5901))
NEXT_SVR="2"
NEXT_PORT="5902"

echo "next port is $NEXT_PORT"

cp -arp /home/vncserver/vncserver@.service /etc/systemd/system/vncserver@:$NEXT_SVR.service
sed -i s/\<USER\>/"$1"/g /etc/systemd/system/vncserver@:$NEXT_SVR.service
sed -i s/rfbport/"rfbport $NEXT_PORT"/g /etc/systemd/system/vncserver@:$NEXT_SVR.service

systemctl daemon-reload
systemctl enable vncserver@:$NEXT_SVR.service

echo ""
echo "Added systemd : vncserver@:$NEXT_SVR.service"
echo ""
echo "Need to set $1's VNC Desktop password >> "

sudo -u $1 "vncpasswd" << CMD
VNCUSER!@#asdf
VNCUSER!@#asdf

CMD

sleep 2
kill -9 `ps -ef |grep Xvnc |grep $1 |awk '{print $2}'`

echo "$1's vncserver config set."
echo "Run : systemctl start vncserver@:$NEXT_SVR.service"
echo ""
```

## vnc service 매니징
* 생성했었던 전체 서비스들 "start, stop, status, disable, enable"

```sh
#!/bin/bash
# USAGE: all_vncserver [start | stop | status | disable |enable]

if [ -z "$1" ]; then
  echo "usage : ./all_vncserver [start | stop | status | disable |enable]"
  exit 1
fi

VNC_SERVERS=`ls /etc/systemd/system |grep vncserver |sort -t $':' -k2 -g`

for VNC_SERVER in $VNC_SERVERS; do 
  systemctl $1 $VNC_SERVER
  sleep 3
done

echo "done. "
```

## vnc service file sample
* 사용자마다 vnc service 등록해줄 때 사용할 기본 파일

```sh
[Unit]
Description=Remote desktop service (VNC)
After=syslog.target network.target

[Service]
Type=forking
User=byung-u

# Clean any existing files in /tmp/.X11-unix environment
ExecStartPre=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'
ExecStart=/usr/bin/vncserver -rfbport 5901 -rfbwait 30000 -AcceptCutText=1 -SendCutText=0 -ClientWaitTimeMillis=300000 %i
ExecStop=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'

[Install]
WantedBy=multi-user.target
```

## vnc service restart

```sh
#!/bin/bash

/home/vncserver/all_vncserver stop
sleep 10
# 여기에 임시로 사용자가 현재 사용중이던 파일이 남아있어서 신경써서 삭제 필요
rm -rf /tmp/.X11-unix/*
/home/vncserver/all_vncserver start

echo "done"
```
