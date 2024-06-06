import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/slices/logSlice';
import { close } from '../../../redux/slices/modalSlice';
import supabase from '../../../util/supabase/supabaseClient';
import Modal from '../../Modal';
import { useNavigate } from 'react-router-dom';
import Toast from '../../Toast';

function Login() {
  // const isOpenLoginModal = useSelector((state) => state.modal.isOpenLoginModal);
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({ message: '', seconds: 2000 });
  const dispatch = useDispatch();

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePw = (e) => {
    setUserPw(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!userId.includes('@') || userPw.length < 6) {
      setToast({ message: '아이디 또는 비밀번호를 확인해주세요.', seconds: 2000 });
      setShowToast(false);
      setShowToast(true);
      return; // 유효성 검사가 실패하면 함수를 종료합니다.
    }
    if (error) {
      console.error('login error:', error.message);
      setToast({ message: '로그인에 실패했습니다. 다시 시도해주세요.', seconds: 2000 });
      setShowToast(false);
      setShowToast(true);
      return;
    } else {
      console.log('login successful:', data);
      setShowToast(false);
    }
    const response = await supabase.auth.signInWithPassword({
      email: userId,
      password: userPw
    });

    const { data, error } = await supabase.from('USER').select('*').eq('userId', userId);

    dispatch(logIn(response.data.user.id));
    sessionStorage.setItem('logInUser', JSON.stringify(response.data.user.id));
    dispatch(close());
    setUser(data.user);
  };

  if (!user) {
    return (
      <Modal>
        {showToast && <Toast toast={toast} />}
        <div className="logo-div">
          <img src="src\styles\images\logo-icon.png" alt="logo" className="logo" />
          <img src="src\styles\images\logo-text.png" alt="logo" className="logo" />
        </div>
        <p className="login-p">로그인</p>
        <form className="login-form ">
          <input className="login-input" placeholder="이메일" type="email" value={userId} onChange={onChangeId} />
          <input className="login-input" placeholder="비밀번호" type="password" value={userPw} onChange={onChangePw} />
          <button className="login-input-btn" type="submit" onClick={loginUser}>
            로그인
          </button>
        </form>
        <div className="login-btn-div">
          <button
            className="login-btn"
            // onClick={dispatch({
            //   type: 'true'
            // })}
          >
            회원가입
          </button>
        </div>
      </Modal>
    );
  }
}

export default Login;
