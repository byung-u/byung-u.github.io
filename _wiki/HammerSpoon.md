---
layout  : wiki
title   : hammerspoon
summary : hammerspoon
date    : 2018-02-12 19:03:14 +0900
updated : 2018-02-12 19:24:38 +0900
tags    : hammerspoon
toc     : true
public  : true
parent  : Productivity
latex   : false
---
* TOC
{:toc}

## 개요
* 카카오톡 오픈채팅에 들어가고 싶은데 1,000명 제한이라 못 들어갔습니다.
* 손으로 일일이 누르다가 도저히 안 되겠다 싶어서 [Mac용 autohotkey를 찾아봤습니다](https://apple.stackexchange.com/questions/153930/autohotkey-equivalent-for-os-x){:target="_blank"}.
* 그래서 발견한 [hammerspoon](http://www.hammerspoon.org/){:target="_blank"}

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

* 구현한 코드
  * 구현은 [test_timer.lua](https://github.com/Hammerspoon/hammerspoon/blob/master/extensions/timer/test_timer.lua){:target="_blank"} 샘플 코드 참고했습니다.
  * `shift + option + K`는 수행 시작 
	* 3초마다 수행
    * 2번의 클릭하는 중간에 1초 sleep
	* 최대 3000번 수행하면 자동 종료 
  * `shift + option + L`는 수행 종료(escape)
    * 수행시 다음 주기에 종료 됨 (플래그 값 변경) 

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
