import styled from 'styled-components';
import { darken } from 'polished';
import AsyncSelect from 'react-select/async';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 34px;
    strong {
      font-size: 24px;
      font-weight: bold;
    }
    .btn {
      display: flex;
      .back {
        background: #ccc;
        margin-right: 16px;
        &:hover {
          background: ${darken(0.09, '#ccc')};
        }
      }
      .save {
        background: #7d40e7;
        &:hover {
          background: ${darken(0.09, '#7D40e7')};
        }
      }
    }
    button {
      display: flex;
      height: 36px;
      width: 112px;
      border: 0;
      border-radius: 5px;
      color: #fff;
      font-weight: bold;
      padding: 0;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      transition: background 0.2s;
      svg {
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .form {
    background: #fff;
    padding: 25px;
    display: flex;
    border: 0;
    border-radius: 5px;
    flex-direction: column;
    margin-top: 20px;
    .name {
      display: flex;
      flex-direction: row;
      span {
        font-size: 14px;
        font-weight: bold;
        color: #444444;
      }
      .recipient {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
      }
    }
    .product {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      span {
        font-size: 14px;
        font-weight: bold;
      }
      input {
        width: 840px;
        height: 45px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        color: #999;
        margin-top: 9px;
      }
    }
  }
`;

export const Select = styled(AsyncSelect)`
  margin-top: 9px;
  width: 405px;
  height: 45px;
  font-size: 16px;
  border-radius: 5px;
`;
