import { all } from 'redux-saga/effects';
import {
    categoriesSaga, productsSaga
} from './saga';

export default function* rootSaga() {
    yield all([
        categoriesSaga(),
        productsSaga()
    ])
}