import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createQuestion from "app/questions/mutations/createQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"

const NewQuestionPage: BlitzPage = () => {
  const router = useRouter()
  const [createQuestionMutation] = useMutation(createQuestion)

  return (
    <div>
      <h1>Create New Question</h1>

      <QuestionForm
        submitText="Create Question"
        onSubmit={async (values) => {
          try {
            const question = await createQuestionMutation(values)
            router.push(`/questions/${question.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/questions">
          <a>Questions</a>
        </Link>
      </p>
    </div>
  )
}

NewQuestionPage.authenticate = true
NewQuestionPage.getLayout = (page) => <Layout title={"Create New Question"}>{page}</Layout>

export default NewQuestionPage
