import React from 'react';

const TopArrow = () => {

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For remaining browsers
  }

  return (
    <div className="top-arrow" id="topArrow" onClick={()=>scrollToTop()}>
      <svg className="bi bi-arrow-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clipRule="evenodd"></path>
        <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clipRule="evenodd"></path>
      </svg>
    </div>
  );
}

export default TopArrow;