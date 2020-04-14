import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      margin-right: 30px;
      padding-right: 20px;
      border-right: 1px solid #ddd;
    }

    a {
      font-weight: bold;
      color: #999;
      margin-right: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666;
      font-weight: bold;
    }

    button {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #de3b3b;
      font-weight: initial;
      border: none;
      background: #fff;
    }
  }
`;
