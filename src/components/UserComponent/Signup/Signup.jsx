import { useState } from "react";
import Modal from "../../Modal";
import styled from "styled-components";

function Signup() {
  const [signUpId, setSignUpId] = useState("");
  const [signUpPw, setSignUpPw] = useState("");
  const [signUpPwConfirm, setSignUpPwConfirm] = useState("");
  const [user, setUser] = useState(null);

  const onChangesignUpId = (e) => {
    setSignUpId(e.target.value);
  };
  const onChangesignUpPw = (e) => {
    setSignUpPw(e.target.value);
  };
  const onChangesignUpPwConfirm = (e) => {
    setSignUpPwConfirm(e.target.value);
  };

  const signUpNewUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      signInId,
      signInPw,
    });
    console.log("signup: ", { data, error });
    setUser(data, user);
  };

  return (
    <Modal>
      <div className="logo-div">
        <img
          src="src\styles\images\logo-icon.png"
          alt="logo"
          className="logo"
        />
        <img
          src="src\styles\images\logo-text.png"
          alt="logo"
          className="logo"
        />
      </div>
      <p className="login-p">회원가입</p>
      <form className="login-form">
        <input
          className="login-input"
          type="email"
          placeholder="이메일"
          value={signUpId}
          onChange={onChangesignUpId}
        />
        <input
          className="login-input"
          type="password"
          placeholder="비밀번호"
          value={signUpPw}
          onChange={onChangesignUpPw}
        />
        <input
          className="login-input"
          type="password"
          placeholder="비밀번호 확인"
          value={signUpPwConfirm}
          onChange={onChangesignUpPwConfirm}
        />
        <button
          className="login-input-btn"
          type="submit"
          onClick={signUpNewUser}
        >
          회원가입
        </button>
      </form>
    </Modal>
  );
}
export default Signup;
