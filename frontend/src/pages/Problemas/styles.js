import styled from 'styled-components';
import { darken } from 'polished';
import ReactModal from 'react-modal';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0px auto;

  display: flex;
  flex-direction: column;
  header {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    strong {
      font-size: 25px;
      font-weight: bold;
    }

    a {
      button {
        &:hover {
          background: ${darken(0.07, '#7D40E7')};
        }
      }
    }
    .prev {
      background: none;
    }

    .button-input {
      display: flex;
      justify-content: space-between;
      margin-top: 34px;
    }
    .input {
      display: flex;
      flex-direction: row;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #fff;
      svg {
        float: left;
        margin: 8px 0 0 8px;
        color: #999999;
      }
    }
    input {
      display: flex;
      height: 36px;
      width: 237px;
      border: 0;
      border-radius: 5px;
      float: left;
      padding-left: 8px;
    }
    button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 36px;
      width: 142px;
      border: 0;
      padding: 0;
      border-radius: 5px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      transition: background 0.2s;
      svg {
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
export const Table = styled.table`
  margin-top: 10px;
  width: 100%;
  border-spacing: 0 20px;
  thead {
    font-size: 16px;
    text-align: left;
    color: #444;
    opacity: 1;
    font-weight: bold;
    .problema {
      width: 900px;
    }
    .acoes {
      width: 70px;
    }
    tr td {
      padding: 14px 14px 0 14px;
    }
  }
  tbody {
    font-size: 16px;
    color: #666;
    background: #fff;
    border-collapse: collapse;

    td {
      padding: 7px;
      flex-direction: row;
      .name {
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
      }
    }
    .dropdownlist {
      .dots {
        font-size: 30px;
        color: #999999;
        margin-left: 15px;
      }
      button {
        background: #fff;
        border: none;
      }
      .dropdown-item {
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 150px;
        height: 120px;
        border: 1px solid #eee;
        background: #fff;
        button {
          margin: 5px;
          display: flex;
          align-items: center;
          padding-top: 5px;
          & + button {
            border-top: 1px solid #eee;
          }
          text {
            width: 115px;
            margin-left: 10px;
            font-size: 14px;
            color: #999999;
          }
        }
      }
    }
  }
`;

export const Modal = styled(ReactModal).attrs(() => ({
  style: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
    },
    content: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
      borderRadius: '4px',
      width: '450px',
      margin: 'auto',
    },
  },
}))`
  div {
    display: flex;
    flex-direction: column;
  }

  text {
    font-size: 16px;
    color: #666666;
  }
  span {
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }
  img {
    max-height: 80px;
    max-width: 400px;
    object-fit: contain;
  }
  & + div {
    border-top: 1px solid #eee;
  }

  .information {
    text {
      padding: 2px;
    }
  }

  .dates {
    div {
      flex-direction: row;
      align-items: baseline;
      margin-top: 5px;
    }
    text {
      margin-left: 5px;
    }

    strong {
      font-size: 16px;
      color: #666666;
    }
  }
`;
