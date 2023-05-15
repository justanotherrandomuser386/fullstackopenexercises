const reverse = require('../utils/for_testing').reverse

test('reverse a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
  const result = reverse('revelever')

  expect(result).toBe('revelever')
})
