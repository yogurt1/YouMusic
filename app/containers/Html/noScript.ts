import {
  LOADER_SELECTOR,
  NOSCRIPT_SELECTOR
}from 'app/lib/constants'

export default `
  <noscript id='${NOSCRIPT_SELECTOR}'>
  <style>
    #${LOADER_SELECTOR} { display: none; }

    #${NOSCRIPT_SELECTOR} > a {
      display: block;
      position: absolute;
      color: 'white';
      text-decoration: 'none';
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .75);
      overflow: hidden;
      z-index: 9999;
      display: block
    }

    #${NOSCRIPT_SELECTOR} > a > div {
      position: absolute;
      top: 50%;
      left: 50%;
      overflow: hidden;
    }

    #${NOSCRIPT_SELECTOR} > a > div > h1 { text-align: center; }
  </style>
  <a href=''>
    <div>
      <h1>Enable JavaScript<br>(click to reload)</h1>
    </div>
  </a>
</noscript>
`