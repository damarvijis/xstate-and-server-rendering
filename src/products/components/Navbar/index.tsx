import Link from "next/link"

const Navbar = () => (
  <div style={{ display: "flex", gap: "10px" }}>
    <Link href={"/product"}>Product List</Link>
    <Link href={"/product/favorite"}>Favorite Product</Link>
  </div>
)



export default Navbar