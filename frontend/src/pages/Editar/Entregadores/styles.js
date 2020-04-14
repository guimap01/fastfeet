import styled from 'styled-components';

import { darken } from 'polished';

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  h1 {
    font-size: 23px;
    margin-right: 62px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    margin-left: 310px;
    a {
      height: 36px;
      width: 122px;
      margin-right: 18px;
      > button {
        height: 36px;
        width: 122px;
        margin-right: 18px;
        background: #cccccc;
        border: none;
        border-radius: 4px;
        transition: background 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        &:hover {
          background: ${darken(0.1, '#cccccc')};
        }

        > svg {
          height: 20px;
          width: 20px;
          margin-right: 3px;
        }
      }
    }
    content {
      button {
        height: 36px;
        width: 122px;
        background: #7d40e7;
        border: none;
        border-radius: 4px;
        transition: background 0.2s;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        &:hover {
          background: ${darken(0.1, '#7d40e7')};
        }

        svg {
          margin-right: 8px;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;

export const Container = styled.div`
  max-width: 900px;
  margin: auto;

  form {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    ul {
      > div {
        height: 400px;
        border-radius: 7px;
        background: #fff;

        > div {
          border-radius: 7px;
          background: #fff;
          padding: 5px;
        }

        > span {
          color: #f64c75;
          font-size: 10px;
          font-weight: bold;
          margin-left: 30px;
          margin-bottom: 10px;
          display: block;
        }

        > strong {
          font-size: 14px;
          color: #444;
          margin-left: 30px;
        }

        > input {
          border: 1px solid #ddd;
          border-radius: 4px;
          height: 45px;
          width: 840px;
          padding: 0 15px;
          color: #000;
          margin: 0 0 10px;
          align-items: center;
          margin-left: 30px;
          margin-top: 5px;
          margin-bottom: 15px;
          display: block;
        }
      }
    }
  }
`;
