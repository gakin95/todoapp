import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { withRouter } from "next/router";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import MyButton from './button';
import MobileDrawer from './mobileDrawer';



const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  img: {
    width: 150,
    height: '10vh'
  },
  btn:{
      width:150
  },
  active:{
      backgroundColor:'#fff',
      border:"1px solid #002E5B",
      color:"#002E5B",
      '&:hover':{
        color:'#fff',
        backgroundColor:theme.palette.primary.main,
    }
  },
  IconButton: {
    padding: 5
  },
  actions: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  }
}));



 function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const { router  } = props
  const mobile = useMediaQuery('(max-width:650px)');
  const handleClick = () => {
    router.push('/addtodo');
  }

  const home= () => {
    router.push('/');
  }

  return (
    <div className={classes.grow}>
      <Container component="main" maxWidth="lg">
        <Toolbar>
          <img src="https://www.logologo.com/logos/sunrise-plant-logo.jpg" className={classes.img} onClick={home}/>
          <div className={classes.grow} />
         { !mobile && <div className={classes.actions}>
          <MyButton label="Create Todo" className={clsx(classes.btn, router.pathname === '/addtodo'? classes.active :'')} click={handleClick}/>
          </div>}
          {mobile &&  <div className={classes.sectionMobile}>
            <MobileDrawer />
          </div>}
        </Toolbar>
      </Container>
    </div>
  );
}

export default withRouter(PrimarySearchAppBar);

