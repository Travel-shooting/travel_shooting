import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Heart from "../../../styles/images/heart.png";
import supabase from "../../../util/supabase/supabaseClient";

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

const Font = styled.p`
  font-size: 25px;
  font-weight: bold;
`;
const Button = styled.button``;
function PostDetail({ postDetailData, postTags }) {
  const detailData = useSelector((state) => state.post.totalData);
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("USER")
        .select("*")
        .eq("id", detailData.postUserId);
      console.log(data);
      if (error) console.log("user 테이블 못불러옴");
      else console.log(data);
    };
    fetchUserData();
  }, []);
  const handleAddHeart = () => {
    alert("하트누름");
  };
  return (
    <div>
      <div>
        <TitleBox>
          <Font>{postDetailData.postTitle}</Font>

          <div>
            <span>{postDetailData.postLike}</span>
            <Img src={Heart} onClick={handleAddHeart} />
          </div>
        </TitleBox>
        <p>{postDetailData.postDate}</p>
        <p>{postDetailData.postContent}</p>
        <BadgeBox>
          {postTags.map((tag) => (
            <Badge key={tag.id}>{tag.tagId}</Badge>
          ))}
        </BadgeBox>
      </div>
      <div>
        <h1>{postDetailData.postUserId}</h1>
        <Button>Follow</Button>
      </div>
    </div>
  );
}
export default PostDetail;
