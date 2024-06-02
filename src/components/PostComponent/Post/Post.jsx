import styled from "styled-components";
const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BadgeBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Badge = styled.span`
  background-color: var(--lightgrey-color);
  border-radius: 20px;
  padding: 5px;
`;
function Post() {
  const tags = ["운치있는", "조용한", "맛있는", "대표적인"];
  return (
    <div>
      <div>
        <Title>
          <h1>title입니다</h1>
          <span>♡</span>
        </Title>

        <p>내용의 들어가는 자리입니다</p>
        <BadgeBox>
          {tags.map((tag, i) => (
            <Badge key={i}>#{tag}</Badge>
          ))}
        </BadgeBox>
      </div>
      <div>
        <h1>swiss-lover</h1>
        <button>Follow</button>
      </div>
    </div>
  );
}
export default Post;
