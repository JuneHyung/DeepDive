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

기본값 부여

```ts
const User = z.object({
  email: z.string(),
  active: z.boolean().default(false),
});

const user = User.parse({
  email: "user@test.com",
});

console.log(user);
/*
{
  email: 'user@test.com',
  active: false
}
*/
```



### 👉 optional()

스키마를 옵셔널한 값으로 만듬

```ts
const schema = z.optional(z.string());

schema.parse(undefined); // => undefined
type A = z.infer<typeof schema>; // string | undefined
```

```ts
const user = z.object({
  username: z.string().optional(),
});
type C = z.infer<typeof user>; // { username?: string | undefined };
```



### 👉 nullables()

```ts
const nullableString = z.nullable(z.string());
nullableString.parse("asdf"); // => "asdf"
nullableString.parse(null); // => null
```

```ts
const E = z.string().nullable(); // equivalent to nullableString
type E = z.infer<typeof E>; // string | null
```



### 👉 nullish()

undefined와 null 모두 허용함.

```ts
const nullishString = z.string().nullish(); // string | null | undefined

// equivalent to
z.string().nullable().optional();
```



### 👉 transform() 

입출력간 데이터를 변환

```ts
// 입력을 받을 땐 string, number 모두 가능하지만 string으로 전환
const ID = z
  .string()
  .or(z.number())
  .transform((id) => (typeof id === "number" ? String(id) : id));

type ID = z.infer<typeof ID>;
//  ^? type ID = string
// 조금 더 복잡한 형태의 transform도 가능
const User = z
  .object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  })
  .transform((user) => ({
    ...user,
    fullName: user.middleName
      ? `${user.firstName} ${user.middleName} ${user.lastName}`
      : `${user.firstName} ${user.lastName}`,
  }));
```

정의한 변환규칙에 따라 결과에 fullName속성이 추가될 수 있다.

```ts
onsole.log(User.parse({ firstName: "John", lastName: "Doe" }));
//{ firstName: 'John', lastName: 'Doe', fullName: 'John Doe' }

console.log(User.parse({ firstName: "John", middleName: "K.", lastName: "Doe" }))
//{ firstName: 'John', middleName: 'K.', lastName: 'Doe', fullName: 'John K. Doe }
```



### 👉 or()

```ts
const stringOrNumber = z.string().or(z.number()); // string | number

// equivalent to
z.union([z.string(), z.number()]);
```



### 👉 and()

```ts
const nameAndAge = z
  .object({ name: z.string() })
  .and(z.object({ age: z.number() })); // { name: string } & { age: number }

// equivalent to
z.intersection(z.object({ name: z.string() }), z.object({ age: z.number() }));
```



### 👉 refine()

custom validation

```ts
const myString = z.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
```



2개의 인수(Argument)가 필요

* 첫 번째 : 유효성 검사 함수. 모든 true값은 통과함.
* 두 번째 : 옵션. 특정 오류 처리 동작을 custom할 수 있음.

```ts
// refine 옵션의 타입
type RefineParams = {
  // override error message
  message?: string;

  // appended to error path
  path?: (string | number)[];

  // params object you can use to customize message
  // in error map
  params?: object;
};

const longString = z.string().refine(
  (val) => val.length > 10, // 유효성 검사 함수
  (val) => ({ message: `${val} is not more than 10 characters` }) // 옵션 설정 함수
);
```



오류 경로 Custom

```ts
const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

passwordForm.parse({ password: "asdf", confirm: "qwer" });
```

path 파라미터를 제공했기 때문에 error가 다암처럼 제공될 것임.

```ts
ZodError {
  issues: [{
    "code": "custom",
    "path": [ "confirm" ],
    "message": "Passwords don't match"
  }]
}
```



### 👉 catch()

에러 발생 시 설정값을 반환

```ts
const numberWithCatch = z.number().catch(42);

numberWithCatch.parse(5); // => 5
numberWithCatch.parse("tuna"); // => 42
```



### 👉 readonly()

읽기 전용

```ts
const schema = z.object({ name: z.string() }).readonly();
type schema = z.infer<typeof schema>;
// Readonly<{name: string}>

const result = schema.parse({ name: "fido" });
result.name = "simba"; // error
```

<br/><br/>

## 🌏 Objects

```ts
// all properties are required by default
const Dog = z.object({
  name: z.string(),
  age: z.number(),
});

// extract the inferred type like this
type Dog = z.infer<typeof Dog>;

// equivalent to:
type Dog = {
  name: string;
  age: number;
};
```

### 👉 shape()

특정 키에 대한 스키마에 액세스 하는데 사용

```ts
Dog.shape.name; // => string schema
Dog.shape.age; // => number schema
```



### 👉 keyof()

객체 스키마의 **키**에서 ZodEnum스키마를 생성함

```ts
const keySchema = Dog.keyof();
keySchema; // ZodEnum<["name", "age"]>
```



### 👉 extend()

객체 스키마에 필드를 추가

```ts
const DogWithBreed = Dog.extend({
  breed: z.string(),
});
```



### 👉 merge()

`A.extend(B.shape)`와 동일

```ts
const BaseTeacher = z.object({ students: z.array(z.string()) });
const HasID = z.object({ id: z.string() });

const Teacher = BaseTeacher.merge(HasID);
type Teacher = z.infer<typeof Teacher>; // => { students: string[], id: string }
```

❗ 두 스키마가 키를 공유하는 경우 B의 속성이 A속성을 재정의함.



### 👉 pick() / omit()

UtilityType의 Pick과 Omit에서 영감을 받음

```ts
const Recipe = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(z.string()),
});
```

Pick

```ts
const JustTheName = Recipe.pick({ name: true });
type JustTheName = z.infer<typeof JustTheName>;
// => { name: string }
```

Omit

```ts
const NoIDRecipe = Recipe.omit({ id: true });

type NoIDRecipe = z.infer<typeof NoIDRecipe>;
// => { name: string, ingredients: string[] }
```



### 👉 partial()

모든 속성을 선택사항으로 만듬. (UtilityType Partial)

```ts
const user = z.object({
  email: z.string(),
  username: z.string(),
});
// { email: string; username: string }
```

```ts
const partialUser = user.partial();
// { email?: string | undefined; username?: string | undefined }
```



### 👉 required()

partial과 달리 모든 속성을 필수로 만듬.

```ts
const user = z
  .object({
    email: z.string(),
    username: z.string(),
  })
  .partial();
// { email?: string | undefined; username?: string | undefined }
```

```ts
const requiredUser = user.required();
// { email: string; username: string }
```

<br/><br/>

## 🌏 Array

### 👉 element

배열 요소의 스키마에 액세스함.

```ts
stringArray.element; // => string schema
```



### 👉nonempty

배열에 요소가 하나 이상 포함되어 있는지 확인할 때 사용.

```ts
const nonEmptyStrings = z.string().array().nonempty();
// the inferred type is now
// [string, ...string[]]

nonEmptyStrings.parse([]); // throws: "Array cannot be empty"
nonEmptyStrings.parse(["Ariana Grande"]); // passes


// optional custom error message
const nonEmptyStrings = z.string().array().nonempty({
  message: "Can't be empty!",
});
```



### 👉.min/.max/.length

```ts
z.string().array().min(5); // must contain 5 or more items
z.string().array().max(5); // must contain 5 or fewer items
z.string().array().length(5); // must contain 5 items exactly
```



<br/><br/>

## 🌏 Function

Zod를 이용해 `function schema`도 정의가 가능하다.

validation code와 business logic을 혼합하지 않고도 함수의 입력과 출력을 쉽게 확인할 수 있다.

`z.function(args, returnType)`

```ts
const myFunction = z.function();

type myFunction = z.infer<typeof myFunction>;
```

input과 output 정의

```ts
const myFunction = z
  .function()
  .args(z.string(), z.number()) // accepts an arbitrary number of arguments
  .returns(z.boolean());

type myFunction = z.infer<typeof myFunction>;
// => (arg0: string, arg1: number)=>boolean
```

### 👉 implement()

함수의 입력과 출력의 유효성을 자동으로 확인하는 **새 함수를 반환**하는 메서드

```ts
const trimmedLength = z
  .function()
  .args(z.string()) // accepts an arbitrary number of arguments
  .returns(z.number())
  .implement((x) => {
    // TypeScript knows x is a string!
    return x.trim().length;
  });

trimmedLength("sandwich"); // => 8
trimmedLength(" asdf "); // => 4
```

❗ 입력 유효성 검사에만 관심이 있다면, `return()`메서드를 호출 X

❗ 함수가 아무것도 반환하지 않는 경우 `z.void()`옵션을 사용할 수 있음

```ts
const myFunction = z
  .function()
  .args(z.string())
  .implement((arg) => {
    return [arg.length];
  });

myFunction; // (arg: string)=>number[]
```

입력 및 출력 스키마를 추출

```ts
myFunction.parameters();
// => ZodTuple<[ZodString, ZodNumber]>

myFunction.returnType();
// => ZodBoolean
```

<br/><br/>

## 📘 참고

* [공식문서 - Zod](https://zod.dev/)
* [velog - Zod](https://velog.io/@tmdgp0212/Zod)
* [velog - Zod 라이브러리란?](https://velog.io/@jinyoung985/TypeScript-zod-라이브러리란)
* [daelseo.com - Zod를 통한 타입스크립트 친화적인 스키마 정의](https://www.daleseo.com/zod-schema/)