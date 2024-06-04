import { useEffect, useState } from "react";
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
  const [detailDataUserId, setDetailDataUserId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("USER")
        .select("*")
        .eq("id", postDetailData.postUserId);
      console.log(data);
      if (error) console.log("user 테이블 못불러옴");
      else setDetailDataUserId(data.userId);
    };
    fetchData();
  }, []);
  const handleAddHeart = () => {
    alert("하트누름");
  };
  return (
    <div>
      <div>
        <TitleBox>
          <Font>{postDetailData.postTitle}</Font>
          <span>
            <Img src={Heart} onClick={handleAddHeart} />
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
        <h1>{detailDataUserId}</h1>
        <Button>Follow</Button>
      </div>
    </div>
  );
}
export default PostDetail;
