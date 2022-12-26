# Java - 4

- 목차
    1. 정수 데이터 유형
    2. 진수 체계
    3. 부동소수점 데이터 유형
    4. BigDecimal

## 정수 데이터 유형

데이터 유형별 기준은 '래퍼 클래스'를 통해서 확인 가능하다.

byte를 통해 래퍼 클래스를 알아보자. jshell을 통해 Byte. 를 입력후 tab을 눌러보자.

![](https://velog.velcdn.com/images/deonii/post/a459349e-4f21-457c-868b-77d1a96f5265/image.png)

위의 사진과 같이 사용 가능한 것들이 나타난다.

```
Byte.SIZE
=> 8
```

여기서 8은 8bit를 의미한다.

byte의 byte 크기를 알기 위해서는 다음과 같다.

```
Byte.BYTES
=> 1
```

1바이트 인것을 알 수 있다.

```
Byte.MAX_VALUE
=> 127

Byte.MIN_VALUE
=> -128
```

명령어를 통해 최대값, 최소값을 알 수 있다.

int의 경우 Integer로 입력해야한다.

## 진수 체계

자바에서 리터럴은 2진수, 10진수, 8진수와 16진수를 지원한다.

```
010;
=> 8

0x10;
=> 16
```

위의 예시처럼 8진수는 0으로 시작하고 16진수는 0x로 시작한다.

16진수는 a ~ f 까지 사용하여 15까지 표현 가능하다.

```
0xf;
=>15
```

크기가 큰것에서 작은것으로 형변환 할때에는 explicit 형변환 해야한다.

```
short a;
int b;

a = b;
|  Error:
|  incompatible types: possible lossy conversion from int to short

a = (short) b;
=> 0
```

## 부동소수점 데이터 유형

위에서 사용한 래퍼 클래스를 사용해보자

![](https://velog.velcdn.com/images/deonii/post/2303b961-e15c-4626-83d9-1f5687347ffe/image.png)

다양한 값이 있는것을 알 수 있다.

```
Float.BYTES;
=> 4

Float.MAX_VALUE;
=> 3.4028235E38

Float.MIN_VALUE;
=> 1.4E-45

Float.MIN_NORMAL;
=> 1.17549435E-38

Float.NEGATIVE_INFINITY;
=> -Infinity

Float.POSITIVE_INFINITY;
=> Infinity

Float.SIZE;
=> 32

Double.SIZE;
=> 64

Double.BYTES;
=> 8
```

java에서는 무한대를 지원하는듯하다.

정수형에서 부동소수형으로 형변환 하는것은 가능하다.

```
int a;
float b;

b = a;
=> 0.0
```

하지만 부동소수형에서 정수형으로 변환하는것은 explicit 형변환 해야한다.

```
a = b;
|  Error:
|  incompatible types: possible lossy conversion from float to int

a = (int) b;
=> 0
```

## BigDecimal

부동소수 데이터 유형은 정확하지 않아서 재무 계산에 활용하기는 힘들다.

아래 예시르 보자

```
34.56789876 + 34.2234;
=> 68.79129875999999
```

뜬금없이 999999가 생겼다.

정확한 계산을 원한다면 BigDecimal 클래스를 사용하자.

이때 double 데이터가 아닌 string 데이터로 넣어야한다.

```
BigDecimal a = new BigDecimal("34.56789876");

BigDecimal b = new BigDecimal("34.2234");

b.add(a);
=> 68.79129876
```

만약 정수와 계산을 원한다면 add메서드에 int타입을 넣는것이 아니라 BigDecimal로 변환해서 넣어야합니다.

```
int a = 100;

BigDecimal b = new BigDecimal("34.2234");

b.add(a);
|  Error:
|  incompatible types: int cannot be converted to java.math.BigDecimal

b.add(new BigDecimal(a));
=> 134.2234
```

