# Java 기초 - 17

- 목차
    1. 접근 제어자
    2. final, static
    3. enum

## 접근 제어자

접근 제어자(private, public, default, protected)에 대해 알아보자.

이 접근 제어자들은 캡슐화를 강요하기 위해서 사용된다.

우선 클래스에서 사용 가능한건 public, default(기본값)만 사용 가능하다.

public으로 적힌 클래스는 외부 패키지에서도 import를 통해 사용 가능하지만 default 클래스의 경우 import가 불가능하다.

이번엔 메서드를 확인을 위해 간단한 클래스를 만들었다.

![](https://velog.velcdn.com/images/deonii/post/59f926ee-4833-4fd7-b238-641d87caf8b1/image.png)

해당 클래스 내에서 4가지 메서드를 호출했을때 문제가 없는것을 알 수 있다.

![](https://velog.velcdn.com/images/deonii/post/4de42649-abad-439a-af51-1d56fd6f6d43/image.png)

같은 패키지 내에서 해당 클래스를 불러왔다.

private 메서드는 빨간줄로 에러가 난것을 알 수 있다.

private는 다른 클래스에서 접근이 불가하다.

![](https://velog.velcdn.com/images/deonii/post/1e7e787b-7f71-451d-8c8b-0de21794285b/image.png)

이번엔 다른 패키지에서 해당 클래스를 import해서 사용해 봤다.

public이외에는 전부 사용할 수 없는것을 알 수 있다.

접근 제어자의 접근 범위가 보다 많은 제어자부터 적은 제어자 순으로 나열하면 다음과 같다.

public > protected > default > private

이것을 표로 정리하면 다음과 같다.

|접근 제어자|같은 클래스의 맴버|같은 패키지의 맴버|자식 클래스의 맴버|그 외의 영역|
|:---:|:---:|:---:|:---:|:---:|
|public|O|O|O|O|
|protected|O|O|O|X|
|default|O|O|X|X|
|private|O|X|X|X|

## final, static

![](https://velog.velcdn.com/images/deonii/post/8dccc65a-67d6-4e93-8bcb-a0785b4a1512/image.png)

final을 붙인 클래스는 다른 클래스에서 확장이 불가능하다.(상속이 불가능하다는 의미)

![](https://velog.velcdn.com/images/deonii/post/28f092b9-dbdc-4791-bf2e-ebf46744f2b7/image.png)

마찬가지로 메서드에 final을 붙이면 오버라이딩이 안된다.

![](https://velog.velcdn.com/images/deonii/post/a5df9c50-df76-49b4-a58f-bf763c34a54e/image.png)

변수에도 final을 붙이면 수정이 불가능하다.

![](https://velog.velcdn.com/images/deonii/post/a2507238-9323-4799-b244-f235b7cfa728/image.png)

이처럼 선언 후 처음 값을 부여하는것은 가능하지만 변경하는것은 불가능하다.

![](https://velog.velcdn.com/images/deonii/post/a2e1c166-e614-4083-b262-2cf4e12df839/image.png)

argument에도 final을 붙이면 수정이 불가능하다.

static 사용법을 알아보기 위해 간단한 클래스를 만들어 보자.

```
class Player {
    private String name;
    private int count = 0;

    public Player(String name) {
        super();
        this.name = name;
        count++;
    }

    public int getCount() {
        return count;
    }
}

public class FinalClass {

    public static void main(String[] args) {
        Player player1 = new Player("deonii");
        System.out.println(player1.getCount());

        Player player2 = new Player("dalbi");
        System.out.println(player2.getCount());
    }
}
```

count는 총 플레이어가 몇 명인지 알고싶어서 넣었다.

실행 시켜보자.

```
1
1
```

2가 출력되는것을 원했지만 각자의 인스턴스에 0에서 1로 변경될 뿐 총 플레이어를 구할 수 없다.

여기서 총 플레이어를 구하기위해 static을 사용한다.

```
class Player {
    private String name;
    private static int count = 0;

    public Player(String name) {
        super();
        this.name = name;
        count++;
    }

    public int getCount() {
        return count;
    }
}
```

Player 클래스를 수정 후 실행 시켜보자.

```
1
2
```

원하는대로 플레이어 수가 출력된다.

이걸 좀 더 변경할 수 있다.

```
class Player {
    private String name;
    private static int count = 0;

    public Player(String name) {
        super();
        this.name = name;
        count++;
    }

    // static 메서드로 변경
    public static int getCount() {
        return count;
    }
}

public class FinalClass {

    public static void main(String[] args) {
        Player player1 = new Player("deonii");
        // 인스턴스에서 클래스를 통한 메서드 호출로 변경했다.
        System.out.println(Player.getCount());

        Player player2 = new Player("dalbi");
        System.out.println(Player.getCount());
    }
}
```

실행시켜 보면

```
1
2
```

마찬가지로 출력되는것을 알 수 있다.

## enum

간단한 enum을 만들어 보자.

```
import java.util.Arrays;

// enum 선언.
enum Season {
    WINTER, SPRING, SUMMER, FALL;
}

public class EnumRunner {

    public static void main(String[] args) {
        Season season = Season.FALL;
        Season season1 = Season.valueOf("WINTER");

        System.out.println(season1); // WINTER
        System.out.println(season1.ordinal()); // 0
        System.out.println(Arrays.toString(season1.values())); // [WINTER, SPRING, SUMMER, FALL]
    }
}
```

enum의 요소명 또는 valueOf를 통해 사용할 수 있다.

해당 요소의 이름을 가져오거나 순번을 가져올 수 있고 전체를 목록으로 가져올 수도 있다.

enum에 생성자를 추가할 수도 있자.

```
enum Season {
    // 여기서 괄호 안에 숫자가 value가 됨.
    WINTER(1), SPRING(2), SUMMER(3), FALL(4);

    private int value;

    private Season(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

public class EnumRunner {

    public static void main(String[] args) {
        Season season1 = Season.valueOf("WINTER");

        System.out.println(season1.getValue()); // 1
    }
}

```

이렇게 getter를 통해서 해당 value를 가져올 수 있다.