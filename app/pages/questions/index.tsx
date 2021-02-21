import { Suspense } from "react"
import { Head, Link, useQuery, useRouter, BlitzPage } from "blitz"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import AddIcon from "@material-ui/icons/Add"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"

const ITEMS_PER_PAGE = 100

export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = useQuery(getQuestions, { orderBy: { id: "asc" } })

  return (
    <div>
      <List>
        <Link href="/questions/new">
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>{" "}
            Create Question
          </ListItem>
        </Link>
        {questions.map((question) => (
          <li key={question.id}>
            <Link href={`/questions/${question.id}`}>
              <ListItem button>{question.text}</ListItem>
            </Link>
          </li>
        ))}
      </List>
    </div>
  )
}

const QuestionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsList />
        </Suspense>
      </div>
    </>
  )
}

QuestionsPage.authenticate = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
