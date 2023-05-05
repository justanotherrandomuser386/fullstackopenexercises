const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const summizer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(summizer, 0)    
}

const favoriteBlog = (blogs) => {
  let favorite = {
    title: '',
    author: '',
    likes: 0
  }

  return blogs.length === 0
    ? null
    : blogs.reduce((fav, item) =>{
    if (item.likes > fav.likes) {
      fav.likes = item.likes
      fav.title = item.title
      fav.author = item.author
    }
    return fav
  }, favorite)
}

const mostBlogs = (blogs) => {
  const auhors = new Map()
  const mostAuthor = {
    author: '',
    blogs: 0
  }

  blogs.forEach(blog => {
    if (auhors.has(blog.author)) {
      auhors.set(blog.author, auhors.get(blog.author) + 1)
    } else {
      auhors.set(blog.author, 1)
    }
    if (mostAuthor.blogs < auhors.get(blog.author)) {
      mostAuthor.author = blog.author
      mostAuthor.blogs = auhors.get(blog.author)
    }
  })
  return mostAuthor.blogs === 0
    ? null
    : mostAuthor
}

const mostLikes = (blogs) => {
  const authors = new Map()
  const mostAuthor = {
    author: '',
    likes: 0
  }
  
  blogs.forEach(blog => {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + blog.likes)
    } else {
      authors.set(blog.author, blog.likes)
    }
    if (mostAuthor.likes < authors.get(blog.author)) {
      mostAuthor.author = blog.author
      mostAuthor.likes = authors.get(blog.author)
    }
  })  
  return mostAuthor.likes === 0
    ? null
    : mostAuthor


}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
