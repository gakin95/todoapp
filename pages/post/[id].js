import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper} from "@material-ui/core";
import { useRouter } from 'next/router';
import { connect } from "react-redux";

import Header from '../../src/common/header';
import { ButtonWithBackdrop, MyDialog, MyTextField } from "../../src/common";
import { getATodo, deleteTodo } from "../../src/services";
import * as actions from "../../src/store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: 559,
    //height: 466,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(5, 8),
    [theme.breakpoints.down('xs')]: {
      width:367
    }
  },
  title:{
    color:theme.palette.primary.main,
    marginBottom: '2rem',
    fontWeight:'bold'
  },
  body:{
    marginBottom: '2rem',
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column',
    width: "100%",
  },
  btnContainer:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width:'100%'
  },
  btn:{
    width:100
  },
  error: {
    color:theme.palette.error.main
  },
}));

//#707070

const ViewTodo = ({onDeleteTodo,todos}) => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [positiveDialog, setPositiveDialog] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({
    id:'',
    title: '',
    body: '',
    userId: '',
  });

  const GetATodo = async (id) => {
    const response = await getATodo(id);
    const items = [...todos];
    const curItem = items.find(item => item.id == id);
    if (response && response.data){
      setData({
        id: curItem ? curItem.id : response.data.id,
        body: curItem ? curItem.body :response.data.body,
        title: curItem ? curItem.title : response.data.title,
        userId: curItem ? curItem.userId : response.data.userId,
      })
    }
  }

  useEffect(() => {
    GetATodo(id)
  },[id])
  

  const handleDelete = async () => {
    setOpen(true);
     const response = await deleteTodo(id);
     if (response && response.data){
         setOpen(false);
           setOpenDialog(true);
       setDialogTitle(response.status?'Success':'Hold on!!');
       setPositiveDialog(response.status?true:false);
       setDialogMessage(response.message);
       if (response.status){
        onDeleteTodo(id);
         setData({
           id: response.data.id,
           body: response.data.body,
           title:response.data.title,
           userId:response.data.userId,
         })
       }
     }
   };

  return (
    <div>
       <Header />
      <div className={classes.root}>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      <div className={classes.reset}>
        {data.id && <Paper className={classes.paper}>
          <div className={classes.title}>{data.title}</div>
          <div className={classes.body}>{data.body}</div>
          <div className={classes.btnContainer}>
          <ButtonWithBackdrop label="Delete" click={handleDelete} open={open} className={classes.btn}/>
          <ButtonWithBackdrop label="Edit" click={() => router.push(`/todo/${id}`)} className={classes.btn}/>
          </div>
        </Paper>}
        {!data.id && <Paper className={classes.paper}>
          <div className={classes.body}>No item found</div>
          <ButtonWithBackdrop label="Go Back" click={() => router.push(`/`)} className={classes.btn}/>
        </Paper>}
      </div>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos:state.todos.details
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTodo: (item) => dispatch(actions.deleteTodo(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTodo);
