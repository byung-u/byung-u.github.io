---
layout  : wiki
title   : mutt로 Gmail 사용하기
summary : Gmail with mutt
date    : 2018-01-05 20:59:22 +0900
updated : 2018-01-09 15:47:41 +0900
tags    : mutt gmail
toc     : true
public  : true
parent  : Productivity
latex   : false
---
* TOC
{:toc}

## 개요
* 찾아보니 [Mutt](http://www.mutt.org/){:target="_blank"}라는 client가 있었습니다.
  * 홈페이지의 첫글이 제맘을 사로잡았습니다.
  * <span style="color:red">All mail clients suck. This one just sucks less.</span> -me, circa 1995
    * 만든이의 분노가 서려있는걸 보니 왠지 mutt에는 신뢰가 갔습니다.
    * 1995라 적혀있길래 오래됐다 싶었는데 지금도 [진행중인 프로젝트](https://gitlab.com/muttmua/mutt/commits/master){:target="_blank"}였습니다.
* 개인메일은 Gmail을 사용하는데 점차 쌓여가고 지저분해지는 메일함이 보기 싫었습니다.
* 그래서 간단히 터미널에서 메일을 `읽고, 지우기`만 하고 싶었습니다.

## 설치
* Mac을 쓰다보니 brew로 편리하게
```
brew install mutt
```

## 설정
* 캐쉬저장할 디렉터리 만들어주고
```
% mkdir -p ~/.mutt/cache
```

* 설정파일 열고
```
% vim ~/.muttrc 
```

* 실제 사용할때 필요한 정보들 세팅합니다.
```vim
 set imap_user = "$GMAIL_ID@gmail.com" 
 set imap_pass = "$GMAIL_PW" 
 set smtp_url = "smtp://$GMAIL_ID@smtp.gmail.com:587/" 
 set smtp_pass = "$GMAIL_PW" 
 set from = "$GMAIL_ID@gmail.com" 
 set realname = "$사용자이름" 
 set folder = "imaps://imap.gmail.com:993" 
 set spoolfile = "+INBOX" 
 set postponed = "+[Gmail]/Drafts" 
 set header_cache = ~/.mutt/cache/headers 
 set message_cachedir = ~/.mutt/cache/bodies 
 set certificate_file = ~/.mutt/certificates 
 set move = no 
 set smtp_authenticators = "gssapi:login"
```

## 실행
* 자동으로 gmail 로그인하고 수신한 메일을 보여줍니다.
```
% mutt
```
* 그냥 텍스트로만 구성된건 상관없는데 대부분의 메일들이 html 형식으로 작성되서 오다보니 태그들도 같이 보입니다.
* 뭐,, 개인적으로는 불필요한 이미지들과 꾸민 것들을 보는것 보다는 단순 텍스트가 훨씬 낫다는 생각입니다.
* 일부 가렸지만 대충 이런 느낌으로 보입니다.

![Mail open]({{ site.url }}/wiki/img/mutt_1.png?style=centerimg)

{:.image-caption}
*Figure 1. Mail open*

## 사용법
* 기본동작은 vim과 유사하고 top 메뉴를 보면 알 수 있습니다.	
* 방향키로 메일제목에 커서를 두고 `d`만 누르면 메일을 삭제합니다.

## 계정이 여러개
* 계정이 하나 더 있어서 설정으로 변경해서 사용했었습니다.
* 요약하면 F2, F3키 `(키는 내가 정하기 나름)`로 계정을 스위칭해가면서 로그인하여 메일을 확인할 수 있습니다.
* 써봤는데 그렇게 편하지는 않아서 다시 1개의 계정만 사용하고 있습니다.
* 그래도 혹시나 궁금하실 수 있으니 [여기 링크](https://gist.github.com/miguelmota/9456162){:target="_blank"} 참고해서 설정을 따라서 하면 됩니다.
