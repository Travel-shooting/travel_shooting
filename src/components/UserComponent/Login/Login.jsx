import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/slices/logSlice';
import { close } from '../../../redux/slices/modalSlice';
import LogoIcon from '../../../styles/images/logo-icon.png';
import LogoText from '../../../styles/images/logo-text.png';
import supabase from '../../../util/supabase/supabaseClient';
import Modal from '../../LogModal';

function Login() {
  const dispatch = useDispatch();
  const loginUser = async (e) => {
    e.preventDefault();

    const response = await supabase.auth.signInWithPassword({
      email: userId,
      password: userPw
    });
    const { data } = await supabase.from('USER').select('*').eq('userId', userId);
    dispatch(logIn(response.data.user.id));
    sessionStorage.setItem('logInUser', JSON.stringify(response.data.user.id));
    sessionStorage.setItem('logIn', JSON.stringify(data[0]));
    dispatch(close());
    setUser(data.user);
  };

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [user, setUser] = useState(null);

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePw = (e) => {
    setUserPw(e.target.value);
  };

  if (!user) {
    return (
      <Modal>
        <div style={{ marginTop: '80px' }}>
          <div className="logo-div">
            <img src={LogoIcon} alt="logo" className="logo-icon" />
          </div>
          <div className="logo-div">
            <img src={LogoText} alt="logo" className="logo-text" />
          </div>
        </div>
        <div>
          <p className="login-p">로그인</p>
          <form className="login-form ">
            <input className="login-input" placeholder="이메일" type="email" value={userId} onChange={onChangeId} />
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
        </div>
      </Modal>
    );
  }
}

export default Login;
