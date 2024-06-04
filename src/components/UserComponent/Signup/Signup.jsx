import Modal from "../../Modal";
import styled from "styled-components";

function Signup() {
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
      <p className="st-input-p">회원가입</p>
      <form className="st-form">
        <input className="st-input" placeholder="아이디" />
        <input className="st-input" placeholder="비밀번호" />
        <input className="st-input" placeholder="비밀번호 확인" />
        <button className="st-input-btn" type="submit">
          회원가입
        </button>
      </form>
    </Modal>
  );
}
export default Signup;
