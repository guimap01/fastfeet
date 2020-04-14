export function signUpEncomendasRequest(data) {
  return {
    type: '@delivery/SIGN_UP_REQUEST',
    payload: { data },
  };
}

export function signUpEncomendasSuccess() {
  return {
    type: '@delivery/SIGN_UP_SUCCESS',
  };
}

export function signUpEncomendasFailure() {
  return {
    type: '@delivery/SIGN_UP_FAILURE',
  };
}

export function editEncomendasRequest(data) {
  return {
    type: '@delivery/EDIT_REQUEST',
    payload: { data },
  };
}

export function editEncomendasSuccess() {
  return {
    type: '@delivery/EDIT_SUCCESS',
  };
}

export function editEncomendasFailure() {
  return {
    type: '@delivery/EDIT_SUCCESS',
  };
}
