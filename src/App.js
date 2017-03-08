import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'

const RATE = 1.01;

class App extends Component {
  constructor(){
    super();
    this.state = {
      euros: 0,
      dollars: 0,
      doRound: false,
      bgColor: 0,
    }
  }

updateEuros = (newValue) =>{
  const eurs = parseFloat(newValue);
  let dlrs = eurs*RATE;
  if(this.state.doRound)
    dlrs=Math.round(dlrs);
  this.setState({
    euros: eurs,
    dollars: dlrs,
    doRound: this.state.doRound,
    bgColor: this.state.bgColor,
  });
}

updateDollars = (event, newValue)=>{
  const dlrs = parseFloat(newValue);
  // const eurs = dlrs/RATE;
  const eurs = this.state.doRound?Math.round(dlrs/RATE):dlrs/RATE;
  this.setState({
    euros: eurs,
    dollars: dlrs,
    doRound: this.state.doRound,
    bgColor: this.state.bgColor,
  });
}

adjustRounding=(event,isChecked) =>{
  this.setState({
    euros: this.state.euros,
    dollars: this.state.dollars,
    doRound: isChecked,
    bgColor: this.state.bgColor,
  });
}

clear=(event,isChecked) =>{
  this.setState({
    euros: 0,
    dollars: 0,
    doRound: this.state.round,
    bgColor: this.state.bgColor,
  });
}

mouseMove = (event) =>{
  const nc = Math.min(255,(255*event.clientY / event.clientX))&0xff;
  this.setState({
    // euros: this.state.euros,
    // dollars: this.state.dollars,
    // doRound: this.state.doRound,
    bgColor: nc,
  });
}

  render() {

    const c = this.state.bgColor;
    const bgcol = "#"+(c*256*256+c*256+255).toString(16);

    return (
      <MuiThemeProvider>
        <Paper style={{width: 600, background: bgcol}} onMouseMove={this.mouseMove}>
          <div>
          Euros: <TextField value={this.state.euros} onChange={(e, v)=> {this.updateEuros(v)}} id="euros"/>
          </div> <div>
          Dollars: <TextField value={this.state.dollars} onChange={this.updateDollars} id="dollars"/>
          </div> <div>
            <Checkbox label="Round" onCheck={this.adjustRounding}/>
            </div> <div>
              <RaisedButton label="Clear" onClick={this.clear}/>
              </div>
          </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
