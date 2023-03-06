# 스프링의 Annotation 정리

- 목차
    1. Annotation(어노테이션) 이란?
    2. 스프링의 대표적인 어노테이션과 역할
        1. @Component
        2. @ComponentScan
        3. @Component
        4. @ComponentScan
        5. @Bean
        6. @Controller
        7. @RequestHeader
        8. @RequestMapping
        9. @RequestParam
        10. @RequestBody
        11. @ModelAttribute
        12. @ResponseBody
        13. @Autowired
        14. @GetMapping
        15. @PostMapping
        16. @SpringBootTest
        17. @Test
    3. Lombok의 대표적인 어노테이션과 역할
        1. @Setter
        2. @Getter
        3. @AllArgsConstructor
        4. @NoArgsConstructor
        5. @ToString


## Annotation(어노테이션) 이란?

> 자바 애너테이션(Java Annotation)은 자바 소스 코드에 추가하여 사용할 수 있는 메타데이터의 일종이다. 보통 @ 기호를 앞에 붙여서 사용한다. JDK 1.5 버전 이상에서 사용 가능하다. 자바 애너테이션은 클래스 파일에 임베디드되어 컴파일러에 의해 생성된 후 자바 가상머신에 포함되어 작동한다.
>
> 출처: 위키백과

Annotation(이하 어노테이션)은 클래스와 메서드에 추가하여 다양한 기능을 부여하는 역할을 한다.

어노테이션을 활용하여 스프링은 해당 클래스가 어떤 역할인지 정하기도 하고, Bean을 주입하기도 하며, 자동으로 getter나 setter를 생성하기도 한다.

특별한 의미 부여하거나 기능을 부여하는 등 다양한 역하를 수행할 수 있다.

이러한 어노테이션을 통해 코드량이 감소하고 유지보수하기 쉬우며, 생산성이 증가된다.

## 스프링의 대표적인 어노테이션과 역할

### @Component

개발자가 생성한 클래스를 스프링 빈(Bean)으로 등록할 때 사용하는 어노테이션이다. 스프링은 해당 어노테이션을 보고 스프링 빈으로 등록한다.

### @ComponentScan

스프링은 @Component, @Service, @Repository, @Controller, @Configuration 중 1개라도 등록된 클래스를 찾으면, Context에 빈으로 등록한다. @ComponentScan 이 있는 클래스의 하위 Bean을 등록 될 클래스들을 스캔하여 Bean으로 등록해준다.

### @Bean

@Bean 어노테이션은 개발자가 제어가 불가능한 외부 라이브러리와 같은 것들을 빈으로 만들 때 사용합니다.

### @Controller

스프링에게 해당 클래스가 Controller의 역할을 한다고 명시하기 위해 사용하는 어노테이션이다.

### @RequestHeader

Request의 header값을 가져올 수 있으며, 해당 어노테이션을 쓴 메소드의 파라미터에 사용한다.

### @RequestMapping

@RequestMapping(value = "")의 형태로 사용되며, 요청이 들어온 URI의 요청과 어노테이션의 value 값이 일치하면 해당 클래스나 메서드가 실행된다.

Controller 객체 안의 메서드와 클래스에 적용 가능하다.

```
@Controller
@RequestMapping("/user")      // 이 클래스는 /user로 들어오는 요청을 모두 처리한다.
public class UserController {
    @RequestMapping(method = RequestMethod.GET)
    public String getUser(Model model) {
        //  GET method, /user 요청을 처리
    }
    @RequestMapping(method = RequestMethod.POST)
    public String addUser(Model model) {
        //  POST method, /user 요청을 처리
    }
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public String addUser(Model model) {
        //  GET method, /user/info 요청을 처리
    }
}
```

### @RequestParam

URL에 전달되는 파라미터를 메서드의 인자와 매칭시켜, 파라미터를 받아서 처리할 수 있는 어노테이션이다. Json 형식의 body를 MessageConverter를 통해 자바 객체로 변환시킨다.

```
@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping(method = RequestMethod.GET)
    public String getUser(@RequestParam String nickname, @RequestParam(name="old") String age {
        // GET method, /user 요청을 처리
        // https://www.naver.com?nickname=dog&old=10
        String sub = nickname + "_" + age;
        ...
    }
}
```

### @RequestBody

body에 전달되는 데이터를 메서드의 인자와 매칭시켜, 데이터를 받아서 처리할 수 있는 어노테이션이다. 클라이언트가 보내는 HTTP 요청 본분(Json 및 xml 등)을 자바 오브젝트로 변환한다.

```
@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping(method = RequestMethod.POST)
    public String addUser(@RequestBody User user) {
        //  POST method, /user 요청을 처리
        String sub_name = user.name;
        String sub_old = user.old;
    }
}
```

### @ModelAttribute

클라이언트가 전송하는 HTTP 파라미터, Body 내용을 Setter 함수를 통해 1대1로 객체에 데이터를 연결(바인딩)한다. RequestBody와 다르게 HTTP Body 내용은 multipart/form-data 형태를 요구한다.

@RequestBody가 json을 받는 것과 달리 @ModelAttribute의 경우에는 Json을 받아 처리할 수 없다.

### @ResponseBody

메서드에서 리턴되는 값이 view로 출력되지 않고 HTTP Response Body에 직접 쓰여지게 된다. 리턴시에 Json, xml과 같은 데이터를 리턴한다.

```
@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String getUser(@RequestParam String nickname, @RequestParam(name="old") String age {
        // GET method, /user 요청을 처리
        // https://naver.com?nickname=dog&old=10
        User user = new User();
        user.setName(nickname);
        user.setAge(age);
        return user;
    }
}
```

### @Autowired

스프링에서 빈 객체를 주입받기 위한 방법으로 크게 3가지가 있다.

- @Autowired
- 생성자 (@AllArgsConstructor 사용)
- setter

빈을 주입받기 위해서 @Autowired 를 사용한다. 스프링이 클래스를 보고 타입에 맞게(타입을 먼저 확인 후, 없으면 이름을 확인) 빈을 주입한다.

### @GetMapping

@RequestMapping(Method=RequestMethod.GET)과 똑같은 역할을 한다.

```
@Controller
@RequestMapping("/user")
public class UserController {
    @GetMapping("/")
    public String getUserV1(Model model) {
        //  GET method, /user 요청을 처리
    }

    // 위의 메서드와 동일하게 작동한다.
    @RequestMapping(method = RequestMethod.GET)
    public String getUserV2(Model model) {
        //  GET method, /user 요청을 처리
    }
}
```

### @PostMapping

@RequestMapping(Method=RequestMethod.POST)과 똑같은 역할을 한다.

```
@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping(method = RequestMethod.POST)
    public String addUser(Model model) {
        //  POST method, /user 요청을 처리
    }

    // 위의 메서드와 동일하게 작동한다.
    @PostMapping('/')
    public String addUser(Model model) {
        //  POST method, /user 요청을 처리
    }
}
```

### @SpringBootTest

spring boot test에 필요한 의존성을 제공한다.

### @Test

JUnit에서 테스트 할 대상을 표시한다.

## Lombok의 대표적인 어노테이션과 역할

Lombokdms 코드를 크게 줄여주어 가독성을 크게 높힐 수 있는 라이브러리이다.

### @Setter

클래스의 모든 필드의 Setter 메서드를 생성한다.

### @Getter

클래스의 모든 필드의 Getter 메서드를 생성한다.

### @AllArgsConstructor

클래스의 모든 필드 값을 파라미터로 받는 생성자를 추가한다.

### @NoArgsConstructor

클래스의 기본 생성자를 자동으로 추가해줍니다.

### @ToString

클래스의 모든 필드의 toString 메서드를 생성한다.