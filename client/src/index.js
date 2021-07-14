import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popup from './PopUp';
import './style.css';
import axios from 'axios';
import Navbar from './NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './About';
import Events from './Event';
import AnnualReport from './Annual';
import Teams from './team';
import Blogs from './Blog';
import SignUp from './SignUp';
//import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
//import {ViewTaskDate} from './Components/date'

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

/*class TopMenu extends React.Component{
    render(){
        return (
            <div id="TopMenu">
                <ul>
                    <li className="left"><a>About</a></li>
                    <li className="left"><ChooseDate tasks={this.props.tasks} 
                                                    onChange={(e)=>this.props.onChange(e)}/></li>
                </ul>
            </div>
        );
    }       
}*/

function TopMenu() {
    return (
      <Router>
        <Navbar />
        <Switch>
          {/* <Route path='/' exact component={Home} />*/}
          <Route path='/about' component={About} />
          <Route path='/events' component={Events} />
          <Route path='/annual' component={AnnualReport} />
          <Route path='/team' component={Teams} />
          <Route path='/blogs' component={Blogs} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    );
  }

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            task:[],
            taskDate: [],
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
        e.preventDefault();
        var today=e.target.value.toString();
        const newItem={
            Ngay: today
        }
        axios.post('/api/task/date', newItem)
            .then(res=>{
                const task=res.data;
                this.setState({
                    taskDate: task.task,
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
                <TopMenu tasks={this.state.taskDate} onChange={(e)=>{this.handleDate(e)}}/>
                <div id="table">
                    <Board task={this.state.task}/>
                </div>
                <div>
                    <App onSubmit={(JobName, Description)=>this.handleSubmit(JobName, Description)}/>
                </div>
                <div>
                    <ChooseDate tasks={this.state.taskDate} onChange={(e)=>{this.handleDate(e)}}/>
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

/*function ChooseDate(props){
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
}*/

class ChooseDate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
            day: '',
        }
        this.setIsOpen=this.setIsOpen.bind(this);
    }
    setIsOpen(){
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    render(){
        return (
            <div>
                {/* <input type="button" value="View tasks in 1 day" onClick={()=>this.setIsOpen()}/> */}
                <button onClick={()=>this.setIsOpen()}>View task in 1 day</button>
                {this.state.isOpen && 
                    <Popup content={<>
                        <input type="date" onChange={(e)=>this.props.onChange(e)}/>
                        <br/><br/>
                        <Board task={this.props.tasks}/>
                    </>}
                    handleClose={this.setIsOpen}/>
                }
            </div>
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

//export default Board, Task, TopMenu;
//==================================================
ReactDOM.render(<Main/>, document.getElementById('root'));