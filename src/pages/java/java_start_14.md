# Java 기초 - 14

- 목차
    1. Threads
        1. Thread 클래스 확장
        2. Runnable 인터페이스
        3. join()
        4. ExecutorService
        5. Callable

## Threads

Thread를 생성하는 두 가지 방법이 있다.

첫 번째는 Thread라고 불리는 클래스를 확장하는 방법이다.

두 번째는 'Runnable'이라고 불리는 인터페이스를 실행하는 방법이다.

### Thread 클래스 확장

반복문을 출력하는 간단한 클래스를 만들어보자.

```
public class ThreadsRunner {
    public static void main(String[] args) {
        // task 1
        System.out.println(" task 1 Start");
        for(int i=0; i<100; i++) {
            System.out.print(1 + " ");
        }
        System.out.println("\n task 1 Done\n");

        // task 2
        System.out.println("\n task 2 Start");
        for(int i=0; i<100; i++) {
            System.out.print(2 + " ");
        }
        System.out.println("\n task 2 Done\n");

        // task 3
        System.out.println("\n task 3 Start");
        for(int i=0; i<100; i++) {
            System.out.print(3 + " ");
        }
        System.out.println("\n task 3 Done\n");
    }
}
```

실행 시켜보자.

```
task 1 Start
1 1 1 1 1 1 1 1 ...
task 1 Done


task 2 Start
2 2 2 2 2 2 2 2 ...
task 2 Done


task 3 Start
3 3 3 3 3 3 3 3 ...
task 3 Done
```

순서대로 실행되는것을 알 수 있다.

이제 Threads클래스를 확장한 클래스 Task1을 만들어보자.

```
class Task1 extends Thread {
    public void run() {
        System.out.println(" task 1 Start");
        for(int i=0; i<100; i++) {
            System.out.print(1 + " ");
        }
        System.out.println("\n task 1 Done\n");
    }
}
```

아래 //task 1  부분도 수정해주자.

```
public class ThreadsRunner {
    public static void main(String[] args) {
        // task 1
        Task1 task1 = new Task1();
        task1.start();

        // task 2
        System.out.println("\n task 2 Start");
        for(int i=0; i<100; i++) {
            System.out.print(2 + " ");
        }
        System.out.println("\n task 2 Done\n");

        // task 3
        System.out.println("\n task 3 Start");
        for(int i=0; i<100; i++) {
            System.out.print(3 + " ");
        }
        System.out.println("\n task 3 Done\n");
    }
}
```

실행 시켜보자.

```
task 1 Start
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 ...
task 2 Start
2 2 2 2 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 ...
task 1 Done

2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
task 2 Done


task 3 Start
3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 ...
task 3 Done

```

task1이 시작되고 끝나기전에 task2가 시작된것을 알 수 있다.

Threads 클래스를 확장하여 병렬로 실행 시킨것이다.

주의해야할 것은 main 메서드에서 task1.run(); 이 아니라 task1.start(); 로 작성해야 된다는 점이다.
(run()으로 작성시 병렬이 아닌 일반 메서드 처럼 작동한다.)

### Runnable 인터페이스

이번엔 task2를 Runnable 인터페이스를 사용하여 클래스로 만들어보자.

```
class Task2 implements Runnable {
    @Override
    public void run() {
        System.out.println("\n task 2 Start");
        for(int i=0; i<100; i++) {
            System.out.print(2 + " ");
        }
        System.out.println("\n task 2 Done\n");
    }
}
```

마찬가지로 run() 메서드에 정의해준다.

main 메서드에 적용시켜보자.

```
public class ThreadsRunner {
    public static void main(String[] args) {
        // task 1
        Task1 task1 = new Task1();
        task1.start();

        // task 2
        Task2 task2 = new Task2();
        // Runnable 인터페이스를 사용하기 위해서는 Thread 인스턴스를 생성해야한다.
        Thread task2Thread = new Thread(task2);
        task2Thread.start();

        // task 3
        System.out.println("\n task 3 Start");
        for(int i=0; i<100; i++) {
            System.out.print(3 + " ");
        }
        System.out.println("\n task 3 Done\n");

        System.out.println("\n Main Done");
    }
}
```

실행 시켜보자.

```
task 1 Start
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
task 3 Start
3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
task 2 Start
3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 3 3 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 ...
task 3 Done


Main Done
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
task 2 Done


task 1 Done
```

task1이 완료되기 전에 task2가 실행되고 task2가 완료되기 전에 task3가 실행되며 병렬적으로 실행되는 모습을 보여준다.

또한 main메서드가 완료 후에도 task1, task2가 실행되는 모습을 알 수 있다.

### join()

병렬적으로 실행되는 코드에 몇가지 코드를 추가해 줍니다.

```
public class ThreadsRunner {
    // 아래 task1.join()을 추가하기 위해서는 'throws InterruptedException'를 추가해야한다.
    public static void main(String[] args) throws InterruptedException {
        // task 1
        Task1 task1 = new Task1();
        task1.start();

        // start() 뒤에 join()을 추가해주자.
        task1.join();

        // task 2
        Task2 task2 = new Task2();
        Thread task2Thread = new Thread(task2);
        task2Thread.start();

        // task 3
        System.out.println("\n task 3 Start");
        for(int i=0; i<100; i++) {
            System.out.print(3 + " ");
        }
        System.out.println("\n task 3 Done\n");

        System.out.println("\n Main Done");
    }
}
```

실행해보자.

```
task 1 Start
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 ...
task 1 Done


task 3 Start
3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
task 2 Start
2 2 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 2 2 2 2 2 2 ...
task 2 Done

3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
task 3 Done


Main Done
```

task1이 완전이 끝나고서 이후 코드가 실행되는것을 알 수 있다.

join()을 통해서 원하는 코드가 종료된 뒤에 다음 코드를 실행 시킬수 있다.

### ExecutorService

Thread로 병렬 실행하는 코드를 싱글쓰레드로 하나씩 순차적으로 실행하는 방법이 있다.

아래 코드로 알아보자.

```
package deonii.level3;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceRunner {

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.execute(new Task1());
        executorService.execute(new Thread(new Task2()));

        // 반드시 shutdown해줘야 한다. 없으면 계속 실행중인 상태가 된다.
        executorService.shutdown();
    }
}
```

아까 만들었던 Task1과 Task2를 사용했다.

실행해 보자.

```
task 1 Start
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 ...
task 1 Done


task 2 Start
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 ...
task 2 Done
```

마치 동기화 코드처럼 순차적으로 실행되는걸 알 수 있다.

위의 코드에 다시 task3를 추가해보자.

```
package deonii.level3;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceRunner {

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.execute(new Task1());
        executorService.execute(new Thread(new Task2()));

        // task3
        System.out.println("\n task 3 Start");
        for(int i=0; i<100; i++) {
            System.out.print(3 + " ");
        }
        System.out.println("\n task 3 Done\n");

        System.out.println("\n Main Done");

        executorService.shutdown();
    }

}
```

실행해 보자.

```
task 1 Start
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
task 3 Start
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 3 3 3 3 3 3 3 3 3 3 3 3 ...
task 1 Done

3 3 3 3 3 3 3 3 3
task 3 Done


Main Done

task 2 Start
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 ...
task 2 Done
```

task1과 task2는 서로 싱글 쓰레드 안에서 실행되었지만 task3은 병렬처리 된것을 알 수 있다.

이렇게 thread를 사용하여 병렬처리를 하면서 순차적으로 코드를 실행 시킬 수 있다.

이번엔 쓰레드의 개수를 지정하고 사용해보자.

위의 코드를 수정해주자.

```
package deonii.level3;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class Task extends Thread {
    int num;
    public Task(int i) {
        this.num =i;
    }
    public void run() {
        System.out.println("\n task "+num+" Start\n");
        for(int i=0; i<100; i++) {
            System.out.print(this.num  + " ");
        }
        System.out.println("\n task "+num+" Done\n");
    }
}

public class ExecutorServiceRunner {

    public static void main(String[] args) {
        // newFixedThreadPool를 통해서 쓰레드 개수를 조절할 수 있다. 여기서는 2개이다.
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        executorService.execute(new Task(1));
        executorService.execute(new Task(2));
        executorService.execute(new Task(3));
        executorService.execute(new Task(4));

        executorService.shutdown();
    }
}
```

실행해 보자.

```

task 2 Start


task 1 Start

1 1 1 1 1 1 1 1 2 2 2 2 1 2 2 2 2 1 2 1 1 1 2 1 1 1 2 1 2 1 1 ...
task 1 Done


task 2 Done


task 3 Start


task 4 Start

4 3 3 4 4 3 4 3 3 3 3 3 3 3 3 3 3 3 3 4 4 4 4 4 4 4 4 4 4 4 4 4 4 ...
task 4 Done

3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
task 3 Done
```

task1, task2가 실행되고 완료된 후에 task3, task4가 실행된 것을 알 수 있다.

쓰레드를 2개로 지정해서 2개씩 실행된 모습이다.

### Callable

쓰레드를 통해 로직이 진행된 후에 값을 반환받는 방법을 알아보자.

```
package deonii.level3;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;


// Callable 인터페이스를 통해 클래스를 생성해 준다.
class CallableTask implements Callable<String>{
    private String name;

    public CallableTask(String name) {
        this.name = name;
    }

    @Override
    public String call() throws Exception {
        // 쓰레드를 통해 1초동안 멈췄다가 코드를 실행시킨다.
        Thread.sleep(1000);
        return "Hello " + name;
    }
}

public class CallableRunner {

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executorService = Executors.newFixedThreadPool(1);
        // Future라는 클래스에 값을 담는다. 이때는 execute가 아니라 submit을 사용해야한다.
        Future<String> deoniiFuture = executorService.submit(new CallableTask("deonii"));

        System.out.println("\n new CallableTask Done \n");

        // 반환된 값을 받기 위해서 get()을 사용한다.
        String welcomeMessage = deoniiFuture.get();

        System.out.println(welcomeMessage);

        System.out.println("Main Done!");
    }
}
```

실행시켜 보자.

```
new CallableTask Done

// 1초후 나타남
Hello deonii
Main Done!
```

직접 실행 해본다면 'new CallableTask Done' 문자열이 출력된 후 쓰레드가 1초 후에 값을 반환해 나머지 문자열이 출력되는 것을 알 수 있다.

여러개의 반환값을 받는 방법또한 있다.

위의 CallableRunner 클래스의 코드를 수정해 보자.

```
public class CallableRunner {

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executorService = Executors.newFixedThreadPool(1);

        // list에 CallableTask 인스턴스 3개를 담았다.
        List<CallableTask> tasks = List.of(new CallableTask("deonii 1"),
            new CallableTask("deonii 2"), new CallableTask("deonii 3"));

        // invokeAll 메서드를 통해서 list를 담고 Future가 담긴 리스트를 반환한다.
        List<Future<String>> results = executorService.invokeAll(tasks);

        // foreach를 통해 출력한다.
        for(Future<String> result:results) {
            System.out.println(result.get());
        }

        System.out.println("Main Done!");
        executorService.shutdown();
    }

}
```

실행시켜 보자.

```
// 실행 후 약 3초뒤 출력
Hello deonii 1
Hello deonii 2
Hello deonii 3
Main Done!
```

실행 시키고 약 3초뒤 출력이 되는 모습을 보인다. 쓰레드의 개수를 늘리면 더 빠르게 출력 받을 수 있다.

위의 CallableRunner를 수정해서 가장 빨리 실행된 코드만 반환 받아보자.

```
public class CallableRunner {

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executorService = Executors.newFixedThreadPool(1);

        List<CallableTask> tasks = List.of(new CallableTask("deonii 1"),
            new CallableTask("deonii 2"), new CallableTask("deonii 3"));

        // invokeAny를 통해 String 한개만 리턴을 받는다.
        String results = executorService.invokeAny(tasks);

        System.out.println(results);

        System.out.println("Main Done!");
        executorService.shutdown();
    }
}
```

실행시켜 보자.

```
Hello deonii 1
Main Done!
```

실행시켜보면 매번 다른 결과가 나오는것을 알 수 있다.
