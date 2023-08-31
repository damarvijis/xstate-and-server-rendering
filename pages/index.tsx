import Link from "next/link"

export default function App() {
  return (
    <main>
      <h1>Damar Nest App</h1>
      <Link href="/test/ssr">Test Server Side Rendering (SSR) Next</Link><br />
      <Link href="/product">Implement Product App</Link>
    </main>
  )
}
