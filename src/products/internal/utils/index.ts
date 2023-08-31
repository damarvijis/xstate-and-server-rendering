import { constData } from "@/products/internal"

export const skipDataPagination = (page: number) => {
  return (page - 1) * constData.limit
}