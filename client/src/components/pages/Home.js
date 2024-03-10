import React from 'react';
import '../../App.css';
import { useEffect } from 'react';
import './Home.css';
import { Model, createItem, updateItem } from '../Logic';

function Home() {
    useEffect(() => {
        document.title = "To Do List";
    }, []);

    return (
        <>
            <div className="title-container">
                <div className="title-wrapper">
                    <h1 className="title">Things to do</h1>
                </div>
            </div>
            <div className="list-container">
                <div className="list-wrapper">
                    <Model />
                </div>
            </div>
            <input type="text" className="add-item" id='input' onKeyDown={createItem} autoFocus/>
            <button className="clear" id="clear"><i className="fa fa-trash" id='x'></i></button>
        </>
    );
}

export default Home;
