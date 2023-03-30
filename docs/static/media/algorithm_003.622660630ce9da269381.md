# 가장 높은 탑 쌓기

- 목차
    1. 문제
    2. 입력
    3. 출력
    4. 풀이

## 문제

밑면이 정사각형인 직육면체 벽돌들을 사용하여 탑을 쌓고자 한다. 탑은 벽돌을 한 개씩 아래에서 위로 쌓으면서 만들어 간다.

아래의 조건을 만족하면서 가장 높은 탑을 쌓을 수 있는 프로그램을 작성하시오.

(조건1) 벽돌은 회전시킬 수 없다. 즉, 옆면을 밑면으로 사용할 수 없다.

(조건2) 밑면의 넓이가 같은 벽돌은 없으며, 또한 무게가 같은 벽돌도 없다.

(조건3) 벽돌들의 높이는 같을 수도 있다.

(조건4) 탑을 쌓을 때 밑면이 좁은 벽돌 위에 밑면이 넓은 벽돌은 놓을 수 없다.

(조건5) 무게가 무거운 벽돌을 무게가 가벼운 벽돌 위에 놓을 수 없다.

## 입력

입력 파일의 첫째 줄에는 입력될 벽돌의 수가 주어진다. 입력으로 주어지는 벽돌의 수는 최대 100개이다.

둘째 줄부터는 각 줄에 한 개의 벽돌에 관한 정보인 벽돌 밑면의 넓이, 벽돌의 높이 그리고 무게가 차례대로 양의 정수로 주어진다.

각 벽돌은 입력되는 순서대로 1부터 연속적인 번호를 가진다. 벽돌의 넓이, 높이 무게는 10,000보다 작거나 같은 자연수이다.

## 출력

첫 번째 줄에 가장 높이 쌓을 수 있는 탑의 높이를 출력한다.

## 풀이

바로 전에 풀었던 최대 부분 증가수열의 풀이법을 응용하면 풀 수 있다.

이번엔 정렬을 한번 해준다.

정렬 기준은 밑변의 넓이 또는 무게 기준으로 오름차순으로 하면 된다.

왜냐하면 이전 인덱스에서 사용한 최대 높이 탑을 현재 인덱스의 벽돌을 사용해서 쌓으려면 아래에 넣는 기준이 필요하기 때문이다.(말로 정리가 잘 안된다.)

여기서는 무게를 기준으로 풀이했다.

코드로 보자.


```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int count = Integer.parseInt(br.readLine());
        int[][] arr = new int[count][3];
        int[] ans = new int[count];
        int bigAns = 0;

        StringTokenizer st;
        for(int i=0;i<count;i++) {
            st = new StringTokenizer(br.readLine());

            // 밑면의 넓이
            arr[i][0] = Integer.parseInt(st.nextToken());
            // 높이
            arr[i][1] = Integer.parseInt(st.nextToken());
            // 무게
            arr[i][2] = Integer.parseInt(st.nextToken());
        }

        // 무게를 기준으로 오름차순 정렬
        Arrays.sort(arr, (e1, e2) -> {
            return e1[2] - e2[2];
        });

        ans[0] += arr[0][1];

        for(int i=0;i<count;i++) {
            int bigNum = 0;
            for(int j=0;j<i;j++){
                // 밑면의 넓이가 더 작다면 위로 쌓아 올릴수 있다는 의미
                if(arr[i][0] > arr[j][0]) {
                    bigNum = Math.max(ans[j], bigNum);
                }
                ans[i] = bigNum + arr[i][1];
                bigAns = Math.max(bigAns, ans[i]);
            }
        }
        System.out.println(bigAns);
    }
}
```

출력해보자.

![](https://velog.velcdn.com/images/deonii/post/94925324-5cd2-486f-97d5-ea5897ce3be4/image.png)

잘 출력된다.