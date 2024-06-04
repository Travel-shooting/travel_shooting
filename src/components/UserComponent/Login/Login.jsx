import supabase from "../../../util/supabase/supabaseClient";
import Modal from "../../Modal";
function Login() {
  // const handleLogIn = () => {
  //   const formData = {
  //     id: crypto.randomUUID(),
  //   };
  // };
  // const users = [{ id: 0, userId: "ididid", userPw: "blabla" }];

  // const [signIn, setSignIn] = useState(false);

  // async function signOut() {
  //   await supabase.auth.signOut();
  //   checkSignIn();
  // }
  // async function checkSignIn() {
  //   const session = await supabase.auth.getSession();
  //   const isSignIn = !!session.data.session;
  //   setSignIn(isSignIn);
  // }

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
        <input className="login-input" placeholder="아이디" />
        <input className="login-input" placeholder="비밀번호" />
        <button className="login-input-btn" type="submit">
          로그인
        </button>
      </form>
      <div className="login-btn-div">
        <button className="login-btn">아이디 찾기</button>
        <button className="login-btn">비밀번호 찾기</button>
        <button className="login-btn">회원가입</button>
      </div>
    </Modal>
  );
}

export default Login;
