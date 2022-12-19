import React, { useState } from "react";
import Link from 'next/link';
import { Context } from '../store/AppContext';

export default function Nav() {
  const [modal, setModal] = useState(false)
  const { globalDispatch, globalState } = Context();
  const wishList = globalState.wishList;

  const changeModalState = () => {
    setModal(!modal)
  }

  return (
    <>
      <div className="header">
        <Link href="/" className="logo">Mytheresa</Link>
        <div className="header-right">
          <Link href="/">Home</Link>

          <Link href="/">
            Wishlist
          </Link>
        </div>
      </div>
      {modal && <div className="modal" id="modal">
        <div className="modal-content">
          <span className="close" onClick={changeModalState}>&times;</span>
          <h2>wishList</h2>
          {
            wishList && wishList.map((item, index) => {
              return <div key={item + index} style={{ textDecoration: 'underline', marginBottom: '8px' }}>{item}</div>
            })
          }
        </div>
      </div>
      }
    </>
  );
}
