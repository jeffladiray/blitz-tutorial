import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateChoice = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateChoice),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const choice = await db.choice.update({ where: { id }, data })

    return choice
  }
)
