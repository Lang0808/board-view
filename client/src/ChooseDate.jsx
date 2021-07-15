import React from 'react';
import Board from './Board';
import Popup from './PopUp';
import './style.css';

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
                        
                        <input type="date" value={this.state.day} onChange={(e)=>{
                                                            this.setState({day: e.target.value});
                                                            this.props.onChange(e);}
                                                        }/>
                        <br/>
                        {this.state.day && <h2>
                                    Tasks in {this.state.day}
                                </h2>}
                        <Board task={this.props.tasks}/>
                    </>}
                    handleClose={this.setIsOpen}/>
                }
            </div>
        );
    }
}

export default ChooseDate;