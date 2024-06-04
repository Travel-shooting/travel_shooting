import { createGlobalStyle } from "styled-components";

/**
 * 전역스타일링인데 막 html 태그 기본 스타일 설정을 여기서 해줘용
 */
const GlobalStyle = createGlobalStyle`
body{
 
}
div {
  box-sizing: border-box;
}
textarea{
  height: 200px;
  resize:none;
}
input[type=text],textarea {
  width:100%;
 
  border: none;
  border-radius: 8px;
    padding: 10px;
    background-color: var(--lightgrey-color);
}

button {
  cursor: pointer;
}

`;
export default GlobalStyle;
