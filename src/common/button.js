import React from 'react';
import clsx from 'clsx';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button: {
    color:'#fff',
    backgroundColor:theme.palette.primary.main,
    width: 187,
    height: 46,
    textTransform: 'none',
    borderRadius: 20,
    '&:hover':{
        backgroundColor:"#444e58",
    }
  }
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();
  return (
    <div>
      <Button 
      variant="contained"
      className={clsx(classes.button,props.className)}  
      onClick={props.click}
      >
        {props.label}
      </Button>
      <Backdrop className={classes.backdrop} open={props.open?props.open:false} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
