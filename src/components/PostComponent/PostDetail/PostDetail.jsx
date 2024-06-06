import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../../redux/slices/postSlice';
import supabase from '../../../util/supabase/supabaseClient';

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: ${(props) => props.justifycontent};
`;

const Badge = styled.div`
  background-color: var(--lightgrey-color);
  border-radius: 20px;
  padding: 10px;
`;

const Font = styled.span`
  font-size: 25px;
  font-weight: bold;
  flex: 1;
  text-decoration: none;
`;
const Button = styled.button`
  padding: 8px;
  background-color: var(--yellow-color);
`;
function PostDetail({ postDetailData, postTags }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [postEmail, setPostEmail] = useState('');
  const userId = JSON.parse(sessionStorage.getItem('logInUser'));
  useEffect(() => {
    const fetchTagsData = async () => {
      const { data, error } = await supabase.from('POSTTAG').select('*');
      if (error) console.error(error);
      else {
        const newTags = postTags.map((tag) => data.filter((d) => tag.tagId === d.id).map((d) => d.tagValue)).flat();
        setTags(newTags);
      }
    };

    fetchTagsData();
  }, [postTags]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.from('USER').select('*').eq('uuid', postDetailData.postUserId);
      if (error) console.error('user 테이블 못불러옴');
      else setPostEmail(data[0].userId);
    };
    fetchUserData();
  }, [postDetailData]);

  const handleDelete = () => {
    const fetchDeleteUserData = async () => {
      const { data, error } = await supabase.from('POST').delete().eq('id', postDetailData.id);
      const { error: tagError } = await supabase.from('TAGS').delete().eq('postId', postDetailData.id);

      const fileNames = await fetchImagesWithPostId(postDetailData.id);
      if (fileNames.length > 0) await deleteImagesFromSupabase(fileNames);
      else console.log('삭제할 이미지가 없습니다.');

      if (error || tagError) alert('삭제하는데 에러발생했암');
      else {
        dispatch(deletePost(data));
        navigate('/');
      }
    };
    fetchDeleteUserData();
  };
  // 특정 postId와 관련된 이미지 파일 목록을 조회
  const fetchImagesWithPostId = async (postId) => {
    const { data, error } = await supabase.storage.from('postImages').list('', {
      search: `${postId}-`
    });
    if (error) return [];
    return data.map((file) => file.name);
  };

  // 이미지 파일 삭제
  const deleteImagesFromSupabase = async (fileNames) => {
    const { data, error } = await supabase.storage.from('postImages').remove(fileNames);
    if (error) console.error('이미지 삭제 실패...', error);
    else return data;
  };

  const handleModify = () => {
    navigate(`/post/modify/${postDetailData.id}`);
  };
  return (
    <div>
      <FlexBox justifycontent={'space-between'}>
        <Font>{postDetailData.postTitle}</Font>
        {userId == postDetailData.postUserId && (
          <>
            <Button onClick={handleModify}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </>
        )}
      </FlexBox>
      <p>{postDetailData.postDate}</p>
      <p>{postDetailData.postContent}</p>
      <FlexBox justifycontent={'flex-start'}>
        {tags.map((tag, i) => (
          <Badge key={i}>#{tag}</Badge>
        ))}
      </FlexBox>

      <Font>{postEmail.slice(0, postEmail.indexOf('@'))}</Font>
    </div>
  );
}
export default PostDetail;
