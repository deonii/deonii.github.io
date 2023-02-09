# 쿠키와 세션

- 목차
    1. 쿠키
    2. 캐시
        1. 검증 헤더
        2. Cache-Control


## 쿠키

쿠키를 사용할때에는 두가지 헤더를 사용한다.

- Set-Cookie: 서버에서 클라이언트로 쿠키 전달한다.(응답시 전달)
- Cookie: 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청시 서버로 전달한다.

HTTP는 무상태(stateless) 프로토콜이기 때문에 클라이언트와 서버가 요청과 응답을 주고 받으면 연결이 끊어진다.

때문에 이전 응답을 기억하지 못하고 서로 상태를 유지하지 않는다.

하지만 클라이언트의 로그인 등의 기능을 위해 사용된다.

쿠키 정보는 항상 서버에 전송된다.

이는 네트워크 트래픽을 추가로 유발하기때문에 최소한의 정보로만 사용한다.(세션 id, 인증 토큰 등)

서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지(localStorage, sessionStorage)를 참고하자.

웹 스토리지는 보안에 취약하여 보안에 민감한 데이터는 저장하면 안된다.(주민번호, 신용카드 번호 등)

쿠키는 expires와 max-age를 통해 생명 주기를 설정할 수 있다.

- expires: expires=Sat, 26-Dec-2020 04:39:21 GMT 과 같이 사용이 가능하다.(날짜 지정)
- max-age: max-age=3600 과 같이 초단위 설정이 가능하다.(예시는 3600초)

만약 만료 날짜가 생략되면 브라우저 종료시 까지만 유지되고(세션 쿠키) 만료 날짜 입력시 해당 날짜까지 유지된다.(영속 쿠키)

본래 쿠키는 http, https 구분하지 않고 전송하지만 secure를 적용하면 https인 경우에만 전송하게된다.

HttpOnly는 XSS 공격을 방지한다. 본래 자바스크립트에서 쿠키에 접근이 가능하나 접근이 불가능하게 변경되고 HTTP 전송에만 사용할 수 있다.

SameSite는 XSRF 공격을 방지한다. 요청된 도메인과 쿠키에 설정된 도메인이 같은 경우에만 쿠키를 전송한다.

## 캐시

이미지 파일을 호출한다고 가정하자.

총 1.1MB의 이미지 파일을 호출하면 최초에는 서버로부터 이미지 파일 전체를 받아온다.

캐시를 사용하게 되면 이 이미지 파일을 브라우저 캐시에 저장하게 된다.

만약 사용자가 같은 이미지 파일을 호출하게 되면 먼저 브라우저 캐시를 확인해 해당 파일이 있는지 확인한다.

만약 있다면 max-age를 확인해서 만료 여부를 확인하고 추가적인 호출 없이 이미지를 띄운다.

이 덕분에 캐시 가능 시간동안 네트워크를 사용하지 않아도 되며 브라우저 로딩 속도가 매우 빨라진다.

### 검증 헤더

캐시로 저장된 이미지 파일이 만료된 상황을 가정하자.

만료된 파일을 매번 새로 받아와도 되지만 만료된 캐시 파일을 재사용하는 방법 또한 존재한다. 방법은 다음과 같다.

서버에서 이미지를 보낼때 마지막 수정시간을 같이 보낸다.

캐시를 저장할 때 마지막 수정시간을 같이 저장한다.

캐시가 만료된 파일을 요청할때 마지막 수정시간을 같이 보낸다.(Last-Modified 헤더를 사용한다.)

서버에서 데이터의 갱신 여부를 확인하고(If-Modified-Since 헤더를 사용한다.) 갱신되지 않았다면 304 Not Modified + 헤더 메타 정보만 응답한다.(이미지 파일에 해당하는 바디는 보내지 않는다.)

응답을 확인하고 캐시 파일의 만료시간을 갱신해서 재사용한다.

이러한 방식은 날짜 기반의 로직을 사용하게 된다.

만약 날짜 기반이 아니라 서버의 로직 기반으로 캐시를 관리하고 싶다면 Etag를 사용하면 된다.

Etag에 통해 해쉬 코드를 부여해서 갱신 여부를 서버에서 완전히 관리하는것이다.

### Cache-Control

캐시 지시어라 한다.

- Cache-Control: max-age -> 캐시 유효 시간으로 관리한다.
- Cache-Control: no-cache -> 캐시로 저장해도 되지만 매번 검증 헤더를 통해 확인 후 사용한다.
- Cache-Control: no-store -> 민감한 정보가 있으므로 저장하면 안된다.(메모리에서 사용하고 최대한 빨리 삭제)
