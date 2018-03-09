---
layout  : wiki
title   : Python Generator
summary : Python Generator
date    : 2018-03-03 10:09:51 +0900
updated : 2018-03-09 14:41:34 +0900
tags    : Generator
toc     : true
public  : true
parent  : Python
latex   : false
---
* TOC
{:toc}

## 개요
  * 메모리 절약의 장점
  <pre>
  Project Euler 문제를 풀다보면 prime sieve를 해서 1 ~ n 미만인 소수에서 
  특정 연산을 수행하는 경우가 잦았습니다.
  1 ~ n 까지 loop를 돌면서 [2, 3, 5, 7, 11, 13 ....] 리스트로 저장한 후에 
  이를 다시 `for arr in arrays:` 와 같은 방식으로 또 loop를 돌려서 했더니
  코드도 지저분하고 loop도 2번 돌고 메모리에 들고 있어야 하니 메모리도 먹고
  10 ** 18 으로 커지면 메모리에 다 들고 있을 수도 없었습니다.
  
  그래서 찾아보니 generator가 있었고 메모리에 다 들고 있을 필요없고
  loop 돌면서 generator 함수를 호출하면 
  호출할 때마다 갱신된 겂을 yield로 반환해줘서 
  효과적으로 처리할 수 있었습니다.
  </pre>
  * 제너레이터 함수를 사용하면 iterator(반복자) 처럼 동작하는 함수를 선언할 수 있습니다.
  * Generator functions allow you to declare a function that behaves like an iterator, i.e. it can be used in a for loop.[^1]

### Iterator [^3]
  * An iterable object is an object that implements `__iter__. __iter__` is expected to return an iterator object. [^2]
  * An iterator is an object that implements `next`.  <br />
    `next` is expected to return the next element of the iterable object that returned it,  <br />
	and raise a StopIteration exception when no more elements are available. [^2]
  * `iterator`는 `next`를 수행하는 하나의 오브젝트입니다. <br />
    `next`는 다음 elements를 리턴해주고, 다음 element가 없으면 `StopIteration` 처리합니다.
  * [Dictionary Iterators](https://www.python.org/dev/peps/pep-0234/#dictionary-iterators){:target="_blank"}
  
```python
if k in dict: ...
# which is equivalent to

if dict.has_key(k): ...
# Dictionaries implement a tp_iter slot that returns an efficient iterator
# that iterates over the keys of the dictionary. 
# During such an iteration, # the dictionary should not be modified, 
# except that setting the value for an existing key is allowed 
# (deletions or additions are not, nor is the update() method). 
# This means that we can write

for k in dict: ...
# which is equivalent to, but much faster than

for k in dict.keys(): ...
# as long as the restriction on modifications to the dictionary (either by the loop or by another thread) are not violated.

# Add methods to dictionaries that return different kinds of iterators explicitly:

for key in dict.iterkeys(): ...

for value in dict.itervalues(): ...

for key, value in dict.iteritems(): ...
```

  * [File iterators](https://www.python.org/dev/peps/pep-0234/#file-iterators){:target="_blank"}

``` python
Files implement a tp_iter slot that is equivalent to iter(f.readline, ""). This means that we can write

for line in file:
    ...
as a shorthand for

for line in iter(file.readline, ""):
    ...
which is equivalent to, but faster than

while 1:
    line = file.readline()
    if not line:
        break
    ...
```
	
### yield [^4]

## 예제
  * 소수(Prime number) 생성하는 예를 보고나면 좀더 이해하기 쉽습니다. [^5]

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
def gen_primes(limit):
    D = {}
    q = 2
    while q <= limit:
        if q not in D:
            yield q  # 소수를 generate합니다. 
            D[q * q] = [q]
        else:
            for p in D[q]:
                D.setdefault(p + q, []).append(p)
            del D[q]
        q += 1


print([i for i in gen_primes(100)])

# 실행결과
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
```
  * 코드 설명 
    * 100 이하의 소수를 출력합니다. 
    - 소수를 generate할 `gen_primes()`를 구현합니다.
	- 소수 조건에 맞으면 `yield`를 호출합니다.
	- for 루프를 돌때마다 새로운 값이 호출 되어 다음 값을 generate 합니다.


## 참조

[^1]: [Python wiki Generator](https://wiki.python.org/moin/Generators){:target="_blank"}
[^2]: [Python wiki Iterator](https://wiki.python.org/moin/Iterator){:target="_blank"}
[^3]: [Python pep-0234 Iterator](https://www.python.org/dev/peps/pep-0234/){:target="_blank"}
[^4]: [Python pep-0255 yield](https://www.python.org/dev/peps/pep-0255/#specification-yield){:target="_blank"}
[^5]: [Prime Number generator sample](https://stackoverflow.com/a/568618/8163714){:target="_blank"}
