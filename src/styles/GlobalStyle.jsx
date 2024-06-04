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
input {
  
}

button {
  cursor: pointer;
}


.logo-div {
  margin: 60px auto 0px auto;
}

.logo{
  display: block; 
  margin: 0 auto 25px auto;
  text-align: center;
}

.st-form {
  margin: auto;
  text-align: center;
}

.st-input{
  width: 350px;
  height: 50px;
  border: 0;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 15px;
}

.st-input-p{
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 30px 0px 40px 0px;
}

.st-input-btn{
  width: 350px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  display: block;
  margin: 20px auto;
  background-color: #bbb800;
  color: white;
  border: 0;
  border-radius: 8px;
}

`;
export default GlobalStyle;
