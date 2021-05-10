import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import {Button} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    maxWidth:500,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 7
  },
  center: {
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'column'
  },
  bgimg:{
    width:118,
    height:92,
  },
  modalContent:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column'
  },
  success:{
    color:'green',
  },
  error:{
    color:'red'
  },
  message:{
    font:'normal normal normal 16px/19px Work Sans',
    textAlign:'center'
  },
  button:{
    color:'#fff',
    backgroundColor:"#002E5B",
    width: 187,
    height: 46,
    textTransform: 'none',
    '&:hover':{
        backgroundColor:"#444e58",
    },
    textTransform: 'none',
  }
}));

export default function TransitionsModal({onClose,openDialog,positiveDialog,title,children}) {
  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDialog?openDialog:false}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={openDialog?openDialog:false}>
          <div className={classes.paper}>
            <div className={classes.center}>
            {positiveDialog && <CheckCircleIcon color='secondary' className={classes.bgimg}/>}
            {!positiveDialog && <ErrorIcon color='error' className={classes.bgimg}/>}
            </div>
            <div className={clsx (classes.modalContent,positiveDialog?classes.success:classes.error)}>
            <h3 id="transition-modal-title">{title}</h3>
            <div id="transition-modal-description" className={classes.message}>{children}</div>
             <Button 
             className={classes.button}
             onClick={handleClose}
             >OK</Button>
             </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}

