import { getBouquetList } from "../__mocks__/bouquetList";

const ADD_CARD = "ADD_CARD";
const REMOVE_CARD = "REMOVE_CARD";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
const IN_CART = "IN_CART";

export const addCardAction = (payload) => ({ type: ADD_CARD, payload });
export const removeCardAction = (payload) => ({ type: REMOVE_CARD, payload });
export const toggleFavoriteAction = (payload) => ({
  type: TOGGLE_FAVORITE,
  payload,
});
export const inCartAction = (payload) => ({
  type: IN_CART,
  payload,
});

const initialState = getBouquetList();

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const id = action.payload;
      return [...state].map((card) => {
        if (card.id === id) {
          card.isFavorite = !card.isFavorite;
        }
        return card;
      });
    }

    case ADD_CARD: {
      const newCard = action.payload;
      return [...state, newCard];
    }

    case REMOVE_CARD: {
      const id = action.payload;
      return [...state].filter((card) => card.id !== id);
    }

    case IN_CART: {
      const id = action.payload;
      return [...state].filter((card) => {
        if (card.id === id) {
          --card.flowersCount;
        }
        return card;
      });
    }

    // case UPDATE_CARD: {
    //   const updateCard = action.payload;
    //   console.log(updateCard);
    //   return [...state].map((card) => {
    //     if (card.id === updateCard.id) {
    //       card = updateCard;
    //     }
    //     return card;
    //   });
    // }

    // case ADD_COMMENT: {
    //   const { newComment, cardId } = action.payload;
    //   return [...state].map((card) => {
    //     if (card.id === cardId) {
    //       card["comments"]
    //         ? card.comments.push(newComment)
    //         : (card.comments = [newComment]);
    //     }
    //     return card;
    //   });
    // }

    // case REMOVE_COMMENT: {
    //   const { cardId, commentId } = action.payload;
    //   return [...state].map((card) => {
    //     if (card.id === cardId) {
    //       card.comments = card.comments.filter(
    //         (comment) => comment.id !== commentId
    //       );
    //     }
    //     return card;
    //   });
    // }

    default:
      return state;
  }
};
