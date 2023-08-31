import { GetStaticProps } from "next"
import { TestPropsType } from "@/test/type"
import { Ssg } from "@/test/screens"

export const getStaticProps: GetStaticProps<TestPropsType> = async () => {
  return {
    props: {
      name: "damar",
      date: new Date().toString()
    }
  }
}

export default Ssg
