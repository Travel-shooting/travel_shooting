import styled from 'styled-components';
import BackDrop from '../BackDrop';

const WhiteWrap = styled.div`
  background-color: var(--white-color);
  width: 400px;
  height: 200px;
`;
function ConfirmModal({ children }) {
  return (
    <BackDrop>
      <WhiteWrap onClick={(e) => e.stopPropagation()}>
        {children}
        <button>확인</button>
        <button>취소</button>
      </WhiteWrap>
    </BackDrop>
  );
}

export default ConfirmModal;
