# Java 기초 - 18

- 목차
    1. 모듈화
    2. Predicate
    3. String 추가 메서드
    4. var
    5. switch
    6. record

## 모듈화

모듈은 패키지보다 상위의 개념이다.

서로 다른 프로젝트에서 imports와 exports를 통해서 본인이 받을, 줄 패키지를 설정해서 사용할 수 있다.

보내는 프로젝트의 모듈 모습

```
module deonii.service.provider {
    // 지정한 패키지를 외부에 공개한다.
    exports deonii.sorting.util;
    exports deonii.sorting.algorithm;
}
```

사용하는 프로젝트의 모듈 모습

```
module deonii.consumer {
    // 원하는 모듈명을 통해 가져온다.
    requires deonii.service.provider;
    requires java.logging;
}
```

가져올 모듈명을 통해 가져온다.

기본 java 모듈에 속하지 않은 모듈 또한 여기서 불러와 사용할 수 있다.

## Predicate

이전 java 기초 - 15에서 간단하게 Predicate를 사용했었다.

이번에 조금 더 사용해보자.

간단한 클래스를 만들어주자.

```
import java.util.List;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(3,4,5,66,77,88);

        // Predicate를 통해 함수형 프로그래밍에서 람다식을 사용한다.
        Predicate<Integer> evenNumberPredicate = number -> number%2==0;

        numbers.stream().filter(evenNumberPredicate).forEach(System.out::println);
    }
}
```

출력해보면

```
4
66
88
```

짝수만 출력된다.

만약 홀수만 출력하고 싶다면 Predicate자체를 수정해도 되지만 evenNumberPredicate뒤에 .negate()를 붙이면 된다.

```
numbers.stream().filter(evenNumberPredicate.negate()).forEach(System.out::println);
```

출력해 보자.

```
3
5
77
```

홀수로 변경되었다.

만약 메서드 참조를 통해 짝수를 출력해 보자.

```
import java.util.List;

public class Main {

    public static boolean isEven(Integer number) {
        return number%2==0;
    }

    public static void main(String[] args) {
        List<Integer> numbers = List.of(3,4,5,66,77,88);

        numbers.stream().filter(Main::isEven).forEach(System.out::println);
    }
}

```

출력해 보자.

```
4
66
88
```

마찬가지로 짝수가 출력되지만 이러면 .negate()를 사용할 수 없다.

하지만 Predicator.not을 통해서 가능하다.

```
numbers.stream().filter(Predicate.not(Main::isEven)).forEach(System.out::println);
```

출력해 보자.

```
3
5
77
```

홀수가 출력된것을 알 수 있다.

## String 추가 메서드

String에서 사용할 수 있는 몇가지 메서드를 알아보자.

```
"  LR  ".strip()
=> "LR"
```

문자열 처음과 끝에 있는 공백을 제거한다.

```
"  LR  ".stripLeading()
=> "LR  "

"  LR  ".stripTrailing()
=> "  LR"
```

각각 오른쪽, 왼쪽의 공백을 제거한다.

```
"deonii\ndalbi\ntest".lines()
=> java.util.stream.ReferencePipeline$Head@2d363fb3
```

lines()를 사용하니 stream으로 반환된것을 알 수 있다.

```
"deonii\ndalbi\ntest".lines().forEach(System.out::println);
=> deonii
dalbi
test
```

이렇게 forEach를 통해 출력이 가능하다.

```
"deonii dalbi".transform(s -> s.substring(3))
=> "nii dalbi"

"deonii dalbi".substring(3)
=> "nii dalbi"
```

substring()을 사용하면 문자열을 잘라서 사용할 수 있다.

```
"My name is %s and age is %d".formatted("deonii", 33)
=> "My name is deonii and age is 33"
```

printf와 동일하게 formatted로 사용할 수 있다.

## var

이번엔 2중 list를 만들어 보자.

```
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names1 = List.of("Deonii", "Dalbi");
        List<String> names2 = List.of("Test", "list", "am I?");

        List<List<String>> names = List.of(names1, names2);

        names.stream().forEach(System.out::println);
    }
}
```

실행시켜 보면

```
[Deonii, Dalbi]
[Test, list, am I?]
```

잘 출력된다.

여기서 names의 type이 너무 지저분하다. 이것을 var로 생략할 수 있다.

```
var names = List.of(names1, names2);
```

실행시켜 보자.

```
[Deonii, Dalbi]
[Test, list, am I?]
```

똑같이 잘 나온다.

여기서 stream()을 stream1()로 바꾸어 에러를 발생시키면

![](https://velog.velcdn.com/images/deonii/post/2b9fc2df-5890-4acd-890f-0269bbe23987/image.png)

이렇게 List<List<String>>로 인식하는것을 알 수 있다.

이것을 타입 추론이라고 한다.

## switch

이번엔 자바 14에 새로 생긴 기능이다.

예전 switch문에서는 케이스별로 break를 사용해야 다음 케이스의 값으로 넘어가지 않았다.

아래는 새로운 문법이다.

```
public static String NewSwitch(int day) {
    String dayOfWeek = switch(day) {
        // 원래 : 로 사용하던 부분을 -> 로 변경했다.
        case 0 -> "Sunday";
        case 1 -> "Monday";
        case 2 -> "Tuesday";
        case 3 -> "Wednesday";
        default -> throw new IllegalArgumentException("Unexpected value: " + day);
    };

    return dayOfWeek;
}
```

이렇게 사용하면 값을 break없이 값이 넘어가지 않는다.

또한 블럭을 줘서 코드를 쓸 수 있다.

```
public static String NewSwitch(int day) {
    String dayOfWeek = switch(day) {
        case 0 -> {
            System.out.println("this is monday.");
            yield "Sunday";
        }
        case 1 -> "Monday";
        case 2 -> "Tuesday";
        case 3 -> "Wednesday";
        default -> throw new IllegalArgumentException("Unexpected value: " + day);
    };

    return dayOfWeek;
}
```

이렇게 코드문으로 작성할때는 반환을 yield로 해야한다.

## record

record는 가장 기본적인 클래스(getter, setter, equals, hashCode 등등을 포함한)를 간단하게 만들수 있는 방법이다.

record를 선언하는 방법은 다음과 같다.

```
record Person(String name, String email, String phoneNumber) {}
```

record를 사용한 간단한 클래스를 만들어보자.

```
public class Main {
    // record 생성
    record Person(String name, String email, String phoneNumber) {}

    public static void main(String[] args) {
        Person person1 = new Person("Deonii", "deonii@naver.com", "123-456-789");
        Person person2 = new Person("Deonii", "deonii@naver.com", "123-456-789");
        Person person3 = new Person("Deonii1", "deonii@naver.com", "123-456-789");

        System.out.println(person1.equals(person2));
        System.out.println(person1.equals(person3));
    }
}
```

실행시켜 보자.

```
true
false
```

기본적인 기능이 들어간 모습을 알 수 있다.