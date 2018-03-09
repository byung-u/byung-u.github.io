---
layout  : post
title   : LDAP 설치 실패
summary : Fedora 24
date    : 2018-02-07 17:11:08 +0900
updated : 2018-03-09 15:21:38 +0900
toc     : true
tags    : ldap
comment : true
public  : true
---
* TOC
{:toc}

## LDAP 설치 실패 (Fedora 24)
  * 새로운 프로젝트에서 LDAP을 이용해서 통신한다기에 좀 알아보고자 설치를 하는 과정에 계속 실패해서 그 결과를 기록합니다.
  * [공식 홈페이지](http://www.openldap.org/software/download/){:target="_blank"}에서 다운로드해서 설치하려고 `./configure`를 실행했는데 에러가 발생했습니다.
	```shell
	configure: error: BDB/HDB: BerkeleyDB not available
	```
    대충 [stackoverflow를 찾아보면](https://stackoverflow.com/a/3848203/8163714){:target="_blank"} 아래 패키지를 설치해도 해결이 안 되었습니다.
	```shell
	yum install db4-devel
 	yum install openldap-servers openldap-clients
	```
  * 결국 직접 [BerkeleyDB를 다운로드](http://www.oracle.com/technetwork/database/database-technologies/berkeleydb/downloads/index.html){:target="_blank"}해서 설치했습니다. 그런데 또 `./configure` 하는데 에러가 났습니다.
	```shell
	configure: error: BerkeleyDB version incompatible with BDB/HDB backends
	```
    또 뒤져보니 [stackoverflow에](https://stackoverflow.com/a/34023615/8163714){:target="_blank"} 있었습니다.
	`configure` 파일에 가보니 원인은 제가 설치한 BerkeleyDB 버전에 있었습니다.
	```shell
    20385 #define DB_VERSION_FULL        ((DB_VERSION_MAJOR<<16)|(DB_VERSION_MINOR<<8)|DB_VERSION_PATCH)
    20386 
    20387 /* require 4.4 or later, but less than 6.0.20 */
    20388 #if DB_VERSION_FULL >= 0x040400 && DB_VERSION_FULL < 0x060014
    20389         __db_version_compat
    20390 #endif
    20391 #if DB_VERSION_FULL >= 0x060014
    20392 #error "BerkeleyDB 6.0.20+ license is incompatible with LDAP"
    20393 #endif

	```
	제가 설치했던 패키지는 6.2 였는데 6.0.20 이상의 버전은 라이센스 문제가 있어서 막아두었습니다.
	하위 버전으로 [5.3을 다운로드](http://www.oracle.com/technetwork/database/database-technologies/berkeleydb/downloads/index-082944.html){:target="_blank"}해서 설치했습니다.
	
  *	`./configure`로는 또 설치가 실패했고, [해결 방법](http://www.openldap.org/faq/data/cache/1113.html){:target="_blank"}을 참고해서 아래의 명령어로 설치했습니다.
	```shell
	LD_LIBRARY_PATH="/usr/lib:/usr/local/lib:/usr/local/BerkeleyDB.5.3/lib:/usr/local/ssl/lib" LDFLAGS="-L/usr/local/lib -L/usr/local/BerkeleyDB.5.3/lib -L/usr/local/ssl/lib" CPPFLAGS="-I/usr/local/include -I/usr/local/BerkeleyDB.5.3/include -I/usr/local/ssl/include" ./configure --enable-bdb --enable-crypt --with-tls
	```

