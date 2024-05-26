# 🐳 License

* 📘 [Github License](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository#choosing-the-right-license)
* 📘 [Blog - github license의 종류와 나에게 맞는 라이선스 선택하기](https://flyingsquirrel.medium.com/github-license의-종류와-나에게-맞는-라이선스-선택하기-ae29925e8ff4)
* 📘 [LICENSE 비교표](https://olis.or.kr/license/compareGuide.do)
* 📘 [Blog - 대표 오픈소스 라이센스 한 눈에 보기](https://codenamu.org/2014/10/10/popular-opensource-license?source=post_page-----ae29925e8ff4--------------------------------)



## 🌏 About License

라이센스는 '해야할 것'과 '하지 말아야 할 것'에 대한 약속

라이센스가 없으면 기본 저작권법이 적용되며, 기본 저작권법에 의해 코드의 모든 권리는 내가 가지고, 내코드를 복제, 배포, 재생산을 할 수 없으니 오픈 소스 프로젝트는 오픈소스 라이센스를 선택할 것을 권장.

오픈소스의 라이센스는 root위치에 `LICENSE.txt` 또는 `LICENSE.md`같은 파일에 기술하거나 `README.md`에 `This project is licensed under the terms of the MIT license` 이런 식으로 기술하여 명시한다.

<br/><br/>

## 🌏 알아둘 LICENSE

### 👉 Apache

아파치 재단에서 만든 라이선스,

구글이 안드로이드 오픈소스프로젝트의 기본 라이선스를 Apache2.0으로 선택하여, **대부분 안드로이드** 소프트웨어는 Apache 2.0라이선스가 적용된다.

소스코드 공개 의무사항은 없지만, 아파치 라이선스의 소스코드를 수정해 배포하는 경우 아파치 라이선스, 버전2.0을 꼭 포함시켜야하며, 아파치 재단에서 만든 소프트웨어임을 명시해야한다.

<br/>

### 👉 BSD (Berkeley Software Distribution)

BSD자체가 공공기관에서 만들어낸 것으로 공공의 몫으로 돌려주자는 의미가 강해 라이선스 자체에는 아무런 제한 없이 누구나 자신의 용도로 사용할 수 있도록 만들어 진 것.

소스 코드를 공개하지 않아도 되는 라이선스, 저작권을 명시해야함. 그 외에는 굉장히 자유로운 라이선스 중 하나다.([Nginx의 라이선스가 BSD](https://nginx.org/LICENSE))

<br/>

### 👉 GPL

❗ 사용할 오픈소스 라이선스가 GPL일 때 주의 해야한다.

코드 작성 시 GPL 코드를 일부라도 사용하면, 내 프로그램은 GPL라이선스를 적용받고, 프로그램은 유료로 판매할 수 있지만 전체 소스코드는 무료로 공개해야한다.

ex) `fullpage.js`의 경우 라이선스가 GPL이라 회사에서 작업할 떄 사용할 때 그 레포 전체를 공개해야한다. 상업적으로 사용할 수 있다만, 그렇게 되면 회사의 코드를 전체 공개해야하니 주의를 기울여야 한다.

<br/>

### 👉 ISC (Internet Systems Consortium)

ISC에 허용된 Free Software license로 OpenBSD베이스로 개발된 소프트웨어 릴리즈를 위해 사용되는 라이센스.

복제, 배포, 수정이 가능.

[오픈소스 SW 라이센스 종합 정보 시스템 - ISC](https://www.olis.or.kr/license/Detailselect.do?lId=1074&mapCode=010068,010107)

<br/>

### 👉 MIT

`MIT`는 라이선스 및 저작권을 명시해야하고, 상업적, 사적으로도 이용이 가능하며, 수정/배포/특허 신청이 가능하다. 제약조건이 상당히 느슨하여 많은 오픈소스들이 MIT라이선스를 선택한다.

React, Vue, Angular모두 MIT라이선스.

만약 내가 오픈소스를 만들었는데, 다른 사람들이 상업적으로 이용하길 원하지 않는다면, MIT를 사용하면 안된다.

<br/>

<br/>

## 🌏 Github License Type

| License                                         | License keyword      |
| ----------------------------------------------- | -------------------- |
| Academic Free License v3.0                      | `AFL-3.0`            |
| Apache license 2.0                              | `Apache-2.0`         |
| Artistic license 2.0                            | `Artistic-2.0`       |
| Boost Software License 1.0                      | `BSL-1.0`            |
| BSD 2-clause "Simplified" license               | `BSD-2-Clause`       |
| BSD 3-clause "New" or "Revised" license         | `BSD-3-Clause`       |
| BSD 3-clause Clear license                      | `BSD-3-Clause-Clear` |
| BSD 4-clause "Original" or "Old" license        | `BSD-4-Clause`       |
| BSD Zero-Clause license                         | `0BSD`               |
| Creative Commons license family                 | `CC`                 |
| Creative Commons Zero v1.0 Universal            | `CC0-1.0`            |
| Creative Commons Attribution 4.0                | `CC-BY-4.0`          |
| Creative Commons Attribution ShareAlike 4.0     | `CC-BY-SA-4.0`       |
| Do What The F*ck You Want To Public License     | `WTFPL`              |
| Educational Community License v2.0              | `ECL-2.0`            |
| Eclipse Public License 1.0                      | `EPL-1.0`            |
| Eclipse Public License 2.0                      | `EPL-2.0`            |
| European Union Public License 1.1               | `EUPL-1.1`           |
| GNU Affero General Public License v3.0          | `AGPL-3.0`           |
| GNU General Public License family               | `GPL`                |
| GNU General Public License v2.0                 | `GPL-2.0`            |
| GNU General Public License v3.0                 | `GPL-3.0`            |
| GNU Lesser General Public License family        | `LGPL`               |
| GNU Lesser General Public License v2.1          | `LGPL-2.1`           |
| GNU Lesser General Public License v3.0          | `LGPL-3.0`           |
| ISC                                             | `ISC`                |
| LaTeX Project Public License v1.3c              | `LPPL-1.3c`          |
| Microsoft Public License                        | `MS-PL`              |
| MIT                                             | `MIT`                |
| Mozilla Public License 2.0                      | `MPL-2.0`            |
| Open Software License 3.0                       | `OSL-3.0`            |
| PostgreSQL License                              | `PostgreSQL`         |
| SIL Open Font License 1.1                       | `OFL-1.1`            |
| University of Illinois/NCSA Open Source License | `NCSA`               |
| The Unlicense                                   | `Unlicense`          |
| zLib License                                    | `Zlib`               |