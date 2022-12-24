# Java - 3

- 목차
    1. JVM
    2. JRD, JDK
    3. 지역변수, 맴버변수
    4. 캡슐화
    5. Getter, Setter
    6. 생성자

## JVM

![](https://velog.velcdn.com/images/deonii/post/d317bbed-3d0e-4fe4-9d52-a52836555dc8/image.png)

'Java Virtual Machine' 의 약자

.java로 작성된 코드를 컴파일 한 바이트 코드를 실행시켜주는 것이 JVM이다.

JVM은 각 운영체제별로 존재하고 JRE와 JDK에 모두 속해있다.

## JRD, JDK

![](https://velog.velcdn.com/images/deonii/post/dd3d3a6d-c65c-4990-92ce-14067a3fd5f1/image.png)

JRE는 'Java Runtime Environment' 자바를 실행 할 수 있도록 구성된 배포판이다.

JDK는 'Java Development Kit' 자바 개발에 필요한 툴이다.

## 지역변수, 맴버변수

간단한 클래스를 생성해보자.

```
public class MotorBike {
    // state
    private int speed; // member variable

    void start() {
        System.out.printf("Bike Start").println();
    }

    void setSpeed(int speed) { // local variable

    }
}
```

여기서 private int speed; 는 맴버변수

void setSpeed(int speed) 에서 int speed 는 지역변수이다.

각각 호출하는법은 아래와 같다.

```
public class MotorBike {
    // state
    private int speed;

    void start() {
        System.out.printf("Bike Start").println();
    }

    void setSpeed(int speed) {
        System.out.println(speed); // local variable
        System.out.println(this.speed); // member variable
    }
}
```

맴버변수를 호출할때에는 this를 통해서 호출한다.

## 캡슐화

캡슐화는 해당 클래스만이 해당 클래스의 데이터에 접근해야 한다는 개념이다.

이를 통해서 외부 개체가 직접 개체 내 데이터를 제어하지 못하고 외부 개체로부터 보호하는 것이다.

위의 예시를 보면 private int speed; 처럼 앞에 private가 붙은것을 알 수 있다.

이를 통해 다른 클래스에서 해당 클래스의 맴버변수를 변경하지 못하게하며 캡슐화를 할 수 있다.

## Getter, Setter

말그대로 가져오는것(Getter) 설정하는것(Setter)

위의 예시에 Getter와 Setter를 추가해보자.

```
public class MotorBike {
    // state
    private int speed;

    void start() {
        System.out.printf("Bike Start").println();
    }

    // Getter
    public int getSpeed() {
        return speed;
    }

    // Setter
    void setSpeed(int speed) {
        this.speed = speed;
    }
}
```

캡슐화가 되어있는 객체에 데이터를 설정하고 가져오는 역할을 한다.

## 생성자

인스턴스를 생성할때 초기값을 설정하는것이 생성자이다.
(python에서 __init__ 함수를 의미한다)

위의 예시에서 생성자를 추가해보자

```
public class MotorBike {
    // state
    private int speed;

    MotorBike(int speed) {
        this.speed = speed;
    }

    void start() {
        System.out.printf("Bike Start").println();
    }
    ...
}
```

생성자는 리턴 타입을 지정하지 않고 클래스명과 동일한 이름으로 메서드를 생성하면 된다.