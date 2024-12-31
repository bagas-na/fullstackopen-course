const info = (...args) => {
  console.log(...args);
}

const error = (...args) => {
  console.err(...args);
}

module.exports = { info, error };