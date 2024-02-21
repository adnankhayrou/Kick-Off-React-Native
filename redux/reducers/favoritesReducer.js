const initialState = {
    favorites: []
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_FAVORITE':
        return { ...state, favorites: [...state.favorites, action.payload] };
      case 'REMOVE_FAVORITE':
        return {
          ...state,
          favorites: state.favorites.filter(item => item.id !== action.payload.id)
        };
      default:
        return state;
    }
  };
  
  export default favoritesReducer;