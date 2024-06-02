import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../styles/images/logo.png";
const MenuContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
  background-color: var(--lightgrey-color);
  display: flex;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.bordercolor};
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  width: 100px;
  font-size: 16px;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
        <Link to="/">
          <img src={Logo} />
        </Link>
      </div>
      <ButtonBox>
        <Button
          bgcolor={"var(--white-color)"}
          color={"var(--golden-color)"}
          bordercolor={"var(--golden-color)"}
        >
          Log In
        </Button>
        <Button
          bgcolor={"var(--golden-color)"}
          color={"var(--white-color)"}
          bordercolor={"var(--golden-color)"}
          onClick={goMyPage}
        >
          MY PAGE
        </Button>
      </ButtonBox>
    </MenuContainer>
  );
}

export default Menubar;
