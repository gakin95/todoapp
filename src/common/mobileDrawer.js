import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from 'next/router';
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  list: {
    width: 250,
   //backgroundColor: "#2B2B2B",
    color: "black",
  },
  fullList: {
    width: "auto",
  },
  divider: {
    backgroundColor: "orange",
  },
  icon: {
    color: "black",
  },
});

export default function TemporaryDrawer() {
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const Title = [
    {
      id: "ydgvxj",
      name: "Add Todo List",
      icon: <CreateIcon className={classes.icon} />,
      link: "/addtodo",
    },
    {
      id: "yudyd7",
      name: "Home",
      icon: <HomeIcon className={classes.icon} />,
      link: "/",
    },
  ];

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Title.map((el, index) => (
          <ListItem button key={el.id} onClick={() => router.push(el.link)}>
            <ListItemIcon>{el.icon}</ListItemIcon>
            <ListItemText primary={el.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div >
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={open}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
