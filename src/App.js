import React, { Component, createRef } from 'react'
import Formulaire from './components/Formulaire'
import Message from './components/Message'
import './App.css'
import './animations.css'

//firebase
import base from './base'

//animation
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  messagesRef = createRef()

  //permet de garder les messages dune page a lautre grace a firebase
  componentDidMount () {
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  //permet de scroller direct en bas grace a la ligne 15 et 46
  componentDidUpdate () {
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message
    Object //permet de supprimer au dela de 10 messages
      .keys(messages)
      .slice(0, -10)
      .forEach(key => {
        messages[key] = null
      })
    this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    const messages = Object
      .keys(this.state.messages)
      .map(key => (
        <CSSTransition timeout={200} classNames='fade' key={key}>
          <Message isUser={this.isUser} message={this.state.messages[key].message} pseudo={this.state.messages[key].pseudo} />
        </CSSTransition>
      ))

    return (
      <div className='box'>
        <div>
          <div className='messages' ref={this.messagesRef}>
            <TransitionGroup className='message'>
              { messages }
            </TransitionGroup>
          </div>
        </div>
        <Formulaire length={140} pseudo={this.state.pseudo} addMessage={this.addMessage} />
      </div>
    )
  }
}

export default App
