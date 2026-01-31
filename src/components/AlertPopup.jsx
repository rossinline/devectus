import React, { useEffect, useState } from 'react';

const AlertPopup = ({ message, duration, onClose }) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 w-1/6 px-4 py-2 bg-background text-text border-2 border-accent text-center rounded-default shadow-lg`}>
      {message}
    </div>
  );
};

export default AlertPopup;
