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
  });
}

updateDollars = (event, newValue)=>{
  const dlrs = parseFloat(newValue);
  const eurs = dlrs/RATE;
  this.setState({
    euros: eurs,
    dollars: dlrs,
    doRound: this.state.doRound,
  });
}

adjustRounding=(event,isChecked) =>{
  this.setState({
    euros: this.state.euros,
    dollars: this.state.dollars,
    doRound: isChecked,
  });
}

clear=(event,isChecked) =>{
  this.setState({
    euros: 0,
    dollars: 0,
    doRound: this.state.round,
  });
}


  render() {
    return (
      <MuiThemeProvider>
        <Paper style={{width: 600}}>
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
