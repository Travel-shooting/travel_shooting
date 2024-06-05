import { useState } from "react";
import supabase from "../../../util/supabase/supabaseClient";
import Modal from "../../Modal";

function Login() {
  const loginUser = async (e) => {
    e.preventDefault();

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
  // const handleLogIn = () => {
  //   const formData = {
  //     id: crypto.randomUUID(),
  //   };
  // };
  // const users = [{ id: 0, userId: "ididid", userPw: "blabla" }];

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [user, setUser] = useState(null);

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePw = (e) => {
    setUserPw(e.target.value);
  };
  const onClickLogin = (e) => {};

  if (!user) {
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
          <button className="login-btn">아이디 찾기</button>
          <button className="login-btn">비밀번호 찾기</button>
          <button
            className="login-btn"
            href="src\components\UserComponent\Signup\Signup.jsx"
          >
            회원가입
          </button>
        </div>
      </Modal>
    );
  }
}

export default Login;
