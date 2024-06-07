import styled from 'styled-components';
import BackDrop from '../BackDrop';

const WhiteWrap = styled.div`
  background-color: var(--white-color);
  width: 520px;
  height: 600px;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
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
