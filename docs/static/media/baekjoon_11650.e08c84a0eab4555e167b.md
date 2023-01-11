# 백준 11650번 - 좌표 정렬하기

- 목차
    1. 1번 방법
    2. 2번 방법
    3. 3번 방법
    4. 4번 방법
    5. 5번 방법

## 1번 방법

```
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int count = Integer.parseInt(br.readLine());
        int[][] arr = new int[count][2];
        for(int i=0;i<count;i++) {
            arr[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        }

        for(int i=0; i<count-1;i++) {
            for(int j=i; j<count;j++) {
                if(arr[i][0] > arr[j][0] || (arr[i][0] == arr[j][0] && arr[i][1] > arr[j][1])) {
                    int[] temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        for(int[] i:arr) {
            bw.write(i[0]+" "+i[1]+"\n");
        }
        bw.flush();
        bw.close();
    }
}
```

선택 정렬을 통해 풀어보려고 했다.

같은 좌표는 없다고 명시되어 있기 때문에 x좌표로 먼저 비교하고 x좌표가 같으면 y좌표를 비교했다.

![](https://velog.velcdn.com/images/deonii/post/4fcbafe7-4d6d-4ebb-b797-14be13154495/image.png)

결과는 시간 초과였다.

좌표의 최대 개수가 100,000개인데 선택 정렬은 시간복잡도가 O(N^2)라서 그런거같다.

## 2번 방법

시간 복잡도를 줄이기 위해서 카운트 정렬로 구현해봤다.

```
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int count = Integer.parseInt(br.readLine());

        List<List<Integer>> arr1 = new ArrayList<>();
        for(int i=0;i<=200000;i++) arr1.add(new ArrayList<Integer>());

        for(int i=0;i<count;i++) {
            int[] arr2 = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            List<Integer> arr3 = arr1.get(arr2[0] + 100000);
            if(arr3.size() >0) {
                boolean isAdd = false;
                for(int j=0;j<arr3.size();j++) {
                    if(arr3.get(j) > arr2[1]) {
                        isAdd = true;
                        arr1.get(arr2[0] + 100000).add(j, arr2[1]);
                    }
                }
                if(!isAdd) arr1.get(arr2[0] + 100000).add(arr2[1]);
            } else {
                arr1.get(arr2[0] + 100000).add(arr2[1]);
            }
        }
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        for(int i=0;i<=200000;i++) {
            List<Integer> arr4 = arr1.get(i);
                if(arr4.size() != 0) {
                    for(int j:arr4) {
                        bw.write(i+" "+j+"\n");
                    }
                }
            }
        bw.flush();
        bw.close();
    }
}
```

우선 구현하면서도 숫자 범위가 -100,000 ≤ x, y ≤ 100,000 인데 이게 맞나? 싶었다.

적어도 테스트는 해보자는 심정으로 마무리했다.

![](https://velog.velcdn.com/images/deonii/post/3964413e-9d36-4be0-81d8-b3cb6cf8b8eb/image.png)

테스트는 돌려보지도 못했다.

개인 컴퓨터에서 백준의 예시 코드가 힙공간이 부족해서 돌아가지도 않았다.

카운팅 정렬이 숫자 범위에 따라서 메모리 공간을 차지하는게 커지는데 범위만 20만이라서 실패한거 같다.

## 3번 방법

```
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int count = Integer.parseInt(br.readLine());

        TreeMap<Integer,ArrayList<Integer>> map1 = new TreeMap<Integer,ArrayList<Integer>>();


        for(int i=0;i<count;i++) {
            int[] arr = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

        List<Integer> arr1 = map1.get(arr[0]);

        if(arr1 == null) {
            map1.put(arr[0], new ArrayList<Integer>(List.of(arr[1])));
            } else {
                boolean isAdd = false;
                for(int j=0;j<arr1.size();j++) {
                    if(arr1.get(j) > arr[1]) {
                        isAdd = true;
                        arr1.add(j, arr[1]);
                        break;
                    }
                }
                if(!isAdd) arr1.add(arr[1]);
            }
        }

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        Iterator<Integer> keys = map1.keySet().iterator();

        while(keys.hasNext()) {
            int key = keys.next();
            ArrayList<Integer> arr2 = map1.get(key);
                for(int i:arr2) bw.write(key + " " + i + "\n");
            }

        bw.flush();
        bw.close();
    }
}
```

treemap을 사용해서 풀어야겠다 생각했다.

treemap key에 x좌표를 넣고 y좌표는 value에 arraylist를 통해서 정렬을 하면서 add했다.

그리고 이걸 테스트하면서 알게된 사실인데 아까 힙공간이 부족했던건 내가 잘못 작성했기 때문이였다.

y좌료로 요소를 추가할때 break가 없어서 계속 반복문을 돌았던것...(심지어 j도 커지지만 배열의 크기도 커지기때문에 무한대로 증식...)

결과만 확인하고 다시 카운트 정렬로 풀어볼 예정이다.

정상적(?)으로 작동하고 결과는 다음과 같다.

![](https://velog.velcdn.com/images/deonii/post/7551a2d7-2b47-4c59-8882-97de70ff32af/image.png)

1800ms.....?

여러모로 잘못됐다 생각들었다.

## 4번 방법

2번 방법에서 break만 추가했다. 코드는 추가하지 않겠다.

![](https://velog.velcdn.com/images/deonii/post/be0cf34c-1d24-42af-9a9a-c80233ac167a/image.png)

...? 아예 풀이법이 잘못되었던 것이다.

## 5번 방법

Arrays.sort() 기능을 찾아봤다.

![](https://velog.velcdn.com/images/deonii/post/5f6ba6bb-0501-49bb-860f-d588b172db22/image.png)

여기서 a는 정렬할 배열이고 c는 Comparator이다.

그리고 Comparator은 람다식으로 대체할 수 있다.

람다식으로 작성된 풀이이다.

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int count = Integer.parseInt(br.readLine());

        int[][] arr = new int[count][2];

        for (int i = 0; i < count; i++) {
            st = new StringTokenizer(br.readLine());
            arr[i][0] = Integer.parseInt(st.nextToken());
            arr[i][1] = Integer.parseInt(st.nextToken());
        }

        // 람다식을 통해서 Comparator을 대체했다.
        Arrays.sort(arr, (arr1, arr2) -> {
            if (arr1[0] == arr2[0]) {
                return arr1[1] - arr2[1];
            } else {
                return arr1[0] - arr2[0];
            }
        });

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < count; i++) {
            sb.append(arr[i][0]).append(" ").append(arr[i][1]).append("\n");
        }

        System.out.print(sb);
    }
}
```

![](https://velog.velcdn.com/images/deonii/post/19d12c55-d8f4-4a91-91b4-b537a62d5d01/image.png)