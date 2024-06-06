import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { manageTags } from '../../redux/slices/postSlice';
import supabase from '../../util/supabase/supabaseClient';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TagLabel = styled.label`
  display: inline-block;
  background-color: var(--lightgrey-color);
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:checked + label {
    background-color: var(--golden-color);
    color: var(--white-color);
  }
`;

function Tags({ postTags }) {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const { data: tagData, error: tagError } = await supabase.from('POSTTAG').select('*');

      if (tagError) {
        console.error(tagError);
      } else {
        setTags(tagData);
        const newSelectedTags = postTags.filter((postTag) => tagData.some((tag) => tag.id === postTag.tagId));
        setSelectedTags(newSelectedTags);
        console.log('newTags', newSelectedTags);
        dispatch(manageTags(newSelectedTags));
      }
    }
    fetchTags();
  }, [dispatch, postTags]);

  const handleCheckBoxChange = (tagId, tagValue, e) => {
    if (e.target.checked) {
      const newSelectedTags = [...selectedTags, { tagId, tagValue }];
      setSelectedTags(newSelectedTags);
      dispatch(manageTags(newSelectedTags));
    } else {
      const newSelectedTags = selectedTags.filter((tag) => tag.tagId !== tagId);
      setSelectedTags(newSelectedTags);
      dispatch(manageTags(newSelectedTags));
    }
  };

  return (
    <Container>
      {tags.map((tag) => (
        <div key={tag.id}>
          <HiddenCheckbox
            id={`checkbox-${tag.id}`}
            onChange={(e) => handleCheckBoxChange(tag.id, tag.tagValue, e)}
            checked={selectedTags.some((selectedTag) => selectedTag.tagId === tag.id)}
            value={tag.tagValue}
          />
          <TagLabel htmlFor={`checkbox-${tag.id}`}>{tag.tagValue}</TagLabel>
        </div>
      ))}
    </Container>
  );
}

export default Tags;
