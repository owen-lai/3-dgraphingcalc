import React, { Component } from 'react';

import './App.css';

import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: ""
        }
    }

    onClick = button => {

        if(button === "C"){
            this.reset()
        }
        else if(button === "DEL"){
            this.backspace()
        }

        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    render() {
        return (
            <div>
                <div className="calculator-body">
                    <KeyPadComponent onClick={this.onClick}/>
                    <ResultComponent result={this.state.result}/>
                    
                </div>
            </div>
        );
    }
}

export default App;

