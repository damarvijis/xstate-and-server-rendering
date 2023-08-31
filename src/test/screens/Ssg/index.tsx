import Link from "next/link"
import { TestPropsType } from "@/test/type"

export default function Ssg(props: TestPropsType) {
  return (
    <main>
      <h1>Static Site Generation (SSG)</h1>
      <Link href="/test/ssr">View SSR</Link>
      <div>
        <p>Name: {props.name}</p>
        <p>Date: {props.date}</p>
      </div>
    </main>
  )
}
