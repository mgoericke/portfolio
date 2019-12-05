import React from 'react';

const ExampleWork = (props) => {
  return (
    <section className="section section--alignCentered section--description">
      { props.work.map((example, idx) => {
        return <ExampleWorkBubble example={example} key={idx}/>
      }
    )}
    </section>
  )
}

const ExampleWorkBubble = (props) => {
  let example = props.example;
  return (
      <div className="section__exampleWrapper">
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
