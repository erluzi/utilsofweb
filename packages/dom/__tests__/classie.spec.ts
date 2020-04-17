import classie from '../classie'

describe('dom/classie', () => {
  it('should create a dom add class', () => {
    let dom = document.createElement('div')
    classie.add(dom, 'wrap')
    expect(classie.has(dom, 'wrap')).toBe(true)

    classie.remove(dom, 'wrap')
    expect(classie.has(dom, 'wrap')).toBe(false)

    classie.toggle(dom, 'wrapper')
    expect(classie.has(dom, 'wrapper')).toBe(true)
  })
})
