import React from 'react';
import ReactDOM from 'react-dom';
import './SeasonDisplay.css';
import Spinner from './Spinner';
import SeasonDisplay from './SeasonDisplay';
const message = "Please accept the location request...";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {lat: null, errorMessage: "", message: message};
    }
    
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({errorMessage: err.message})
        );
    }
    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
          }
      
          if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />;
          }
      
          return <Spinner message={this.state.message}/>;
    }
    render(){
        return <div style={{borderStyle: 'solid', borderColor: 'red'}}>{this.renderContent()}</div>
    }
}

ReactDOM.render(
    <App />, document.querySelector('#root')
);