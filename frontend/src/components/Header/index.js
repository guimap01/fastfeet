import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to="/encomendas">ENCOMENDAS</Link>
          <Link to="/entregadores">ENTREGADORES</Link>
          <Link to="/destinatarios">DESTINATARIOS</Link>
          <Link to="/problemas">PROBLEMAS</Link>
        </nav>

        <Profile>
          <div>
            <strong>
              {profile.name}
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </strong>
          </div>
        </Profile>
      </Content>
    </Container>
  );
}
