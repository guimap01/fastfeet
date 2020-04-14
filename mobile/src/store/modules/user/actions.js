export function entryRequest(id) {
  return {
    type: '@entry/ENTRY_REQUEST',
    payload: { id },
  };
}

export function entrySuccess(id, name, email, url, created_at) {
  return {
    type: '@entry/ENTRY_SUCCESS',
    payload: { id, name, email, url, created_at },
  };
}

export function entryFailure() {
  return {
    type: '@entry/ENTRY_FAILURE',
  };
}

export function exitRequest() {
  return {
    type: '@exit/EXIT_REQUEST',
  };
}
