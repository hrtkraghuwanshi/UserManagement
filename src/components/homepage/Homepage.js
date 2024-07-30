import { React, memo, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "rgb(16, 86, 171)",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const options = ["logout", "settings"];

const ITEM_HEIGHT = 48;
function Homepage(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const opentool = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log("running..");
  // console.log(props.id);
  const getdata = JSON.parse(localStorage.getItem("user")) || [];
  const filterdata = getdata.filter((item) => item.id === props.id);
  // console.log(filterdata);
  const location = useLocation();
  // console.log(location);
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [active, setActive] = useState(() => {
    const pathname = location.pathname;
    if (pathname === "/dashboard") {
      return "Dashboard";
    } else if (pathname === "/users") {
      return "Users";
    } else if (pathname === "/users/detailed") {
      return "Users";
    } else if (pathname === "/userlist") {
      return "UsersList";
    } else if (pathname === "/userlist/detail") return "UsersList";
  });
  //  console.log(location);
  // console.log(location );
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/dashboard") {
      setActive("Dashboard");
    } else if (pathname === "/users") {
      setActive("Users");
    } else if (pathname === "/users/detailed") {
      setActive("Users");
    } else if (pathname === "/userlist") {
      setActive("UsersList");
    } else if (pathname === "/userlist/detail") {
      setActive("UsersList");
    }
  }, [location.pathname]);
  const HandleNavigate = (items) => {
    // console.log(items);
    const currentId = filterdata.length > 0 ? filterdata[0].id : props.id;
    setActive(items);
    if (items === "Dashboard") {
      navigate("/dashboard", { state: { id: currentId } });
    } else if (items === "Users") {
      navigate("/users", { state: { id: currentId } });
    } else if (items === "/users/detailed") {
      navigate("/users", { state: { id: currentId } });
    } else if (items === "UsersList") {
      navigate("/userlist", { state: { id: currentId } });
    } else if (items === "/userlist/detail") {
      navigate("/userlist", { state: { id: currentId } });
    }
  };
  const handlelogout = () => {
    localStorage.setItem("loggedIn", JSON.stringify(false));
    navigate("/");
  };

  return (
    <Box className="flex">
      <CssBaseline />

      <Drawer variant="permanent" open={open} className="drawer ">
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem
            disablePadding
            className="block"
            onClick={() => HandleNavigate("Dashboard")}
          >
            <ListItemButton
              selected={active === "Dashboard"}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor:
                  active === "Dashboard"
                    ? theme.palette.action.selected
                    : "inherit",
              }}
            >
              <ListItemIcon
                className={`min-w-0 ${
                  open ? "mr-3 " : "mr-auto"
                } justify-center`}
              >
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className="block"
            onClick={() => HandleNavigate("Users")}
          >
            <ListItemButton
              selected={active === "Users"}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor:
                  active === "Users"
                    ? theme.palette.action.selected
                    : "inherit",
              }}
            >
              <ListItemIcon
                className={`min-w-0 ${
                  open ? "mr-3 " : "mr-auto"
                } justify-center`}
              >
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="ContactList" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className="block"
            onClick={() => HandleNavigate("UsersList")}
          >
            <ListItemButton
              selected={active === "UsersList"}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor:
                  active === "UsersList"
                    ? theme.palette.action.selected
                    : "inherit",
              }}
            >
              <ListItemIcon
                className={`min-w-0 ${
                  open ? "mr-3 " : "mr-auto"
                } justify-center`}
              >
                <GroupIcon />
              </ListItemIcon>
              <ListItemText
                primary="UsersList"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Box className="absolute w-full bottom-0 pb-2">
          <Divider />

          <div className="flex flex-row justify-around  align-items-center pt-10 pr-0 pb-10 pl-0">
            {!open && (
              <>
                <div className="flex flex-col">
                  <div>
                    <AccountCircleIcon style={{ fontSize: "45px" }} />
                  </div>{" "}
                  <div>
                    {" "}
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={opentool ? "long-menu" : undefined}
                      aria-expanded={opentool ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={opentool}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "15%",
                        },
                      }}
                    >
                      <MenuItem onClick={handlelogout}>LOGOUT</MenuItem>{" "}
                      <MenuItem
                        onClick={() =>
                          navigate("/setting", { state: { id: props.id } })
                        }
                      >
                        SETTINGS
                      </MenuItem>
                      <MenuItem
                    onClick={() =>
                      navigate("/changepass", { state: { id: props.id } })
                    }
                  >
                    CHANGE PASSWORD
                  </MenuItem>
                    </Menu>
                  </div>
                </div>
              </>
            )}
            {open && (
              <div>
                <AccountCircleIcon style={{ fontSize: "45px" }} />
              </div>
            )}
            {open && (
              <div>
                {" "}
                <div className="font-bold text-2xl">
                  {filterdata ? filterdata[0]?.Name : "NO NAME"}
                </div>
                <div className="text-sm">
                  {filterdata ? filterdata[0]?.Email : "NO EMAIL"}
                </div>
              </div>
            )}
            {open && (
              <div>
                {" "}
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={opentool ? "long-menu" : undefined}
                  aria-expanded={opentool ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={opentool}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "15%",
                    },
                  }}
                >
                  <MenuItem onClick={handlelogout}>LOGOUT</MenuItem>{" "}
                  <MenuItem
                    onClick={() =>
                      navigate("/setting", { state: { id: props.id } })
                    }
                  >
                    SETTINGS
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      navigate("/changepass", { state: { id: props.id } })
                    }
                  >
                    CHANGE PASSWORD
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </Box>
      </Drawer>
    </Box>
  );
}
export default memo(Homepage);
