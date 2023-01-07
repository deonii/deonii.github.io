# Java 기초 - 15

- 목차
    1. Exception
    2. Files

## Exception

파이썬의 try catch finally 문과 같다.

아래 예시 코드를 보자.

```
package deonii.level2.exception;

public class ExceptionRunner {
    private static void method1() {
        try {
            String str = null;
            str.length();
            System.out.println("method1 Done");
        // catch 에서는 Exception 클래스를 상속받은 클래스를 받는다.
        } catch (Exception ex) {
            System.out.println("Error");
        } finally {
            System.out.println("In finally");
        }
    }

    public static void main(String[] args) {
        method1();
    }
}
```

실행시켜 보자.

```
Error
In finally
```

에러가 발생해서 "method1 Done" 메세지 없이 catch문과 finally문을 실행했다.

예외에는 크게 두가지 종류가 있다.

- RuntimeException
- Exception

RuntimeException은 실행시 발생하는 예외이고 Exception은 컴파일시 발생하는 예외이다.

즉, Exception은 프로그램 작성시 이미 예측가능한 예외를 작성할 때 사용하고 RuntimeException은 발생 할수도 발생 안 할수도 있는 경우에 작성한다.

그래서 Exception을 Checked Exception, RuntimeException을 Unchecked Exception 이라고도 한다.

## Files

간단한 클래스를 만들고 파일 경로를 출력해 보자.

```
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class DirectoryScanRunner {
    public static void main(String[] args) throws IOException {
        // Files.list()를 통해서 stream이 반환되기 때문에 forEach가 가능하다.
        Files.list(Paths.get(".")).forEach(System.out::println);
    }
}
```

![](https://velog.velcdn.com/images/deonii/post/d021225c-b845-4847-a938-74ea2a912a8e/image.png)

실제 폴더와 비교해보자.

![](https://velog.velcdn.com/images/deonii/post/d9f1abf3-53aa-45c0-9c9a-f46d45a86a8f/image.png)

동일하게 있는것을 알 수 있다.

클래스를 수정해서 자바 파일만 출력되도록 해보자.

```
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.function.Predicate;

public class DirectoryScanRunner {
    public static void main(String[] args) throws IOException {
        // 방금 사용한 list()는 주석처리한다.
        // Files.list(Paths.get(".")).forEach(System.out::println);
        // Path를 변수처리한다.
        Path currentDirectory = Paths.get(".");

        // Predicate는 argument를 받아 boolean 값을 반환하는 함수형 인터페이스이다. filter에 사용해서 필터링을 할 수 있다.
        Predicate<? super Path> predicate = path -> String.valueOf(path).contains(".java");

        // walk는 Path를 받고 해당 Path부터 depth를 받아 출력한다. 여기서는 4depth까지 체크한다.
        Files.walk(currentDirectory, 4)
        // filter를 통해 .java가 포함된 파일만 필터링한다.
        .filter(predicate)
        .forEach(System.out::println);
    }
}
```

실행시켜 보자.

![](https://velog.velcdn.com/images/deonii/post/94ad4890-e301-4ec4-89ab-7de410c96199/image.png)

지금 현재 파일과 다른 경로에 있는 파일들이 출력되는 것을 알 수 있다.

이번엔 간단한 txt파일을 만들고 java파일에서 불러와 보자.

resources 폴더 안에 data.txt 파일을 만들고 클래스를 수정해주자.

```
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DirectoryScanRunner {
    public static void main(String[] args) throws IOException {
        // .부터 root경로로 시작해서 해당 경로를 찾아간다.
        Path data = Paths.get("./resources/data.txt");

        // readAllLines 을 통해서 해당 파일의 한줄한줄을 각 List요소로 넣는다.
        List<String> lines = Files.readAllLines(data);

        System.out.println(lines);
        System.out.println(lines.size());
    }
}
```

실행해 보자.

```
[123,123, deonii, , java 어렵다]
4
```

처음 들어온 "123,123"은 문자열 한 개이다.

간단하게 불러올 수 있지만 만약 파일이 만 줄이 넘는 엄청 큰 파일이라면 메모리에 만 줄의 데이터가 한번에 올라가게 될 것이다.

이는 매우 비효율적인 방법이다.

수정해보자.

```
package deonii.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DirectoryScanRunner {
    public static void main(String[] args) throws IOException {

        Path data = Paths.get("./resources/data.txt");
        // lines로 바꿔줬다.
        Files.lines(data).forEach(System.out::println);
    }
}
```

lines는 한 줄 실행하고 한 줄 출력하는 방식으로 훨씬 효율적으로 데이터를 가져온다.

![](https://velog.velcdn.com/images/deonii/post/6d2dbb9b-3eee-4cfa-a248-3f56f1d37cd8/image.png)

결과도 잘 나온것을 알 수 있다.

이번엔 파일에 원하는것을 적어보자.

```
package deonii.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class DirectoryScanRunner {
    public static void main(String[] args) throws IOException {
        List<String> list = List.of("Apple", "Dog", "Cat","\n", "Tiger");

        Path data = Paths.get("./resources/data.txt");

        Files.write(data, list);
    }
}
```

실행시켜 보자.

![](https://velog.velcdn.com/images/deonii/post/3f819bd8-b72b-496a-8008-969583f71196/image.png)

한줄씩 잘 들어가 있다.
