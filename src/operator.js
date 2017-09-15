var fee = require('./countFee');

//执行book或者cancel操作
function operate(input, data) {
    if (input.booking) {
        switch (input.place) {
            case 'A':
                writeData_book(data.A, input);
                break;
            case 'B':
                writeData_book(data.B, input);
                break;
            case 'C':
                writeData_book(data.C, input);
                break;
            case 'D':
                writeData_book(data.D, input);
                break;
            default:
                break
        }
    } else {
        switch (input.place) {
            case 'A':
                writeData_cancel(data.A, input);
                break;
            case 'B':
                writeData_cancel(data.B, input);
                break;
            case 'C':
                writeData_cancel(data.C, input);
                break;
            case 'D':
                writeData_cancel(data.D, input);
                break;
            default:
                break
        }
    }
}

function writeData_cancel(A, input) {
    // var i = 0, cancelStr = input.bookingStr.substr(0, input.bookingStr.length - 1).trim(),
    var i = 0, cancelStr = input.bookingStr,//
        isExist = A.bookingInfo[cancelStr];
    if (isExist) {
        for (i = input.fromTime - 9; i < input.toTime - 9; i++)
            A.dateInfo[input.date][i] = 0;
        console.log('> Success: the booking is accepted!');
        delete A.bookingInfo[cancelStr];
        !A.canceled[cancelStr] ? A.canceled[cancelStr] = fee.getFee(input) / 2 : A.canceled[cancelStr] += fee.getFee(input) / 2
    } else
        console.log('> Error: the booking being cancelled does not exist!')
}

function writeData_book(A, input) {
    var i = 0;
    if (!A.dateInfo[input.date]) {
        var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = input.fromTime - 9; i < input.toTime - 9; i++)
            arr[i] = 1

        A.dateInfo[input.date] = arr;
        //if (!A.bookingInfo[input.bookingStr])                 checking!!!
        A.bookingInfo[input.bookingStr] = fee.getFee(input);
        console.log("> Success: the booking is accepted!")
    } else {
        for (i = input.fromTime - 9; i < input.toTime - 9; i++) {
            if (A.dateInfo[input.date][i] === 1) {
                console.log('> Error: the booking being conflicts with existing bookings!');
                return
            }
        }
        for (i = input.fromTime - 9; i < input.toTime - 9; i++)
            A.dateInfo[input.date][i] = 1
        A.bookingInfo[input.bookingStr] = fee.getFee(input);
        console.log("> Success: the booking is accepted!")
    }
}

exports.operate = operate;