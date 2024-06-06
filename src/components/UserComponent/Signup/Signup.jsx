import { useState } from "react";
import Modal from "../../Modal";
import styled from "styled-components";
import supabase from "../../../util/supabase/supabaseClient";
import Toast from "../../Toast";

function Signup() {
  const [signUpId, setSignUpId] = useState("");
  const [signUpPw, setSignUpPw] = useState("");
  const [signUpPwConfirm, setSignUpPwConfirm] = useState("");
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);

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
    if (!signUpId.includes("@") || signUpPw.length < 6) {
      setShowToast(true);
      return; // 유효성 검사가 실패하면 함수를 종료합니다.
    }
    const { data, error } = await supabase.auth.signUp({
      email: signUpId,
      password: signUpPw,
    });
    if (error) {
      console.error("Sign up error:", error.message);
      setShowToast(true);
      return; // 오류가 발생하면 함수를 종료합니다.
    } else {
      console.log("Sign up successful:", data);
      setShowToast(false);
    }

    try {
      await supabase.from("USER").insert({
        uuid: data.user.id,
        userId: signUpId,
        userImageURL:
          "https://skwkufggbhgnltheimss.supabase.co/storage/v1/object/public/avatars/default-profile.jpg",
      });
    } catch (insertError) {
      console.error("Error inserting user data:", insertError.message);
      // 필요한 경우 추가적인 오류 처리를 할 수 있습니다.
    }
  };

  return (
    <Modal>
      {showToast && (
        <Toast
          toast={{
            message: "아이디 또는 비밀번호를 확인해주세요.",
            seconds: 10000,
          }}
        />
      )}
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
