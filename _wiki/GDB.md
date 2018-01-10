---
layout  : wiki
title   : GDB
summary : GDB
date    : 2018-01-05 20:59:22 +0900
updated : 2018-01-10 17:15:36 +0900
tags    : GDB
toc     : true
public  : true
parent  : Productivity
latex   : false
---
* TOC
{:toc}

## 개요

##

```
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




