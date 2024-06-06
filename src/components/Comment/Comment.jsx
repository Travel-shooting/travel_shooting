import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`;

const Font = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;
function Comment({ commentData, logInEmail }) {
  return (
    <>
      <div>
        <FlexContainer direction={'row'}>
          <Font>{logInEmail.slice(0, logInEmail.indexOf('@'))}</Font>
          <span>{commentData.commentDate}</span>
        </FlexContainer>

        <p>{commentData.commentContent}</p>
      </div>
    </>
  );
}

export default Comment;
