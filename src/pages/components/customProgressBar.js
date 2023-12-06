// CustomProgressBar.js
import React, { useState, useEffect } from 'react';

const CustomProgressBar = ({ width, animate }) => {
   const [progress, setProgress] = useState(0);
   const getColor = () => {
      if (progress > 95) {
         return 'bg-danger';
      } else if (progress >= 90 && progress <= 95) {
         return 'bg-warning';
      } else {
         return 'bg-success'; // default color for the progress bar
      }
   };

   useEffect(() => {
      if (animate) {
         const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= width ? width : prevProgress + 1));
         }, 50);

         return () => clearInterval(interval);
      } else {
         setProgress(width);
      }
   }, [width, animate]);

   return (
      <div className="progress">
         <div
            className={`progress-bar ${getColor()}`}
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
         ></div>
      </div>
   );
};

export default CustomProgressBar;
