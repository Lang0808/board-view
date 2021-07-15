import React, {useState}from 'react';
import './index.css';

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

export default Board;