import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import "../styles/color.css";
import Menubar from "./Menubar";
// 전체 컴포넌트의 공통적인 스타일
const Container = styled.div`
  margin: 20px auto;
  width: 80%;
`;
function Layout() {
  return (
    <>
      <GlobalStyle />
      <Menubar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
