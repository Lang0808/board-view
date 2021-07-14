import React from 'react'
import Board from './../index'

class ViewTaskDate extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <TopMenu/>
                </div>
                <div>
                    <Board/>
                </div>
            </div>
        )
    }
}