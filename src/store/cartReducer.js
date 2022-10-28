const ADD_CARD = "ADD_CARD";

export const addCartAction = (payload) => ({ type: ADD_CARD, payload });

const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const card = action.payload;
      console.log(state);
      return [...state, card];
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
