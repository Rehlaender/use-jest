export const changeTextObjectValue = (textObject, newTextValue) => dispatch => {
  dispatch({
    type: 'CHANGE_TEXT_VALUE',
    payload: {
      textObject,
      newTextValue
    }
  })
}

export const deleteIfTextBoxEmpty = (textObjectId) => dispatch => {
  dispatch({
    type: 'DELET_IF_TEXT_BOX_EMPTY',
    payload: {
      textObjectId
    }
  })
}

export const addTextBox = (lastId) => dispatch => {
  dispatch({
    type: 'ADD_NEW_TEXT_BOX',
    payload: {
      lastId
    }
  },setTimeout(()=>{focusNewInput(lastId)},0)); 
}

function focusNewInput(lastId) {
  window.document.getElementById(`text${lastId}`).focus();
}
