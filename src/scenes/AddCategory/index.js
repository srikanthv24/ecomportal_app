import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Typography, Paper, Container, Grid, Button } from '@material-ui/core';

import { createCategory, clearCategoryState } from '../../store/actions';
import './addCategory.css';

function AddCategory(props) {
    const dispatch = useDispatch();
    const categoryState = useSelector(state => state.categories);

    const [category, setCategory] = React.useState({
        name: "",
        display_name: "",
        status: "A",
        upd_by: "user"
    })

    const onChangeHandler = (event) => {
        setCategory({ ...category, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = () => {
        dispatch(createCategory(category))
    }

    React.useEffect(() => {
        if (categoryState.categoryCreated) {
            props.history.push('/categories')
        }
        if (categoryState.error) {
            console.log("error in creating category");
        }
    }, [categoryState])

    React.useEffect(() => {
        return () => {
            dispatch(clearCategoryState())
        }
    }, [])

    return (
        <div className={'root'}>
            <Container>
                <Paper className={'paper'}>
                    <Typography className={'heading'}>Add Category</Typography>
                    <Grid className={'grid'}>
                        <form>
                            <div>
                                <Typography>Name</Typography>
                                <TextField
                                    id="standard-full-width"
                                    style={{ margin: 8, width: "100%" }}
                                    placeholder="Enter category name"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name='name'
                                    value={category.name}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div>
                                <Typography>Display name</Typography>
                                <TextField
                                    id="standard-full-width"
                                    style={{ margin: 8, width: "100%" }}
                                    placeholder="Enter category display name"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name='display_name'
                                    value={category.display_name}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <Button onClick={() => onSubmitHandler()} color={'primary'} variant={'contained'}>Save</Button>
                        </form>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}

export default AddCategory