# Java 기초 - 6

- 목차
    1. 사용자 입력 받기
    2. do while
    3. 기본형 타입, 참조형 타입
        1. 기본형 타입
        2. 참조형 타입
    4. String

## 입력 받기

```
// Scanner 패키지를 가져온다
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Scanner 인스턴스를 생성한다.
        Scanner in = new Scanner(System.in); // System.in은 입력한 값을 Byte 단위로 읽는것을 뜻한다.

        // 이후 사용할 타입에 따라 사용법이 달라진다.
        // String
        String one_word = in.next(); // 띄어쓰기 기준으로 하나씩 받는다.
        String one_line = in.nextLine(); // 엔터 기준(한 줄)으로 하나씩 받는다.

        // 여기부터는 띄어쓰기, 엔터 관계없이 동일하게 구분한다.
        // boolean
        boolean is_bool = in.nextBoolean(); // 대소문자 관계없이 true, false를 받는다. 이외에 모든값은 에러가 난다.

        // numberic
        byte is_byte = in.nextByte();
        short is_short = in.nextShort();
        int is_int = in.nextInt();
        long is_long = in.nextLong();

        double is_double = in.nextDouble();
        float is_float = in.nextFloat();
    }
}
```

## do while

```
int i = 10;
do {
    System.out.println(i);
    i++
} while (i <5)
=> 10
```

do while과 while의 차이점은 do while은 조건이 맞지 않더라도 한번은 무조건 실행 된다는 점이다.

## 기본형 타입, 참조형 타입

우선 아래의 그림을 보자

![](https://velog.velcdn.com/images/deonii/post/0c00d323-6c07-4351-9eac-01f08fd7a39a/image.png)

자바 프로그램이 실행될 때 두 가지 종류의 메모리가 있는데 하나는 'Stack'이고 하나는 'Heap'이다.

우리가 아래 코드처럼 변수를 저장하고 클래스를 생성, 인스턴스 생성을 했다고 가정하자.

```
int i = 5;

class Animal {
    int id;
    Animal(int id) {
        this.id = id;
    }
}

Animal dog = new Animal(12);
Animal cat = new Animal(15);
```

위의 코드를 실행했을때 아래와 같은 모습으로 저장된다.

![](https://velog.velcdn.com/images/deonii/post/4ff9bfa4-9a09-4b3c-af91-cf2ae4fcc577/image.png)

우선 stack 메모리에 변수명과 '5'가 저장된다.

이렇게 저장되는건 기본형 타입(Primitive type)이다.

이후 클래스가 생성되고 Heap 메모리 1A와 1C에 인스턴스 데이터가 생성됐다.

그리고 stack 메모리에 변수명과 Heap 메모리 주소를 '참조'하여 저장했다.

이렇게 저장되는게 참조형 타입(Reference type)이다.

### 기본형 타입

총 8가지 기본형 타입을 미리 정의해서 제공한다.

| |타입|기본값|
|:--:|--|--|
|논리형|boolean|false|
| 정수형 |byte, short, int(기본)|0|
|정수형|long|0L|
|실수형|float|0.0F|
|실수형|double(기본)|0.0|
|문자형|char|'\u0000'|

기본값이 존재하기 때문에 null이 존재하지 않는다.

### 참조형 타입

기본형 타입을 제외한 타입들은 모두 참조형 타입(Reference type)이다.

|타입|예시|기본값|할당되는 메모리 크기|
|:--:|:--|--|:--|
|배열(Array)|int[] arr = new int[5];|null| 4byte (객체의 주소값)|
|열거(Enumeration)||null|4byte (객체의 주소값)|
|클래스|String str = "test";|null|4byte (객체의 주소값)|
|클래스|Animal dog = new Animal(12);|null|4byte (객체의 주소값)|
|인터페이스(Interface)||null|4byte (객체의 주소값)|

빈 객체를 의미하는 null이 존재한다.

## String

```
String str = "This is a lot of text";

// 문자의 길이
str.length();
=> 21

// 해당 인덱스의 문자를 출력
str.charAt(5);
=> 'i'

// 해당 인덱스의 문자부터 마지막까지 출력 또는 처음 지정 인덱스부터 두번째 지정 인덱스 전까지 출
str.substring(8);
=> "a lot of text"력

str.substring(8, 13);
=> "a lot"

// 앞에서 부터 해당 문자열을 찾아 해당 문자열의 시작 인덱스를 출력. 만약 없다면 -1
str.indexOf("lot");
=> 10

str.indexOf("test");
=> -1

// 위의 indexOf의 뒤에서부터 찾는 버전
str.lastIndexOf("i");
=> 5

// 해당 문자열이 포함되어있는지 boolean으로 출력
str.contains("text");
=> true

str.contains("test");
=> false

// 해당 문자열로 시작하는 여부
str.startsWith("This");
=> true

str.startsWith("is");
=> false

// 해당 문자열로 끝나는 여부
str.endsWith("text");
=> true

str.endsWith("test");
=> false

// 스트링이 비어있는지 확인
str.isEmpty();
=> false

// 두 스트링이 같은지 확인, 대소문자 구분함.
str.equals("test text");
=> false

// 대소문자 구분없이 같은지 확인.
str.equalsIgnoreCase("this is a lot of text");
=> true

// 문자열을 뒤에 연결
str.concat(", right?");
=> "This is a lot of text, right?"

// 대문자, 소문자로
str.toUpperCase();
=> "THIS IS A LOT OF TEXT"

str.toLowerCase();
=> "this is a lot of text"

// 시작과 끝의 공백 제거
"    test text    ".trim();
=> "test text"

// 문자열 결합
String.join(", ","2",str) // 첫번째 인자인 ", "로 각 문자열 결합하라는 의미
=> "2, This is a lot of text"

// 문자열 대체
str.replace("text", "problems");
=> "This is a lot of problems"
```