import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import "../styles/color.css";
// 전체 컴포넌트의 공통적인 스타일
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
function Layout() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
