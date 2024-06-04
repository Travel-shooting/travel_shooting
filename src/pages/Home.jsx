import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Login from "../components/UserComponent/Login";
import Signup from "../components/UserComponent/Signup";
import GlobalStyle from "../styles/GlobalStyle";
import "../styles/color.css";
import Menubar from "./Menubar";
// 전체 컴포넌트의 공통적인 스타일
const Container = styled.div`
  margin: 20px auto;
  width: 80%;
`;
function Home() {
  const modal = useSelector((state) => state.modal.modalOptions);
  return (
    <>
      <GlobalStyle />
      {modal == "login" && <Login />}
      {modal == "signup" && <Signup />}
      <Menubar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Home;
