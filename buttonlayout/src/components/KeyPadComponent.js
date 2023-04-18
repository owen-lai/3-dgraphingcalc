import React, {Component} from 'react';

class KeyPadComponent extends Component {

    render() {
        return (
            <div className="button">

                <button name="x" onClick={e => this.props.onClick(e.target.name)}>x</button>
                <button name="y" onClick={e => this.props.onClick(e.target.name)}>y</button>
                <button name="z" onClick={e => this.props.onClick(e.target.name)}>z</button>
                <button name="=" onClick={e => this.props.onClick(e.target.name)}>=</button><br/>


                <button name="(" onClick={e => this.props.onClick(e.target.name)}>(</button>
                <button name=")" onClick={e => this.props.onClick(e.target.name)}>)</button>
                <button name="DEL" onClick={e => this.props.onClick(e.target.name)}>DEL</button>
                <button name="C" onClick={e => this.props.onClick(e.target.name)}>C</button><br/>


                <button name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
                <button name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
                <button name="3" onClick={e => this.props.onClick(e.target.name)}>3</button>
                <button name="+" onClick={e => this.props.onClick(e.target.name)}>+</button><br/>


                <button name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
                <button name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
                <button name="6" onClick={e => this.props.onClick(e.target.name)}>6</button>
                <button name="-" onClick={e => this.props.onClick(e.target.name)}>-</button><br/>

                <button name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
                <button name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
                <button name="9" onClick={e => this.props.onClick(e.target.name)}>9</button>
                <button name="*" onClick={e => this.props.onClick(e.target.name)}>*</button><br/>


                <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
                <button name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
                <button name="NEGATE" onClick={e => this.props.onClick(e.target.name)}>(-)</button>
                <button name="/" onClick={e => this.props.onClick(e.target.name)}>÷</button> <blockquote />
                


                <button name="^(" onClick={e => this.props.onClick(e.target.name)}>^</button>
                <button name="cos(" onClick={e => this.props.onClick(e.target.name)}>cos</button>
                <button name="sin(" onClick={e => this.props.onClick(e.target.name)}>sin</button>
                <button name="tan(" onClick={e => this.props.onClick(e.target.name)}>tan</button><br/>

                <button name="e^(" onClick={e => this.props.onClick(e.target.name)}>e^</button>
                <button name="arccos(" onClick={e => this.props.onClick(e.target.name)}>arccos</button>
                <button name="arcsin(" onClick={e => this.props.onClick(e.target.name)}>arcsin</button>
                <button name="arctan(" onClick={e => this.props.onClick(e.target.name)}>arctan</button><br/>

                <button name="ln(" onClick={e => this.props.onClick(e.target.name)}>^</button>
                <button name="sec(" onClick={e => this.props.onClick(e.target.name)}>sec</button>
                <button name="csc(" onClick={e => this.props.onClick(e.target.name)}>csc</button>
                <button name="cot(" onClick={e => this.props.onClick(e.target.name)}>cot</button><br/>

                <button name="log(" onClick={e => this.props.onClick(e.target.name)}>^</button>
                <button name="arcsec(" onClick={e => this.props.onClick(e.target.name)}>arcsec</button>
                <button name="arccsc(" onClick={e => this.props.onClick(e.target.name)}>arccsc</button>
                <button name="arccot(" onClick={e => this.props.onClick(e.target.name)}>arccot</button><br/>

                <button name="e" onClick={e => this.props.onClick(e.target.name)}>e</button>
                <button name="pi" onClick={e => this.props.onClick(e.target.name)}>pi</button>
                <button name="tbd" onClick={e => this.props.onClick(e.target.name)}>x^y</button>
                <button name="sqrt(" onClick={e => this.props.onClick(e.target.name)}>sqrt</button><br/>
              




                
            </div>
        );
    }
}


export default KeyPadComponent;




