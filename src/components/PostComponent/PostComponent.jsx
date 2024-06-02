import styled from "styled-components";
import PostDetail from "./PostDetail";
import Slider from "./Slider";
import Travel from "./Travel";
const Container = styled.div`
  display: grid;
  grid-template-rows: 700px 1fr;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas: "slider" "post travel";
  gap: 25px;

  div:nth-child(1) {
    grid-column: 1/3;
  }
`;

function PostComponent() {
  return (
    <Container>
      <Slider />
      <PostDetail />
      <Travel />
    </Container>
  );
}

export default PostComponent;
