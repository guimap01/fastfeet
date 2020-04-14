export function signUpEntregadoresRequest(data) {
  return {
    type: '@deliveryman/SIGN_UP_REQUEST',
    payload: { data },
  };
}

export function signUpEntregadoresSuccess() {
  return {
    type: '@deliveryman/SIGN_UP_SUCCESS',
  };
}

export function signUpEntregadoresFailure() {
  return {
    type: '@deliveryman/SIGN_UP_FAILURE',
  };
}

export function editEntregadoresRequest(data) {
  return {
    type: '@deliveryman/EDIT_REQUEST',
    payload: { data },
  };
}

export function editEntregadoresSuccess() {
  return {
    type: '@deliveryman/EDIT_SUCCESS',
  };
}

export function editEntregadoresFailure() {
  return {
    type: '@deliveryman/EDIT_FAILURE',
  };
}
