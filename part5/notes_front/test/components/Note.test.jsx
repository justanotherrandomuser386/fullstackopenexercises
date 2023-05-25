import React from 'react'
import { expect, test, vi } from 'vitest'
import Note from '../../src/components/Note'
import { render, screen } from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with vitest',
    important: true
  }
  
  render(<Note note={note}/>)
  screen.debug()
  const element = screen.getByText('Component testing is done with vitest')
  screen.debug(element)
  expect(element).toBeDefined()
})

test('clicking the buttton calls event hadler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()
  render(
    <Note note={note} toggleImportance={mockHandler}/>
  )
  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  
})
