import React from 'react';
import './Legend.css';

export default function Legend({ children }) {
  return (
    <legend className="legend">
      { children }
    </legend>
  )
}

