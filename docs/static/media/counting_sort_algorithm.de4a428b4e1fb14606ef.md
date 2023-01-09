# 카운팅 정렬 알고리즘

본문은 [자바 [JAVA] - 카운팅 정렬 (Counting sort / 계수 정렬)](https://st-lab.tistory.com/104)을 참고하여 작성되었습니다.

- 목차
    1. 원리
    2. 구현
    3. 의문점
    4. 결론

## 원리

원리는 간단하다. 각 데이터의 값이 몇 번 나왔는지 세어준 다음 말그대로 counting하여 정렬한것이다.

아래와 같은 배열이 있다고 가정하자.

![](https://velog.velcdn.com/images/deonii/post/516b7a63-1e07-44bb-a947-76a47fe5f261/image.png)

이 배열을 순회하며 각 값이 나올때 마다 해당 값을 index로 하는 배열의 값을 1씩 증가시킨다.

예를 들어 숫자 7은 0, 4, 8번 인덱스에 3개 있으니 배열 counting의 7번 인덱스의 값은 2이다.

그리고 숫자 2는 1번 인덱스에서 1번 인덱스에 1개 있으니 배열 counting의 2번 인덱스의 값은 1이다.

이렇게 배열을 순회하고 나면 아래와 같은 값이 나온다.

![](https://velog.velcdn.com/images/deonii/post/4b30db12-432e-4c12-8dd6-b1e1ca4ed958/image.png)

그리고 이 값을 정렬된 모습으로 블럭으로 표현하면 다음과 같다.

![](https://velog.velcdn.com/images/deonii/post/df7793f9-17eb-49c0-933b-4157efada36d/image.png)

이제 블럭을 쌓기 위해서 노란색 블럭 부분을 더할 필요가 있다.

노란색 부분은 0번 블럭부터 차례대로 각 블럭 수 만큼 다음 블럭에 더해주면 된다.(그림을 보자. 이해가 빠르다.)

결과적으로 이런 모습이 된다.

![](https://velog.velcdn.com/images/deonii/post/d0bc4184-1b76-45d2-a124-9e7d62065635/image.png)

이제 counting 배열을 활용해서 최종 배열을 만들면 된다.

> 1. 원본 배열에서 마지막 요소의 값을 가져온다.(여기서는 1)
>
> 2. counting 배열에서 해당 값의 값을 찾는다.(여기서는 3)
>
> 3. 해당 값은 블럭의 개수이므로 인덱스값으로 변환한다.(3번째이므로 2번 인덱스)
>
> 4. 최종 배열의 해당 인덱스값에 가져온 요소의 값을 넣는다. (2번 인덱스에 1 삽입)
>
> 5. 블럭을 하나 사용했으니 counting배열의 해당 값을 -1 한다.(3번 과정과 동일하므로 3번 과정에서 -1 시킨다.)
>
> 6. 원본 배열 전체를 2~5번 과정을 반복한다.

반복 후에는 [0, 1, 1, 2, 3, 4, 5, 5, 6, 7, 7, 7] 라는 배열을 얻을수 있다.

## 구현

구현 코드에서는 array 크기는 100개, 수의 범위는 0~100으로 할 것이다.

```
public class Main {
    public static void main(String[] args){
        // 최초 배열
        int[] array = new int[100];
        // counting 배열(수의 범위는 0~100)
        int[] counting = new int[101];
        // 최종 배열
        int[] result = new int[100];

        for(int i=0; i<100; i++) {
            array[i] = (int) (Math.random()*100);
        }

        // counting 배열 만들기
        for(int i:array) {
            counting[i]++;
        }

        // counting 배열 누적합 만들기(블럭 쌓기)
        for(int i=1; i<counting.length; i++) {
            counting[i] += counting[i-1];
        }

        // 최종 배열 만들기(1 ~ 6번 과정)
        for(int i=array.length-1; i>=0; i--) {
            int value = array[i];
            counting[value]--;
            result[counting[value]] = value;
        }

        // 결과 출력
        System.out.println("최초 배열");
        for(int i=0; i<100; i++) {
            if(i%10 == 0) System.out.println();
            System.out.print(array[i]+"\t");
        }
        System.out.print("\n\n");

        System.out.println("최종 배열");
        for(int i=0; i<100; i++) {
            if(i%10 == 0) System.out.println();
            System.out.print(result[i]+"\t");
        }
    }
}
```

![](https://velog.velcdn.com/images/deonii/post/3e186c95-2c93-4f92-ba88-7653ce1ccdd2/image.png)

잘 정렬된 모습을 볼 수 있다.

## 의문점

> 아까 블럭 쌓았을때 노란색 부분을 더하지 않고 그냥 하얀 부분만 가지고 최종 배열을 만들면 안되나요..?

그래서 직접 해봤다.

```
public class Main {
    public static void main(String[] args){
        // 최초 배열
        int[] array = new int[100];
        // counting 배열(수의 범위는 0~100)
        int[] counting = new int[101];
        // 최종 배열
        int[] result = new int[100];

        for(int i=0; i<100; i++) {
            array[i] = (int) (Math.random()*100);
        }

        // counting 배열 만들기
        for(int i:array) {
            counting[i]++;
        }

        // 최종 배열 만들기
        int index = 0;
        for(int i=0; i<counting.length; i++) {
            int count = counting[i];
            while(count >0) {
                result[index] = i;
                count--;
                index++;
            }
        }

        // 결과 출력
        System.out.println("최초 배열");
        for(int i=0; i<100; i++) {
            if(i%10 == 0) System.out.println();
            System.out.print(array[i]+"\t");
        }
        System.out.print("\n\n");

        System.out.println("최종 배열");
        for(int i=0; i<100; i++) {
            if(i%10 == 0) System.out.println();
            System.out.print(result[i]+"\t");
        }
    }
}
```

![](https://velog.velcdn.com/images/deonii/post/7c424576-994f-45f6-98db-0b24a432bf8f/image.png)

잘 되는거 같다.

그럼 걸리는 시간을 비교해 보자.

비교를 위해서 최초 배열은 1억개, 숫자 범위도 0~1억 까지로 변경하고 10번 반복 진행했다.

처음 작성한 코드의 결과이다.

![](https://velog.velcdn.com/images/deonii/post/524a36f3-38f5-4b27-a28b-d5c6c5cb5f1c/image.png)

수정된 코드의 결과이다.

![](https://velog.velcdn.com/images/deonii/post/b16bd871-4d2c-4e4d-b4e7-d77339c2842e/image.png)

처음 작성한점 코드는 대략 500ms 안밖의 결과가 나왔고 두번째 코드는 대략 400ms 안밖의 결과가 나왔다.

## 결론

카운팅 정렬은 O(n)만큼의 시간복잡도를 가지지만 counting배열을 하나 더 만들어야 하고 숫자의 범위에 따라서 counting배열의 메모리 낭비가 클 수 있다.

때문에 상황에 맞춰서 다른 정렬 방식을 사용하는것이 좋다.