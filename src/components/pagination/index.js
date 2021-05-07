import React, {useState} from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
     // margin: theme.spacing(1),
    },
  },
  btn:{
    backgroundColor:'#002E5B',
    marginRight:7,
    '& .MuiButton-root':{
      border:0,
      color:'#fff',
      '&:hover':{
        backgroundColor:'#444e58',
      }
    },
  },
  btnActive:{
    backgroundColor:theme.palette.secondary.main,
    marginRight:7,
    '& .MuiButton-root':{
      border:0,
      color:'#fff',
      '&:hover':{
        backgroundColor:theme.palette.primary.main,
      }
    },
  }
}));

export default function GroupSizesColors({ postsPerPage, totalPosts, paginate }) {
  const [page,setPage] = useState(0);
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePagination = (num,index) => {
    setPage(index);
    paginate(num)
  }
  
  return (
    <div className={classes.root}>
      {pageNumbers.map((number,i) => (
          <ButtonGroup size="small"  aria-label="small outlined button group" className={page===i?classes.btnActive:classes.btn}  key={number}>
          <Button  onClick={() => handlePagination(number,i)}>{number}</Button>
        </ButtonGroup>
      ))}
    </div>
  );
}