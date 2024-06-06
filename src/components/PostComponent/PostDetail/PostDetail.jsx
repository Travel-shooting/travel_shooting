import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost } from '../../../redux/slices/postSlice';
import supabase from '../../../util/supabase/supabaseClient';

const FlexBox = styled.div`
  height: auto;
  display: flex;
  margin: 30px 0px;
  flex-direction: row;
  gap: 10px;
  justify-content: ${(props) => props.justifycontent};
`;
const Badge = styled.div`
  background-color: var(--lightgrey-color);
  border-radius: 20px;
  padding: 10px;
`;
const PostP = styled.p`
  font-size: 17px;
  line-height: 30px;
`;
const Font = styled.span`
  font-size: 30px;
  font-weight: bold;
  line-height: 38px;
  flex: 1;
  text-decoration: none;
`;
const FontUser = styled.span`
  font-size: 20px;
  font-weight: bold;
  flex: 1;
  text-decoration: none;
`;
const ButtonDiv = styled.div`
  display: flex;
`;
const Button = styled.button`
  width: 160px;
  height: 35px;
  font-size: 16px;
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
    deleteImagesFromSupabase();
  };
  const fetchImagesWithPostId = async () => {
    const postId = postDetailData.id;
    const { data, error } = await supabase.storage.from('postImages').list('', {
      search: `${postId}-`
    });
    if (error) return [];
    return data.map((file) => file.name);
  };
  const deleteImagesFromSupabase = async (files) => {
    fetchImagesWithPostId();
    const postId = postDetailData.id;

    return Promise.all(
      files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${postId}-${index}.${fileExt}`;
        const { data, error } = await supabase.storage.from('postImages').remove([fileName]);

        if (error) {
          console.error('이미지 삭제 실패...', error);
        } else console.log('이미지 삭제 성공...', data);

        return data;
      })
    );
  };
  const handleModify = () => {};
  return (
    <div>
      <FlexBox justifycontent={'space-between'}>
        <Font>{postDetailData.postTitle}</Font>
      </FlexBox>
      <PostP>{postDetailData.postDate}</PostP>
      <PostP>{postDetailData.postContent}</PostP>
      <FlexBox justifycontent={'flex-start'}>
        {tags.map((tag, i) => (
          <Badge key={i}>#{tag}</Badge>
        ))}
      </FlexBox>
      <FontUser>
        {postEmail.slice(0, postEmail.indexOf('@'))}
        {userId == postDetailData.postUserId && (
          <ButtonDiv>
            <Button onClick={handleModify}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </ButtonDiv>
        )}
      </FontUser>
    </div>
  );
}
export default PostDetail;
