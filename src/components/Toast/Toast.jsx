import { useEffect, useState } from "react";
import styled from "styled-components";

const BackDrop = styled.div`
  width: 500px;
  height: 70px;
  position: fixed;
  top: 0%;
  margin: auto;
  color: #990000;
  background-color: #ffcece;
  border: 1px solid #990000;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 25px;
  transform: ${(props) =>
    props.isDisplayed ? "translateY(0px)" : "translateY(calc(-100%))"};
  transition: all 1s;
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
