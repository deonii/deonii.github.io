# Java 기초 - 8

- 목차
    1. ArrayList
    2. toString()
    3. 상속

## ArrayList

```
import java.util.ArrayList

// ArrayList는 요소의 타입을 선언하지 않아도 사용할 수 있음(추천하지 않음)
ArrayList arraylist = new ArrayList();

arraylist.add("test1");
|  Warning:
|  unchecked call to add(E) as a member of the raw type java.util.ArrayList
=> true

arraylist;
=> [test1]

// 해당 요소를 앞에서부터 찾아서 하나 삭제함
arraylist.remove("test1");
=> true

arraylist;
=> []

// 타입 지정 방법
ArrayList<String> items = new ArrayList<String>();

items.add(1);
|  Error:
|  incompatible types: int cannot be converted to java.lang.String

items.add("test1");
=> true

items;
=> [test1]

// 길이를 출력
items.size();
=> 1

// 인덱스로 삭제할 수 있음
items.remove(0);
=> test1

items;
=> []


```

## toString()

본래 클래스를 생성하고 System.out으로 출력하면 클래스명과 해쉬값이 출력된다.

```
package deonii.level2;

public class Fan {
    private String make;
    private double radius;
    private String color;
    private boolean isOn;
    private byte speed;

public Fan(String make, double radius, String color) {
        this.make = make;
        this.radius = radius;
        this.color = color;
    }
}
```

Fan이라는 클래스를 생성하고 출력해보자.

```
Fan fan = new Fan("Manufacturer 1", 0.34567, "green");


System.out.println(fan);
=> deonii.level2.Fan@7ad041f3
```

Fan 클래스에 toString()을 만들어주자

```
...
public String toString() {
    return String.format("make - %s, radius - %f, color - %s, isOn - %b, speed - %d", make, radius, color, isOn, speed);
}
...

System.out.println(fan);
=> make - Manufacturer 1, radius - 0.345670, color - green, isOn - false, speed - 0
```

이렇게 toString()을 직접 작성하는것을 오버라이딩이라고 한다.(기존의 것을 덮어씌운다는 의미)

## 상속

우선 간단한 클래스 하나를 만들어보자

```
package deonii.level2;

public class Person {
    private String name;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}

```

이제 이 Person을 상속받는 클래스를 만들어보자.

```
package deonii.level2;

public class Student extends Person{ // extens 클래스명 을 통해서 상속을 받을 수 있다.

}
```

여기서 Person은 슈퍼 클래스. Student는 서브 클래스라고 한다.

Student에 이름을 설정하고 출력해보자

```
Student st1 = new Student();

st1.setName("Deonii");

System.out.println(st1.getName());
=> Deonii
```

Student에는 getter, setter를 설정해주지 않았지만 Person으로부터 상속받았기 때문에 그대로 사용할 수 있다.

위의 Person을 조금 수정해서 생성자를 만들어보자.

```
package deonii.level2;

public class Person {
    String name;
    String email;

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
```

이때 Student를 그대로 사용하려고하면 에러가 발생한다.

생성자가 없기 때문이다. 생성자를 추가해주자.

```
package deonii.level2;

public class Student extends Person{

public Student(String name, String email) {
    super(name, email); // super는 부모클래스의 생성자를 호출한다.
    }

    public String toString() {
        return this.name + " / " + super.email; // super.를 통해 부모의 email에 접근 할 수 있다.
    }
}
```

```
Student st1 = new Student("deonii", "email@email.com");

System.out.print(st1);
=> deonii / email@email.com
```

상속에 대해 대략 알아보았다.

사실 자바의 모든 클래스는 이미 상속을 하고 있다.

아까 작성한 Person에 코드를 수정해주자.

```
package deonii.level2;

public class Person extends Object {
    String name;
    String email;

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
```

기존에 없던 "extends Object"를 추가했다.

변경 후에도 그대로 작동한다.

자바의 모든 클래스는 Object를 상속하고 있다.

내부에 들어가보면 getClass(), hashCode(), toString() 등이 정의되어있는것을 알 수 있다.

![](https://velog.velcdn.com/images/deonii/post/85d1437f-5a91-490b-b998-402666d65cf0/image.png)

때문에 System.out으로 출력했을때 해당 부분이 사용됐던거고 오버라이딩을 통해 재정의가 가능했던 것이다.