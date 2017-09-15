//全局变量，用于场馆保存预约信息，保存收入情况。
var data = {
    A: {
        bookingInfo: {
            //    'U120 2016-06-02 20:00~22:00 A': 60
        },
        canceled: {
            //    'U120 2016-06-02 20:00~22:00 A': 60
        },
        dateInfo: {
            // '2006-06-02': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            // '2006-06-03': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    B: {
        bookingInfo: {},
        canceled: {},
        dateInfo: {}
    },
    C: {
        bookingInfo: {},
        canceled: {},
        dateInfo: {}
    },
    D: {
        bookingInfo: {},
        canceled: {},
        dateInfo: {}
    }
};
//引入模块。
var readline = require('readline'), check = require('./checkInput'), operator = require('./operator');
var fee = require('./countFee');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('');
rl.prompt();
//按行读取
rl.on('line', function (line) {
    var input = check.checkInput(line.trim());
    if (!input) {
        console.log('> Error: the booking is invalid!')
    } else {
        if (input === 'sum') {
            console.log('>收入汇总\n>---\n' + fee.total(data));
            rl.close()
        } else {
            operator.operate(input, data);
        }
    }
    rl.prompt()
});
rl.on('close', function () {
    process.exit(0)
});

// console.log(checkInput('U120 2016-06-02 20:00~22:00 A'));