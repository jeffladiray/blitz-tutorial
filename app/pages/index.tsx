import { Suspense } from "react"
import { Link, BlitzPage } from "blitz"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const useStyles = makeStyles({
  index: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    maxWidth: "330px",
  },
})

const UserInfo = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <div className={classes.index}>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => {
  return (
    <Suspense fallback="Loading...">
      <Layout title="Home">{page}</Layout>
    </Suspense>
  )
}

export default Home
