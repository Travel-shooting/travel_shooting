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

function Tags() {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function tagData() {
      const { data: tagData, error: tagError } = await supabase.from('POSTTAG').select('*');

      if (tagError) console.error(tagError);
      else {
        setTags(tagData);
      }
    }
    tagData();
  }, []);

  const handleCheckBoxChange = (tagId, e) => {
    if (e.target.checked) {
      const newSelectedTags = [...selectedTags, { id: tagId, tagValue: e.target.value }];
      setSelectedTags(newSelectedTags);
      dispatch(manageTags(newSelectedTags));
    } else {
      const newSelectedTags = selectedTags.filter((t) => t.id !== tagId);
      setSelectedTags(newSelectedTags);
      dispatch(manageTags(newSelectedTags));
    }
  };

  return (
    <Container>
      {tags.map((tag, i) => (
        <div key={i}>
          <HiddenCheckbox
            id={`checkbox-${tag.id}`}
            onChange={(e) => handleCheckBoxChange(tag.id, e)}
            checked={selectedTags.some((t) => t.id === tag.id)}
            value={tag.tagValue}
          />
          <TagLabel htmlFor={`checkbox-${tag.id}`}>{tag.tagValue}</TagLabel>
        </div>
      ))}
    </Container>
  );
}

export default Tags;
