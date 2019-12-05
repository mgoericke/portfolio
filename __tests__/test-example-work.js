import React from 'react'
import { shallow } from 'enzyme'
import ExampleWork from '../js/example-work'
import { ExampleWorkBubble } from '../js/example-work'
import { ExampleImage } from '../js/example-work'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()})

const myWork = [
  {
    title: 'Cloud',
    image: {
      desc: 'example screenshot of a project involving code',
      src: 'images/example1.png',
      comment: 'Cloud'
    }
  },
  {
    title: 'Database',
    image: {
      desc: 'example screenshot of a project involving chemistry',
      src: 'images/example2.png',
      comment: ''
    }
  }
]

describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work={myWork}/>)
  //console.log(component.debug())
  it("Should be a 'section' element", () => {
    expect(component.type()).toEqual('section');
  })

  it("Should contain as many children as work examples", () => {
    expect(component.find('ExampleWorkBubble').length).toEqual(myWork.length);
  })
})

describe("ExampleWorkBubble component", () => {
  let component = shallow(<ExampleWorkBubble example={myWork[1]}/>);
  let images = component.find('ExampleImage');

  it("Should contain a single ExampleImage", () => {
    expect(images.length).toEqual(1);
  })
})

describe("ExampleImage component", () => {
  let component = shallow(<ExampleImage image={myWork[0].image} />);
  it("Should have set the img source correctly", () => {
    expect(component.prop('src')).toEqual(myWork[0].image.src);
  })
})
