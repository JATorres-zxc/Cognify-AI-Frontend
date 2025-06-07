import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className='comingSoon'>
      <div>
        <Header />
      </div>

      <div className='main'>
        <div className='comingSoon-content'>
          <h1>Coming Soon</h1>
          <p>We're working hard to bring you something amazing. Stay tuned!</p>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ComingSoon;