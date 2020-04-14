export function editDestinatariosRequest(data) {
  return {
    type: '@destinatario/EDIT_REQUEST',
    payload: { data },
  };
}

export function editDestinatariosSuccess() {
  return {
    type: '@destinatario/EDIT_SUCCESS',
  };
}

export function editDestinatariosFailure() {
  return {
    type: '@destinatario/EDIT_FAILURE',
  };
}
export function signUpDestinatariosRequest(data) {
  return {
    type: '@destinatario/SIGN_UP_REQUEST',
    payload: { data },
  };
}

export function signUpDestinatariosSuccess() {
  return {
    type: '@destinatario/SIGN_UP_SUCCESS',
  };
}

export function signUpDestinatariosFailure() {
  return {
    type: '@destinatario/SIGN_UP_Failure',
  };
}
