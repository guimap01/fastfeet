import styled from 'styled-components';
import { darken } from 'polished';

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
    span {
      font-size: 14px;
      font-weight: bold;
      margin-top: 9px;
      color: #444444;
    }
    .name input {
      width: 840px;
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
      font-size: 16px;
      color: #999;
      margin-top: 9px;
    }
    .address1 {
      display: flex;
      flex-direction: row;
      div {
        display: flex;
        flex-direction: column;
      }
      .street input {
        width: 519.33px;
        height: 45px;
        margin-right: 13.67px;
      }
      .number input {
        width: 150px;
        height: 45px;
        margin-right: 13.67px;
      }
      .complement {
        width: 140px;
        height: 45px;
      }
      input {
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 10px;
        font-size: 16px;
        color: #999;
        margin-top: 9px;
      }
    }
    .address2 {
      display: flex;
      flex-direction: row;
      div {
        display: flex;
        flex-direction: column;
      }
      .city input {
        margin-right: 16px;
      }
      .state input {
        margin-right: 16px;
      }
      input {
        width: 269.33px;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 10px;
        font-size: 16px;
        color: #999;
        margin-top: 9px;
      }
    }
  }
`;
