import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { tags } from "../../../util/tags";
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

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;

  &:checked + ${TagLabel} {
    background-color: var(--golden-color);
    color: var(--white-color);
  }
`;
function Tags() {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("tags")) || [];
    setSelectedTags(storedTags);
  }, []);

  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      const newSelectedTags = [...selectedTags, e.target.value];
      setSelectedTags(newSelectedTags);
      //dispatch(manageTags(newSelectedTags));
      localStorage.setItem("tags", JSON.stringify(newSelectedTags));
    } else {
      const newSelectedTags = selectedTags.filter((t) => t !== e.target.value);
      setSelectedTags(newSelectedTags);
      //dispatch(manageTags(newSelectedTags));
      localStorage.setItem("tags", JSON.stringify(newSelectedTags));
    }
  };

  return (
    <Container>
      {tags.map((tag, i) => (
        <div key={i}>
          <HiddenCheckbox
            id={`tag-${i}`}
            onChange={(e) => handleCheckBoxChange(e)}
            checked={selectedTags.includes(tag)}
            value={tag}
          />
          <TagLabel htmlFor={`tag-${i}`}>{tag}</TagLabel>
        </div>
      ))}
    </Container>
  );
}

export default Tags;
