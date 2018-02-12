---
layout  : wiki
title   : nghttp2
summary : nghttp2
date    : 2018-02-05 15:30:20 +0900
updated : 2018-02-05 15:40:36 +0900
tags    : nghttp2
toc     : true
public  : true
parent  : Productivity
latex   : false
---
* TOC
{:toc}

## 개요
* HTTP/2 C Library and tools 
* 2012년부터 [tatsuhiro-t](https://github.com/tatsuhiro-t){:target="_blank"}가 거의 혼자서 개발함
* 관련 웹사이트
  * [https://nghttp2.org](https://nghttp2.org){:target="_blank"}
  * [https://github.com/nghttp2/nghttp2](https://github.com/nghttp2/nghttp2){:target="_blank"}
* 설명 
  * 이 implementation은 Hypertext Transfer Protecol verseion 2를 C로 구현
  * HTTP/2 프레임의 레이어를 C library로 재사용할 수 있게 구현
  * HTTP/2 server, client, proxy를 구현, [Full document](https://nghttp2.org/documentation/apiref.html){:target="_blank"}
  * HTTP/2의 load test와 밴치마킹을 위한 툴도 개발
  * [HPACK](https://tools.ietf.org/html/rfc7541){:target="_blank"} 인코더와 디코더는 [public API](https://nghttp2.org/documentation/tutorial-hpack.html){:target="_blank"}로 사용가능
  * 최신버전의 C++ library 또한 사용가능
  * 일부 라이브러리에 대한 파이썬 바인딩 지원
