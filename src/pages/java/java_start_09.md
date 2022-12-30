# Java 기초 - 9

- 목차
    1. BufferedReader
        1. 특징
        2. 사용법
    2. BufferWriter
        1. 사용법
    3. String.repeat()

## BufferedReader

BufferedReader 는 각각 버퍼를 이용해서 읽는 함수이다.

버퍼를 이용하지 않고 입력시(Scanner 사용시) 키보드의 입력이 키를 누르는 즉시 바로 전달된다.

하지만 버퍼를 사용하면 두가지 절차를 밟는다.

> 키보드의 입력이 있을 때마다 한 문자씩 버퍼로 전송됨.
>
> 버퍼가 가득 차거나, 개행 문자가 나타나면, 버퍼의 내용을 한 번에 전송함.

버퍼를 한번 거쳐가니 더 느릴거같지만 더 오히려 더 빠르다.

왜냐하면 하드디스크의 속도가 느리고 키보드, 마우스와 같은 외부 장치와의 입출력은 생각보다 시간이 걸리는 작업이기 때문이다.

때문에 중간에 메모리 버퍼를 둬서 데이터를 한번에 묶어서 전송하는것이 효율적이고 빠르다.

예를 들면 흙을 삽으로 한 삽씩 옮기는 것 보다 트럭에 채워서 나르는 것이 효율적인 것과 같은 이치이다.

### 특징

BufferedReader는 엔터만 경계로 인식하고 받는 데이터는 String으로 고정된다.

버퍼에는 디폴트로 8192개의 문자를 저장할 수 있다.

### 사용법

```
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
```

이렇게 받은 입력값을 read()와 readline() 메서드를 통해 받아 올 수 있다.

read()의 경우 문자 1개만 읽는다.

때문에 "123 345"이라고 입력을 받더라도 첫 read() 메서드를 통해서는 123이 아니라 '1'만 받아오게 된다.

공백 또한 문자로 판단하고 읽어온다.

realine()의 경우 한 줄씩 가져온다.

문자열을 분리하는 방법은 두 가지가 있다.

> StringTokenizer 클래스를 이용하여 분리해주는 방법
>
> split()을 이용하는 방법

성능면에서는 StringTokenizer 가 좋다.

StringTokenizer를 통한 사용법은 다음과 같다.

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        // BufferedReader를 통해 입력을 받는다.
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 한 줄 받아온다.
        String str = br.readLine();

        // StringTokenizer를 통해 띄어쓰기를 기준으로 분리한다.
        StringTokenizer st = new StringTokenizer(str," ");

        // nextToken()을 통해 값을 하나씩 반환한다. (python의 제너레이터 같은거 같다.)
        // 문자열로 반환되기 때문에 정수로 형변환 해준다.
        int a = Integer.parseInt(st.nextToken());
        int b = Integer.parseInt(st.nextToken());
        System.out.println(a+b);
    }
}
```

실행 시켜보자.

```
1 2
=> 3
```

spilt()을 통한 방법은 다음과 같다.

```
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // readLine()으로 읽어온 뒤 split()을 통해 띄어쓰기를 기준으로 나눈다.
        String[] str = br.readLine().split(" ");

        int a = Integer.parseInt(str[0]);
        int b = Integer.parseInt(str[1]);
        System.out.println(a+b);
    }
}
```

실행 시켜보자.

```
3 4
=> 7
```

## BufferedWriter

BufferedWriter는 BufferedReader와 마찬가지로 버퍼를 이용해 출력하는 함수이다.

### 사용법

```
BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
```

위처럼 선언 후 사용이 가능하다.

몇가지 메서드를 통해 버퍼에 문자열을 쓰고 출력하고 버퍼를 비우는것이 가능하다.

write()는 출력할 내용을 버퍼에 담는다.

flush()는 버퍼를 비워내는 동시에 콘솔에 출력한다.

close()는 스트림을 닫는다.

```
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // BufferedWriter 생성한다.
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String str = br.readLine();

        StringTokenizer st = new StringTokenizer(str," ");

        int a = Integer.parseInt(st.nextToken());
        int b = Integer.parseInt(st.nextToken());

        // 버퍼에 담는다.
        bw.write((a+b)+"\n");
        bw.write((a-b)+"\n");

        // 출력 후 닫는다.
        bw.flush();
        bw.close();
    }
}
```

사용해 보자.

```
3 5
=> 8
-2
```

## String.repeat()

문자열을 반복해준다.

```
"1234".repeat(3);
=> "123412341234"
```