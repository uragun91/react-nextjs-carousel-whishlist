import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Nav() {
  const count = useSelector((state) => state.wishlist.length);

  return (
    <>
      <div className="header">
        <div className="header__left">
          <Link href="/" className="logo">
            Mytheresa
          </Link>
        </div>
        <div className="header__right">
          <Link href="/">Home</Link>
          <div className="header__wishlist-link">
            <Link href="/wishlist">Wishlist</Link>
            {Boolean(count) && <span className="header__badge">{count}</span>}
          </div>
        </div>
      </div>
    </>
  );
}
