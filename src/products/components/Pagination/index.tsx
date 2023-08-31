import { constData } from "@/products/internal/const"

type PaginationType = {
  currentPage: number
  totalData: number
  action: (page: number) => void
}

const Pagination = ({ currentPage, totalData, action }: PaginationType) => {
  const totalPage = Math.floor(totalData / constData.limit)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from(Array(totalPage)).map((_, idx) =>
        <button
          key={idx}
          style={idx + 1 == currentPage ? { backgroundColor: "red" } : {}}
          onClick={() => action(idx + 1)}
        >
          {idx + 1}
        </button>
      )}
    </div>
  )
}

export default Pagination