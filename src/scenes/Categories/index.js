import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { getCategories } from '../../store/actions'

function Categories(props) {
    const dispatch = useDispatch();
    const categoryState = useSelector(state => state.categories);

    const [categories, setCategories] = useState([])

    React.useEffect(() => {
        if (categoryState && categoryState.categories && categoryState.categories.length > 0) {
            setCategories(categoryState.categories)
        } else {
            if (!categoryState.loading) {
                dispatch(getCategories())
            }
        }
    }, [categoryState])

    return (
        <div>
            <button onClick={() => props.history.push('/createcategory')}>Add Category</button>
            {
                categories.map(category => (
                    <li>{category.name}</li>
                ))
            }
        </div>
    )
}

export default Categories