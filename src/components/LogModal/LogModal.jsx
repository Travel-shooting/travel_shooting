import styled from 'styled-components';
import BackDrop from '../BackDrop';

const WhiteWrap = styled.div`
  background-color: var(--lightgrey-color);
  width: 600px;
  height: 600px;
`;
function LogModal({ children }) {
  return (
    <>
      <BackDrop>
        <WhiteWrap onClick={(e) => e.stopPropagation()}>{children}</WhiteWrap>
      </BackDrop>
    </>
  );
}

export default LogModal;
