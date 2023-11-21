import { Component } from "react";
import './list.css'

export class List extends Component {
    state = {
        items: [],
        userInput: ''
    }
    AddItem() {
        if (this.state.userInput !== '') {
            let itemsForProcessing = this.state.items;
            itemsForProcessing.push({itemLabel: this.state.userInput, completed: false});
            this.setState({items: itemsForProcessing, userInput: ''});
            console.log(itemsForProcessing);
        }
    }
    Complete(indexOfAnItem) {
        let itemsForProcessing = this.state.items;
        if (itemsForProcessing[indexOfAnItem].completed !== true) {
            itemsForProcessing[indexOfAnItem].completed = true;
            // document.getElementById(indexOfAnItem).innerText = '✅ '+this.state.items[indexOfAnItem].itemLabel;
        } else {
            itemsForProcessing[indexOfAnItem].completed = false;
            // document.getElementById(indexOfAnItem).innerText = '⭕️ '+this.state.items[indexOfAnItem].itemLabel;
        }
        console.log(itemsForProcessing);
        this.setState({items: itemsForProcessing});
    }
    RemoveCompleted() {
        let itemsForProcessing = this.state.items;
        itemsForProcessing = itemsForProcessing.filter((point) => point.completed !== true)
        this.setState({items: itemsForProcessing});
    }
    RemoveButtonState() {
        let thereAreCompletedTasks = false;
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].completed) {
                thereAreCompletedTasks = true;
                break;
            }
        }
        if (this.state.items.length > 0 && thereAreCompletedTasks) {
            return 'Remove highlighted'
        } else if (this.state.items.length > 0) {
            return 'Remove'
        } else {
            return 'Remove hidden'
        }
    }
    render() {
        return <form onSubmit={(e) => e.preventDefault()}>
            <div className='Input'>
                <input 
                    value={this.state.userInput}
                    placeholder='Записывайте свои дела' 
                    onChange={(e) => this.setState({userInput: e.target.value})}
                />
                <button 
                    className='Add'
                    onClick={() => this.AddItem()}
                >+</button>
            </div>
            <ul>
                {this.state.items.map((item, index) => (
                    <li id={index} key={index} onClick={() => this.Complete(index)} className={item.completed ? 'Completed' : ''}>{item.completed ? '✅' : '⭕️'} {item.itemLabel}</li>
                ))}
            </ul>
            <button className={this.RemoveButtonState()} onClick={() => this.RemoveCompleted()}>Убрать выполненные</button>
        </form>
    }
}