import Link from "next/link"
import { TestPropsType } from "@/test/type"

export default function Ssr(props: TestPropsType) {
  return (
    <main>
      <h1>Server Side Rendering (SSR)</h1>
      <Link href="/test/ssg">View SSG</Link><br />
      <Link href="/test/isr">View ISR</Link><br />
      <Link href="/test">Home Test</Link>
      <div>
        <p>Name: {props.name}</p>
        <p>Date: {props.date}</p>
      </div>
    </main>
  )
}
