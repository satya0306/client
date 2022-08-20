import React, {useState, useEffect } from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state)=>currentId ? state.posts.find((post)=>post._id === currentId): null)
    const [postData, setPostData ] = useState({
        title:'', message:'',tags:'', selectedFile:''
    })
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        if(post) setPostData(post)
    },[post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost({ ...postData, name: user?.result?.name }));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
          window.location.reload();
        }
      };

    const clear = () => {
        setPostData({title:'', message:'',tags:'', selectedFile:''});
        setCurrentId(null);
    }

    if(!user?.result?.name){
        return (
            <Paper>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like others memories.
                </Typography>
            </Paper>
        )
    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{(currentId ? 'Editing': 'Creating')+' '+'a memory'}</Typography>
                {/* <TextField 
                    name='creator' 
                    variant='outlined' 
                    label='Creator' 
                    fullWidth
                    value={postData.creator}
                    onChange={(e)=>setPostData({...postData, creator: e.target.value})}
                /> */}
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth
                    value={postData.title}
                    onChange={(e)=>setPostData({...postData, title: e.target.value})}
                />
                <TextField 
                    name='message' 
                    variant='outlined' 
                    label='Message' 
                    fullWidth
                    value={postData.message}
                    onChange={(e)=>setPostData({...postData, message: e.target.value})}
                />
                <TextField 
                    name='tags' 
                    variant='outlined' 
                    label='Tags' 
                    fullWidth
                    value={postData.tags}
                    onChange={(e)=>setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=>setPostData({...postData, selectedFile:base64 })}
                    />
                </div>
                <Button type="submit" className={classes.buttonSubmit} variant="contained" color='primary' size='large' fullWidth>Submit</Button>
                <Button variant="contained" color='secondary' onClick={clear} size='small' fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;