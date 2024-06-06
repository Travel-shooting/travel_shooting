import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logOut } from '../redux/slices/logSlice';
import { open } from '../redux/slices/modalSlice';
import Logo from '../styles/images/logo.png';
import supabase from '../util/supabase/supabaseClient';
const MenuContainer = styled.div`
  height: 80px;
  background-color: var(--black-color);
`;
const MenuInnerContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.bordercolor};
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  width: 100px;
  font-size: 14px;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

function Menubar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = JSON.parse(sessionStorage.getItem('logInUser'));
  const goMyPage = () => {
    navigate(`/mypage/${userId}`);
  };
  const handleSignup = () => {
    dispatch(open('signup'));
  };
  const handleLogIn = () => {
    dispatch(open('login'));
  };
  const handleLogOut = () => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.error(error);
      else {
        dispatch(logOut());
        sessionStorage.removeItem('logInUser');
        alert('로그아웃되었습니다');
        navigate('/');
      }
    };
    signOut();
  };
  return (
    <MenuContainer>
      <MenuInnerContainer>
        <div>
          <Link to="/">
            <img style={{ width: '240px' }} src={Logo} />
          </Link>
        </div>
        <ButtonBox>
          {userId ? (
            <>
              <Button
                bgcolor={'var(--black-color)'}
                color={'var(--yellow-color)'}
                bordercolor={'var(--yellow-color)'}
                onClick={handleLogOut}
              >
                Log Out
              </Button>
              <Button
                bgcolor={'var(--yellow-color)'}
                color={'var(--black-color)'}
                bordercolor={'var(--yellow-color)'}
                onClick={goMyPage}
              >
                MY PAGE
              </Button>
            </>
          ) : (
            <>
              <Button
                bgcolor={'var(--black-color)'}
                color={'var(--yellow-color)'}
                bordercolor={'var(--yellow-color)'}
                onClick={handleLogIn}
              >
                Log In
              </Button>
              <Button
                bgcolor={'var(--yellow-color)'}
                color={'var(--black-color)'}
                bordercolor={'var(--yellow-color)'}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </>
          )}
        </ButtonBox>
      </MenuInnerContainer>
    </MenuContainer>
  );
}

export default Menubar;
