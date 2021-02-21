import React, { ReactNode, Suspense } from "react"
import { Head, Link, useMutation } from "blitz"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import QuestionAnswer from "@material-ui/icons/QuestionAnswer"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const drawerWidth = 64

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
  },
  contentLoggedIn: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentLoggedInShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const UserLayout = ({ title, children }: LayoutProps) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const [logoutMutation] = useMutation(logout)
  const currentUser = useCurrentUser()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Head>
        <title>{title || "blitz-tutorial"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        {currentUser ? (
          <>
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Blitz vote tutorial
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />

              <IconButton
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                <ExitToAppIcon />
              </IconButton>

              <Link href="/questions">
                <IconButton>
                  <QuestionAnswer />
                </IconButton>
              </Link>
            </Drawer>
            <main
              className={clsx(classes.contentLoggedIn, {
                [classes.contentLoggedInShift]: open,
              })}
            >
              {currentUser && <div className={classes.drawerHeader} />}
              {children}
            </main>
          </>
        ) : (
          <main className={classes.content}>{children}</main>
        )}
      </div>
    </>
  )
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Suspense fallback="Loading ...">
      <UserLayout title={title}>{children}</UserLayout>
    </Suspense>
  )
}

export default Layout
