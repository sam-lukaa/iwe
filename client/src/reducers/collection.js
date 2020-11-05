import {
  GET_COLLECTION,
  DELETE_COLLECTION_ITEM,
  COLLECTION_ERROR,
  CREATE_COLLECTION,
} from "../actions/types";

const initialState = {
  collection: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COLLECTION:
      return {
        ...state,
        collection: [...state.collection, payload],
        loading: false,
      };
    case GET_COLLECTION:
      return {
        ...state,
        collection: payload,
        loading: false,
      };

    case DELETE_COLLECTION_ITEM:
      return {
        ...state,
        collection: state.collection.filter(
          (collectionItems) => collectionItems._id !== payload
        ),
        loading: false,
      };

    case COLLECTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
