import { useEffect, useState } from "react";
import styled from "styled-components";
const BackDrop = styled.div`
  border: 1px solid var(--grey-color);
  background-color: var(--white-color);
  border-radius: 8px;
  padding: 10px;
  transform: ${(props) =>
    props.isDisplayed ? "translateX(0)" : "translateX(calc(100% + 20px))"};
  transition-duration: 500;
`;

function Toast({ toast }) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    setIsDisplayed(true);
    setTimeout(() => setIsDisplayed(false), 2000);
  }, [toast.seconds]);
  return (
    <BackDrop isDisplayed={isDisplayed}>
      <h1>{toast.message}</h1>
    </BackDrop>
  );
}
export default Toast;
