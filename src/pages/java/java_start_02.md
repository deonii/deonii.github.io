# Java - 2

- 목차
    1. 메서드
    2. 메서드 오버로딩
    3. 클래스

## 메서드

```
// 메서드의 형태
ReturnType nameOfTheMethod(Type argumentName) {
    // Body of the method
}
```

리턴하고 싶은것이 없다면 'void'

메서드는 일반적으로 소문자로 시작하는 camelcase.

클래스는 일반적으로 대문자로 시작함.

변수와 마찬가지로 메서드의 이름은 문자, 숫자, $, _만 사용 가능하며 숫자로 시작할 수 없음.

## 메서드 오버로딩

python에서는 없는 개념(print가 해당된다고 하지만 같다고 생각되지는 않는다)

같은 이름이지만 다른 매개변수를 받는 메서드를 선언할 수 있으며 메서드 사용시 사용되는 매개변수에 의해 해당하는 메서드를 호출하는것.

아래를 참고하자.

```
// 매개변수로 int인 num을 받음.
void testPrint(int num) {
    for (; num > 0; num--){
        System.out.printf("%d회 출력남음", num).println();
        }
    }

// 매개변수를 받지 않음.
void testPrint() {
    for (int i = 1; i <= 9; i++) {
        System.out.printf("%d회 출력중", i).println();
        }
    }
```

이와같이 두개의 같은 이름이지만 매개변수가 다른 메서드를 선언했다.

```
testPrint()
=> 1회 출력중
2회 출력중
3회 출력중
4회 출력중
5회 출력중
6회 출력중
7회 출력중
8회 출력중
9회 출력중

testPrint(10)
=> 10회 출력남음
9회 출력남음
8회 출력남음
7회 출력남음
6회 출력남음
5회 출력남음
4회 출력남음
3회 출력남음
2회 출력남음
1회 출력남음
```

학습 후에 찾아보니 java에서는 매개변수에 디폴트값을 넣을수 없다고한다.(오버로딩으로 대체함)

추가로 한개의 메서드에서 여러개의 반환값을 넘기는것도 안된다.(어레이, 튜플 등의 방법으로 대체해야함)

## 클래스

```
// 가장 기초적인 형태
class className {
    }

// 사용법
className objectName = new className()

// 메서드 추가
class className {
    ReturnType nameOfTheMethod(Type argumentName) {
    // Body of the method
    }
}

// 클래스의 메서드 호출법
className objectName = new className()

objectName.nameOfTheMethod()
=> // Body of the method
```

### 예시

우선 간단한 클래스를 만들어보자.

터미널에서 vi를 통해 Planet.java(클래스 명과 동일한 이름이여야 함)을 만들어보자.

![](https://velog.velcdn.com/images/deonii/post/5c8a4336-85b7-43c9-83df-c829f99d8139/image.png)

저장한 뒤 컴퓨터가 이해할 수 있는 코드로 컴파일 시켜줘야한다.

```
javac Planet.java
```

Planet.class 라는 파일이 생성된걸 볼 수 있다. 해당 파일은 JVM이 읽을수 있는 바이트코드로 작성되어있다.

이제 이 파일을 java로 실행시켜보자.

![](https://velog.velcdn.com/images/deonii/post/991e4b48-c29b-4008-b0d9-a22f6a79bb69/image.png)

에러가 발생한다. 내용을 보니 내가 만든 Planet 클래스에는 main 메서드가 없다고한다.

해당 부분을 복사하여 내용을 추가해주자

![](https://velog.velcdn.com/images/deonii/post/79abe6e6-ec6f-492a-aa8c-feb1a23d57e2/image.png)

저장 후 컴파일을 다시 진행하고 해당 클래스를 호출해보자.

![](https://velog.velcdn.com/images/deonii/post/7eea555e-0498-44e5-9696-18b42c06ff40/image.png)

main에서 정의한 내용이 실행되는것을 알 수 있다.