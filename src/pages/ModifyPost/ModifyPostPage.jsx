import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Slider from '../../components/PostComponent/Slider';
import { addPost, loadPost, manageTags } from '../../redux/slices/postSlice';
import { getPresentTime } from '../../util/date';
import supabase from '../../util/supabase/supabaseClient';
import CountrySelect from './CountrySelect';
import Tags from './Tags';

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 10px;
`;

const Button = styled.button`
  width: 280px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    background-color: var(--yellow-color);
  }
`;

function ModifyPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const userId = useSelector((state) => state.log.logInUser);
  const selectedTags = useSelector((state) => state.post.tags);
  const [fileImages, setFileImages] = useState([]);

  const formRef = useRef([]);
  const [postData, setPostData] = useState([]);
  const [postTags, setPostTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('POST').select('*').eq('id', postId);
      if (error) {
        console.error(error);
      } else {
        setPostData(data[0]);
        const urls = JSON.parse(data[0].imageURL).map((image) => image.url, []);
        setFileImages(urls);
        dispatch(loadPost(data[0]));
      }
    };
    const tagFetchData = async () => {
      const { data, error } = await supabase.from('TAGS').select('*').eq('postId', postId);
      if (error) console.error(error);
      else {
        console.log(data);
        setPostTags(data);
      }
    };

    fetchData();
    tagFetchData();
  }, [dispatch, postId]);

  const handleSubmit = async () => {
    const id = crypto.randomUUID();
    try {
      const postFormData = {
        id,
        postUserId: userId,
        postTitle: formRef.current[0].value,
        postContent: formRef.current[1].value,
        postDate: getPresentTime(),
        postLike: 0,
        country: JSON.parse(localStorage.getItem('country'))
      };

      const tagsFormData = selectedTags.map(
        (tag) => ({
          id: crypto.randomUUID(),
          tagId: tag.tagId,
          postId: id
        }),
        []
      );
      console.log(tagsFormData);
      const postError = {
        title: !formRef.current[0].value.trim().length,
        content: !formRef.current[1].value.trim().length,
        country: JSON.parse(localStorage.getItem('country')) == '',
        tags: !tagsFormData.length
      };
      if (postError.title || postError.content || postError.country || postError.tags) {
        if (postError.title || postError.content) console.log('제목 문제');
        else if (postError.country) console.log('나라문제');
        else if (postError.tags) console.log('태그문제');
        alert('업로드에 문제가생겼어요 확인해주세요');
        return;
      }

      dispatch(addPost({ postFormData }));
      dispatch(manageTags({ tagsFormData }));

      console.log('postFormData: ', postFormData);

      const { data, error } = await supabase.from('POST').update(postFormData).eq('id', postId);
      if (error) console.error(error);
      else console.log(data);
      await supabase.from('TAGS').delete().eq('postId', postId);
      const { data: tagData, tagError } = await supabase.from('TAGS').insert(tagsFormData).eq('postId', postId);
      if (tagError) console.error(tagError);
      else console.log(tagData);

      alert('데이터가 정상적으로 추가되었습니다');
      navigate('/');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('에러 발생: ' + error.message);
    }
  };

  return (
    <Container direction={'column'}>
      <Slider postImage={fileImages} />
      <input
        ref={(el) => (formRef.current[0] = el)}
        type="text"
        placeholder="제목을 입력해주세요"
        defaultValue={postData.postTitle}
      />
      <Container direction={'row'}>
        <CountrySelect country={postData.country} />
        <Tags postTags={postTags} />
      </Container>
      <textarea
        ref={(el) => (formRef.current[1] = el)}
        type="text"
        placeholder="내용을 입력해주세요"
        defaultValue={postData.postContent}
      ></textarea>
      <Container direction={'row'}>
        <Button bgcolor={'var(--yellow-color)'} color={'var(--yellow-color)'} onClick={handleSubmit}>
          수정
        </Button>
      </Container>
    </Container>
  );
}

export default ModifyPost;
