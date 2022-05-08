import './Loading.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('sacola', '[]');
    localStorage.setItem('selecionados', '{}');

    setTimeout(() => {
      navigate("/");
    }, 3000);
  });
  return (
    <div className="Loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
