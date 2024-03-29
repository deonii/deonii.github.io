# CPU 스케쥴링

- 목차
    1. cpu 스케쥴링 개요
    2. 다중큐
    3. 스케쥴링 목표
    4. cpu 스케쥴링 알고리즘
        1. FIFO(First In First Out)
        2. SJF(Shortest Job First)
        3. RR(Round Robin)
        4. MLFQ(Multi Level Feedback Queue)


## cpu 스케쥴링 개요

컴퓨터의 자원은 cpu나 메모리같은 필수장치와 HDD나 키보드, 마우스 같은 주변장치가 있다.

프로그램을 실행시키면 메모리에 프로세스가 생성되고 각 프로세스에는 한 개 이상의 쓰레드가 있다.

프로세스들은 cpu를 차지하기 위해서 운영체제의 명령을 기다리고 있다.

운영체제는 모든 cpu에게 할당/해제 하는데 이를 "cpu 스케쥴링"이라고 한다.

cpu 스케쥴링에서 스케쥴러(여기서 운영체제)가 고려해야 할 사항은 두 가지가 있다.

첫 번째, 어떤 프로세스에게 cpu 리소스를 줘야하는가. -> 메모리의 수많은 프로세스중 어떤 프로세스에게 cpu 사용권을 줘야하는가 하는 문제이다.

두 번째, cpu를 할당받은 프로세스가 얼마나 cpu를 사용해야하는가.

이 두가지가 컴퓨터 성능에 굉장히 큰 영향을 미친다.

cpu를 할당받아 실행하는 작업을 "cpu burst"라고 부르고 입출력 작업을 "I/O Burst"라고 부른다.

## 다중큐

이전에 프로세스 5가지 상태(생성, 준비, 실행, 대기, 완료)에서 준비와 대기 상태는 큐(Queue)라는 자료구조로 관리된다.

프로세스가 실행상태에서 준비상태로 돌아갈 때 운영체제는 해당 프로세스의 우선순위를 보고 그에 맞는 "준비 큐"에 넣는다.

cpu 스케쥴러는 "준비상태의 다중큐"에 들어있는 프로세스들 중에 적당한 프로세스를 선택해 실행상태로 전환시킨다.

프로세스가 실행상태에서 I/O요청을 받아 대기상태로 오게되면 I/O작업 종류에 따라서 분류된 큐에 들어가게된다.

예를 들면 하드디스크 작업은 "HDD 큐"에 들어가고 하드디스크 작업이 완료되어 인터럽트가 발생되면 "HDD 큐"에서 다시 꺼내간다.

여기서 큐에 프로세스가 들어간다고 표현했지만 이는 프로세스의 정보를 가지고 있는 PCB가 들어가는 것이다.

## 스케쥴링 목표

스케쥴링에는 몇가지 목표가 존재한다.

첫 번째. 리소스 사용률

cpu 사용률을 높이는 것을 목표로 할 수도 있고 I/O 디바이스의 사용률을 높이는 것을 목표로 할 수도 있다.

두 번째. 오버헤드 최소화

스케쥴링을 하기 위한 계산이 너무 복잡하거나 컨텍스트 스위칭을 너무 자주하면 배보다 배꼽이 커지는 상황이 나타난다. 스케쥴러는 이런 오버헤드를 최소화 하는것을 목표로 한다.

세 번째. 공평성

모든 프로세스에게 공평하게 cpu가 할당되어야 한다. 공평의 의미는 시스템에 따라 달라질 수 있다.

네 번째. 처리량

같은 시간내에 더 많은 처리를 할 수 있는 방법을 목표로 한다.

다섯 번째. 대기시간

작업을 요청하고 실제 작업이 이루어지기 전까지 대기하는 시간이 짧은 것을 목표로 한다.

여섯 번째. 응답시간

대화형 시스템에서 사용자의 요청이 얼마나 빨리 반응하는지가 중요하기 때문에 응답시간이 짧은 것을 목표로 한다.

## cpu 스케쥴링 알고리즘

### FIFO(First In First Out)

먼저 들어온 작업이 먼저 나간다는 뜻으로 스케쥴링 큐에 들어온 순서대로 cpu를 할당받는 방법이다.

이 방법은 먼저 들어온 프로세스가 완전히 끝나야만 다음 프로세스가 실행될 수 있다.

이때 I/O 작업이 있다면 I/O 작업이 끝날때 까지 대기상태로 기다리기 때문에 cpu사용률이 떨어진다.

스케쥴링의 성능은 평균 대기 시간으로 평가한다.

평균 대기 시간은 프로세스 여러개가 실행될 때 이 프로세스들이 모두 실행되기까지 대기시간의 평균을 말한다.

### SJF(Shortest Job First)

운영체제를 연구하던 사람들은 CPU사용 시간이 짧은 순서로 실행 시켰을때 FIFO보다 평균 대기 시간이 짧다는것을 알게 되었다.

때문에 짧은 작업을 먼저 실행하는 알고리즘을 만들었다.

SJF은 이론적으로 FIFO보다 성능이 더 좋다.

하지만 실제로 구현을 하려고하니 문제가 발생했다.

첫 번째로 어떤 프로세스가 얼마나 실행될지 예측하기 힘들다는 것이다.

두 번째로 cpu burst시간이 짧은 프로세스가 계속 들어오게되면 상대적으로 시간이 긴 프로세스는 계속 대기상태로 기다려야 한다.

이러한 문제때문에 SJF은 실제로 사용되지 않는다.

### RR(Round Robin)

FIFO 알고리즘은 일괄 처리 시스템에 적합하지만 시분할처리 시스템에서는 쓰기가 힘들고 SJF 알고리즘은 프로세스의 종료시간을 예측하기 힘들다.

그래서 가장 단순한 FIFO 알고리즘에서 문제를 해결해 보려고 했다.

프로세스를 들어온 순서(큐)로 실행하되 일정시간만큼만 cpu를 할당하고 할당된 시간이 지나면 강제로 다른 프로세스에게 일정시간만큼 cpu를 할당한다.

강제로 cpu를 뺏긴 프로세스는 큐의 가장 뒷부분으로 밀려난다.

이 알고리즘은 RR(Round Robin)이라고 부른다.

프로세스에게 할당하는 일정시간은 "타임 슬라이스" 또는 "타임 퀀텀"이라고 부른다.

상황에 따라 FIFO 알고리즘보다 평균 대기 시간이 짧을 수도 있지만 RR 알고리즘은 타임 슬라이스에 따라 컨텍스트 스위칭이 자주 발생하여 오히려 FIFO보다 성능이 떨어 질 수도 있다.

타임 슬라이스가 무한대라면 RR 알고리즘은 결국 FIFO 알고리즘과 동일하게되고 너무 작게 되면 컨텍스트 스위칭이 너무 자주 일어나게되고 프로세스 처리량 보다 컨텍스트 스위칭으로 처리되는 처리량이 훨씬 커져서 배보다 배꼽이 더 커지는 상황이 발생한다.

이런 상황을 오버헤드가 너무 크다 라고 말한다.

때문에 최적의 타임 슬라이스를 결정하는 방법은 사용자가 느끼기에 여러 프로세스가 버벅거리지 않고 동시에 실행되는 것처럼 느껴지면서 오버헤드가 너무 크지 않는 값을 찾아야 하는것이다.

실제로 윈도우는 타임 슬라이스가 20ms, 유닉스는 100ms정도이다.

### MLFQ(Multi Level Feedback Queue)

오늘날 운영체제에서 가장 일반적으로 쓰이는 cpu 스케쥴링 기법인 MLFQ에 대해 알아보자.

RR 알고리즘의 업그레이드된 알고리즘이다.

우선 프로세스를 두종류로 나눈다.

CPU 작업을 주로하는 cpu bound 프로세스.

I/O 작업을 주로하는 I/O bound 프로세스.

cpu bound 프로세스가 중요하게 생각하는건 cpu 사용률과 처리량이다.

I/O bound 프로세스가 중요하게 생각하는건 응답속도이다.

이를 운영체제가 구분하는 법은 프로세스가 스스로 I/O 입력때문에 cpu를 반납하면 이는 I/O bound 프로세스 일 확률이 높다는것이고

반대로 프로세스가 타임 슬라이스를 초과해서 cpu를 사용해야 된다면 cpu bound 프로세스 일 확률이 높다는것이다.

이를 바탕으로 타임 슬라이스가 점점 커지는 큐를 준비해두고 프로세스가 타임 슬라이스로 cpu를 반납할때 타임 슬라이스가 한 단계 더 큰 큐로 이동시킨다.

이런 방식으로 cpu bound 프로세스는 타임 슬라이스를 점점 더 크게 할당받아 효율적으로 프로세스를 처리할 수 있게되고 I/O bound 프로세스는 작은 타임 슬라이스로 응답속도를 올린다.