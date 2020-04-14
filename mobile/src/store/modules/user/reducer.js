import produce from 'immer';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const INITIAL_STATE = {
  name: null,
  email: null,
  url: null,
  signed: false,
  loading: false,
  id: null,
  created_at: null,
};

function urlReplacement(url) {
  const avatarURL = url.replace('localhost', '192.168.15.6');
  return avatarURL;
}

function formattedDate(date) {
  const dateParsed = format(parseISO(date), 'dd/MM/yyyy', {
    ptBR,
  });
  return dateParsed;
}

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@entry/ENTRY_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@entry/ENTRY_SUCCESS': {
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        draft.url = urlReplacement(action.payload.url);
        draft.signed = true;
        draft.loading = false;
        draft.id = action.payload.id;
        draft.created_at = formattedDate(action.payload.created_at);
        break;
      }

      case '@exit/EXIT_REQUEST': {
        draft.name = null;
        draft.email = null;
        draft.url = null;
        draft.signed = false;
        draft.id = null;
        draft.created_at = null;
        break;
      }
      default:
    }
  });
}
