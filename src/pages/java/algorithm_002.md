# 최대 부분 증가수열

- 목차
    1. 문제
    2. 입력
    3. 출력
    4. 풀이 

## 문제

N개의 자연수로 이루어진 수열이 주어졌을 때, 그 중에서 가장 길게 증가하는(작은 수에서 큰 수로) 원소들의 집합을 찾는 프로그램을 작성하라.

예를 들어, 원소가 2, 7, 5, 8, 6, 4, 7, 12, 3 이면 가장 길게 증가하도록 원소들을 차례대로 뽑아내면 2, 5, 6, 7, 12를 뽑아내어

길이가 5인 최대 부분 증가수열을 만들 수 있다.

## 입력

첫째 줄은 입력되는 데이터의 수 N(3≤N≤1,000, 자연수)를 의미하고,

둘째 줄은 N개의 입력데이터들이 주어진다.

## 출력

첫 번째 줄에 부분증가수열의 최대 길이를 출력한다.

## 풀이

동적계획법을 통해서 풀어보자.

입력받은 배열과 동일한 크기의 배열을 만들어 각 요소를 포함한 최대 증가 수열을 찾아보자.

우선 인덱스가 0인 경우 당연하게 최대 증가 수열은 1개이다.

인덱스가 1인 경우 인덱스 0보다 숫자가 작다면 최대 증가 수열은 1, 크다면 1+1이 된다.

인덱스 2는 인덱스 0과 1의 숫자가 더 작다면 인덱스 0과 1의 최대 증가 수열의 길이 보다 1 클것이다.

글로 작성하니 어렵다. 코드로 보자.

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int count = Integer.parseInt(br.readLine());
        // 입력 받은 배열
        int[] arr = new int[count];
        // 답으로 사용될 배열
        int[] ans = new int[count];
        int bigAns = 0;

        StringTokenizer st = new StringTokenizer(br.readLine());
        for(int i=0;i<count;i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        ans[0] = 1;

        for(int i=0;i<count;i++) {
            int bigNum = 0;
            for(int j=0;j<i;j++){
                // 현재 숫자보다 작을때만 최대 증가 수열에 포함이 가능하다.
                if(arr[i] > arr[j]) {
                    bigNum = Math.max(ans[j], bigNum);
                }
                ans[i] = bigNum + 1;
                bigAns = Math.max(bigAns, ans[i]);
            }
        }
        System.out.println(bigAns);
    }
}
```

출력해보자.

![](https://velog.velcdn.com/images/deonii/post/0a2262c8-90bd-4ac1-b525-6a05fccfdc94/image.png)

잘 출력된다.