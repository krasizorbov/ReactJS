import React from 'react';


class SearchBar extends React.Component{
    state = {term: ""};
    onFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
      };
    render(){
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="fields">
                        <div className="field">
                            <label>Image Search</label>
                            <div className="ui large icon input">
                                <input type="text" value={this.state.term} onChange={e => this.setState({term: e.target.value})}/>
                                <i className="circular search link icon"></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    };  
};

export default SearchBar;