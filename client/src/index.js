import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popup from './PopUp';
import './style.css';
import axios from 'axios';
//import './pretty-checkbox.scss';

class Task extends React.Component{
    render(){
        return (
            <tr>
                <td>{this.props.jobs}</td>
                <td>{this.props.status}</td>
            </tr>
        )
    }
}

class Board extends React.Component{
    render(){
        const board=[];
        board.push(<tr>
            <th>Jobs</th>
            <th>Status</th>
        </tr>);
        for(let i=0;i<this.props.task.length;i++){
            board.push(<Task jobs={this.props.task[i].JobName}
                            status={this.props.task[i].Description}/>);
        }
        return (
                <table>{board}</table>
        )
    }
}

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            task:[]
        }
    }
    componentDidMount(){
        axios.get('/api/task')
            .then(res => {
                const task=res.data;
                this.setState({
                    task: task.task
                });
            })
            .catch(error=>console.log(error));
            //console.log(this.state.task);
    };
    handleSubmit(value){
        var today=new Date();
        var dd=String(today.getDate()).padStart(2, '0');
        var mm=String(today.getMonth()+1).padStart(2, '0');
        var yyyy=String(today.getFullYear());
        const newItem={
            Ngay: yyyy+'-'+mm+'-'+dd,
            JobName: value,
            Description: 'not finished'
        }
        console.log(today.toString());
        console.log(value);
        /*this.setState({
            jobs: this.state.jobs.concat(value),
            status: this.state.status.concat("OK"),
        });*/
        axios.post('/api/insert', newItem)
            .then(res=>{
                let task=this.state.task;
                task = [newItem,...task];
                this.setState({task: task});
            })
            .catch(error=>console.log(error));
    }
    render(){
        //console.log(this.state.jobs);
        //console.log(this.state.status);
        return (
            <div id="main">
                <div id="table">
                    <Board task={this.state.task}/>
                </div>
                <div>
                    <App onSubmit={(value)=>this.handleSubmit(value)}/>
                </div>
                <div>
                <ul>
                    {this.state.task.map(item => (
                    <li key={item.Ngay}>
                        <h2>{item.JobName}</h2>
                        <div>{item.Description}</div>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        )
    }
}

class StringForm extends React.Component{
    constructor(props){
        super(props);
        this.state={value:''};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value: event.taget.value});
    }
    hanldeSubmit(event){
        alert("A name was submitted: "+this.state.value);
        event.preventDefault();
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name: 
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

class TaskInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'Write something'
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        this.props.onSubmit(this.state.value);
        event.preventDefault();
    }
    handleChange(event) {    
        this.setState({value: event.target.value});  
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Your jobs: 
                        <div>
                            <textarea type="text" value={this.state.value} onChange={this.handleChange}/>
                        </div>
                    </label>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

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
                    <TaskInput onSubmit={(value)=>props.onSubmit(value)}/>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
        )    
}

//https://lokesh-coder.github.io/pretty-checkbox/
//==================================================
ReactDOM.render(<Main/>, document.getElementById('root'));