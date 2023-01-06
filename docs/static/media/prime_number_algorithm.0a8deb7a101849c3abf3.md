# 소수 알고리즘

- 목차
    1. 소수란?
    2. 1번 방법
    3. 2번 방법(에라토스테네스의 체)

## 소수란?

소수는 1과 자기 자신을 제외한 다른 수로 나누어 떨어지지 않는 자연수를 말한다.

0은 자연수가 아니고 1은 소수가 아니다.(소인수 분해할때 1로 소인수 분해를 하지 않는다.)

백준 알고리즘을 풀던 중 소수를 구하는 몇가지 문제가 있어서 주로 사용했던 두가지 방법을 정리하려고 한다.

## 1번 방법

해당 숫자가 소수인지 판별하는 방법이다.

우선 코드를 보자.

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int i = Integer.parseInt(br.readLine());
        boolean isP = true;
        // 0과 1은 소수가 아니다.
        if(i ==0 || i == 1) System.out.print("Is Not Prime Num");
        // 코드에 대한 설명은 아래에 정리.
        else {
            for(int j=2;j<=Math.sqrt(i);j++) {
                if(i%j ==0) isP=false;
            }
            if(isP) System.out.print("Is Prime Num");
            else System.out.print("Is Not Prime Num");
        }
    }
}
```

우선 해당 코드를 실행시켜 보자.

```
2
Is Prime Num

4
Is Not Prime Num

6
Is Not Prime Num
```

잘 나오는걸 알 수 있다.

여기서 왜 Math.sqrt()를 사용해 해당 수의 루트값까지만 확인을 했냐하면 루트값 이상의 값은 이미 2,3,4...로 확인할때 확인이 끝났기 때문이다.

다른 말로는 해당 수의 루트값보다 큰 약수는 존재하지 않기 때문이다.

## 2번 방법(에라토스테네스의 체)

두 번째 방법은 에라토스테네스의 체라는 방법이다.

일정 범위의 자연수의 목록에서 소수의 배수들을 제거하는 방법이다.

![](https://upload.wikimedia.org/wikipedia/commons/8/88/EratosthenesSieve.gif)
(출처: 위키백과)

코드로 알아보자.

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class Main{
    public static boolean[] prime;
    public static void main(String[] args) throws IOException {
        get_prime();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int i = Integer.parseInt(br.readLine());
        if(prime[i]) System.out.print("Is Not Prime Num");
        else System.out.print("Is Prime Num");
    }

    // 에라토스테네스의 체를 구하는 함수.
    public static void get_prime() {
        // 임의의 자연수로 정했다.
        int num = 1000;
        // 각 인덱스 값이 소수 여부를 알려준다. 소수일 경우 false, 아닌 경우 true.
        prime = new boolean[num+1];

        // 0과 1은 소수가 아니다.
        prime[0] = prime[1] = true;

        // 여기 부분은 아래에서 설명.
        for(int i=2;i<=Math.sqrt(num);i++) {
            if(prime[i]) continue;
            for(int j=i*i; j<=num; j+=i) {
                prime[j] = true;
            }
        }
    }
}
```

get_prime()라는 함수를 통해 에라토스테네스의 체를 구한다.

마찬가지로 2부터 31(루트1000의 근사값)까지의 숫자로 반복문을 돌리며

이번엔 해당 숫자가 소수가 아닌경우 체로 거르지 않는다.

왜냐하면 소수가 아닌경우 이미 이전 소수를 거를때 해당 숫자의 배수는 전부 걸러져 있기 때문이다.

이후 i*i부터 체로 거르는데 이유는 i라는 숫자보다 작은 숫자의 배수는는 이미 체로 걸렀기 때문이다.

그러면 지금 시간복잡도가 O(N^2) 아닌가? 라고 생각할 수 있는데 그렇지 않다.

왜냐하면 이중반복문 이지만 두번째 반복문에서 이미 체크된 배열은 검사하지 않고 다음 반복문으로 넘어가기 때문이다.

때문에 에라토스테네스의 체를 사용해 구한다면 O(Nlog(logN))의 시간 복잡도를 갖는다고 한다.
(조화 수... 수열... 자연로그... 가우스의 소수 정리... 등등으로 설명하는 글이 있다.)
[여기 링크](https://st-lab.tistory.com/81)