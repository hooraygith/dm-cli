const shell = require('shelljs');

module.exports = {
    exec(cmds) {
        let stack = () => {};
        for (let cmd of cmds) {
            stack = ((next, cmd) => {
                return () => {
                    shell.exec(cmd, {
                        async: true
                    }, (code, stdout, stderr) => {
                        if (!stderr) {
                            next();
                        }
                    });
                }
            }(stack, cmd));
        }
        stack();
    }
}