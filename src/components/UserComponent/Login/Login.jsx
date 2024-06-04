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
      <p className="st-input-p">로그인</p>
      <form className="st-form">
        <input className="st-input" placeholder="아이디" />
        <input className="st-input" placeholder="비밀번호" />
        <button className="st-input-btn" type="submit">
          로그인
        </button>
      </form>
    </Modal>
  );
}

export default Login;
