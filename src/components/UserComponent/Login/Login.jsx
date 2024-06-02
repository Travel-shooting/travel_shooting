import Modal from "../../Modal";
function Login() {
  const handleLogIn = () => {
    const formData = {};
  };
  return (
    <Modal>
      <div>로그인하세요</div>
      <form onSubmit={handleLogIn}>
        <input />
        <input />
        <button type="submit">로그인</button>
      </form>
    </Modal>
  );
}

export default Login;
