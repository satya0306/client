import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from "@material-ui/core";
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state)=>state.posts) //this posts comes from combine reducer
    const classes = useStyles();
    return(
        <>
            {!posts.length ? <CircularProgress/>:(
                <Grid className={classes.container} container alignContent='stretch' spacing={3}>
                    {posts.map((post)=>{
                        return(
                            <Grid key={post.id} item xs={12} sm={6}>
                                <Post post={post} setCurrentId={ setCurrentId }/>
                            </Grid>
                        )
                    })}
                </Grid>
            )} 
        </>

    )
}

export default Posts;