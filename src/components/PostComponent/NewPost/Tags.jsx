import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { tags } from "../../../util/tags";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: px;
`;
const TagLabel = styled.label`
  display: inline-block;
  padding: 10px 16px;
  margin: 4px;
  background-color: var(--black-color);
  color: var(--white-color);
  font-weight: 300;
  border-radius: 50px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--yellow-color);
    color: var(--white-color);
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
    <Container className="select-box">
      {tags.map((tag, i) => (
        <div key={i}>
          <HiddenCheckbox
            id={`tag-${i}`}
            onChange={(e) => handleCheckBoxChange(e)}
            checked={selectedTags.includes(tag)}
            value={tag}
          />
          <div className="tags">
            <TagLabel className="tag" htmlFor={`tag-${i}`}>
              {tag}
            </TagLabel>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default Tags;
