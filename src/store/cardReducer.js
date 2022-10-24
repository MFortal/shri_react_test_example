import { getBouquetList } from "../__mocks__/bouquetList";

const ADD_CARD = "ADD_CARD";
const REMOVE_CARD = "REMOVE_CARD";
const UPDATE_CARD = "UPDATE_CARD";
const REMOVE_COMMENT = "REMOVE_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

export const addCardAction = (payload) => ({ type: ADD_CARD, payload });
export const removeCardAction = (payload) => ({ type: REMOVE_CARD, payload });
export const updateCardAction = (payload) => ({ type: UPDATE_CARD, payload });
export const removeCommentAction = (payload) => ({
  type: REMOVE_COMMENT,
  payload,
});
export const addCommentAction = (payload) => ({ type: ADD_COMMENT, payload });

const initialState = getBouquetList();

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_CARD: {
    //   const newCard = action.payload;
    //   return [...state, newCard];
    // }

    // case REMOVE_CARD: {
    //   const id = action.payload;
    //   return [...state].filter((card) => card.id !== id);
    // }

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
