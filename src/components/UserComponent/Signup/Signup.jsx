import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { close } from '../../../redux/slices/modalSlice';
import supabase from '../../../util/supabase/supabaseClient';
import Modal from '../../Modal';
import Toast from '../../Toast';

function Signup() {
  const dispatch = useDispatch();
  const [signUpId, setSignUpId] = useState('');
  const [signUpPw, setSignUpPw] = useState('');
  const [signUpPwConfirm, setSignUpPwConfirm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({ message: '', seconds: 2000 });
  const [testSeconds, setTestSeconds] = useState(2000);

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
    setTestSeconds(testSeconds + 1);
    if (!signUpId.includes('@') || signUpPw.length < 6) {
      setToast({ message: '아이디 또는 비밀번호를 확인해주세요.', seconds: testSeconds });
      setShowToast(true);
      setShowToast(false);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: signUpId,
      password: signUpPw
    });
    if (error) {
      console.error('Sign up error:', error.message);
      setToast({ message: '회원가입에 실패했습니다. 다시 시도해주세요.', seconds: testSeconds });
      setShowToast(false);
      setShowToast(true);
      return;
    } else {
      console.log('Sign up successful:', data);
      setShowToast(false);
    }

    await supabase.from('USER').insert({
      uuid: data.user.id,
      userId: signUpId,
      userImageURL: 'https://skwkufggbhgnltheimss.supabase.co/storage/v1/object/public/avatars/default-profile.jpg'
    });
    dispatch(close());
  };
  console.log(showToast);

  return (
    <Modal>
      <Toast toast={{ toast }} />
      <div className="logo-div">
        <img src="src\styles\images\logo-icon.png" alt="logo" className="logo" />
        <img src="src\styles\images\logo-text.png" alt="logo" className="logo" />
      </div>
      <p className="login-p">회원가입</p>
      <form className="login-form">
        <input className="login-input" type="email" placeholder="이메일" value={signUpId} onChange={onChangesignUpId} />
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
        <button className="login-input-btn" type="submit" onClick={signUpNewUser}>
          회원가입
        </button>
      </form>
    </Modal>
  );
}
export default Signup;
