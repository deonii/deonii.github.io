# 인터넷 네트워크

- 목차
    1. 인터넷 프로토콜(IP)
        1. IP 프로토콜의 한계
    2. TCP
        1. TCP 3 way handshake
        2. 데이터 전달 보증
        3. 순서 보장
    3. UDP
    4. PORT
    5. DNS
    6. URI
    7. URL
        1. scheme
        2. userinfo
        3. host
        4. path
        5. query
        6. fragment
    8. 웹 브라우저 요청 흐름


## 인터넷 프로토콜(IP)

각 PC에 IP를 부여하고 우편을 보내듯 보내는곳, 받는곳을 IP를 통해 패킷(Packet)이라는 통신 단위로 데이터를 전달하는 방법이다.

### IP 프로토콜의 한계

- 비연결성
    - 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷 전송
- 비신뢰성
    - 중간에 패킷이 사라지는것에 대한 확신이 없음
    - 패킷 순서가 명확하지 않음.
- 프로그램 구분
    - 같은 IP를 사용하는 서버에서 통신하는 애플리케이션이 둘 이상이면?

이러한 문제를 해결하기 위해서 TCP(UDP) 방식이 고안되었다.

## TCP

인터넷 프로토콜 스택의 4계층으로

- 애플리케이션 계층 (HTTP, FTP)
- 전송 계층 (TCP, UDP)
- 인터넷 계층 (IP)
- 네트워크 인터페이스 계층

으로 구성되어있다.

만약 채팅 프로그램을 통해 "Hello, world!" 메세지를 전달한다고 가정하자.

"Hello, world!" 메세지를 먼저 생성하고 Socket 라이브러리를 통해 TCP로 전달한다.

메세지 정보를 포함하여 TCP 정보를 생성하고 IP로 전달한다.

TCP 정보를 포함하여 IP 패킷을 생성하고 LAN 카드로 전달하며 이를 통해 인터넷으로 전달된다.

아래 그림을 참고하자.

![](https://velog.velcdn.com/images/deonii/post/b6573a8a-4cc2-4275-b029-5872fc905779/image.png)

IP 패킷 정보에는 출발지 IP, 목적지 IP 등이 들어있다.

TCP/IP 패킷 정보에는 출발지 PORT, 목적지 PORT, 전송 제어, 순서, 검증 정보 등이 들어있다.

TCP(전송 제어 프로토콜 : Transmission Control Protocol)의 특징으로

- 연결지향 (TCP 3 way handshake 가상 연결) : 연결을 확인 한 후에 데이터를 전송한다.
- 데이터 전달 보증 : 데이터가 누락되었을때 데이터가 누락됨을 알 수 있다.
- 순서 보장
- 신뢰할 수 있는 프로토콜

정도가 있으며 현재는 대부분 TCP를 사용한다.

### TCP 3 way handshake

먼저 클라이언트에서 서버로 SYN(synchronize)를 보낸다.(연결 요청이라고 이해하면 될듯하다)

이를 받은 서버는 클라이언트로 ACK(acknowledgment)를 보내며 동시에 SYN를 보낸다.

이를 받은 클라이언트는 서버로 ACK를 보낸다.

이를 통해 서로 통신이 가능하다는것을 확인하며 클라이언트는 데이터를 전송한다.

### 데이터 전달 보증

클라이언트에서 서버로 데이터를 전송하면 서버측에서 데이터에 대한 응답을 보낸다.

응답이 없어거나 돌아온 응답을 통해 데이터가 전달됐음을 확인할 수 있다.

### 순서 보장

클라이언튼에서 패킷1, 패킷2, 패킷3 순서로 전송했을때 서버측에서 만약 패킷1, 패킷3, 패킷2 순서로 데이터를 받았을 경우 서버에서 클라이언트 측으로 패킷2부터 다시 요청하며 순서를 보장한다.

## UDP

사용자 데이터그램 프로토콜(User Datagram Protocol)이며 보통 하얀 도화지에 비유한다.(기능이 거의 없기 때문)

연결 지향도 아니며 데이터 전달 보증도 안되고 순서 또한 보장하지 않는다.

다만 단순하고 빠르며 IP와 거의 같지만 port와 체크섬 정도만 추가되어있다.

## PORT

포트는 0 ~ 65525 까지 할당이 가능하다.

하지만 보통 0 ~ 1023은 잘 알려진 포트이며 사용하지 않는 것이 좋다.

- FTP : 20, 21
- TELNET : 23
- HTTP : 80
- HTTPS : 443

## DNS

IP는 기억하기도 힘들며 변경되기도 한다.

DNS(도메인 네임 시스템 : Domain Name System)을 사용하여 이를 해결한다.

도메인 서버에 도메인 명을 구입하여 도메인 명과 IP를 등록해 클라이언트가 도메인 명으로 접속했을때 IP 주소를 응답하고 이를 통해서 서버와 통신 할 수 있다.

## URI

URI(Uniform Resource Identifier)은 통합 자원 식별자를 의미한다.

각 단어의 의미는 아래와 같다.

- Uniform : 리소스 식별하는 통일된 방식
- Resource : 자원, URI로 식별할 수 있는 모든것(제한 없음)
- Identifier : 다른 항목과 구분하는데 필요한 정보

URI는 로케이터(locator), 이름(name) 또는 둘다 추가로 분류될 수 있다.

![](https://velog.velcdn.com/images/deonii/post/bbafbb84-d3e9-48a0-8eb9-c504ac5eaafd/image.png)

위의 그림과 같이 URI는 URL과 URN을 포함하는 개념이다.

하지만 URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않았기 때문에 우리가 아는 URI는 실질적으로 URL과 거의 동일하다.

## URL

URL의 전체 문법에 대해 알아보자.

```
scheme://[userinfo@]host[:port][/path][?query][#fragment]
```

위의 문법과 동일한 예시 주소를 보자.

```
https://www.google.com:443/search?q=hello&hl=ko
```

- 프로토콜 : https
- 호스트명 : www.google.com
- 포트 번호 : 443
- 패스 : /search
- 쿼리 파라미터 : q=hello&hl=ko

### scheme

여기서는 주로 프로토콜이 사용된다.

프로토콜이란 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙이다.(http, https, ftp 등)

http는 80포트, https는 443포트를 주로 사용한다.(포트는 생략 가능하다)

### userinfo

UR에 사용자 정보를 포함해서 인증할때 사용하나 거의 사용하지 않는다.

### host

호스트명은 도메인명 또는 IP 주소를 직접 사용가능하다.

### path

리소스 경로를 의미한다.(계층적 구조)

### query

key=value 형태를 취한다.

?로 시작하고 &로 추가 가능하다.

query parameter, query string 등으로 불린다.

### fragment

html 내부 북마크 등에 사용된다.

서버에 전송되는 정보는 아니다.

## 웹 브라우저 요청 흐름

https://www.google.com/search?q=hello&hl=ko <- 주소로 접속한다고 가정하자.

먼저 DNS를 조회하여 해당 IP주소와 포트번호를 찾아온다.

http 요청 메세지를 생성한다.

예시)
```
GET /search?q=hello&hl=ko HTTP/1.1 Host: www.google.com
```

그리고 위에서 설명한 일련의 과정(socket 라이브러리를 통해 전달, tcp/ip 패킷 생성, lan 카드 통해 인터넷 전달)을 통해 요청 패킷이 서버로 전달된다.

요청을 받은 서버는 데이터를 확인하고 응답 메세지를 만들어서 클라이언트(웹 브라우저)에게 보낸다.

```
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8 Content-Length: 3423
<html>
    <body>...</body>
</html>
```

웹 브라우저에서 응답 메세지를 바탕으로 페이지의 띄운다.