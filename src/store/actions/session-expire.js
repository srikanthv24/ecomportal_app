import {types} from '../constants';


export const handleModalClose = () => {
    return {
        type: types.SESSION_MODAL_CLOSE,
    };
}