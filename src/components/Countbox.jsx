import React from 'react';
import '../css/Countbox.css';

const Countbox = (props) => (
  <div className={'box ' + props.itemColor } onClick={props.onClick}>
    <p className='title'> {props.itemName} </p>
    <p className='count'> {props.itemCount} </p>
  </div>
)

export default Countbox;