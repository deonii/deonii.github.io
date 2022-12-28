# Java 기초 - 5

- 목차
    1. 논리 연산자
    2. 문자 데이터
    3. 조건문
    4. switch
    5. 삼항 연산자

## 논리 연산자

AND는 &&

OR은 ||

XOR은 ^ (앞뒤 값이 다를때 true)

NOT은 !

여기서 & 연산자 또한 AND역할인데 기능이 다르다.

&&의 경우 앞의 값이 false면 뒤의 값은 확인하지 않는다.

하지만 &는 앞의 값이 false여도 뒤의 값을 확인한다.

## 문자 데이터

문자 데이터는 char로 선언하여 작은따옴표에 한개의 단어만 선언할 수 있다.

모든 유니코드는 자바에 호환되며 유니코드를 활용해서 문자를 만들어도 된다.

```
char ch2 = '\u0022';
=> '"'
```

생성된 문자를 숫자처럼 값을 줄 수도 있다.

```
char ch2 = '\u00A2';
=> '¢'

(int) ch2;
=> 162

++ch2;
=>'£'

(int) ch2
=> 163
```

문자에 해당하는 숫자는 아스키 값이며 유니코드와 동일하다.(유니코드는 16진법고 아스키 값은 10진법이다)

## 조건문

자바에서는 비교 연산을 통해서만(true, false로 결과가 나와야함) 조건문을 사용할 수 있다.

```
if(1) {
    System.out.println(true);
};
|  Error:
|  incompatible types: int cannot be converted to boolean

if(true) {
    System.out.println(true);
};
```

## switch

switch문은 조건문과 비슷하지만 해당되는 케이스 부터 아래 코드가 전부 실행됩니다.

```
int i = 11;

switch (i) {
    case 1 : System.out.println("1");
    case 2 : System.out.println("2");
    case 10 : System.out.println("10");
    default : System.out.println("What is num?");
}

=> What is num?

int i = 1; // 변경후 재실행
=> 1
2
10
What is num?
```

때문에 원하는 케이스만 실행하기 위해서는 break를 통해 멈춰줘야 한다.

```
int i = 1;

switch (i) {
    case 1 : System.out.println("1"); break;
    case 2 : System.out.println("2"); break;
    case 10 : System.out.println("10"); break;
    default : System.out.println("What is num?");
}

=> 1
```

그리고 long, double, boolean 타입은 switch 사용이 불가능하다.

## 삼항 연산자

> 조건문 ? true일때 코드 : false일때 코드

예시

```
int i = 1;
int j = ( i%2 == 0 ? 1 : 2 );
=> 2
```