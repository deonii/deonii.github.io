# 깊이 우선 탐색 / DFS

- 목차
    1. 개념
        1. 개념 구현
    2. 예제 1번
        1. 예제 1번 구현(재귀 함수)
    3. 예제 2번
        1. 예제 2번 구현(스택)


## 개념

DFS(Depth-first Search)는 깊이 우선 탐색을 의미한다.

트리나 그래프에서 한 루트로 탐색하다가 특정 상황에서 최대한 깊숙이 들어가서 확인한 뒤 다시 돌아가 다른 루트로 탐색하는 방식이다. 대표적으로 백트래킹에 사용한다.

일반적으로 재귀호출을 사용하여 구현하지만, 단순한 스택 배열로 구현하기도 한다.

### 개념 구현

![](https://velog.velcdn.com/images/deonii/post/b3f697f3-4ba0-4c41-a06c-c51a0ac98297/image.png)

위와 같은 트리를 구현해보자.

DFS방식으로 탐색한다면 결과는

> 1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7

순으로 출력되어야한다.

```
class Node {
    int data;
    Node rt, lt;
    public Node(int val) {
        data = val;
        lt=rt=null;
    }
}

public class Main {
    static Node root;
    public static void DFS(Node root) {
        if(root == null) return;
        else {
            System.out.println("root.data = " + root.data);
            DFS(root.lt);
            DFS(root.rt);
        }
    }

    public static void main(String[] args) {
        root = new Node(1);
        root.lt = new Node(2);
        root.rt = new Node(3);
        root.lt.lt = new Node(4);
        root.lt.rt = new Node(5);
        root.rt.lt = new Node(6);
        root.rt.rt = new Node(7);
        DFS(root);
    }
}
```

재귀호출을 통한 구현이다.

간단하게 설명하자만 Node클래스를 통해 트리의 각 노드를 만들었다.

각 노드는 data를 통해 본인의 값을 가지고 lt와 rt를 통해 새로운 노드의 주소를 가진다.

main() 메서드를 통해서 트리는 만들었다.(트리의 모양은 위의 그림과 같다.)

DFS() 메서드는 노드를 변수로 받아 노드가 null이면 탐색을 멈추고 본인의 값을 출력 후 lt의 값에 있는 노드를 다시 탐색한다.

출력해 보자.

![](https://velog.velcdn.com/images/deonii/post/e8fff858-e3d3-47b1-8328-bd67414a2d41/image.png)

원하는 결과로 나온것을 알 수 있다.

아래 두가지 예제를 통해 실제 문제에서는 어떻게 사용하는지, 스택을 이용한 구현은 어떻게 하는지 알아보자.

## 예제 1번

배열 { 1, 2, 3 }의 모든 부분 집합을 출력해보자.

언뜻보면 이게 왜 DFS인지 의문이 생긴다.

아래 그림을 보자.

![](https://velog.velcdn.com/images/deonii/post/fd47ca3b-8025-4840-8711-68bf68acd5d4/image.png)

1번 노드가 사용될때 O루트를 사용하고 사용하지 않으면 X루트를 사용한다.

DFS방식을 적용하면 1번 O, 2번 O, 3번 O, 4번 출력 으로 되어 { 1, 2, 3 } 이 완성되고

그 다음 탐색은 1번 O, 2번 O, 3번 X, 4번 출력으로 되어 { 1, 2 }이 완성된다.

이렇게 조합을 만들때에도 DFS를 사용이 가능하다.

### 예제 1번 구현(재귀 함수)

```
public class Main {
    // 1부터 n까지 숫자의 조합을 만든다.
    static int n;
    // 사용 여부를 체크하는 배열이다.
    static boolean[] ch;
    public static void DFS(int L){
        // 위의 예시에서 4(즉 3+1)가 되었을때 출력한다.
        if(L == n+1){
            StringBuilder sb =  new StringBuilder("{ ");;
            for(int i=1;i<=n;i++){
                // ch배열을 통해 체크된 요소만 출력한다.
                if(ch[i]) sb.append(i + ", ");
            }
            sb.append("}");
            System.out.println(sb);
        } else {
            // 해당 요소를 사용할때(O경로) 이다.
            ch[L] = true;
            DFS(L+1);
            // 해당 요소를 사용할때 경로를 마치고 사용하지 않을때(X경로)로 변경한다.
            ch[L] = false;
            DFS(L+1);
        }
    }

    public static void main(String[] args){
        n = 3;
        ch = new boolean[n+1];
        // root인 1번 요소부터 탐색을 시작한다.
        DFS(1);
    }
}
```

재귀함수를 통한 구현이다.

개념 구현한 코드와 거의 동일하다.

출력해 보자.

![](https://velog.velcdn.com/images/deonii/post/5004ae5c-d2cc-4baf-8c79-59157d935289/image.png)

마지막에 전체가 사용되지 않는 경우도 출력되었지만 잘 출력 되었다.(부분 집합에서는 포함되지 않는다만 이해하고 넘어가자)

## 2번 예제

![](https://velog.velcdn.com/images/deonii/post/1538e10a-8900-445b-b410-11889a4e2922/image.png)

위의 그림처럼 생긴 좌표가 있다.

시작점인 (0,0)에서 출발해서 (4,4)까지 이동하며 각 원소의 합이 최소가 되는 값과 경로를 구하자.

단 오른쪽 또는 위로만 이동할 수 있다.

### 2번 예제 구현(스택)

```
class Main {
    static int[][] graph = {{1, 2, 3, 4, 5}, {9, 8, 7, 6, 5}, {2, 4, 6, 8, 10}, {1, 3, 5, 7, 9}, {17, 13, 11, 7, 5}};
    static int n = 5;
    static int minSum = Integer.MAX_VALUE;
    static List<int[]> minPath = new ArrayList<>();

    static class InStack {
        int x;
        int y;
        int sum;
        List<int[]> path;
        public InStack(int x, int y, int sum, List<int[]> path) {
            this.x = x;
            this.y = y;
            this.sum = sum;
            this.path = path;
        }
    }

    public static void main(String[] args) {
        List<int[]> startPath = new ArrayList<>();
        DFS(new InStack(0, 0, 0, startPath));
    }

    public static void DFS(InStack inStack) {
        Stack<InStack> stack = new Stack<>();
        stack.add(inStack);

        while(!stack.isEmpty()){
            InStack poll = stack.pop();
            int x = poll.x;
            int y = poll.y;
            int sum = poll.sum;
            List<int[]> path = poll.path;

            sum += graph[x][y];
            int[] location = new int[2];
            location[0] = x;
            location[1] = y;
            path.add(location);

            if(x == n-1 && y == n-1) {
                if(sum < minSum){
                    minSum = sum;
                    minPath = path;
                }
            }

            if(x != n-1) {
                stack.add(new InStack(x+1, y, sum, new ArrayList<>(path)));
            }

            if(y != n-1) {
                stack.add(new InStack(x, y+1, sum, new ArrayList<>(path)));
            }
        }

        System.out.println(minSum);
        for(int[] loc:minPath){
            System.out.println(Arrays.toString(loc) + " : " + graph[loc[0]][loc[1]]);
        }
    }
}
```

이번엔 스택을 통한 구현이다.

코드가 기니까 위에서부터 조금씩 잘라서 알아보자.

```
static int[][] graph = {{1, 2, 3, 4, 5}, {9, 8, 7, 6, 5}, {2, 4, 6, 8, 10}, {1, 3, 5, 7, 9}, {17, 13, 11, 7, 5}};
static int n = 5;
static int minSum = Integer.MAX_VALUE;
static List<int[]> minPath = new ArrayList<>();
```

graph는 위의 사진을 2차 배열로 만들어준 모습이다.

n은 graph의 길이와 같다.(만약 x와 y의 길이가 다르다면 나누어서 선언하자)

minSum은 경로의 합의 최소값이다.

minPath는 최소 경로이다.

```
static class InStack {
    int x;
    int y;
    int sum;
    List<int[]> path;
    public InStack(int x, int y, int sum, List<int[]> path) {
        this.x = x;
        this.y = y;
        this.sum = sum;
        this.path = path;
    }
}
```

스택에 넣고 반복문을 돌릴때 사용할 클래스이다.

```
public static void main(String[] args) {
    List<int[]> startPath = new ArrayList<>();
    DFS(new InStack(0, 0, 0, startPath));
}
```

초기화 해주는 모습이다.

```
public static void DFS(InStack inStack) {
    Stack<InStack> stack = new Stack<>();
    stack.add(inStack);

    while(!stack.isEmpty()){
        InStack poll = stack.pop();
        int x = poll.x;
        int y = poll.y;
        int sum = poll.sum;
        List<int[]> path = poll.path;

        sum += graph[x][y];
        int[] location = new int[2];
        location[0] = x;
        location[1] = y;
        path.add(location);

        if(x == n-1 && y == n-1) {
            if(sum < minSum){
                minSum = sum;
                minPath = path;
            }
        }

        if(x != n-1) {
            stack.add(new InStack(x+1, y, sum, new ArrayList<>(path)));
        }

        if(y != n-1) {
            stack.add(new InStack(x, y+1, sum, new ArrayList<>(path)));
        }
    }

    System.out.println(minSum);
    for(int[] loc:minPath){
        System.out.println(Arrays.toString(loc) + " : " + graph[loc[0]][loc[1]]);
    }
}
```

DFS 로직 메서드이다.

스택을 사용하기 위해서 Stack을 선언해준다.

그리고 스택이 완전히 비워지기 전까지 진행한다.

> InStack poll = stack.pop();

스택의 첫 제일 위에 있는 요소를 가져온다.

이를 통해서 가장 최근까지 진행된 요소를 가져올 수 있고 이를 통해 깊이 우선 탐색이 가능하다.

> if(x == n-1 && y == n-1)

여기 이전까지는 출력을 위한 밑작업이다.

if문에서 true가 나온다는것은 (4, 4)에 도착했다는 의미이고 하나의 경로를 완성했다는 의미이다.

때문에 지금 가지고있는 minSum과 비교해서 작다면 값을 교체해준다.

> if(x != n-1)
>
> if(y != n-1)

두 if문은 이번에 사용된 요소의 다음 경로를 스택에 저장한다.

오른쪽으로 가는 경로와 위로 올라가는 경로 둘다 스택에 저장해둔다.

이제 출력해보자.

![](https://velog.velcdn.com/images/deonii/post/e5989884-06cc-4142-854f-f9b7bd76959a/image.png)

![](https://velog.velcdn.com/images/deonii/post/b9c34b8a-90a3-4c67-9fd2-f7521f8582f3/image.png)

잘 출력된 것을 알 수 있다.