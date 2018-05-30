const initialState = {
  texts: [
    {
      id: 0,
      text: 'hi',
      animation: 'linear'
    },
    {
      id: 1,
      text: 'dude',
      animation: 'linear'
    },
  ]
}

const defaultEmptyTextBox = {
  id: 0,
  text: '',
  animation: 'linear'
}

export default (state = {...initialState}, action) => {
  switch (action.type) {
    case 'ADD_NEW_TEXT_BOX':
      const lastId = action.payload.lastId;
      const newTextBox = {...defaultEmptyTextBox, id: lastId};
      return {
        ...state,
        texts: [...state.texts, newTextBox]
      }
      break;
    case 'CHANGE_TEXT_VALUE':
      console.log(action.payload);
      const { id } = action.payload.textObject;
      const { newTextValue } = action.payload;
      console.log(newTextValue);
      const newTextValues = state.texts.map(textObject => {
        if (textObject.id === id) {
          textObject.text = newTextValue;
        }
        return textObject;
      });
      return {
        ...state,
        texts: newTextValues
      }
    case 'ADD_OBJECT':
      return {
        result: action.payload
      }
    default:
      return state
  }
}
