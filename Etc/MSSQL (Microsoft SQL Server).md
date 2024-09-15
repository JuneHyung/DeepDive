# 🐳 MSSQL (Microsoft SQL Server)

마이크로소프트에서 개발한 관계형 데이터 베이스 관리 시스템(RDBMS)

데이터를 테이블 형태로 구성하여 저장.

## 특징

* `.NET Framework`와 연동하여 데이터베이스와의 상호작용이 용이함.
* **ACID(원자성, 일관성 격리성, 지속성) **트랜잭션 처리와 복구 기능이 강력해 안정적인 데이터 베이스 운영을 보장.

> 트랜잭션
>
> 데이터베이스와 데이터 스토리지 시스템이라는 맥락에서`트랜잭션`은 **한 단위의 작업으로 취급되는 모든 작업**..
>
> 완전히 완료되기도 하고 전혀 완료되지 않을 수도 있으며, 스토리지 시스템을 한결같은 상태로 둔다.

> ACID (Atomicity, Consistency, Isolation, Durability)
>
> **원자성(Atomicity), 일관성(Consistency), 격리성(Isolation), 영속성(Durability)**를 의미.
>
> * 원자성
>   * 트랜잭션에 속한 각각의 문을 하나의 단위로 취급한다.
>   * 문 전체를 실행하거나 그 문의 어떤 부분도 실행하지 않거나 둘 중 하나
>   * 스트리밍 데이터 소스가 스트리밍 중에 갑자기 오류를 일으키더라도 데이터 손실과 손상이 방지됨.
> * 일관성
>   * 트랜잭션이 테이블에 변경사항을 적용할 때 **미리 정의된 예측할 수 있는 방식만 취함**.
>   * 일관성 확보 = 데이터 손상이나 오류로 무결성에 의도치 않는 결과X
> * 격리성
>   * 여러 사용자가 같은 테이블에서 모두 동시에 읽고 쓰기 작업을 할 때, 각각 트랜잭션을 격리하면 동시 트랜잭션이 서로 방해하거나 영향을 미치지 않음.
>   * 각각의 요청이 실제로는 모두 동시에 발생하더라도, 마치 하나씩 발생하는 것처럼 발생할 수 있다.
> * 영속성
>   * 트랜잭션 실행으로 인해 데이터에 적용된 변경사항이 저장되도록 보장.

### 장점

* **강력한 데이터 관리**
  * 트랜잭션 관리, 무결성 제약 조건, 뷰, 저장 프로시저 등을 활용하여 데이터를 효과적으로 관리
  * 데이터의 안정성과 일관성을 보장
* **보안 기능**
  * 액세스 제어, 사용자 권한 관리, 데이터 암호화, 감사 및 감사 추적 등을 통해 데이터의 기밀성과 무결성을 보호
  * 데이터베이스의 보안을 강화
* **유연한 개발 도구**
  *  Transact-SQL(T-SQL)을 사용하여 데이터베이스에 대한 작업을 수행할 수 있으며, Visual Studio와 연동하여 개발을 지원
  * .NET 프레임워크, C#, VB.NET 등과의 완전한 통합을 제공하여 개발자가 유연하고 효율적으로 애플리케이션을 개발
* **확장성과 가용성**
  * 클러스터링, 복제, 분할된 테이블 등을 활용하여 시스템의 확장과 고가용성을 지원
* **풍부한 지원 및 커뮤니티**
  * 커뮤니티 활성화.
  * Microsoft의 다른 제품과 통합이 용이
  *  Microsoft Office, SharePoint, Windows Server 등과의 통합이 가능

### 단점

* 비용
  * 라이센스 비용이 발생.
* 운영 체제 종속성
  * 주로 Windows 운영체제에서 가장 잘 동작하도록 설계됨.
  * Linux를 지원하는 MSSQL을 출시했지만, Linux는 호환성이 제한적일 수 있다.
  * macOS는 공식적으로 지원안함. 가상 환경에서 Window를 실행하거나 Docker로 실행해야함.
* 리소스 사용량
  * 메모리와 디스크 공간을 많이 사용함.
* 관리 복잡성
  * 관리 복잡성이 증가할 수 있다.
  * 성능, 보안, 가용성, 백업 미 ㅊ복구 등을 관리하기 위한 설정과 구성을 이해하고 효과적으로 관리해야함.
  * 경험이 필요하다.
* 업데이트 관리
  * 업데이트 프로세스의 시간과 노력이 소요.
  * 업데이트가 기존 애플리케이션과 충돌할 수 있음.

## 📘 참고

* [Blog - MSSQL이란? MSSQL 장단점 정리](https://prmblogs.tistory.com/37)
* [databricks - ACID 트랜잭션](https://www.databricks.com/kr/glossary/acid-transactions)
