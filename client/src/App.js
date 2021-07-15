import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popup from './PopUp';
import './style.css';

function App(props){
    const [isOpen, setIsOpen]=useState(false);
    const togglePopup=()=>{
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <input type="button"
                    value="Add Task"
                    onClick={togglePopup}/>
            {isOpen && 
                <Popup content={<>
                <TaskInput onSubmit={(JobName, Description)=>{
                    props.onSubmit(JobName, Description);
                    togglePopup();
                }}/>
                </>}
                handleClose={togglePopup}
            />}
        </div>
    )    
}

class TaskInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            JpbName:'',
            Description: '',
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        this.props.onSubmit(this.state.JobName, this.state.Description);
        event.preventDefault();
    }
    handleChange(event) {  
        const target=event.target;  
        const name=target.name;
        const value=target.value;
        this.setState({[name]: value});     
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div id="popupInput">
                    <label className="text">Your jobs: 
                        <div>
                            <textarea name="JobName" type="text" value={this.state.JobName} onChange={this.handleChange}/>
                        </div>
                    </label>
                    <label className="text">Description:
                        <div>
                            <textarea name="Description" type="text" value={this.state.Description} onChange={this.handleChange}/>
                        </div>
                    </label>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default App;