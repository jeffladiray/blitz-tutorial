import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateQuestion = z
  .object({
    id: z.number(),
    text: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateQuestion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const question = await db.question.update({ where: { id }, data })

    return question
  }
)
