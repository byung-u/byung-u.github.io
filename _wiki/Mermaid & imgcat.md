---
layout  : wiki
title   : Mermaid & imgcat
summary : Mermaid & imgcat
date    : 2018-01-05 20:59:22 +0900
updated : 2018-01-09 00:22:00 +0900
tags    : mermaid imgcat
toc     : true
public  : true
parent  : Productivity
latex   : false
---
* TOC
{:toc}

## 개요
* 제가 소속된 팀이 변경되면서 메시지의 흐름을 표현할 다이어그램을 그릴일이 많아졌습니다.
* MS PowerPoint로 기존에 그려왔는데, 선하나하나 맞추고 네모 위치 옮기는 불필요한 작업에 시간이 많이 빼앗겼습니다.
* 찾아보니 역시나 좋은 툴이 이미 있었습니다.
  * [Mermaid](https://github.com/knsv/mermaid){:target="_blank"}라는 툴이 있었습니다.
  * 정해진 문법으로 파일을 작성한 후 이를 이미지(png, svg) 파일로 생성해줍니다.
  * 그래프, 간트차트, 플로우차트, 클래스 Diagram, Git grpah, Sequence Diagram을 지원합니다.
* 편리하긴한데 이미지가 제대로 생성되었는지 계속 열어보기 귀찮아졌습니다.
  * Mac의 iterm2에서 수행되는 [imgcat](https://apple.stackexchange.com/questions/256322/how-to-install-imgcat-on-iterm2){:target="_blank"}이라는 bash로 구현된 툴이 있었습니다.
  * 인자값으로 파일만 넣어주면 됩니다. 나머지 옵션은 없음
  ```bash
	function show_help() {
		echo "Usage: imgcat [-p] filename ..." 1>& 2
		echo "   or: cat filename | imgcat" 1>& 2
	}
  ```


## 설치

### Mermaid
* npm으로 [설치](https://www.npmjs.com/package/mermaid){:target="_blank"}
```
npm install mermaid
```

### Imgcat
* [source code](https://raw.githubusercontent.com/gnachman/iTerm2/master/tests/imgcat){:target="_blank"} 그대로 복사해서 사용하면 끝입니다.


## 사용법
  * 저는 Sequence Diagram을 사용했습니다. 
  * [RFC 3261의 Timer C](https://tools.ietf.org/html/rfc3261#section-16.8){:target="_blank"} 만료시 동작에 관한 예시입니다.
  ```
%% Sequence diagram code
sequenceDiagram
    UA1 ->> Proxy1: INVITE
    Proxy1 -->> UA1: 100 Trying
    Proxy1 ->> Proxy2: INVITE
    Proxy2 -->> Proxy1: 100 Trying
    Proxy2 ->> UA2: INVITE
    UA2 ->> Proxy2: 180 Ringing
    activate Proxy2
    Note right of Proxy2: Timer C check <br/>[OK]
    deactivate Proxy2
    Proxy2 ->> Proxy1: 180 Ringing
    activate Proxy1
    Note right of Proxy1: Timer C expired
    deactivate Proxy1
    Proxy1 ->> UA1: 408 Request Timeout
  ```
  * 텍스트 파일 `proxy_timer_c.mmd`을 생성하고 이를 이미지(png) 파일로 변환합니다.
  ```
% mermaid -p proxy_timer_c.mmd
  ``` 
  * 이렇게 하면 될줄 알았는데 에러가 났습니다. [Phantomjs](http://phantomjs.org/download.html){:target="_blank"}경로 설정 문제 같은데, 설정으로 해결은 못했습니다.
  ```
% mermaid -p proxy_timer_c.mmd
You had errors in your syntax. Use --help for further information.
Could not find phantomjs at the specified path.
  ```
  * 옵션을 찾아보니 방법이 있어서 옵션 추가해서 동작 성공했습니다.
  ```
% mermaid -e /usr/local/bin/phantomjs -p proxy_timer_c.mmd
  ```
  * 생성된 이미지 파일을 확인합니다.
  ```
% imgcat proxy_timer_c.mmd.png
  ```
  
  * 잘 나옵니다.
  ![ProxyTimerC]({{ site.url }}/wiki/img/proxy_timer_c.mmd.png){: style="display : padding:1px;"}
 
  * `mmd` 텍스트 파일을 조금씩 수정하면서 바로 이미지 확인이 가능해서 편리합니다.
  ```
  % mermaid -e /usr/local/bin/phantomjs -p proxy_timer_c.mmd; imgcat proxy_timer_c.mmd.png
  ```

## 상세 옵션
 ```
 file    The mermaid description file to be rendered

Options:
  -s --svg             Output SVG instead of PNG (experimental)
  -p --png             If SVG was selected, and you also want PNG, set this flag
  -w --width           width of the generated png (number)
  
  -o --outputDir       Directory to save files, will be created automatically, defaults to `cwd`
  -O --outputSuffix    Suffix to output filenames in front of '.svg' or '.png', defaults to ''
  -e --phantomPath     Specify the path to the phantomjs executable
  -t --css             Specify the path to a CSS file to be included when processing output
  
  -c --sequenceConfig  Specify the path to the file with the configuration to be applied in the sequence diagram
  -g --ganttConfig     Specify the path to the file with the configuration to be applied in the gantt diagram
  
  -h --help            Show this message
  -v --verbose         Show logging
  --version            Print version and quit
  ```
