import React from 'react'
import ReactDOM from 'react-dom'
import MessageList from './../message-list'
import Toast from './../Toast'
import { isTSAnyKeyword } from '@babel/types'
import { render, fireEvent, cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)

it("renders without crashing", () => { 
    const div = document.createElement("div")
    ReactDOM.render(<MessageList></MessageList>, div)
    ReactDOM.unmountComponentAtNode(div)
})

it("renders button correctly", () => {
    const {getByTestId} = render(<MessageList />)
    // expect(getByTestId("clear-btn")).toHaveTextContent("CLEAR")
})

it("displays the count", () => {
    const {getByTestId} = render(<MessageList />)
    expect(getByTestId("count")).toHaveTextContent("0")
    expect(getByTestId("count2")).toHaveTextContent("0")
    expect(getByTestId("count3")).toHaveTextContent("0")
})

test("changes button text on click", async () => {
    const {getByText} = render(<MessageList></MessageList>, {name: 'World'})
    const button = getByText('Stop Messages')
    // have to wait for testing library to flush all pending state changes.
    await fireEvent.click(button)
    expect(button).toHaveTextContent('Start Messages')
  })

it("clears DOM", () => {
    const {getByTestId, getByText} = render(<MessageList />)
    fireEvent.click(getByText('CLEAR'))
    expect(getByTestId('error')).toBeEmptyDOMElement()
})




