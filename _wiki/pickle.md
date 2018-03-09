---
layout  : wiki
title   : Python pickle
summary : Python pickle
date    : 2018-01-16 10:09:51 +0900
updated : 2018-03-09 14:51:01 +0900
tags    : pickle
toc     : true
public  : true
parent  : Python
latex   : false
---
* TOC
{:toc}

## 개요
* [pickle](https://docs.python.org/3/library/pickle.html){:target="_blank"} (Python object serialization)
* Pickle 사용하는 케이스 [출처: stackoverflow](https://stackoverflow.com/a/3439921/8163714){:target="_blank"}

  <pre> 1) **프로그램의 상태를 디스크에 저장해서 다시 시작했을 때, 중단했던 위치에서 다시 실행할 수 있습니다.** <br />
  saving a program's state data to disk so that it can carry on where it left off when restarted (persistence)
  
  2) **TCP로 통신하는 멀티 코어나 분산 시스템에 파이썬 데이터 전송할 때 사용할 수 있습니다.** <br />
  sending python data over a TCP connection in a multi-core or distributed system (marshalling)
  
  3) **파이썬 오브젝트를 DB에 저장할 수 있습니다.** <br />
  storing python objects in a database
  
  4) **임의의 파이썬 오브젝트를 문자열로 변환할 수 있어서 딕셔너리의 키로 사용할 수 있습니다.** <br />
  converting an arbitrary python object to a string so that it can be used as a dictionary key (e.g. for caching & memoization).
  </pre>

## 예시
* 파이썬 배열을 디스크에 dump & load 하기. [출처: python tips](https://pythontips.com/2013/08/02/what-is-pickle-in-python/){:target="_blank"}

  ```python
  #!/usr/bin/env python3
  import pickle
  
  a = ['test value','test value 2','test value 3']
  print(a)
  # >>> ['test value','test value 2','test value 3']
  
  file_Name = "PtestFile"
  # open the file for writing
  fileObject = open(file_Name,'wb')
  
  # this writes the object a to the
  # file named 'testfile'
  pickle.dump(a,fileObject)
  
  # here we close the fileObject
  fileObject.close()
  # we open the file for reading
  fileObject = open(file_Name,'rb')
  # load the object from the file into var b
  b = pickle.load(fileObject)
  print(b)
  # >>> ['test value','test value 2','test value 3']
  print(a == b)
  # >>> True
  ```

* 파이썬 배열을 TCP 송수신하기 [출처: stackoverflow](https://stackoverflow.com/a/24424025/8163714){:target="_blank"}

  ```python
  ##############
  # Client Side
  ##############
  import socket, pickle
  
  HOST = 'localhost'
  PORT = 50007
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.connect((HOST, PORT))
  arr = ([1,2,3,4,5,6],[1,2,3,4,5,6])
  data_string = pickle.dumps(arr)
  s.send(data_string)
  
  data = s.recv(4096)
  data_arr = pickle.loads(data)
  s.close()
  print 'Received', repr(data_arr)
  ```
  
  ```python
  ##############
  # Server Side
  ##############
  import socket
  
  HOST = 'localhost'
  PORT = 50007
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.bind((HOST, PORT))
  s.listen(1)
  conn, addr = s.accept()
  print 'Connected by', addr
  while 1:
      data = conn.recv(4096)
      if not data: break
      conn.send(data)
  conn.close()
  ```
<br />  <br />  

