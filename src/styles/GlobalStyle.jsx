import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

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
  line-height: 1.4;
  letter-spacing: -0.01em;
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
  padding: 12px;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  height: 40px;
}

.post-box {
  weight: 100%;
  border: 1px dashed var(--yellow-color);
  margin: 40px 0 60px;
  border-radius: 6px;
}

.post-btn, .save-btn {
  margin: 40px auto;
  border-radius: 6px;
  cursor: pointer;
  width: 280px;
  height: 48px;
  font-weight: 600;
  color: var(--black-color);
  display: block;
  margin-top: 14px;
  background-color: var(--yellow-color);
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
}

.post-btn a, .post-btn a:visited {
  color: black;
  text-decoration: none;
}

.photo-upload {
  display: block;
  width: 80%;
  border: 2px solid var(--yellow-color);
  margin-bottom: 40px;
  border-radius: 6px;
  padding: 40px 12px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
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
  width: 500px;
  display: flex;
  justify-content: center;
  margin: 20px auto 40px;
  position: relative;
}

.search-input, .title-input, .content-box {
  display: block;
  width: 100%;
  min-width: 320px;
  height: 48px;
  background-color: var(--white-color);
  border-radius: 6px;
  border: solid 1px #e6e6ea;
  box-sizing: border-box;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
  text-align: left;
  line-height: 1.4;
  letter-spacing: -0.01em;

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
    color: var(--black-color);
    text-align: left;
    font-size: 14px;
  }

  .content-box {
    height: 360px;

    &::placeholder {
    color: var(--black-color);
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
  display: flex;
  flex-wrap: wrap;
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
  line-height: 1.4;
  letter-spacing: -0.01em;
  transition: background-color 0.3s;

  &:hover {
  background-color: var(--yellow-color);
  color: var(--white-color);
}
}

.post-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin: 60px 0;
}

.post {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 320px;
  border-radius: 16px;
  border: solid 1px #e6e6ea;
  box-sizing: border-box;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
  margin-bottom: 20px;
  background-size: cover;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
}

.post-img {
  width: 100%;
  height: 300px;
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
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
  margin-bottom: 20px;
}

.post-date, .user-id {
  font-size: 14px;
  margin: 12px 0;
  color: var(--darkgrey-color);
}

.logo-div {
  margin: 20px auto 20px auto;
  width: 180px;
  height: auto;
  text-align: center;
  img{
    max-width: 100%;
  }
}

.logo-div.logo-icon {
  display: block;
  margin: 0 auto 40px auto;
  text-align: center;
  width: 24px;
  height: 24px;
}

.logo-div.logo-text {
  display: block;
  margin: 0 auto 24px auto;
  text-align: center;
  width: 200px;
  img{
    max-width: 200px;
  }
}

.login-form {
  margin: auto;
  text-align: center;
}

.login-input {
  width: 350px;
  height: 48px;
  border-radius: 6px;
  margin-bottom: 8px;
  padding-left: 15px;
  border: solid 1px #e6e6ea;
  box-sizing: border-box;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);

  &:focus {
    border: 1px solid var(--yellow-color);
    outline: none;}

  &::placeholder {
    color: #bbbbbb;
    text-align: left;
    font-size: 14px;
    }
}

.login-p {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 40px 0px 20px 0px;
}

.login-input-btn {
  width: 350px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  display: block;
  margin: 25px auto 0px auto;
  background-color: var(--yellow-color);
  color: var(--black-color);
  border: 0;
  border-radius: 6px;
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
  gap: 4px;
}

.swiper-img {
  width: 100%;
}

`;

export default GlobalStyle;
