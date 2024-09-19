# 🐳 zod

## 🌏 Introduction

`Zod`는 Typescript 우선 스키마 선언 및 검증 라이브러리.

간단한 문자열부터 복잡한 중첩 객체에 이르기까지 모든 데이터 타입을 광범위하기 지칭하기 위해 `schema`라는 용어를 사용.

**❗ 목표는 중복된 타입 선언을 제거하는 것.**

validator를 한 번 선언하면, Zod는 자동으로 정적 Typescript 타입을 추론함. 단순한 유형을 복잡한 데이터 구조로 구성하는 것은 쉽다.

<br/>

### 👉 왜 쓰는가?

Typescript는 컴파일 시점에서의 타입에러만 잡아낼 수 있고 런타임 단계에서의 타입 에러는 어쩔 수 없다.<br/>-> 런타임에서 작동되는건 JS이므로.

Typescript는 number타입만 입력 받도록 강제하는 것이 가능하다. 원하는 문자열이나 원하는 숫자 범위를 강제하거나 number타입의 정수/실수 구분은 불가능함.



### 👉 Great Aspects

* 종속성 없음
* Node.js 및 모든 최신 브라우저에서 작동함.
* 소형 : 8kb 축소 + 압축
* 불변성 : `.optional()`같은 메소드는 새 인스턴스를 리턴함.
* 간결하고 체인 가능한 인터페이스
* JS에서도 잘 작동함.

<br/><br/>

## 🌏 Installation

### 👉 Requirements

* Typescript 4.5이상 필요.

* `tsconfig.json`에서 strict mode를 활성화 해야함.

  ```json
  // tsconfig.json
  {
    // ...
    "compilerOptions": {
      // ...
      "strict": true
    }
  }
  ```

### 👉 From npm

```shell
npm i zod
```

<br/><br/>

## 🌏 Basic Usage

simple string schema 생성

```ts
import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }
```

object shcema 생성

```ts
import { z } from "zod";

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }
```

<br/><br/>

## 🌏 Primitives

```ts
import { z } from "zod";

// primitive values
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// empty types
z.undefined();
z.null();
z.void(); // accepts undefined

// catch-all types
// allows any value
z.any();
z.unknown();

// never type
// allows no values
z.never();
```

<br/><br/>

## 🌏 String

```ts
// validations
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().email();
z.string().url();
z.string().emoji();
z.string().uuid();
z.string().nanoid();
z.string().cuid();
z.string().cuid2();
z.string().ulid();
z.string().regex(regex);
z.string().includes(string);
z.string().startsWith(string);
z.string().endsWith(string);
z.string().datetime(); // ISO 8601; by default only `Z` timezone allowed
z.string().ip(); // defaults to allow both IPv4 and IPv6

// transforms
z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase

// added in Zod 3.23
z.string().date(); // ISO date format (YYYY-MM-DD)
z.string().time(); // ISO time format (HH:mm:ss[.SSSSSS])
z.string().duration(); // ISO 8601 duration
z.string().base64();
```

### 👉 Custom Error Message

```ts
z.string().min(5, { message: "Must be 5 or more characters long" });
z.string().max(5, { message: "Must be 5 or fewer characters long" });
z.string().length(5, { message: "Must be exactly 5 characters long" });
z.string().email({ message: "Invalid email address" });
z.string().url({ message: "Invalid url" });
z.string().emoji({ message: "Contains non-emoji characters" });
z.string().uuid({ message: "Invalid UUID" });
z.string().includes("tuna", { message: "Must include tuna" });
z.string().startsWith("https://", { message: "Must provide secure URL" });
z.string().endsWith(".com", { message: "Only .com domains allowed" });
z.string().datetime({ message: "Invalid datetime string! Must be UTC." });
z.string().date({ message: "Invalid date string!" });
z.string().time({ message: "Invalid time string!" });
z.string().ip({ message: "Invalid IP address" });
```

<br/><br/>

## 🌏 Number

BigInt도 유사함.

```ts
z.number().gt(5);
z.number().gte(5); // alias .min(5)
z.number().lt(5);
z.number().lte(5); // alias .max(5)

z.number().int(); // value must be an integer

z.number().positive(); //     > 0
z.number().nonnegative(); //  >= 0
z.number().negative(); //     < 0
z.number().nonpositive(); //  <= 0

z.number().multipleOf(5); // Evenly divisible by 5. Alias .step(5)

z.number().finite(); // value must be finite, not Infinity or -Infinity
z.number().safe(); // value must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
```



### 👉 Custom Error Message

`z.nan`, `z.boolean`도 동일하게 error message 커스텀 가능.

```ts
const age = z.number({
  required_error: "Age is required",
  invalid_type_error: "Age must be a number",
});
```



<br/><br/>

## 🌏 Date

```ts
z.date().safeParse(new Date()); // success: true
z.date().safeParse("2022-01-12T00:00:00.000Z"); // success: false

const myDateSchema = z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!",
});

z.date().min(new Date("1900-01-01"), { message: "Too old" });
z.date().max(new Date(), { message: "Too young!" });

// 3.20
const dateSchema = z.coerce.date();
type DateSchema = z.infer<typeof dateSchema>;
// type DateSchema = Date

/* valid dates */
console.log(dateSchema.safeParse("2023-01-10T00:00:00.000Z").success); // true
console.log(dateSchema.safeParse("2023-01-10").success); // true
console.log(dateSchema.safeParse("1/10/23").success); // true
console.log(dateSchema.safeParse(new Date("1/10/23")).success); // true

/* invalid dates */
console.log(dateSchema.safeParse("2023-13-10").success); // false
console.log(dateSchema.safeParse("0000-00-00").success); // false
```

<br/><br/>

## 🌏 Zod enums

고정된 세트로 스키마를 선언하는 Zod 고유방법.

값 배열을 z.enum()에 직접 전달하거나 const를 이용해 열거형 값을 문자열 튜플로 정의함.

❗ 타사 라이브러리의 enum에 대해 검증해야 하는 경우 (또는 기존 열거형을 다시 작성하고 싶지 않은 경우) `z.nativeEnum()`사용

```ts
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
type FishEnum = z.infer<typeof FishEnum>;
// 'Salmon' | 'Tuna' | 'Trout'

const VALUES = ["Salmon", "Tuna", "Trout"] as const;
const FishEnum = z.enum(VALUES);

const fish = ["Salmon", "Tuna", "Trout"];
const FishEnum = z.enum(fish);

// with .exclude, .extract
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
const SalmonAndTrout = FishEnum.extract(["Salmon", "Trout"]);
const TunaOnly = FishEnum.exclude(["Salmon", "Trout"]);
```

<br/><br/>

## 🌏 Method

### 👉 default()

### 👉 optional()

### 👉 nullables()

### 👉 nullish()

### 👉 transform() 

### 👉 or()

### 👉 and()

### 👉 refine()

### 👉 catch()

### 👉 readonly()

<br/><br/>

## 🌏 Objects

<br/><br/>

## 🌏 Array

<br/><br/>

## 🌏 Function

<br/><br/>

## 📘 참고

* [공식문서 - Zod](https://zod.dev/)
* [velog - Zod](https://velog.io/@tmdgp0212/Zod)
* [velog - Zod 라이브러리란?](https://velog.io/@jinyoung985/TypeScript-zod-라이브러리란)
* [daelseo.com - Zod를 통한 타입스크립트 친화적인 스키마 정의](https://www.daleseo.com/zod-schema/)