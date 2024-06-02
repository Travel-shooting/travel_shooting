import styled from "styled-components";
import Post from "./Post";
import Slider from "./Slider";
import Travel from "./Travel";
const Container = styled.div`
  display: grid;
  grid-template-rows: 500px 1fr;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "slider" "post travel";
  gap: 20px;
  div {
    background-color: red;
  }
  div:nth-child(1) {
    grid-column: 1/3;
  }
`;

function PostComponent() {
  return (
    <Container>
      <Slider />
      <Post />
      <Travel />
    </Container>
  );
}

export default PostComponent;
