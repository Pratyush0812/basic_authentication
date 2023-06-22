import url from 'url'

const myURL = new URL('hhtps://example.org')
myURL.pathname = '/a/b/c'
myURL.search = '?d=e'  //search param
myURL.has = '#fgh'  //navigating to a particular section

console.log(myURL.href)
console.log(myURL)