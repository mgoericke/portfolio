import React, {useState} from 'react';
import ExampleWorkModal from './example-work-modal'


class ExampleWork extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
      selectedExample: this.props.work[0]
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(evt, example) {
    this.setState({
      modalOpen: true,
      selectedExample: example
    });
  }

  closeModal(evt) {
    this.setState({
      modalOpen: false
    });
  }

  render() {
    return (
      <span>
        <section className="section section--alignCentered section--description">
          { this.props.work.map((example, idx) => {
            return <ExampleWorkBubble example={example} key={idx} openModal={this.openModal}/>
          }
        )}
        </section>

        <ExampleWorkModal example={this.state.selectedExample} open={this.state.modalOpen} closeModal={this.closeModal}/>
      </span>
    )
  }
}

const ExampleWorkBubble = (props) => {
  let example = props.example;
  let openModal = props.openModal;
  return (
      <div className="section__exampleWrapper" onClick={ (evt) => openModal(evt, example) }>
        <div className="section__example">
          <ExampleImage image={example.image}/>
          <dl className="color--cloud">
            <dt className="section__exampleTitle section__text--centered">
              {example.title}
            </dt>
            <dd></dd>
          </dl>
        </div>
      </div>
  )
}
const ExampleImage = (props) => {
  return (
    <img alt={props.image.desc}
               className="section__exampleImage"
               src={props.image.src} />
  )
}

// default
export default ExampleWork;

// can be imported to if requested ... import {xxx} from XXX
export {ExampleWorkBubble, ExampleImage};
