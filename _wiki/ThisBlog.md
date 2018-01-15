---
layout  : wiki
title   : John grib님의 jekyll skeleton 추가 세팅
summary : jekyll skeleton 설정
date    : 2018-01-04 14:46:05 +0900
updated : 2018-01-15 14:46:17 +0900
tags    : vimwiki johngrib 
toc     : true
public  : true
parent  : index
latex   : true
---
* TOC
{:toc}

## 설명
* 최소한의 노력으로 블로깅을 할 수 있는 방법에 관심이 많았는데 <span style="color:red">이건 정말 편리합니다..</span>
* [johngrib-jekyll-skeleton](https://github.com/johngrib/johngrib-jekyll-skeleton){:target="_blank"}을
단순히 [jJ]ohngrib만 제가 사용하는 ID로 바꿔서 쓰려했으나 실패했습니다.
* 확인해서 맞춰줘야 할 것들을 찾아서 모아두었습니다.

## 참고링크
* [MediaWiki 문법](https://www.mediawiki.org/wiki/Help:Formatting){:target="_blank"}
* [vimwiki](https://github.com/vimwiki/vimwiki){:target="_blank"}
  - vi를 열고 `<Leader>ww`  수행하니까 index.md 파일이 열립니다.
  - 아무것도 처음에는 없다. 일단 따라해보니 아래 link에 커서를 두고 엔터치니 바로 생깁니다.

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
  
  * [ [ link ] ]    <-- 실제 사용할때는 "공백 제거"해야하고 저기에 커서를 두어야합니다.
  
  ```
  
  - `[Enter]` 해당 링크로 넘어가고
  - `[Backspace]` 이전 링크로 되돌아가고
  - 이정도면 쉽고 편리하다고 할 수 있을 것 같습니다.
<br /><br />
* [yamljs](https://www.npmjs.com/package/yamljs){:target="_blank"}
  - start.sh 돌려보면 경고가 뜨는데 
  - ~/xxx.gihub.io 디렉토리안에서 패키지 설치 필요
  ```% npm install yamljs```
<br /><br />
* [naver-site-verification](http://webmastertool.naver.com/board/main.naver){:target="_blank"}
  - [관련 블로그](https://m.blog.naver.com/PostView.nhn?blogId=withneedsad&logNo=220651215802&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F){:target="_blank"}는 구지 안봐도 직관적으로 할 수 있습니다.
<br /><br />
* [google-site-verification](https://www.google.com/webmasters/verification/home?hl=ko){:target="_blank"}
  - 파일 업로드 방법을 사용하는데 곧바로 인증 시도하면 안 될수도 있습니다.
  - 한.. 5분 정도 이상하네.. 왜 안되지 하면서 반복시도하다보니 파일로 인증 받았습니다.
<br /><br />
* [google-analystics](https://analytics.google.com/analytics/web/#embed/report-home/a41925802w166845303p167173327/){:target="_blank"}
  - 기존에 adsense만 사용하고 있었는데 이걸 이제서야 사용하게 되었습니다.
<br /><br />
* [google-console](https://www.google.com/webmasters/tools/home?hl=en)
  - robot.txt 확인
  - Sitemap 파일등록
<br /><br />
* [google-search engine](https://cse.google.com/cse/all){:target="_blank"}
  - `search.html` 파일을 열어보니 왠지 그대로 쓰면 안되게 생겼습니다.
  ```html
  var cx = '009589569786427844174:n5gsvy4rj58';
  ```
  - 설정할 때 수익창출 부분 설정 확인하고
  - 검색엔진 새로 만들어서 `코드가져오기`로 가져와서 썼습니다.
<br /><br />
* `start.sh` 실행하다가 에러 발생한 경우 (MacOS)
  * `brew upgrade`를 수행했더니만 ruby가 업그레이드
  ```
==> Upgrading ruby
==> Downloading https://homebrew.bintray.com/bottles/ruby-2.5.0.high_sierra.bottle.tar.gz
######################################################################## 100.0%
==> Pouring ruby-2.5.0.high_sierra.bottle.tar.gz
  ```
<br /><br />
  * 그 결과 `bundle install` 수행하니 경고가 나왔는데, 일단 무시
  ```
Warning: the running version of Bundler (1.16.0) is older than the version that created the lockfile (1.16.1).
We suggest you upgrade to the latest version of Bundler by running `gem install bundler`.
  ```
<br /><br />
  * 그러더니 jekyll을 못 찾고 에러가 발생
  ```
/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/dependency.rb:319:in `to_specs': Could not find 'jekyll' (>= 0.a) among 15 total gem(s) (Gem::LoadError)
Checked in 'GEM_PATH=/Users/byungwoo/.gem/ruby/2.3.0:/Library/Ruby/Gems/2.3.0:/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/gems/2.3.0', execute `gem env` for more information
from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/dependency.rb:328:in `to_spec'
from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_gem.rb:65:in `gem'
from /usr/local/bin/jekyll:25:in `<main>'
  ```	
  * 역시나 [이미 발생한 이슈](https://github.com/jekyll/jekyll/issues/1409){:target="_blank"} <br />
  [Windows OS에서 해결한 사례](https://github.com/juthilo/run-jekyll-on-windows/issues/34#issuecomment-65752021){:target="_blank"}이지만, Mac OS에서도 유효
  ```
$ gem sources --remove https://rubygems.org/
$ gem sources -a http://rubygems.org/
$ gem install jekyll
  ```
<br /><br />
  * 잘 되는가 싶었는데 `start.sh`을 수행하니 에러가..
  ```
/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require': cannot load such file -- bundler (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.7.0/lib/jekyll/plugin_manager.rb:48:in `require_from_bundler'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.7.0/exe/jekyll:11:in `<top (required)>'
	from /usr/local/bin/jekyll:22:in `load'
	from /usr/local/bin/jekyll:22:in `<main>'
  ```
<br /><br />
  * `bundler` 관련 경고를 무시해서 그런가 싶어서 warning에 나온대로 설치하고 잘 됩니다.
  ```
  gem install bundler
  ```
