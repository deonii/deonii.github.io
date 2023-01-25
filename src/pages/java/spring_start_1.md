# Spring 기초 - 1

- 목차
    1. spring project 생성
    2. 기초 사용법
        1. 정적 컨텐츠
        2. 기초 mvc
        3. 문자열 반환
        4. Json 반환

## spring project 생성

스프링 프로젝트를 생성하기 쉬운 방법인 spring initializr를 사용해보자. 아래 링크를 통해 접속 가능하다.

[spring initializr](https://start.spring.io/)

![](https://velog.velcdn.com/images/deonii/post/964743f8-b005-48d5-bec8-2eeb26863ec4/image.png)

위와 같은 사이트 모습을 볼 수 있다.

project는 Gradle Project

Language는 Java

Spring Boot 버전은 snapshot이나 m3, m2, m1같은 별칭이 없는 버전으로 선택 후

Project Metadata의 Group에 프로젝트 이름을 적어주자.

나는 hello로 하겠다.

Artifact에 hello-spring으로 작성하자.

이제 dependencies에서 두가지를 추가해준다.

하나는 Spring Web이고 하나는 Thymeleaf이다.

Spring Web은 웹서버를 위한 것이고 Thymeleaf는 템플릿 엔진이다.(django의 템플릿같이 템플릿 언어를 사용할 수 있도록 한다.)

추가 후 GEMERATE 버튼을 누르자.

![](https://velog.velcdn.com/images/deonii/post/f0962f67-86ce-4035-93a2-5fc3bb3302f9/image.png)

하나의 압축파일이 다운로드 되고 이제 압축을 풀고 IntelliJ로 프로텍트를 열자.

![](https://velog.velcdn.com/images/deonii/post/f4d024c2-8f5f-46dd-8e66-2ec22118e850/image.png)

src/main/java는 소스코드가 있는 곳이다.

내부에는 HelloSpringApplication.java 파일이 존재한다.

여기서 Run 버튼을 누르면

![](https://velog.velcdn.com/images/deonii/post/507c8946-7d36-4859-b6a5-d3c7258f40d6/image.png)

콘솔창에 저렇게 출력되며 서버 구동이 시작된다.

## 기초 사용법

간단하게 src 폴더 구조를 확인해 보자.

![](https://velog.velcdn.com/images/deonii/post/d5a4d28e-c981-4807-bbb6-81d5a6f0c880/image.png)

src폴더 내 main과 test라는 폴더가 있다.

main은 우리가 작성해 나갈 폴더이고 test는 말그대로 test용 파일이 들어갈 폴더이다.

우선 localhost:8080 에 접속해보자.

![](https://velog.velcdn.com/images/deonii/post/b2f0ad59-1e95-4eef-a166-973db5285cac/image.png)

일반적인 404페이지가 아닌 해당 페이지가 보인다면 서버가 잘 구동된 것이다.

이 페이지를 바꿔보자.

main - resources - static 폴더에 index.html 파일을 생성하자.

내용은 크게 상관없다.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    Hello
    <a href="/hello">hello</a>
</body>
</html>
```

작성 후에 서버를 새로고침하고 다시 접속해보자.

![](https://velog.velcdn.com/images/deonii/post/74efe8d9-7f4d-4907-8042-392d25fbf0f0/image.png)

내가 작성한 페이지가 나타난 것을 알 수 있다.

이번엔 main - resources - static 폴더에 hello-static.html 파일을 생성하자.

내용은 크게 상관없다.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    이것은 html 파일임

</body>
</html>
```

이제 localhost:8080/hello-static.html 로 접속해 보자.

![](https://velog.velcdn.com/images/deonii/post/d29ab340-2536-40ea-9137-2de03950a36b/image.png)

작성한 html파일이 나타나는 것을 알 수 있다.

이제 MVC 패턴을 통해서 내가 원하는 데이터를 반환해 보도록 하자.

M(Model)V(View)C(Controller) 중에서 C에 해당하는 컨트롤러를 만들 예정이다.

### 정적 컨텐츠

우선 main - java - hello.hellospring 폴더 안에 controller 패키지를 만들고 안에 HelloController 클래스를 생성하자.
(이름은 크게 중요하지 않다.)

코드를 작성하자.

```
package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HelloController {
    @GetMapping("hello")
    public String Hello(Model model) {
        model.addAttribute("data", "hello!!");
        return "hello";
    }
}
```

그리고 main - resources - templates 폴더 내에 hello.html(return 되는 문자열과 같은 이름으로 이름을 짓는다.)을 생성한다.

내용은 다음과 같다.

```
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta http-equiv="Content-Type" content="text/html;" charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <p th:text="'안녕하세요. ' + ${data}">안녕하세요. 손님 </p>
</body>
</html>
```

위의 html 코드 중 아래

```
xmlns:th="http://www.thymeleaf.org"
```

이 부분은 템플릿 문법을 사용할 수 있게 해주는 부분이다.

${data}는 템플릿 문법의 일부이다.(django의 템플릿 문법과 유사하다.)

이제 localhost:8080/hello (GetMapping 내에 문자열과 같은 주소)로 접속해보자.

![](https://velog.velcdn.com/images/deonii/post/5c38adfb-57d3-410e-ba65-03005ff82db5/image.png)

${data} 부분에 hello!!로 작성된 것을 알 수 있다.

이는 model.addAttribute부분에 data를 hello!!로 맵핑했기 때문이다.

### 기초 mvc

이번엔 HelloController 안에 새로운 메서드를 만들어 보자.

```
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam(value = "name", required = false) String name, Model model){
    model.addAttribute("name", name);
    return "hello-template";
}
```

그리고 main - resources - templates 폴더 내에 hello-template.html을 생성한다.

```
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <p th:text="'hello. ' + ${name}"> hello hello </p>
</body>
</html>
```

이제 localhost:8080/hello-mvc?name=world! 로 접속해 보자.(name은 RequestParam을 통해서 설정한 key이다.)

![](https://velog.velcdn.com/images/deonii/post/ed2a7c14-e788-4b11-bad3-1bf7e4803a23/image.png)

name을 통해서 넘겨준 값이 model.addAttribute을 통해서 템플릿 내부에서 ${name}과 치환된 것을 알 수 있다.

### 문자열 반환

HelloController 안에 새로운 메서드를 만들어 보자.

```
@GetMapping("hello-string")
@ResponseBody
public String helloString(@RequestParam(value = "name", required = false) String name){
    return "hello"+ name;
}
```

이제 localhost:8080/hello-string?name=World! 로 접속해 보자.

![](https://velog.velcdn.com/images/deonii/post/a1857678-fe50-4bf2-a7ed-c1cafbc38495/image.png)

보기에는 html파일처럼 보인다. 소스 코드를 확인해 보자.

![](https://velog.velcdn.com/images/deonii/post/405fd746-bf83-4fe9-99a8-377dddcc0f66/image.png)

단순한 문자열이 반환되었다.

이는 @GetMapping 뒤에 @ResponseBody를 붙여 템플릿을 사용하지 않고 직접 응답의 Body를 보내겠다는 설정했기 때문이다.

### Json 반환

HelloController 안에 간단한 class를 만들어 보자.

```
static class Hello {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

name을 Getter, Setter로 갖는 class이다.

이제 HelloController 안에 새로운 메서드를 만들어 보자.

```
@GetMapping("hello-api")
@ResponseBody
public Hello helloApi(@RequestParam("name") String name ){
    Hello hello = new Hello();
    hello.setName(name);
    return hello;
}
```

이번엔 객체를 return해줬다.

확인을 위해 localhost:8080/hello-api?name=deonii에 접속해 보자.

![](https://velog.velcdn.com/images/deonii/post/39876784-a90b-406d-9f2f-10eff73941c9/image.png)

Json이 반환된 것을 알 수 있다.

스프링에서는 객체가 반환될때 json으로 반환되도록 기본 설정이 되어있다.