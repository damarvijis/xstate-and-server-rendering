import Link from "next/link"
import { TestPropsType } from "@/test/type"

export default function Isr(props: TestPropsType) {
  return (
    <main>
      <h1>Incremental Static Regeneration (ISR)</h1>
      <Link href="/test/ssr">View SSR</Link>
      <div>
        <p>Name: {props.name}</p>
        <p>Date: {props.date}</p>
      </div>
    </main>
  )
}
