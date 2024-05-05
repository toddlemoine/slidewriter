import React from 'react';
import Copyright from './Copyright.jsx';
import './SiteFooter.css';

export default function SiteFooter({ children }) {
  return (
    <footer className="site-footer">
      <p><Copyright /> •
        <a href="https://twitter.com/slidewriterio">@slidewriterio</a>
        • contact [at] slidewriter.io • About • Terms • Privacy</p>
    </footer>
  );
}
