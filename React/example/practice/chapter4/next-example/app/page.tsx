import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        {/*next의 eslint룰을 잠시 끄기 위해 추가.*/}
        {/* eslint-disable-next-line */}
        <a href="/hello">Go Hello By Anchor</a>
      </li>
      <li>
        {/* 차이를 극적으로 보기 위해 해당 페이지의 리소스를 미리 가져오는 prefetch를 꺼둠.} */}
        <Link prefetch={false} href="/hello">Go Hello By Link</Link>
      </li>
    </ul>
  )
}
