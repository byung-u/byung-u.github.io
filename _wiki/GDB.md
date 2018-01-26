---
layout  : wiki
title   : GDB
summary : GDB
date    : 2018-01-05 20:59:22 +0900
updated : 2018-01-26 11:41:33 +0900
tags    : GDB
toc     : true
public  : true
parent  : Productivity
latex   : false
---
* TOC
{:toc}

## 개요
C 개발합니다보니 gdb없이는 디버깅이 어려울때가 많아서 정리합니다

## 구조체 변수 따라가기
* 심볼 테이블에 대해 확인하기 위한 명령어 예시입니다
* [매뉴얼 확인](https://ftp.gnu.org/old-gnu/Manuals/gdb/html_node/gdb_toc.html){:target="_blank"}

### 확인할 frame과 구조체 확인
```c
(gdb) bt
	...
	
(gdb) frame 9
#9  0x00002b459abc0e5f in test_GenCancelTrct (pStParser=0x7bb3590, pStTrct=0x2aab1a951e50) at test_Utility.c:834
834 test_Utility.c: 그런 파일이나 디렉토리가 없음.
    in test_Utility.c
```	

### 소스코드 봐가면서 따라가기
* [매뉴얼 확인](https://sourceware.org/gdb/onlinedocs/gdb/Symbols.html){:target="_blank"}
* 본 예제에서 확인해야할 구조체 이름은 `pStTrct`

```c
(gdb) whatis pStTrct
type = stTrct_t *

(gdb) ptype pStTrct
 type = struct _stTrct_t {
    ...
    test_common_msg_t *pStRequest;
    ...
} *

(gdb) ptype pStTrct->pStRequest
type = struct {
    ...
    test_parsed_msg_t *test_parsed_msg;
    ...
} *

(gdb) ptype pStTrct->pStRequest->test_parsed_msg
type = struct {
    ...
    test_header_index_t test_header_index[100];
    ...
} *

(gdb) ptype pStTrct->pStRequest->test_parsed_msg->test_header_index
type = struct {
    ...
    int test_added_current_sub_index;
    ...
} 

(gdb) ptype pStTrct->pStRequest->test_parsed_msg->test_header_index[84].test_current_sub_index
type = int

(gdb) p pStTrct->pStRequest->test_parsed_msg->test_header_index[84].test_current_sub_index
$1 = 10923
```

### 버퍼의 Index 정보 바꿔가며 확인
* 위에서 test_header_index의 배열이 최대 114개까지 사용할 수 있는데 이를 일일이 실행하기 너무 어려웠고, 개수를 세지도 못했습니다.
* 그래서 Loop 돌릴 방법을 찾았습니다.
  
  
#### 방법 1 (수동 변경)
* 이렇게 하면 i의 index가 하나씩 증가하면서 위에 보다는 조금 편리합니다.
* 114개 일일이 수행해야하므로 불편한건 마찬가지였습니다.

```c
(gdb) set $i=0 
(gdb) p pTrct->pStRequest->test_parsed_msg.test_header_index[$i++].test_curreut_sub_index
```


#### 방법 2 (while 사용)
* while문을 사용하니 완전 편리합니다. [출처는 stackoverflow](https://stackoverflow.com/a/31678832/8163714){:target="_blank"}
* 인덱스 정보까지 출력해주니 보기에도 좋습니다.

```c
(gdb) set $i=0
(gdb) while($i < 115)
>printf "[%d] %d\n", $i, pTrct->pStRequest->test_parsed_msg.test_header_index[$i].test_current_sub_index
>set $i=$i+1
>end
```

## Running Process에 Attach
* 기동중인 프로세스에 붙어서 확인합니다.
* PID를 우선확인합니다.

```c
% gdb
	...

(gdb) attach 4710
	...

(gdb) info threads
	...

(gdb) break xxx_parsing_contents
Function "xxx_parsing_contents" not defined.
Make breakpoint pending on future shared library load? (y or [n]) n

(gdb) b MXXXX_Util.c:5288
Breakpoint 1 at 0x4582f7: file MXXXX_Util.c, line 5288.

```
