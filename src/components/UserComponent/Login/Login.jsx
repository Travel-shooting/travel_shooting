import { useState } from "react";
import supabase from "../../../util/supabase/supabaseClient";
import Modal from "../../Modal";
import { useNavigate } from "react-router-dom";
import Toast from "../../Toast";

function Login() {
  // 로그인 모달
  // const isOpenLoginModal = useSelector((state) => state.modal.isOpenLoginModal);
  // console.log(isOpenLoginModal);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePw = (e) => {
    setUserPw(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!userId.includes("@") || userPw.length < 6) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
    const response = await supabase.auth.signInWithPassword({
      email: userId,
      password: userPw,
    });
    console.log(response.data.user.id);
    const { data, error } = await supabase
      .from("USER")
      .select("*")
      .eq("userId", userId);
    console.log("login : ", { data, error });
    setUser(data.user);
  };

  if (!user) {
    return (
      <Modal>
        {showToast && (
          <Toast
            toast={{
              message: "아이디 또는 비밀번호를 확인해주세요.",
              seconds: 5000,
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
        <p className="login-p">로그인</p>
        <form className="login-form ">
          <input
            className="login-input"
            placeholder="이메일"
            type="email"
            value={userId}
            onChange={onChangeId}
          />
          <input
            className="login-input"
            placeholder="비밀번호"
            type="password"
            value={userPw}
            onChange={onChangePw}
          />
          <button className="login-input-btn" type="submit" onClick={loginUser}>
            로그인
          </button>
        </form>
        <div className="login-btn-div">
          <button className="login-btn">회원가입</button>
        </div>
      </Modal>
    );
  }
}

export default Login;
