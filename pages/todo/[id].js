import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { useRouter } from 'next/router';
import  TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import { connect } from "react-redux";

import Header from '../../src/common/header';
import { ButtonWithBackdrop, MyDialog, MyTextField } from "../../src/common";
import { getATodo, updateTodo } from "../../src/services";
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
    height: 466,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(1, 8),
    [theme.breakpoints.down('xs')]: {
      width:367
    }
  },
  bgimg:{
    width:60,
    height:60,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column',
    width: "100%",
  },
  error: {
    color:theme.palette.error.main
  },
}));

//#707070

const EditTodo = ({onEditTodo,todos}) => {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState();
  const [positiveDialog, setPositiveDialog] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  console.log('router',router)
  const { id } = router.query;
  console.log('id...', id)
  const [data, setData] = useState({
    id:'',
    title: '',
    body: '',
    userId: '',
  });

  const GetATodo = async (id) => {
    const response = await getATodo(id);
    const items = [...todos];
    const curItem = items.find(item => item.id === response.data.id);
    if (response && response.data){
      setData({
        id: response.data.id,
        body: curItem ? curItem.body :response.data.body,
        title: curItem ? curItem.title : response.data.title,
        userId: response.data.userId,
      })
    }
  }

  useEffect(() => {
    GetATodo(id)
  },[id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
        ...data,
        [name]:value
    })
  }

  const validateData = () => {
      const {title, body} = data;
      if (!title){
          setErr('title');
          setErrorMessage('Field is required');
          return 
      }
      if (!body){
        setErr('body');
        setErrorMessage('Field is required');
        return 
    }
    return true
  };
  const handleSubmit = async () => {
   if (validateData()) {
    setErrorMessage('');
    setErr('');
    setOpen(true);
    const response = await updateTodo(data,id);
    console.log('edit',response)
    if (response && response.data){
        setOpen(false);
          setOpenDialog(true);
      setDialogTitle(response.status?'Success':'Hold on!!');
      setPositiveDialog(response.status?true:false);
      setDialogMessage(response.message);
      if (response.status){
        onEditTodo({
          id: response.data.id,
          body: response.data.body,
          title:response.data.title,
          userId:response.data.userId,
        })
        // setData({
        //   id: response.data.id,
        //   body: response.data.body,
        //   title:response.data.title,
        //   userId:response.data.userId,
        // })
      }
    }
   }
  };

  const handleClose = () => {
    setOpenDialog(false);
    router.push(`/post/${id}`)
  }

  return (
    <div>
       <Header />
      <div className={classes.root}>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={handleClose}
      >
        {dialogMessage}
      </MyDialog>
      <div className={classes.reset}>
        <Paper className={classes.paper}>
          <div className={classes.flex}>
            <Typography variant="body1">Update Todo</Typography>
            <EditIcon className={classes.bgimg}/>
          </div>
          <MyTextField
            id="title"
            type="text"
            name="title"
            required="required"
            label="Title"
            placeholder="Enter title"
            error={err === 'title'}
            helperText={err === 'title' && errorMessage}
            value={data.title || ''}
            onChange={handleChange}
          />
          <TextField
            id="outlined-multiline-static"
            label="Body"
            name='body'
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            error={err === 'body'}
            helperText={err === 'body' && errorMessage}
            autoFocus
            value={data.body || ''}
            onChange={handleChange}
          />
          <ButtonWithBackdrop label="Update" click={handleSubmit} open={open}/>
        </Paper>
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
    onEditTodo: (items) => dispatch(actions.updateTodo(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
