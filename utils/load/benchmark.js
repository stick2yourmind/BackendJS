const autocannon = require('autocannon')
const { PassThrough } = require('stream')

const run = (url) => {
  const buf = []
  const outputStream = new PassThrough()

  const inst = autocannon({
    connections: 100,
    duration: 20,
    url
  })
  autocannon.track(inst, { outputStream })

  outputStream.on('data', data => buf.push(data))
  inst.on('done', function () {
    process.stdout.write(Buffer.concat(buf))
  })
}

run('http://localhost:8080/info')
