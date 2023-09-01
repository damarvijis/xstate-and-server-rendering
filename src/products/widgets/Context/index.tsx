import { createContext, useState, useEffect, useContext } from "react"
import { AppContextType, AppProviderPropsType } from "@/products/internal"

export const ProductContext = createContext<AppContextType>({
  isDark: false,
  onSetIsDark: (value) => value,
  favoriteIds: [],
  onToggleFavorite: (targetId) => targetId,
})

export const useProductContext = () => useContext(ProductContext)

export const AppProvider = (props: AppProviderPropsType) => {
  const [favIds, setFavIds] = useState<number[]>([])
  const [isDark, setIsDark] = useState<boolean>(false)

  const onToggleFavorite = (tagetId: number) => {
    const isFavorite = favIds.some(id => id == tagetId)
    const newFavoriteIds = isFavorite ? favIds.filter((id) => id != tagetId) : [...favIds, tagetId]
    setFavIds(newFavoriteIds)
  }

  const onSetIsDark = (value: boolean) => setIsDark(value)

  useEffect(() => {
    setFavIds(JSON.parse(localStorage.getItem("favoriteIds") ?? '[]'))
  }, [])

  useEffect(() => {
    localStorage.setItem("favoriteIds", JSON.stringify(favIds))
  }, [favIds])

  return (
    <ProductContext.Provider
      value={{
        favoriteIds: favIds,
        onToggleFavorite,
        onSetIsDark,
        isDark
      }}
    >
      {props.children}
      {/* {props.children({
        favoriteIds: favIds,
        onToggleFavorite,
        onSetIsDark,
        isDark
      })} */}
    </ProductContext.Provider>
  )
}