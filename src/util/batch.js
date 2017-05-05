const shell = require('shelljs')
const ora = require('ora')

let spinner = ora()

module.exports = {
  exec(cmds) {
    let stack = () => {}
    for (let cmd of cmds) {
      stack = (function(next, cmd) {
        return () => {
          spinner.start(cmd)
          shell.exec(
            cmd,
            {
              async: true
            },
            (code, stdout, stderr) => {
              if (!stderr) {
                spinner.succeed(`end ok!!! ${cmd}`)
                next()
              }
            }
          )
        }
      })(stack, cmd)
    }
    stack()
  }
}
