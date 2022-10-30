import './Home.css';
import './leafimg.css';

import React, { Component } from 'react';

import images from './leafIMGs';

var rotatingCursor = (function() {

  /* Local Variables */
  const INTERVAL_POSITION = 5;
  const INTERVAL_ROTATION = 100;
  let lastCursorPos = {x: -999, y: -999};
  let currentCursorPos = {x: -999, y: -999};
  let lastCursorAngle = 0, cursorAngle = 0;
  let cursorEl, cursorImageEl;


  /* Local Functions */

  // NOTE: I am transform two different elements here because so I can only animate the rotation with 'transition-property: transform'.
  function setCurrentCursorProps() {
    // Apply translation (set to actual cursor position)
    cursorEl.style.transform = `translate(${currentCursorPos.x}px, ${currentCursorPos.y}px)`;

    // Ensure correct rotation transition direction
    while (Math.abs(lastCursorAngle - cursorAngle) > 180) {
      if (cursorAngle > lastCursorAngle) {
        cursorAngle -= 360;
      } else if (cursorAngle < lastCursorAngle) {
        cursorAngle += 360;
      }
    }
    // Apply rotation
    cursorImageEl.style.transform = `rotate(${cursorAngle - 90}deg)`;
  }

  function updateCursor() {
    window.addEventListener('mousemove', event => {
      currentCursorPos = {x: event.clientX, y: event.clientY};
    });

    // Interval for updating cursor-position
    setInterval(setCurrentCursorProps, INTERVAL_POSITION);

    // Interval for updating cursor-rotation
    setInterval(() => {
      const delt = {
        x: lastCursorPos.x - currentCursorPos.x,
        y: lastCursorPos.y - currentCursorPos.y
      }
      if (Math.abs(delt.x) < 3 && Math.abs(delt.y) < 3) return;
      cursorAngle = (Math.atan2(delt.y, delt.x) * 180 / Math.PI);

      setCurrentCursorProps();

      lastCursorPos = currentCursorPos;
      lastCursorAngle = cursorAngle;
    }, INTERVAL_ROTATION);
  }

  /* Public Functions */

  return {

    'initialize' : () => {
      cursorEl = document.querySelector('#cursor');
      cursorImageEl = document.querySelector('#cursor > img');
      updateCursor();
    }

  };

})();


window.onload = function() {

for(var i = 0; i < 13; i++){
dragElement(document.getElementsByClassName("leafimg " + i)[0]);

}

}
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (elmnt != null) {
    /* if present, the header is where you move the DIV from:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

class Home extends Component{

  constructor(props)
  {
    super(props);

    // save the users in the state
    this.state = {
      leafblower: 0,
      highlightLeaf:0,
      top: 0
    };

    this.handleClickLeafBlower = this.handleClickLeafBlower.bind(this);
    this.handleMoseOverLeaf = this.handleMoseOverLeaf.bind(this);
    this.handleMoseOutLeaf = this.handleMoseOutLeaf.bind(this);


  }

  handleClickLeafBlower(){
    if(this.state.leafblower == 0){
      this.setState({leafblower: 1});
    } else {
      this.setState({leafblower: 0});
    }
  }

  handleMoseOverLeaf(x){

    var x1=document.getElementsByClassName("leafimg " +(x))[0].offsetTop;
  x1= x1 -2;
  document.getElementsByClassName("leafimg " +(x))[0].style.top= x1 + "px";


  }


  handleMoseOutLeaf(x){

/*


      var x1=document.getElementsByClassName("leafimg " +(x))[0].offsetTop;
    x1= x1 -40;
    document.getElementsByClassName("leafimg " +(x))[0].style.top= x1 + "px";

      */


  }

render() {

  var leafblowerState = '';
  var turbulanceState = '';
  if(this.state.leafblower == 0){
    turbulanceState = 'turbulance-img-hidden';
  } else {
    turbulanceState = 'turbulance-img-display';
    leafblowerState = 'turbulance-cursor-active';
  }

var leafOnHoverState = '';
  if(this.state.highlightLeaf == 1){
    leafOnHoverState = 'leafOnHover';

  } else {



  }


  var leafblowerimg = (<div className="leaf-blower-img">
    <img src='./leafblower.png' width="450" height="450"
      onClick = {this.handleClickLeafBlower.bind(this)}/>
  </div>);

  var turbulance = (<div id="cursor"><img src='./turbulance.png'
  className={"turbulance-cursor " + turbulanceState} alt="logo"/></div>);

  var fallingLeafIMGs = [];

  for(var i = 0; i < 13; i++){
    var leafpostion = ' imgLeft' + (i*20 % 160);

    fallingLeafIMGs[i] = (

<div>
      <div className={"leafimg " + i + leafpostion}>
    <div className = 'draggableleaf'>
    <span className={"leafimgPlatform"}><div className = {"fallingplatform " + leafpostion + ' leafPlatform'} id = {"leafPlatform"  + (i + 1)}></div></span>
    <img src={images["leaf" + (i + 1)]} alt
    className = {"fallingleaf"} id={"leaf" + (i + 1)} onMouseOver = {this.handleMoseOverLeaf.bind(this, i)}
    onMouseOut = {this.handleMoseOutLeaf.bind(this, i)}/>
    </div>
    </div>

</div>
  );



  }

/*

    for(var i = 0; i < 1; i++){


      var x = document.getElementsByClassName("leafimg " + i)[0];
        console.log(x);


    }

    */

  return (
    <div className={"Home-body fall-container " + leafblowerState}>
      <body>


        {fallingLeafIMGs}


        <div >

</div>
{leafblowerimg }
{turbulance}
      </body>
    </div>
  );
}
}


document.addEventListener('DOMContentLoaded', rotatingCursor.initialize);

export default Home;
