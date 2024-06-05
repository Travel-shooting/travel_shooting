import { useEffect, useState } from "react";
import styled from "styled-components";

const BackDrop = styled.div`
  width: 500px;
  height: 50px;
  color: #990000;
  background-color: #ffcece;
  border: 1px solid #990000;
  text-align: center;
  margin: auto;
  border-radius: 8px;
  padding: 15px;
  transform: ${(props) =>
    props.isDisplayed ? "translateY(-73px)" : "translateY(calc(100% - 200px))"};
  transition-duration: 3000;
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
