# Java 기초 - 16

- 목차
    1. synchronized
    2. Lock
    3. Atomic

## synchronized

우선 간단한 클래스를 만들어 보자.

```
public class Counter {
    private int i =0;
    public void increment() {
        i++;
    }
    public int getI() {
        return i;
    }
}
```

Counter라는 클래스가 있고 increment()메서드를 통해서 내부에 있는 i값을 증가시키고 getI()메서드를 통해서 가져올 수 있다.

만약 쓰레드를 통해서 여러개의 쓰레드에서 동시에 increment()를 호출하면 어떻게 될까.

분명 예상하지 못한 값이 getI를 통해 반환될 것이다.

이를 방지하기 위해서 'synchronized'라는 키워드를 사용할 수 있다.

```
public class BiCounter {
    private int i = 0;
    synchronized public void incrementI() {
        i++;
    }
    public int getI() {
        return i;
    }
}
```

이렇게 메서드 앞에 추가해주면 동기화 시켜서 여러개의 쓰레드에서 동시에 메서드를 호출하는것을 막을 수 있다.
(thread-safe 한 작업이 가능해졌다고 표현한다.)

## Lock

그럼 만약 변수가 2개일때는 어떨까?

```
public class BiCounter {
    private int i = 0;
    private int j = 0;
    synchronized public void incrementI() {
        i++;
    }
    synchronized public void incrementJ() {
        j++;
    }
    public int getI() {
        return i;
    }
    public int getJ() {
        return j;
    }
}
```

incrementI()와 incrementJ()는 서로 영향을 주지 않는 변수임에도 synchronized로 묶여있어 동시에 실행할 수 없다.

이럴때 사용하는것이 Lock이다.

```
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class BiCounterWithLock {
    private int i = 0;
    private int j = 0;

    Lock lockForI = new ReentrantLock();
    Lock lockForJ = new ReentrantLock();

    public void incrementI() {
        lockForI.lock();
        i++;
        lockForI.unlock();
    }
    public void incrementJ() {
        lockForJ.lock();
        j++;
        lockForJ.unlock();
    }
    public int getI() {
        return i;
    }
    public int getJ() {
        return j;
    }
}
```

우선 Lock을 선언해주고 기존에 있던 'synchronized' 키워드를 삭제한다.

위의 코드를 쓰레드로 동시에 실행하면 lockForI는 lockForI끼리, lockForJ는 lockForJ끼리 동기화되어 실행 될 것이다.

lockForJ.lock()을 통해 다른곳에서 lockForJ가 있는 코드는 실행 못하도록 하고 lockForJ.unlock()를 통해 다른 lockForJ에서도 코드를 실행 시킬수 있도록 하는것이다.

## Atomic

이번엔 atomic 클래스를 사용해볼 예정이다.

아까 만든 클래스를 수정해 주도록 하자.

```
import java.util.concurrent.atomic.AtomicInteger;

public class BiCounterWithAtomicInteger {
    private AtomicInteger i = new AtomicInteger();
    private AtomicInteger j = new AtomicInteger();

    public void incrementI() {
        i.incrementAndGet();
    }
    public void incrementJ() {
        j.incrementAndGet();

    }
    public int getI() {
        return i.get();
    }
    public int getJ() {
        return j.get();
    }
}
```

AtomicInteger는 atomic 연산자로써 증가 연산자를 제공해서 thread-safe에 해당되는지 자동으로 확인한다.

때문에 i++에서 i.incrementAndGet()으로 return i에서 return i.get()으로 바뀌었다.

![](https://velog.velcdn.com/images/deonii/post/07cbb9a0-d9d0-4c03-aa33-330d4a61638f/image.png)

atomic 패키지를 확인해보면

AtomicBoolean, AtomicInteger 등등 다양한 클래스가 있는것을 알 수 있다.

