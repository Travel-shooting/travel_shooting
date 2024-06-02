import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: whitesmoke;
  display: flex;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 5px;
  border-radius: 8px;
  border: none;
  background-color: yellow;
  font-size: 16px;
`;

function Menubar() {
  const navigate = useNavigate();
  const userId = 1; //지금 로그인한 유저 id
  const goMyPage = () => {
    navigate(`/mypage/${userId}`);
  };
  return (
    <MenuContainer>
      <div>
        <Link to="/">Travel-Shooting</Link>
      </div>
      <div>
        <Button>Log In</Button>
        <Button onClick={goMyPage}>MY PAGE</Button>
      </div>
    </MenuContainer>
  );
}

export default Menubar;
