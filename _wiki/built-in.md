---
layout  : wiki
title   : Python Built-in
summary : 내장함수
date    : 2018-01-16 10:09:51 +0900
updated : 2018-03-12 16:35:36 +0900
tags    : built-in
toc     : true
public  : true
parent  : Python
latex   : false
---
* TOC
{:toc}

## 파이썬 내장함수 예제 모음
* 직관적으로 이해가 되지 않는 함수들의 예제를 모아둡니다.

### hasattr
* Attribute 가지고 있는지 확인, [출처](https://docs.python.org/3.7/library/functions.html#hasattr){:target="_blank"}

```python
class foobar():
    data = [1, 2, 3, 4]
    def __init__(self, val):
        self.val = val


def main():
    x = foobar
    y = foobar(['a', 'b'])
    z = foobar([1, 2])

    # data는 함수 선언에 관계없이 모두 가집니다.
    print(hasattr(x, 'data'))  # True
    print(hasattr(y, 'data'))  # True
    print(hasattr(z, 'data'))  # True

    print(hasattr(x, 'val'))  # False  `x = foobar`로 초기화 할때 val이 없으므로
    print(hasattr(y, 'val'))  # True
    print(hasattr(z, 'val'))  # True


if __name__ == '__main__':
    main()
```

### getattr
* Attribute 가져오기, [출처](https://docs.python.org/3.7/library/functions.html#getattr){:target="_blank"}
* 만약에 Attribute가 없는데 호출하면 `AttributeError`를 raise 함.
  * `AttributeError: type object 'foobar' has no attribute 'val'`

```python
class foobar():
    data = [1, 2, 3, 4]
    def __init__(self, val):
        self.val = val


def main():
    x = foobar
    if hasattr(x, 'data'):
        print(getattr(x, 'data'))  # [1, 2, 3, 4]

    if hasattr(x, 'val'):
        print(getattr(x, 'val'))   # 호출되지 않음


if __name__ == '__main__':
    main()
```
