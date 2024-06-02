import { useParams } from "react-router-dom";
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
const post = {
  id: 0,
  postUserId: 0,
  postDate: "2023-05-31",
  postTitle: "제목",
  postContent: "내용",
  postImage: ["이미지1", "이미지2"],
};
function PostDetail() {
  const tags = ["운치있는", "조용한", "맛있는", "대표적인"];
  const postId = useParams();
  return (
    <div>
      <div>
        <TitleBox>
          <h1>{post.postTitle}</h1>
          <span>
            <Img src={Heart} />
          </span>
        </TitleBox>

        <p>{post.postContent}</p>
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
export default PostDetail;
