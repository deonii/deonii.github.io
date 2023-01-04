# Java 기초 - 13

- 목차
    1. 함수형 프로그래밍
    2. 메소드 레퍼런스

## 함수형 프로그래밍

간단한 배열을 만들고 순회하는 몇가지 방법에 대해서 알아보자.

```
List<Integer> list1 = List.of(1,3,5,7,9,11,13,15);

// 람다 순회를 위해서 stream으로 만든다. 그리고 순회 시켜서 print한다.
list1.stream().forEach(ele -> System.out.println(ele));
=> 1
3
5
7
9
11
13
15

// filter를 걸어서 원하는 숫자만 출력되게 할 수 있다. 아래에서는 3의 배수만 출력한다.
list1.stream().filter(ele -> ele % 3 == 0).forEach(ele -> System.out.println(ele));
=> 3
9
15

// reduce로 순회를 할 수 있다. 여기서 0은 초기값이고 i1에는 이전에 더해진 값, i2에 현재값이 들어간다.
list1.stream().reduce(0,(i1, i2) -> i1+i2);
=> 64

List<Integer> list2 = List.of(1,3,5,7,9,11,13,15,11,13,9,7,5,3,1);

// sorted는 내부 요소를 정렬해준다.
list2.stream().sorted().forEach(i -> System.out.println(i));
=> 1
1
3
3
5
5
7
7
9
9
11
11
13
13
15

// distinct는 중복을 제거한다.
list2.stream().distinct().sorted().forEach(i -> System.out.println(i));
=> 1
3
5
7
9
11
13
15

// map은 각 요소를 중간 연산 할 수 있습니다.
list2.stream().distinct().sorted().map(i -> i*i).forEach(i -> System.out.println(i));
=> 1
9
25
49
81
121
169
225

// collect를 통해서 리스트로 다시 만들수 있다.
list2.stream().filter(i -> i%3 == 0).collect(Collectors.toList());
=> [3, 9, 15, 9, 3]

// stream을 생성 해서 작성 가능하다. range문법은 파이썬과 같다.
IntStream.range(1,11).forEach(i -> System.out.println(i));
=> 1
2
3
4
5
6
7
8
9
10

// 다시 리스트로 만들기 위해서는 boxed를 해야한다.
IntStream.range(1,11).boxed().collect(Collectors.toList());
=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 메소드 레퍼런스

메소드 레퍼런스를 통해 함수형 프로그래밍 파트에서 알아본 메서드들을 축약해보자.

```
List<Integer> list1 = List.of(1,3,5,7,9,11,13,15);

list1.stream().forEach(System.out::println);
=> 1
3
5
7
9
11
13
15
```

본래 "ele -> System.out.println(ele)"로 작성했던 부분을 "System.out::println"로 축약했다.

규칙은 "클래스명::메서드명" 이다.

변수가 2개 이상인 경우에도 사용 가능하다.

```
list1.stream().max((n1, n2) -> Integer.compare(n1, n2)).orElse(0);
=> 15

list1.stream().max(Integer::compare).orElse(0);
=> 15
```

마찬가지로 "클래스명::메서드명"으로 사용 가능하다.