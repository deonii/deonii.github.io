# Java 기초 - 10

- 목차
    1. 추상화
    2. 인터페이스
    3. list
    4. 리스트 반복자

## 추상화

간단한 추상 클래스를 만들어보자.

```
abstract class AbstractAnimal {
    abstract public void bark();
}
```

추상 클래스를 만들기 위해서는 abstract를 class 앞에 붙여주면 된다.(추상화 할 메서드도 똑같이 abstract를 붙여준다.)

추상 클래스를 사용해 보자.

```
class Dog extends AbstractAnimal {}
|  Error:
|  Dog is not abstract and does not override abstract method bark() in AbstractAnimal

class Dog extends AbstractAnimal {
    public void bark() {
        System.out.println("bark bark!");
    }
}

Dog dog1 = new Dog();

dog1.bark();
=> bark bark!
```

생성된 추상 클래스를 사용해 보았다.

추상화 된 메서드는 추가로 정의해주지 않으면 추상 클래스를 사용할 수 없다.

## 인터페이스

간단한 인터페이스를 만들어보자.

```
public interface GamingConsole {
    public void up();
    public void down();
    public void right();
    public void left();
}
```

인터페이스를 만들기 위해서는 class대신 interface라 적어주고 기본 메서드를 선언한다.

인터페이스를 사용해 보자.

```
public class MarioGame implements GamingConsole {
    @Override
    public void up() {
        System.out.println("Jump!");
    }

    @Override
    public void down() {
        System.out.println("In to hole!");
    }

    @Override
    public void right() {
        System.out.println("Go right!");
    }

    @Override
    public void left() {
        System.out.println("Go left!");
    }
}

MarioGame game1 = new MarioGame();
GamingConsole game2 = new MarioGame();

game1.up();
=> Jump!

game2.up();
=> Jump!
```

인터페이스를 사용하기 위해서는 extends 대신 implements를 사용해준다.

그리고 인스턴스 생성시 타입 선언하는 부분에 인터페이스를 선언해도 가능하다.

## list

```
import java.util.List;

// 리스트 생성, of로 생성했으므로 불변 리스트이다
List<String> words = List.of("Apple", "Bat", "Cat");

words.size();
=> 3

words.isEmpty();
=> false

words.get(0);
=> "Apple"

words.contains("Cat");
=> true

words.contains("Dog");
=> false

words.indexOf("Cat");
=> 2

words.indexOf("Dog");
=> -1

// 리스트는 인터페이스이므로 이렇게 생성하는것도 가능하다. 이렇게 생성하면 가변 리스트가 된다.
List<String> wordsArrayList = new ArrayList<String>(words);

wordsArrayList.add("Dog");
=> true

wordsArrayList;
=> [Apple, Bat, Cat, Dog]

// 특정 인덱스에 요소 추가
wordsArrayList.add(2,"Tiger");

wordsArrayList;
=> [Apple, Bat, Tiger, Cat, Dog]

// 요소 전체를 배열 뒤에 추가.
wordsArrayList.addAll(words);
=> true

wordsArrayList;
=> [Apple, Bat, Tiger, Cat, Dog, Apple, Bat, Cat]

// 특정 인덱스의 요소를 교체
wordsArrayList.set(0, "Lion");
=> "Apple"

wordsArrayList;
=> [Lion, Bat, Tiger, Cat, Dog, Apple, Bat, Cat]

// 특정 인덱스의 요소를 삭제.(반환됨)
wordsArrayList.remove(1);
=> "Bat"

wordsArrayList;
=> [Lion, Tiger, Cat, Dog, Apple, Bat, Cat]

// 특정 요소를 삭제(참 거짓으로 반환됨)
wordsArrayList.remove("Dog");
=> true

wordsArrayList;
=> [Lion, Tiger, Cat, Apple, Bat, Cat]
```

## 리스트 반복자

```
List<String> words = List.of("Apple", "Bat", "Cat");

Iterator wordsIterator = words.iterator();

// Iterator를 사용할땐 while를 사용해야함
while(wordsIterator.hasNext()) {
    System.out.println(wordsIterator.next());
}
=> Apple
Bat
Cat
```

리스트의 반복문이 세가지(for문, foreach문, Iterator)나 존재하는 이유를 알아보자

```
List<String> words = List.of("Apple", "Bat", "Cat");

List<String> wordsAl = new ArrayList<String> (words);

for(String word:wordsAl) {
    if(word.endsWith("at")) {
        wordsAl.remove(word);
    }
}

wordsAl;
=> [Apple, Cat]
```

우선 foreach로 특정 단어로 끝날때 단어를 삭제하도록 하였다.

하지만 결과를 보면 Cat이 남아있는것을 알 수 있다.

반복문을 통해 배열을 수정할때에는 반복자를 사용하는것을 추천한다.

```
List<String> words = List.of("Apple", "Bat", "Cat");

List<String> wordsAl = new ArrayList<String> (words);

Iterator<String> iterator = wordsAl.iterator();

while(iterator.hasNext()) {
    if(iterator.next().endsWith("at")) {
        iterator.remove();
    }
}

wordsAl;
=> [Apple]
```