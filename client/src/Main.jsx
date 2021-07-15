import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import App from './App';
import axios from 'axios';
import ChooseDate from './ChooseDate';

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

export default Main;