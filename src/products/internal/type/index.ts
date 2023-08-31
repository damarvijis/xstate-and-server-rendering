import { ReactNode } from "react"

export type ProductType = {
  id: number
  title: string
  thumbnail: string
  category: string
  brand: string
  description: string
  price: number
}

export type ListProductParamsType = {
  limit: number
  skip: number
  search: string
}

export type FindProductParamsType = {
  id: number
}

export type URLType = {
  path: string
  query: Record<string, string>
}

export type AppContextType = {
  isDark: boolean
  onSetIsDark: (value: boolean) => void
  favoriteIds: number[]
  onToggleFavorite: (tagetId: number) => void
}

// export type AppProviderPropsType = {
//   children: (appCtx: AppContextType) => ReactNode
// }

export type AppProviderPropsType = {
  children: ReactNode
}