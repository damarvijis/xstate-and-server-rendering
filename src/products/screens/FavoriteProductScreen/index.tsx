import Navbar from "@/products/components/Navbar"
import { FavoriteProductWidget } from "@/products/widgets/FavoriteProductWidget"

const FavoriteProductScreen = () => (
  <div>
    <h3>Favorite Product</h3>
    <Navbar />
    <FavoriteProductWidget />
  </div>
)

export default FavoriteProductScreen