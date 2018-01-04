---
layout  : wiki
title   : John grib님의 jekyll skeleton으로 내 블로그 꾸미기
summary : jekyll skeleton 설정
date    : 2018-01-04 14:46:05 +0900
updated : 2018-01-04 16:25:57 +0900
tags    :
toc     : true
public  : true
parent  : index
latex   : true
---
* TOC
{:toc}

## 설명
* [johngrib-jekyll-skeleton](https://github.com/johngrib/johngrib-jekyll-skeleton)을
단순히 [jJ]ohngrib 만 바꿔가지고는 몇몇 부분을 제대로 사용할 수 없어서 정리.
* 최소한의 노력으로 블로깅을 할 수 있는 방법에 관심이 많았는데 써보니 완전 최고다.

## 참고링크
* [vimwiki](https://github.com/vimwiki/vimwiki)
  - vi를 열고 `<Leader>ww`  수행하니까 index.md 파일이 열린다.
  - 아무것도 처음에는 없다. 일단 따라해보니 아래 link에 커서를 두고 엔터치니 바로 생긴다.

  ```wiki
  ---
  layout  : wikiindex
  title   : wiki index
  date    : 2018-01-03 16:14:23 +0900
  updated : 2018-01-04 14:45:31 +0900
  tags    : index
  toc     : true
  public  : true
  comment : false
  ---
  
  * [ [ link ] ]    <-- 실제 사용할때는 "공백 제거"
  
  ```
  
  - `[Enter]` 해당 링크로 넘어가고
  - `[Backspace]` 이전 링크로 되돌아가고
  - 와.. 최고다.
<br /><br />
* [yamljs](https://www.npmjs.com/package/yamljs)
  - start.sh 돌려보면 경고가 뜨는데 
  - ~/xxx.gihub.io 디렉토리안에서 패키지 설치 필요
  ```% npm install yamljs```
<br /><br />
* [naver-site-verification](http://webmastertool.naver.com/board/main.naver)
  - [관련 블로그](https://m.blog.naver.com/PostView.nhn?blogId=withneedsad&logNo=220651215802&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F)는 구지 안봐도 직관적으로 할 수 있다.
<br /><br />
* [google-site-verification](https://www.google.com/webmasters/verification/home?hl=ko)
  - 파일 업로드 방법을 사용하는데 곧바로 인증 시도하면 안 될수도 있다.
  - 한.. 5분 정도 이상하네.. 왜 안되지 하면서 반복시도하다보니 인증 받음
<br /><br />
* [google-analystics](https://analytics.google.com/analytics/web/#embed/report-home/a41925802w166845303p167173327/)
  - 기존에 adsense만 사용하고 있었는데 이걸 이제서야 사용하게 되었다..

* [google-search engine](https://cse.google.com/cse/all) 설정할 때 수익창출 부분 설정 확인
  - `search.html` 파일을 열어보니 왠지 그대로 쓰면 안되게 생겼다.
  ```html
  var cx = '009589569786427844174:n5gsvy4rj58';
  ```
  - 검색엔진 새로 만들어서 `코드가져오기`로 가져와서 쓴다.


