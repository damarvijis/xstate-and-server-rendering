import { ListProductParamsType, FindProductParamsType } from "@/products/internal"

export const ListProduct = async (params: ListProductParamsType) => {
  const { limit, skip, search } = params
  return fetch(`https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=${limit}`)
}

export const FindProductById = async (params: FindProductParamsType) => {
  return fetch("https://dummyjson.com/products/" + params.id)
}