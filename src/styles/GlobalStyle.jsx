import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

/**
 * 전역스타일링인데 막 html 태그 기본 스타일 설정을 여기서 해줘용
 */
const GlobalStyle = createGlobalStyle`
${reset}

:root {
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
}

body{
  font-family: 'Pretendard', sans-serif;
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
  border-radius: 6px;
  padding: 10px;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  border-radius: 6px;
  cursor: pointer;
}

.post-box {
  weight: 100%;
  border: 1px dashed var(--yellow-color);
  margin-bottom: 60px;
  border-radius: 6px;
}

.post-btn {
  margin: 40px auto;
  border-radius: 6px;
  cursor: pointer;
  width: 240px;
  color: var(--black-color);
  display: block;
  margin-top: 14px;
  padding: 14px 0;
  background-color: var(--yellow-color);
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
}

.h2 {
  font-size: 32px;
  line-height: 1.3;
  font-weight: bold;
  color: var(--black-color);
  text-align: center;
  margin: 40px auto 20px;
}

.search-box {
  width: 320px;
  display: flex;
  justify-content: center;
  margin: 20px auto 40px;
  position: relative;
}

.search-input, .title-input, .content-box {
  display: block;
  width: 100%;
  height: 100%;
  padding: 14px 18px 16px 18px;
  background-color: var(--white-color);
  border-radius: 6px;
  border: solid 1px #e6e6ea;
  box-sizing: border-box;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
  text-align: left;

  &:focus {
    border: 1px solid var(--yellow-color);
    outline: none;
  }}

  .search-input::placeholder {
    color: #bbbbbb;
    text-align: center;
    font-size: 14px;
  }

  .title-input::placeholder {
    color: #bbbbbb;
    text-align: left;
    font-size: 14px;
  }

  .content-box {
    height: 360px;

    &::placeholder {
      color: #bbbbbb;
    text-align: left;
    font-size: 14px;
    }
  }

.search-icon {
  position: absolute;
  transform: translateY(-50%);
  right: 10px;
  top: 50%;
}

.tags {
  display: flex; /* 기존의 inline-block 대신 flex를 사용 */
  flex-wrap: wrap; /* 태그들이 넘칠 때 다음 줄로 넘어가도록 설정 */
  justify-content: center;
  gap: 4px;
}

.tag {
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
}

.tag:hover {
  background-color: var(--yellow-color);
  color: var(--white-color);
}

.post {
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 400px;
  border-radius: 6px;
  border: solid 1px #e6e6ea;
  box-sizing: border-box;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
  margin: 40px 0 20px 0;
  background-size: cover;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 300px;
  background-color: red;
  position: relative;
}

.post-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.post-title {
  font-weight: 500;
  font-size: 32px;
  text-decoration: none;

}

.post-date {
  font-size: 14px;
}

.logo-div {
  margin: 60px auto 0px auto;
}

.logo {
  display: block; 
  margin: 0 auto 25px auto;
  text-align: center;
}

.login-form {
  margin: auto;
  text-align: center;
}

.login-input {
  width: 350px;
  height: 50px;
  border: 0;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 15px;
}

.login-p {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 30px 0px 40px 0px;
}

.login-input-btn {
  width: 350px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  display: block;
  margin: 15px auto 30px auto;
  background-color: #bbb800;
  color: white;
  border: 0;
  border-radius: 8px;
}

.login-btn-div {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.login-btn {
  width: 110px;
  font-size: 15px;
  border: 0;
  background-color: transparent;
  color: grey;
}

.select-box {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  gap: 4px;
}
`;

export default GlobalStyle;
