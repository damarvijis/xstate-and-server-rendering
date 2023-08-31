import Link from "next/link"

export default function Test() {
  return (
    <main>
      <h1>Damar Test Server Rendering</h1>
      <Link href="/">Home</Link>
      <Link href="/test/ssr">Test Server Side Rendering (SSR) Next</Link><br />
    </main>
  )
}
