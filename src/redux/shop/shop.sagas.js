import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess
} from './shop.actions'

export function* fetchCollectionsAsync() {
  yield console.log('I am fired')

  try {
    const collectionsRef = firestore.collection('collections');
    const snapshot = yield collectionsRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collectionsMap))

  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }


  // collectionsRef
  //   .get()
  //   .then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //   })
  //   .catch(err => dispatch(fetchCollectionsFailure(err.message)))
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}