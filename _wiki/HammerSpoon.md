---
layout  : wiki
title   : Hammerspoon
summary : Hammerspoon
date    : 2018-02-12 19:03:14 +0900
updated : 2018-02-13 11:58:34 +0900
tags    : Hammerspoon
toc     : true
public  : true
parent  : Productivity
latex   : false
---
* TOC
{:toc}

## 개요
* 카카오톡 오픈채팅에 들어가고 싶은데 1,000명 제한이라 못 들어갔습니다.
  * 참고로 채팅방에 들어갈때까지 돌리려고 했으나 Kakao에서 횟수 제한을 두어 일정 횟수가 초과하면 너무 많이 시도했다고 팝업 메시지가 바뀌면서 못 들어갑니다.
  
  ![KakaoOpenChatLoginTry]({{ site.url }}/wiki/img/KakaoOpenChatLoginTry.png?style=centerimg)
  
* `2번의 확인`을 직접 계속 누르다가 도저히 안 되겠다 싶어서 [Mac용 autohotkey를 찾아](https://apple.stackexchange.com/a/220913){:target="_blank"}봤습니다.
* 그래서 발견한것이 [hammerspoon](http://www.hammerspoon.org/){:target="_blank"}입니다.

## 설치
* 최신 패키지를 [Download](https://github.com/Hammerspoon/hammerspoon/releases/latest){:target="_blank"}합니다.
  * 직접 build해서 사용하지 않는다면 xxx.zip 파일을 다운로드합니다.
* 압축을 풀고 응용프로그램(Application) 폴더에 옮기면 끝입니다.

## 설정
* 설정하려고 찾아보니 이미 [기계인간님의 블로그](https://johngrib.github.io/blog/2017/07/31/hammerspoon-tutorial-00-start/#%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%84%A4%EC%A0%95){:target="_blank"}가 존재합니다.
* 기본 동작을 위한 `init.lua` 설정도 기계인간님의 블로그를 보시면 됩니다.

## 마우스 반복 클릭
* 제게 필요한 마우스의 반복 클릭
  * 2번의 클릭이 반복적으로 필요
  * 마우스의 x, y 좌표는 Mac에서 단축키 (`shift + command + 4`) 눌러주면 보입니다.
  * 참고로 해당 단축키는 스크린 샷에 사용되는 단축키라서 드레그하면 스크린 샷이 저장됩니다.

* 주의 사항(당황했던 상황)
  * 1초 간격으로 타이머를 주고 실행했는데 `escape` 로직을 미구현함
  * 멈출 방법은 없고, 마우스는 계속 클릭되는 상황 발생
  * 1초 사이사이에 겨우겨우 터미널 새로 열고 `reboot` 명령을 수행해서 끝냄
  * 무한 반복 작업 수행시 <span style="color:red">escape 로직 반드시 구현</span> 해야 합니다.
  * 아마도 단축키로 escape 할 수 있을 것 같은데 저는 못 찾았습니다.

* 구현 ([test_timer.lua](https://github.com/Hammerspoon/hammerspoon/blob/master/extensions/timer/test_timer.lua){:target="_blank"} 샘플 코드 참고)
  * `shift + option + K`는 수행 시작 
	* 3초마다 수행
    * 2번의 클릭하는 중간에 1초 sleep
	* 최대 3000번 수행하면 자동 종료 
  * `shift + option + L`는 수행 종료(escape)
    * 수행시 다음 주기에 종료 됨 (플래그 값 변경) 
  * 구현을 다 한 후에는 `Reload config`를 수행해서 반영합니다.

  ![HammerspoonConfig]({{ site.url }}/wiki/img/HammerspoonConfigReload.png?style=centerimg)

  * 마우스 클릭은 [hs.eventtap](http://www.hammerspoon.org/docs/hs.eventtap.html){:target="_blank"}을 이용했습니다.
    * `hs.eventtap.leftClick(point[, delay])`으로 delay를 줄 수 있습니다.
    * 사용하는 뱡법: `hs.eventtap.leftClick({x=732, y=530}, 1000000)`
  * leftClick의 동작을 보면 delay를 주는 타이밍이 마우스 클릭하고 떼기 전까지 멈춥니다.

  ```lua
   function module.leftClick(point, delay)
      if delay==nil then
          delay=200000
      end
  
      module.event.newMouseEvent(module.event.types["leftMouseDown"], point):post()
      timer.usleep(delay)  -- 요 부분에서 delay를 줌
      module.event.newMouseEvent(module.event.types["leftMouseUp"], point):post()
   end 
  ```
  * 그래서 저처럼 1곳을 클릭하고 잠시 쉬었다가 다른 화면의 1곳을 클릭하는 경우에는 동작이 안됩니다.
    * `[X]` A를 클릭하고 있다가 뗌과 동시에 B를 클릭하기 때문에 안됩니다.
	* `[O]` A를 클릭하고 떼고 잠시 대기하고 B를 클릭해서 정상 동작합니다.
  * 실제 구현할 때는 delay는 세팅하지 않고 클릭하고 그 중간에 sleep을 추가해서 구현했습니다.	

  ```lua
     hs.eventtap.leftClick({x=1655, y=588})
     hs.timer.usleep(1000000)
     hs.eventtap.leftClick({x=978, y=339})
  ```
 
* 구현한 코드

```lua
hs.timer = require("hs.timer")
kgtTimerValue = nil

--[[ Kakao Group Talk
    - shift + option + K : start
--]]
hs.hotkey.bind({'shift', 'option'}, 'K', function()
    -- assertIsNil(kgtTimerValue)
    hs.alert.show('Start!')
    kgtTimerValue = 0
    hs.alert.show(kgtTimerValue)
    kakaoGroupTalkTimer = hs.timer.doEvery(3, function()
                                       if kgtTimerValue > 3000 then
                                         hs.alert.show('Stop!')
                                         timer:stop()
                                         assertFalse(timer:running())
                                       else
                                         kgtTimerValue = kgtTimerValue + 1
                                       end
                                       hs.eventtap.leftClick({x=1655, y=588})
                                       hs.timer.usleep(1000000)
                                       hs.eventtap.leftClick({x=978, y=339})
                                    end)
    assertIsUserdataOfType("hs.timer", kakaoGroupTalkTimer)
    assertTrue(kakaoGroupTalkTimer:running())
    kgtTimerValue = 0
    return success()
end)
--[[ Kakao Group Talk
    - shift + option + L : stop
--]]
hs.hotkey.bind({'shift', 'option'}, 'L', function()
    kgtTimerValue = 10000
end)
```
