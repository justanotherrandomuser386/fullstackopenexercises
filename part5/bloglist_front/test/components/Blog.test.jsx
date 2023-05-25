
import React from "react"
import { render, screen } from '@testing-library/react'
import  userEvent  from "@testing-library/user-event"
import { describe, expect, test, vi } from 'vitest'
import  Blogs from '../../src/components/Blogs'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)


describe('Testing BlogEntry', () => {
  let container
  const mockLikeHander = vi.fn() 


  beforeEach(() => {
    const blog = {
      title: 'Title is showing',
      author: 'Author',
      user: {username: 'Username'},
      likes: 0,
      url: 'URL'
    }
       container = render(
      <Blogs.BlogEntry blog={blog} handleLike={mockLikeHander} />
    ).container
  })

  test('title and author are shown by default while other fields are hidden', () => {
    expect(container.querySelector('.title')).not.toBeNull()
    expect(container.querySelector('.author')).not.toBeNull()
    expect(container.querySelector('.url')).toBe(null)
    expect(container.querySelector('.likes')).toBe(null)
  })

  test('all fileds are shown when show buddon has been clicked',async () => {
    const user = userEvent.setup()
    const showAllButton = container.querySelector('.showAllButton')
    await user.click(showAllButton)
    container.querySelector('.title')
    container.querySelector('.author')
    expect(container.querySelector('.url')).not.toBe(null)
    expect(container.querySelector('.likes')).not.toBe(null)
  })

  test('like button execute correct handler when clicked',async () => {
    const user = userEvent.setup()
    const showAllButton = container.querySelector('.showAllButton')
    await user.click(showAllButton)
    const likeButton = container.querySelector('.likes')
    expect(likeButton).not.toBeNull()
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLikeHander.mock.calls).toHaveLength(2)
  })

  test('testing new blog form', async () => {
    const mockAddBlogHandler = vi.fn((event) => {event.preventDefault()})
    
    const blog = {
      title: 'Title is showing!!!',
      author: 'Author!!!!',
      user: {username: 'Username!!!!'},
      likes: 0,
      url: 'URL!!!!'
    }

    container = render(
      <Blogs.AddBlogForm handleCreateBlog={mockAddBlogHandler} />
    ).container
    const user = userEvent.setup()
    const addButton = container.querySelector('.createBlog')
    expect(addButton).not.toBeNull()
    await user.type(container.querySelector('input[name="Title"]'), blog.title)
    await user.type(container.querySelector('input[name="Author"]'), blog.author)
    await user.type(container.querySelector('input[name="url"]'), blog.url)
    await user.click(addButton)
    console.log(mockAddBlogHandler.mock.calls[0])


  })

})

