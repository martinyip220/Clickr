const CREATE_ALBUM = "albums/CREATE_ALBUM";
const GET_ALBUM = "albums/GET_ALBUM";
const GET_ALL_ALBUMS = "albums/GET_ALL_ALBUMS";
const USER_ALBUMS = "albums/USER_ALBUMS";
const EDIT_ALBUM = "albums/EDIT_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";
const CLEAR_ALBUMS = "albums/CLEAR_ALBUMS";

// Actions
const createAlbum = (album) => ({
  type: CREATE_ALBUM,
  payload: album,
});

const getOneAlbum = (album) => ({
  type: GET_ALBUM,
  payload: album,
});

const getAllAlbums = (albums) => ({
  type: GET_ALL_ALBUMS,
  payload: albums,
});

const userAlbums = (albums) => ({
  type: USER_ALBUMS,
  payload: albums,
});

const updateAlbum = (album) => ({
  type: EDIT_ALBUM,
  payload: album,
});

const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  payload: albumId,
});

const clearUserAlbums = (albums) => ({
  type: CLEAR_ALBUMS,
  payload: albums,
});

// Action Thunks
export const createAlbumThunk = (newAlbum) => async (dispatch) => {
  const { title, description, photos } = newAlbum;

  const response = await fetch(`/api/albums`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      photo: [photos],
    }),
  });

  if (response.ok) {
    const album = await response.json();
    await dispatch(createAlbum(album));
    return album;
  }
};

export const getOneAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`);

  if (response.ok) {
    const album = await response.json();
    await dispatch(getOneAlbum(album));
    return album;
  }
};

export const getAllAlbumsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/albums`);

  if (response.ok) {
    const albums = await response.json();
    await dispatch(getAllAlbums(albums));
  }
};

export const userAlbumsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/albums/user/${userId}`);

  if (response.ok) {
    const albums = await response.json();
    await dispatch(userAlbums(albums));
    return albums;
  }
};

export const updateAlbumThunk = (album) => async (dispatch) => {
  const { id, title, description, photos } = album;

  const response = await fetch(`/api/albums/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      photo: [photos],
    }),
  });
  if (response.ok) {
    const editedAlbum = await response.json();
    await dispatch(updateAlbum(editedAlbum));
    return editedAlbum;
  }
};

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const album = await response.json();
    await dispatch(deleteAlbum(albumId));
    return album;
  }
};

export const clearUserAlbumsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/albums`);

  if (response.ok) {
    const albums = await response.json();
    await dispatch(clearUserAlbums(albums));
  }
};

const intialState = {
  allAlbums: {},
  singleAlbum: {},
  userAlbums: {},
};

const albumReducer = (state = intialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_ALBUM: {
      newState = { ...state };
      newState.allAlbums.albums = [...state.allAlbums.albums];
      newState.allAlbums.albums.push(action.payload.album);
      return newState;
    }
    case GET_ALBUM: {
      newState = { ...state };
      newState.singleAlbum = { ...newState.singleAlbum };
      newState.singleAlbum = action.payload;
      return newState;
    }
    case GET_ALL_ALBUMS: {
      newState = { ...state };
      const albums = action.payload;
      newState.allAlbums.albums = albums.albums;
      return newState;
    }
    case USER_ALBUMS: {
      const newState = { ...state };
      const albums = action.payload;
      newState.userAlbums = albums;
      return newState;
    }
    case EDIT_ALBUM: {
      const newState = { ...state };
      newState.userAlbums = { ...state.userAlbums };
      newState.userAlbums[action.payload.album.id] = action.payload.album;
      newState.allAlbums.albums[action.payload.album.id] = action.payload.album;
      return newState;
    }
    case DELETE_ALBUM: {
      newState = { ...state };
      newState.userAlbums = { ...state.userAlbums };
      delete newState.userAlbums[action.payload];
      return newState;
    }
    case CLEAR_ALBUMS: {
      newState = { ...state, userAlbums: {} };
      return newState;
    }
    default:
      return state;
  }
};

export default albumReducer;
