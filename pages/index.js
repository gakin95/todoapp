import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Container, Grid } from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom';
import { connect } from "react-redux";


import Header from "../src/common/header";
import Todo from "../src/components/todo";
import Pagination from "../src/components/pagination";
import { getALLTodo} from "../src/services";
import * as actions from "../src/store/actions";


const useStyles = makeStyles((theme) => ({
  mt:{
    marginTop: '1rem'
  },
  header:{
    height:250,
    backgroundImage:'url(https://images.unsplash.com/photo-1547480053-7d174f67b557?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG8lMjBkbyUyMGxpc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80)',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundOrigin:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundBlendMode: 'multiply',
    display:'flex',
    alignItems:'center',
    '& h3':{
      color: '#FFF',
      fontSize:50,
      marginLeft:"2rem"
    }
  },
  pagination: {
    "& a":{
      textDecoration:'none'
    },
    "& > *": {
      marginTop: theme.spacing(2),
      width: "100%",
      // margin: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    line: {
     border: "5px solid grey",
     backgroundColor: "grey",
    },
  },
}));

const Home = ({onGetTodos,data,deleted}) => {
const classes = useStyles();
  const router = useRouter();
  //const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(16);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const getTodos = async () => {
    const response = await getALLTodo();
    console.log('length..',response.data.length)
    if (response && response.data) {
      if (response.data.length > data.length && !deleted){
        onGetTodos(response.data)
      }else{
        onGetTodos(data)
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <Header />
      <Container className={classes.mt}>
        <div className={classes.header}>
          <Zoom in={true}>
          <h3>Fake todo list</h3>
          </Zoom>
        </div>
        <Grid container spacing={2} className={classes.mt}>
          {currentPosts.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Todo title={item.title} body={item.body} onClick={() => router.push(`/post/${item.id}`)}/>
            </Grid>
          ))}
        </Grid>
        <div className={classes.pagination}>
        <a  href='#'>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
          />
        </a>
      </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data:state.todos.details,
    deleted: state.todos.isDeleted
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTodos: (items) => dispatch(actions.getTodos(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
