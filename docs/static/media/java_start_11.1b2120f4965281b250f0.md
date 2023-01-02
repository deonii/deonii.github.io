# Java 기초 - 11

- 목차
    1. list sort
    2. set
        1. HashSet
        2. LinkedHashSet
        3. TreeSet

## list sort

정렬 기능이다 간단하게 알아보자.

```
List<Integer> numbers = List.of(123, 12, 45, 3);

List<Integer> numbersAl = new ArrayList<>(numbers);

// Collections 안에 있는 정적 메소드 사용
Collections.sort(numbersAl);

numbersAl;
=> [3, 12, 45, 123]
```

숫자를 기준으로 한 정렬이 되었다.

조금 더 심화해서 사용해 보자.

우선 클래스를 생성해주자.

```
package deonii.level2;

public class Student {
    private int id;
    private String name;

    Student(int id, String name){
        this.id = id;
        this.name = name;
    }

    public String toString() {
        return id + " " + name;
    }
}
```

실행을 위한 파일을 생성해주자

```
package deonii.level2;

import java.util.ArrayList;
import java.util.List;

public class CollectionsRunner {

    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student(100, "king"),
            new Student(1, "deonii"),
            new Student(5, "dalbi")
            );
        List<Student> studentsAl = new ArrayList<>(students);

        System.out.println(studentsAl);
    }
}

=> [100 king, 1 deonii, 5 dalbi]
```

이 객체들을 id순으로 정렬해보자.

우선 위에서 사용한 Collections.sort()를 사용해보자.

![](https://velog.velcdn.com/images/deonii/post/77dcd35b-f15d-4109-8fda-cbf0a90b00d8/image.png)

sort부분이 빨갛게 에러가 발생한걸 알 수 있다.

sort를 cmd+클릭 해보자.

![](https://velog.velcdn.com/images/deonii/post/29b779f4-97e8-43e2-ab79-024a826b91f3/image.png)

Comparable을 extends하고 있는걸 알 수 있다.

쉬프트 + 커맨드 + t를 눌러서 integer를 검색후 더블클릭하자.

![](https://velog.velcdn.com/images/deonii/post/b882728a-af28-47a3-bfbd-b50fa75df12b/image.png)

Comparable이라는 인터페이스를 implements하고있다.

때문에 Integer는 Comparable 할 수 있고 sort할 수 있는것이다.

Comparable안으로 들어가보자.

![](https://velog.velcdn.com/images/deonii/post/2d95b838-ac51-44f7-9736-598250e54f3c/image.png)

뭔가 길게 나와있는데 결국 compareTo라는 메서드를 통해서 비교를 한다는 사실을 알 수 있다.

그럼 아까 만든 Student 클래스도 Comparable를 implements하고 compareTo라는 메서드를 오버라이딩하면 정렬이 가능하다는 이야기 이다.

시도해 보자.

```
package deonii.level2;

public class Student implements Comparable<Student> {
    private int id;
    private String name;

    Student(int id, String name){
        this.id = id;
        this.name = name;
    }

    public String toString() {
        return id + " " + name;
    }

    @Override
    public int compareTo(Student that) {
        return Integer.compare(this.id, that.id);
    }
}
```

비교는 Integer의 compare 메서드를 사용했다.

compare 메서드는 숫자 두개를 비교해서 앞의 숫자가 크면 1, 같으면 0, 작으면 -1를 뱉는다.

![](https://velog.velcdn.com/images/deonii/post/2b8d6356-e795-4c09-8e5e-1bb2d657aa36/image.png)

아까 작성한 CollectionsRunner가 에러없이 컴파일 되는것을 알 수 있다.

프린트를 찍어보자.

```
System.out.println(studentsAl);
=> [1 deonii, 5 dalbi, 100 king]
```

만약 반대로 하고 싶다면 어떻게 해야할까?

```
@Override
public int compareTo(Student that) {
    return Integer.compare(that.id, this.id);
}
```

id를 비교하는 부분의 순서를 반대로 바꾸면 역정렬이 가능하다.

```
System.out.println(studentsAl);
=> [100 king, 5 dalbi, 1 deonii]
```

## set

중복을 허용하지 않는 컬렉션이다.

```
Set<String> set1 = Set.of("Dog", "Cat", "tiger");

// .of 를 통해 만들면 요소 추가가 불가능하다.
set1.add("Apple");
|  Exception java.lang.UnsupportedOperationException

Set<String> hashset1 = new HashSet<>(set1);

hashset1.add("Apple");
=> true

hashset1
=> [Apple, Cat, tiger, Dog]

// 중복을 허용하지 않기 때문에 false가 나온다.
hashset1.add("Apple");
=> false
```

### HashSet

set의 종류중 하나.

순서와 정렬을 가지지 않고 중복된 값을 가지지 않음.

```
Set<Integer> numbers = new HashSet<>();

numbers.add(112233);
=> true

numbers.add(11223);
=> true

numbers.add(1122);
=> true

numbers.add(112);
=> true

numbers.add(1);
=> true

numbers;
=> [112, 1, 1122, 11223, 112233]
```

삽입 순서, 정렬 순서가 없이 출력된다.

### LinkedHashSet

순서를 가지지만 정렬되지 않고 중복된 값을 가지지 않음.

```
Set<Integer> numbers = new LinkedHashSet<>();

numbers.add(112233);
=> true

numbers.add(11223);
=> true

numbers.add(1122);
=> true

numbers.add(112);
=> true

numbers.add(1);
=> true

numbers;
=> [112233, 11223, 1122, 112, 1]
```

삽인 된 순서대로 출력된다.

### TreeSet

순서는 가지지 않지만 정렬되고 중복된 값을 가지지 않음.

```
Set<Integer> numbers = new TreeSet<>();

numbers.add(112233);
=> true

numbers.add(11223);
=> true

numbers.add(1122);
=> true

numbers.add(112);
=> true

numbers.add(1);
=> true

numbers;
=> [1, 112, 1122, 11223, 112233]
```

정렬된 값이 출력된다.
