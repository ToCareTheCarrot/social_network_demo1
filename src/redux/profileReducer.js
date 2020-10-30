import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    {
      id: 0,
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCENkSHv5ZkAb030gCJYy2i8G5mZDPpZpOWw&usqp=CAU",
      text: "я сделяль",
    },
    {
      id: 1,
      url:
        "https://i.pinimg.com/originals/94/1a/16/941a1638848c06d3d83139f2ba267c9d.jpg",
      text: "Котик",
    },
  ],
  profile: null,
  status: "",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: Math.random() * 100 + Math.random() * 20 + Math.random() * 5,
        url:
          "https://i.pinimg.com/originals/94/1a/16/941a1638848c06d3d83139f2ba267c9d.jpg",
        text: action.newPostText,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.id),
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
  }

  return state;
};

export let addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});
export let deletePostActionCreator = (id) => ({ type: DELETE_POST, id });
export let setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export let setStatus = (status) => ({ type: SET_STATUS, status: status });

export let setUserProfileThunkCreator = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getProfileData(userId);
    dispatch(setUserProfile(response.data));
  };
};

export let getStatusThunkCreator = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
  };
};

export let updateStatusThunkCreator = (status) => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };
};

