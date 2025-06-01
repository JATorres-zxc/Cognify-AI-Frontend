import React from 'react';
import styles from './GraduationCap.module.css';
import graduationCapSvg from '../../../assets/images/graduation-cap.svg';

const GraduationCap = ({ size = 64, className = "" }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img 
        src={graduationCapSvg} 
        alt="Graduation Cap" 
        className={styles.icon} 
        width={size} 
        height={size} 
      />
    </div>
  );
};

export default GraduationCap;