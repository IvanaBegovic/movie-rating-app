import React from 'react';
import './header.scss';
import {SearchBarComponent} from "../index";

function Header({fetchData = {} as any}) {

  return (
    <div className={'header'}>
      <h1>Movie rating app
        <span className='header__credits'>
           - made by Ivana Begovic
        </span>
      </h1>
      <SearchBarComponent fetchData={fetchData}/>
    </div>
  );
}

export default Header;

