import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import './QuizGenerator.css';

const QuizGenerator = () => {
    return (
        <div className="home">
            <div>
            <Header />
            </div>
            <div className='main'>
                <div className='main-header'>
                    <h1>Quiz Generator</h1>
                </div>
                <div className='line'></div>
                
                <div className='type-selection'>
                    <p>Choose your type of quiz</p>

                    <div className="button-grid">
                        <button className='outside-btn'>Multiple <br /> Choice</button>
                        <button className='inside-btn'>True / False</button>
                        <button className='inside-btn'>Short Answer</button>
                        <button className='outside-btn'>Fill in the <br /> Blank</button>
                    </div>

                </div>
                

            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default QuizGenerator;
