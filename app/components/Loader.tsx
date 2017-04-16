import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const BaseLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  background-color: rgba(10,10,10,.8);

  & > span {
    position: absolute;
    display: block;
    margin: auto auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 60px;
    height: 60px;
    animation: ${keyframes`
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
    `} .9s infinite linear;
    border-left: 6px solid rgba(0, 174, 239, .15);
    border-right: 6px solid rgba(0, 174, 239, .15);
    border-bottom: 6px solid rgba(0, 174, 239, .15);
    border-top: 6px solid rgba(0, 174, 239, .8);
    border-radius: 100%;
  }
`

const Loader: React.StatelessComponent<any> = (props) => (
  <BaseLoader {...props}>
    <span />
  </BaseLoader>
)

export default Loader
