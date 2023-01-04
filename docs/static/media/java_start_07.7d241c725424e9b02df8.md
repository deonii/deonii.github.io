# Java 기초 - 7

- 목차
    1. StringBuffer
    2. 래퍼 클래스
    3. java.time
    4. Array
    5. 가변 인수

## StringBuffer

예를 들어 아래와 같은 코드가 실행된다 가정하자

```
"123" + "123" + "1234" + "123456"
=> "1231231234123456"
```

이때 생성된 인스턴스는 총 7개이다.

4개의 스트링 인스턴스와 하나씩 합쳐질때 새로운 인스턴스를 생성했기 때문이다.

최초 4개의 인스턴스는 반드시 필요하나 뒤의 3개는 불필요한 인스턴스이다.

이런걸 방지하기 위해서 자바는 StringBuffer라는 클래스를 제공하고있다.

```
StringBuffer test = "test";
|  Error:
|  incompatible types: java.lang.String cannot be converted to java.lang.StringBuffer

StringBuffer test = new StringBuffer("test");
```

위의 예시처럼 일반 String처럼 생략이 불가하고 일반 클래스처럼 생성해야한다.

```
test.append(" this");
=> "test this"

test.setCharAt(4,'_');

test;
=> "test_this"
```

StringBuffer는 멀티스레딩이 가능한 클래스이다.

때문에 속도가 매우 느려질 수 있고 이때 사용하는게 StringBuilder이다.

```
StringBuilder test1 = new StringBuilder("test1");
```

## 래퍼 클래스

자바에는 기본 타입에 상응하는 클래스가 존재하고 이 클래스들을 래퍼 클래스라고 한다.

래퍼 클래스가 있어서 여러가지 메서드 들을 사용할 수 있다.

또한 기본 값들을 컬렉션에 저장할 수 있다.

```
int i1 = 5;

Integer i2 = new Integer(5);

Integer i3 = Integer.valueOf(5);

Integer i4 = Integer.valueOf("5");
```

위의 네가지는 모두 Integer를 생성하고있다.

```
i1 == i2
=> true

i1 == i3
=> true

i1 == i4
=> true

i2 == i3
=> false

i2 == i4
=> false

i3 == i4
=> true
```

new로 생성된 i2는 valueOf로 생성된 i3, i4와 다르다고 하고있다.

new를 사용하면 매번 새로운 객체를 생성하고 valueOf를 사용하면 힙 안에 존재하는 기존 객체를 다시 사용하려고 하기 때문이다.

## java.time

```
import java.time.*

LocalDate today = LocalDate.now();
=> 2022-12-28

LocalDate sp_date = LocalDate.of(2022, 12, 31);
=> 2022-12-31

LocalDateTime now = LocalDateTime.now();
=> 2022-12-28T20:01:28.549548

LocalTime now_time = LocalTime.now();
=> 20:02:07.423652
```

## Array

```
// 사용법
int[] marks = {50, 55, 60};

marks[1];
=> 55

marks[1] = 155;

marks[1];
=> 155

int[] marks2 = new int[5];
=> int[5] { 0, 0, 0, 0, 0 }

marks2.length
=> 5

int sum = 0;

// array를 반복문 돌리는 방법
for(int mark:marks) {
    sum += mark;
};

sum;
=> 165

System.out.println(marks);
=> [I@762efe5d

System.out.println(Arrays.toString(marks));
=> [50, 155, 60]

Arrays.fill(marks, 100);

marks;
=> int[3] { 100, 100, 100 }

// 두 배열이 같은지 비교하는 방법
int[] marks3 = new int[5];
=> int[5] { 0, 0, 0, 0, 0 }

marks2 == marks3;
=> false

Arrays.equals(marks2, marks3);
=> true
```

## 가변인수

python의 args같은 기능

```
void testPrint(int... args) {
    System.out.println(Arrays.toString(args));
}

testPrint(1,2,3,4,'a');
=> [1, 2, 3, 4, 97]

testPrint(new int[5]);
=> [0, 0, 0, 0, 0]
```