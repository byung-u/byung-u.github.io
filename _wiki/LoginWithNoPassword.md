---
layout  : wiki
title   : Logint SSH with no password
summary : 인증키로 로그인하기
date    : 2018-03-15 11:30:22 +0900
updated : 2018-03-15 15:08:43 +0900
tags    : ssh
toc     : true
public  : true
parent  : SSH
latex   : false
---
* TOC
{:toc}

## 개요
* 스크립트로 수십대의 서버의 특정 정보를 가져와야하는 상황입니다.
* 로그인할 떄 비밀번호 매번 입력할 수가 없는 상황입니다.


## 방법
### ssh-keygen 명령어로 생성
* 스크립트를 실행할 (다른서버들에 접속을 시도 할) 서버에서 키를 생성합니다. <br />
   명령어 `ssh-keygen -t rsa`

```
% ssh-keygen -t rsa

Generating public/private rsa key pair.
Enter file in which to save the key (/home/jeon/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/jeon/.ssh/id_rsa.
Your public key has been saved in /home/jeon/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:YmIm1qzCJyD8qEIx0z5NFoU66xmN+fK99gjzDOoqve4 jeon@jeon
The key's randomart image is:
+---[RSA 2048]----+
|      o.         |
|     o           |
|  . . .          |
|.+ * o           |
|o.B / o S        |
|+oo% = .         |
|o=oo=+           |
|+.++..B..        |
|++E+o..*o.       |
+----[SHA256]-----+
```

### ssh-copy-id 명령어로 키 복사
* 생성할 키를 접속할 서버에 복사합니다. <br />
  명령어 `ssh-copy-id -i ~/.ssh/id_rsa.pub [user]@[host]` + `비밀번호 입력`
  
```  

% ssh-copy-id -i ~/.ssh/id_rsa.pub test@10.10.3.201
/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/jeon/.ssh/id_rsa.pub"
/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
test@10.10.3.201's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'test@10.10.3.201'"
and check to make sure that only the key(s) you wanted were added.
```  

* 접속하려는 서버에 다른 키가 존재하면 에러처리 해줍니다. `덮어쓰기 방지`

```
% ssh-copy-id -i ~/.ssh/id_rsa.pub test@10.10.3.201
/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/jeon/.ssh/id_rsa.pub"
/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed

/bin/ssh-copy-id: WARNING: All keys were skipped because they already exist on the remote system.
		(if you think this is a mistake, you may want to use -f option)
```

* 이제 `ssh test@10.10.3.201` 명령어만 입력하면 비밀번호 없이 접속할 수 있습니다.
  
### 만약 비밀번호를 계속 물어본다면?
* 원격(내가 붙어서 뭔가 조회할) 서버의 퍼미션 문제일 수 있습니다.

```
chmod 700 ~/.ssh/
chmod 600 ~/.ssh/authorized_keys
```
