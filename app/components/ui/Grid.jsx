import styled, {css, injectGlobal} from 'styled-components'
import {createElement} from 'react'

const normalize = `
/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */button,hr,input{overflow:visible}audio,canvas,progress,video{display:inline-block}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}
`

const sizes = {
    1: 4.66666666667,
    2: 13.3333333333,
    3: 22,
    4: 30.6666666667,
    5: 39.3333333333,
    6: 48,
    7: 56.6666666667,
    8: 65.3333333333,
    9: 74.0,
    10: 82.6666666667,
    11: 91.3333333333,
    12: 100,
    [1/3]: 30.6666666667,
    [2/3]: 65.3333333333,
    [1/2]: 48
}

const offsets = {
    1: 8.66666666667,
    2: 17.3333333333,
    3: 26,
    4: 34.6666666667,
    5: 43.3333333333,
    6: 52,
    7: 60.6666666667,
    8: 69.3333333333,
    9: 78.0,
    10: 86.6666666667,
    11: 95.33333333333,
    [1/3]: 34.6666666667,
    [2/3]: 69.33333333333,
    [1/2]: 52
}

const breakpoints = new function() {
    const labels = {
        mobile: 400,
        phablet: 550,
        tablet: 750,
        desktop: 100,
        desktophd: 1200
    }
    for (const label in labels) {
        this[label] = `min-width: ${labels[label]}`
    }
    // this.get = label => labels[label] + 'px'
    return this
}

const fullWidth = `
    width: 100%;
    box-sizing: border-box;
`
const pullRight = `float:right;`
const pullLeft = `float:left;`
const clearfix = `
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`

const headings = `
    h1, h2, h3, h4, h5, h6 {
        font-weight: 400;
        margin-top: 0;
        margin-bottom: 2rem;
    }

    h1 { font-size: 4.0rem; line-height: 1.2;  letter-spacing: -.1rem;}
    h2 { font-size: 3.6rem; line-height: 1.25; letter-spacing: -.1rem; }
    h3 { font-size: 3.0rem; line-height: 1.3;  letter-spacing: -.1rem; }
    h4 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -.08rem; }
    h5 { font-size: 1.8rem; line-height: 1.5;  letter-spacing: -.05rem; }
    h6 { font-size: 1.5rem; line-height: 1.6;  letter-spacing: 0; }

    @media (min-width: 550px) {
        h1 { font-size: 5.0rem; }
        h2 { font-size: 4.2rem; }
        h3 { font-size: 3.6rem; }
        h4 { font-size: 3.0rem; }
        h5 { font-size: 2.4rem; }
        h6 { font-size: 1.5rem; }
    }
`
injectGlobal`
    ${normalize}
    html { font-size: 62.5%; }
    body {
        font-size: 1.5em;
        line-height: 1.6;
        font-weight: 300;
        font-family: Roboto, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #222;

    }

    ${headings}

    p {margin-top: 0;}
    a {
        color: #1EAEDB;;
        &:hover {
            color: #0FA0CE;
        }
    }
    hr {
        margin-top: 3rem;
        margin-bottom: 3.5rem;
        border-width: 0;
        border-top: 1px solid #E1E1E1;
    }
`

export const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    @media (${breakpoints.mobile}) {
        width: 85%;
        padding: 0;
    }

    @media (${breakpoints.phablet}) {
        width: 80%;
    }

    ${clearfix}
    ${p => p.wide ? 'max-width:99% !important;' : ''}
`

export const Row = styled.div`${clearfix}`
export const Column = styled.div`
    width: 100%;
    float: left;
    box-sizing: border-box;

    @media (${breakpoints.phablet}) {
        margin-left: ${p => p.size === 12 ? 0 : '4%'};
        width: ${p => sizes[p.size || 1]}%;
        &:first-child {
            margin-left: 0;
        }
    }
`

export const Columns = ({size, children}) => createElement(Row, null, (
        children[0] ? children : [children]
    ).map((child, key) => createElement(Column, {
        key,
        size: size || 12 / children.length
    }, child)))

export const FlexGrid = styled.div`
    display: flex;
    flex-direction: ${p => p.vertical ? 'column' : 'row'};
`

export const OffestBy = styled.div`
    margin-left: ${p => offsets[p.count || 1]}%;
`
