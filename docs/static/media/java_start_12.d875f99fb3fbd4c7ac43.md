# Java 기초 - 12

- 목차
    1. Queue
    2. Map
        1. HashMap
        2. LinkedHashMap
        3. Treemap
    3. generics

## Queue

선입선출 되는 자료형태이다.

```
// 큐를 생성
Queue<String> queue = new PriorityQueue<>();

// 큐에서 하나 꺼내옴
queue.poll();
=> null

queue.offer("Apple");
=> true
```

## Map

파이썬의 딕셔너리처럼 키, 밸류로 이루어진 자료구조.

```
// of로 생성하면 값 추가가 불가능함.
Map<String, Integer> map = Map.of("A", 3, "B", 4, "C", 10, "Z", 7);

map.get("Z");
=> 7

map.get("E");
=> null

map.size();
=> 4

map.isEmpty();
=> false

map.containsKey("B");
=> true

map.containsValue(3);
=> true

map.keySet();
=> [Z, C, B, A]

map.values();
=> [7, 10, 4, 3]
```

### HashMap

순서와 정렬이 없는 map

```
Map<String, Integer> map = Map.of("A", 3, "B", 4, "C", 10, "Z", 7);

Map<String, Integer> hashmap = new HashMap<>(map);

hashmap.put("F", 11);
=> null

hashmap;
=> {A=3, Z=7, B=4, C=10, F=11}

// 값을 넣으면 기존에 있던 값을 뱉는다.
hashmap.put("F", 100);
=> 11

hashmap;
=> {A=3, Z=7, B=4, C=10, F=100}
```

### LinkedHashMap

순서가 존재하고 정렬이 없는 map

```
Map<String, Integer> linkedhashmap = new LinkedHashMap<>();

linkedhashmap.put("A", 3);
=> null

linkedhashmap.put("C", 6);
=> null

linkedhashmap.put("B", 11);
=> null

linkedhashmap;
=> {A=3, C=6, B=11}
```

### Treemap

순서가 없고 정렬이 있는 map(키 기준으로 정렬됨)

```
Map<String, Integer> treemap = new TreeMap<>();

treemap.put("A", 3);
=> null

treemap.put("Z", 2);
=> null

treemap.put("F", 9);
=> null

treemap;
=> {A=3, F=9, Z=2}
```

## generics

간단한 ArrayList를 만드는 클래스를 만들어보자.

```
class GenerateArrayList {
    ArrayList<String> list = new ArrayList<>();

    public void addEle(String ele) {
        list.add(ele);
    }

    public void removeEle(String ele) {
        list.remove(ele);
    }

    public String toString() {
        return list.toString();
    }

    public String get(int index) {
        return list.get(index);
    }
}
```

사용해 보자.

```
GenerateArrayList arr1 = new GenerateArrayList();

arr1.addEle("deonii");

arr1;
=> [deonii]

arr1.get(0);
=> "deonii"
```

잘 사용된다.

여기서 만약 배열 내에 String이 아니라 Integer를 넣고싶다면 어떻게 해야할까.

지금 작성한 클래스는 불가능하다. String이라고 못박아 놨기 때문이다.

그렇다고 Integer, char 등등 전부 만들수도없다.

이때 사용하는게 제네릭이다.

클래스를 제네릭을 적용해서 수정해보자.

```
class GenerateArrayList<T> {
    ArrayList<T> list = new ArrayList<>();

    public void addEle(T ele) {
        list.add(ele);
    }

    public void removeEle(T ele) {
        list.remove(ele);
    }

    public String toString() {
        return list.toString();
    }

    public T get(int index) {
        return list.get(index);
    }
}
```

제네릭은 대문자로 선언해야한다.

T라고 선언되면 생성될 때 타입, 리턴 타입 등 에서 선언이 가능하다.

```
GenerateArrayList<Integer> arr2 = new GenerateArrayList<>();

arr2.addEle(100);

arr2;
=> [100]

arr2.get(0);
=> 100
```