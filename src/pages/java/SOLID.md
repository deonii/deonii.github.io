# 좋은 객체 지향 설계의 5가지 원칙(SOLID)

- 목차
    1. SOLID
        1. SRP: 단일 책임 원칙(single responsibility principle)
        2. OCP: 개방-폐쇄 원칙(Open/closed principle)
        3. LSP: 리스코프 치환 원칙(Liskov substitution principle)
        4. ISP: 인터페이스 분리 원칙(Interface segregation principle)
        5. DIP: 의존관계 역전 원칙(Dependency inversion principle)


## SOLID

클린코드로 유명한 로버트 마틴이 좋은 객체 지향 설계의 5가지 원칙을 정리했다.

> SRP: 단일 책임 원칙(single responsibility principle)
>
> OCP: 개방-폐쇄 원칙(Open/closed principle)
>
> LSP: 리스코프 치환 원칙(Liskov substitution principle)
>
> ISP: 인터페이스 분이 원칙(Interface segregation principle)
>
> DIP: 의존관계 역전 원칙(Dependency inversion principle)

### SRP: 단일 책임 원칙(single responsibility principle)

하나의 클래스는 하나의 책임만 가져야 한다.

하지만 하나의 책임이라는 것은 모호하다. 이는 클 수도 있고, 작을 수도 있다.

때문에 문맥과 상황에 따라 다르다.

중요한 기준은 변경이며 변경이 있을 때 파급 효과가 적으면 단일 책임 원칙을 잘 따랐다 할 수 있다.

### OCP: 개방-폐쇄 원칙(Open/closed principle)

소프트웨어 요소는 확장에 열려 있으나 변경에는 닫혀 있어야 한다.

이는 다형성에 해당되는 이야기로 새로운 기능이 필요하다면 새로운 인터페이스를 구현한 새로운 클래스를 만들어서 구현해야 한다는 것이다.

하지만 새로운 클래스가 생성되면 기존의 클래스 위치에 들어가게 되므로 코드의 변경이 필요하기는 하다.

때문에 객체를 생성하고 연관관계를 맺어주는 별도의 조립, 설정자가 필요하다.

### LSP: 리스코프 치환 원칙(Liskov substitution principle)

프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.

다형성에서 하위 클래스는 인터페이스 규약을 다 지켜야 한다는것, 다형성을 지원하기 위한 원칙이다.

인터페이스를 구현한 구현체는 믿고 사용하려면, 이 원칙이 필요하다.

### ISP: 인터페이스 분리 원칙(Interface segregation principle)

특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.

자동차 인터페이스가 있다고 가정하면 운전 인터페이스, 정비 인터페이스로 분리하는 것이 더 낫다.

마찬가지로 사용자 클라이언트가 있다고 가정하면 이는 운전자 인터페이스, 정비사 인터페이스로 분리하는 것이 더 낫다.

이를 통해 인터페이스가 명확해지고, 대체 가능성이 높아진다.

### DIP: 의존관계 역전 원칙(Dependency inversion principle)

추상화에 의존해야지, 구체화에 의존하면 안된다는 원칙이다.

의존성 주입은 이 원칙을 따르는 방법 중 하나이다.

쉽게 이야기하자면 구현 클래스에 의존하지 말고, 인터페이스에 의존하라는 뜻이다.

## 스프링과 OCP, DIP

객체지향 구조를 고민하다보면 OCP와 DIP를 둘다 만족 시킬수 없어서 고민하는 상황이 온다고 한다.(나는 아직 모르겠다.)

이러한 문제를 해결하기 위해서 스프링에서는 DI(Dependency Injection) 컨테이너를 제공해서 의존관계, 의존성을 주입한다.

이렇게 하여 클라이언트 코드의 변경 없이 기능 확장이 가능해진다.