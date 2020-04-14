import styled from 'styled-components';
import { darken } from 'polished';

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

  justify-content: space-between;
  thead {
    font-size: 16px;
    text-align: left;
    color: #444;
    opacity: 1;
    font-weight: bold;
    .sizeTd {
      width: 240px;
    }
    .acoes {
      width: 70px;
    }

    tr {
      td {
        padding: 10px 10px 0 10px;
      }
    }
  }
  tbody {
    font-size: 16px;
    color: #666;
    background: #fff;

    td {
      padding: 7px;
      flex-direction: row;

      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
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

        width: 130px;
        height: 90px;
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
            margin-left: 15px;
            font-size: 16px;
            color: #999999;
          }
        }
      }
    }
  }
`;
