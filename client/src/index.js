import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popup from './PopUp';
import './style.css';
import axios from 'axios';

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

class TopMenu extends React.Component{
    render(){
        return (
            <div id="TopMenu">
                <ul>
                    <li className="left"><a>About</a></li>
                    <li className="left"><a>Select date</a></li>
                </ul>
            </div>
        );
    }
        
}

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            task:[],
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
    };
    handleDate(e){
        var today=e.target.value.toString();
        const newItem={
            Ngay: today
        }
        axios.post('/api/task/date', newItem)
            .then(res=>{
                const task=res.data;
                this.setState({
                    task: task.task
                });
            })
            .catch(error=>console.log(error));
    }
    handleSubmit(JobName, Description){
        var today=new Date();
        var dd=String(today.getDate()).padStart(2, '0');
        var mm=String(today.getMonth()+1).padStart(2, '0');
        var yyyy=String(today.getFullYear());
        const newItem={
            Ngay: yyyy+'-'+mm+'-'+dd,
            JobName: JobName,
            Description: Description
        }
        console.log(newItem);
        axios.post('/api/insert', newItem)
            .then(res=>{
                let task=this.state.task;
                task = [newItem,...task];
                this.setState({task: task});
            })
            .catch(error=>console.log(error));
    }
    render(){
        const ngay=new Date();
        return (
            <div>
            <div id="main">
                <TopMenu/>
                <div id="table">
                    <Board task={this.state.task}/>
                </div>
                <div>
                    <App onSubmit={(JobName, Description)=>this.handleSubmit(JobName, Description)}/>
                </div>
                <div>
                    <ChooseDate onChange={(e)=>{this.handleDate(e)}}/>
                </div>
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

function ChooseDate(props){
    const [isOpen, setIsOpen]=useState(false);
    const togglePopup=()=>{
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <input type="button"
                    value="View task in 1 day"
                    onClick={togglePopup}/>
            {isOpen &&
                <Popup content={<>
                    <input onChange={(e)=>{
                        togglePopup();
                        props.onChange(e);
                    }} type="date" id="date" name="date"/>
                </>}
                handleClose={togglePopup}
            />}
        </div>
    );
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

//==================================================
ReactDOM.render(<Main/>, document.getElementById('root'));