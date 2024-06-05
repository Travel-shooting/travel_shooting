import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addHeart } from "../../../redux/slices/postSlice";
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
  const dispatch = useDispatch();
  const detailData = useSelector((state) => state.post.loadData);
  const postLike = useSelector((state) => state.post.loadData.postLike);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("USER")
        .select("*")
        .eq("id", detailData.postUserId);
      if (error) console.log("user 테이블 못불러옴");
      else {
        console.log(data[0]);
      }
    };
    fetchUserData();
  }, []);
  const handleAddHeart = () => {
    dispatch(addHeart());
  };
  return (
    <div>
      <div>
        <TitleBox>
          <Font>{postDetailData.postTitle}</Font>

          <div>
            <span>{postLike}</span>
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
