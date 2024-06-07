import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CountrySelect from '../components/CountrySelect';
import Slider from '../components/PostComponent/Slider';
import { addPost, loadPost, manageTags } from '../redux/slices/postSlice';
import { getPresentTime } from '../util/date';
import supabase from '../util/supabase/supabaseClient';
import Tags from './ModifyPost/Tags';

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 10px;
`;

const Button = styled.button`
  width: 280px;
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    background-color: var(--yellow-color);
  }
`;

function ModifyPostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const selectedTags = useSelector((state) => state.post.tags);
  const [fileImages, setFileImages] = useState([]);

  const formRef = useRef([]);
  const [postData, setPostData] = useState([]);

  const country = useSelector((state) => state.post.country) || postData.country;

  const [postTags, setPostTags] = useState([]);
  useEffect(() => {
    formRef.current[0].focus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: postData, error: postError } = await supabase.from('POST').select('*').eq('id', postId);
      const { data: tagData, error: tagError } = await supabase.from('TAGS').select('*').eq('postId', postId);

      if (postError || tagError) console.error(postError || tagError);
      else {
        setPostData(postData[0]);
        const urls = JSON.parse(postData[0].imageURL).map((image) => image.url, []);
        setFileImages(urls);

        setPostTags(tagData);
        dispatch(loadPost(postData[0]));
      }
    };

    fetchData();
  }, [dispatch, postId]);

  const handleSubmit = async () => {
    try {
      const postFormData = {
        postTitle: formRef.current[0].value,
        postContent: formRef.current[1].value,
        postDate: getPresentTime(),
        country: country
      };
      const tagsFormData = selectedTags.map(
        (tag) => ({
          id: crypto.randomUUID(),
          tagId: tag.tagId,
          postId: postId
        }),
        []
      );
      const postError = {
        title: !formRef.current[0].value.trim().length,
        content: !formRef.current[1].value.trim().length,
        country: postFormData.country == '',
        tags: !tagsFormData.length
      };
      if (postError.title || postError.content || postError.country || postError.tags) {
        if (postError.title || postError.content) alert('제목과 내용을 확인해주세요');
        else if (postError.country) alert('나라를 선택해주세요');
        else if (postError.tags) alert('태그를 선택해주세요');
        alert('업로드에 문제가생겼어요 확인해주세요');
        return;
      }
      await supabase.from('POST').update(postFormData).eq('id', postId);
      const { error: deleteError } = await supabase.from('TAGS').delete().eq('postId', postId);
      const { error: insertError } = await supabase.from('TAGS').insert(tagsFormData);
      if (deleteError) console.error(deleteError);
      if (insertError) console.error(insertError);
      dispatch(addPost({ postFormData }));
      dispatch(manageTags({ tagsFormData }));

      alert('데이터가 정상적으로 추가되었습니다');
      navigate('/');
    } catch (error) {
      console.error('에러 발생: ' + error.message);
    }
  };

  return (
    <Container direction={'column'}>
      <Slider postImage={fileImages} />
      <input
        className="title-input"
        ref={(el) => (formRef.current[0] = el)}
        type="text"
        placeholder="제목을 입력해주세요"
        defaultValue={postData.postTitle}
      />
      <Container direction={'row'}>
        <CountrySelect country={postData.country} />
      </Container>
      <Tags style={{ display: 'flex' }} postTags={postTags} />

      <textarea
        className="content-box"
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

export default ModifyPostPage;
