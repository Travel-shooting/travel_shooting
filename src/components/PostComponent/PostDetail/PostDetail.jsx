import styled from "styled-components";
import Heart from "../../../styles/images/heart.png";

const TitleBox = styled.div`
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
const Img = styled.img`
  cursor: pointer;
`;
const Button = styled.button``;
function PostDetail({ postDetailData, postTags }) {
  return (
    <div>
      <div>
        <TitleBox>
          <h1>{postDetailData.postTitle}</h1>
          <span>
            <Img src={Heart} />
          </span>
        </TitleBox>

        <p>{postDetailData.postContent}</p>
        <BadgeBox>
          {postTags.map((tag) => (
            <Badge key={tag.id}>{tag.tagId}</Badge>
          ))}
        </BadgeBox>
      </div>
      <div>
        <h1>swiss-lover</h1>
        <Button>Follow</Button>
      </div>
    </div>
  );
}
export default PostDetail;
