import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PostDetail from '../components/PostComponent/PostDetail';
import Slider from '../components/PostComponent/Slider';
import Travel from '../components/PostComponent/Travel';
import { loadPost } from '../redux/slices/postSlice';
import supabase from '../util/supabase/supabaseClient';
const Container = styled.div`
  display: grid;
  grid-template-rows: 700px 1fr;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas: 'slider' 'post travel';
  gap: 24px;

  div:nth-child(1) {
    grid-column: 1/3;
  }
`;

function PostPage() {
  const dispatch = useDispatch();
  const [postDetailDatas, setPostDetailDatas] = useState({});
  const [postImages, setPostImages] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: postData, error: postError } = await supabase.from('POST').select('*').eq('id', postId);
      const { data: tagData, error: tagError } = await supabase.from('TAGS').select('*').eq('postId', postId);
      if (postError || tagError) console.error(postError);
      else {
        setPostDetailDatas(postData[0]);
        const urls = JSON.parse(postData[0].imageURL).map((image) => image.url, []);
        setPostImages(urls);
        dispatch(loadPost(postData[0]));
        setPostTags(tagData);
      }
    };

    fetchData();
  }, [dispatch, postId]);

  return (
    <Container>
      <Slider postImage={postImages} />
      <PostDetail postDetailData={postDetailDatas} postTags={postTags} />
      <Travel />
    </Container>
  );
}

export default PostPage;
