# 44장 REST API

REST (REpresentational State Transfer)의 기본원칙을 성실히 지킨 서비스 디자인을 RESTful이라 표현한다.

REST는 HTTP 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처이고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다.

<br/>

## 44.1 REST API의 구성

REST API는 `자원(resource) - URI`, `행위(verb) - HTTP 요청메서드`, `표현(representations) - 페이로드`의 3가지요소로 구성된다.

<br/>

## 44.2 REST API 설계 원칙

가장 중요한 기본 원칙은 2가지다.

* URI는 리소스를 표현하는 데 집중 하고
* 행위에 대한 정의는 HTTP 요청 메소드를 통해 하는 것

### 1. URI는 리소스를 표현해야 한다.

리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다. get같은 행위에 대한 표현이 들어가면 안된다.

```text
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

### 2. 리소스에 대한 행위느 ㄴHTTP요청 메서드로 표현한다.

5가지 (GET, POST, PUT, PATCH, DELETE등)을 사용하여 CRUD를 구현.

리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않는다.

```text
GET /todos/1
DELETE /todos/1
```

<br/>

### 44.3 REST API 실습

- 생략