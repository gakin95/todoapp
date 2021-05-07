import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    height: 150,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 16px 64px -16px rgba(46,55,77,0.7)",
      backgroundColor: "rgba(255,255,255,.7)",
    },
  },
  title: {
    fontSize: 14,
    color:theme.palette.primary.main,
    fontWeight:'bold'
  },
}));

export default function SimpleCard({title, body,onClick}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onClick}>
      <CardContent>
        <p className={classes.title}>
          {title}
        </p>
        <Typography variant="body2" component="p">
          {body.length>100 ? body.substring(0,100) + '...':body}
        </Typography>
      </CardContent>
    </Card>
  );
}
