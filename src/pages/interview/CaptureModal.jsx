import React from 'react';
import { TbCameraCheck, TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import './InterviewSelfCheck.css';

const CaptureModal = ({ capturedImage, onClose, onConfirm }) => {
  return (
    <div className='picModal'>      
        <div className="modal-content">
            <h1><TbCameraCheck /></h1>
            <h2>잘 찍혔는지 확인해주세요!</h2>
            
            <div className='modal-btn-container'>
                <div className='third'></div>
                <div className='third flex'>
                <div className='third'>
                  <button className='modal-btn' onClick={onClose}>
                    <span><TbArrowNarrowLeft /> &nbsp; 다시 촬영</span>
                  </button>
            </div>
            <div className='third'></div>
            <div className='third'>
                <button className='modal-btn' onClick={onConfirm}>
                    <span>면접 보러 가기 &nbsp;<TbArrowNarrowRight /></span>
                </button>
            </div>
          </div>
          <div className='third'></div>
        </div>
        <div className='modal-pic'>
          <img src={capturedImage} alt="Captured" />
        </div>
      </div>
    </div>
  );
};

export default CaptureModal;