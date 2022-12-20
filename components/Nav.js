import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <>
      <div className="header">
        <Link href="/" className="logo">
          Mytheresa
        </Link>
        <div className="header-right">
          <Link href="/">Home</Link>
          <Link href="/wishlist">Wishlist</Link>
        </div>
      </div>
    </>
  );
}
