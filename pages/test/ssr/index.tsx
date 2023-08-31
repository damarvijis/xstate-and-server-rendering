import { GetServerSideProps } from "next"
import { TestPropsType } from "@/test/type"
import { Ssr } from "@/test/screens"

export const getServerSideProps: GetServerSideProps<TestPropsType> = async () => {
  return {
    props: {
      name: "damar",
      date: new Date().toString()
    }
  }
}

export default Ssr
