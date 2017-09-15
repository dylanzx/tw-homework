//计算费用总和。
function total(data) {
    var str1 = (sum(data.A, 'A').str + '\n>\n' + sum(data.B, 'B').str + '\n>\n' + sum(data.C, 'C').str + '\n>\n' + sum(data.D, 'D').str);
    var str2 = ('\n>---\n>' + '总计：' + (sum(data.A, 'A').money + sum(data.B, 'B').money + sum(data.C, 'C').money + sum(data.D, 'D').money) + '元');
    return str1 + str2
}

function getFee(input) {
    var weekDay = [30, 30, 30, 50, 50, 50, 50, 50, 50, 80, 80, 60, 60],
        weekend = [40, 40, 40, 50, 50, 50, 50, 50, 50, 60, 60, 60, 60],
        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sum = 0, i = 0;
    var day = (new Date(input.date)).getDay();
    var indexStart = input.fromTime, indexEnd = input.toTime;
    if (day !== 0 && day !== 6) {
        //工作日
        for (i = indexStart - 9; i < indexEnd - 9; i++)
            arr[i] = 1
        for (i = 0; i < 13; i++)
            sum += arr[i] * weekDay[i]
    } else {
        //周末
        for (i = indexStart - 9; i < indexEnd - 9; i++)
            arr[i] = 1
        for (i = 0; i < 13; i++)
            sum += arr[i] * weekend[i]
    }
    return sum
}

//计算每块场地的费用(包括预订成功和取消预订)。
function sum(A, a) {
    a = '>场地：' + a;
    var arr = [a];
    var money = 0, money_regret = 0;
    for (var item in A.bookingInfo) {
        money += A.bookingInfo[item];
        arr.push('>' + item.slice(5, 28) + A.bookingInfo[item] + '元')
    }
    for (item in A.canceled) {
        money_regret += A.canceled[item];
        arr.push('>' + item.slice(5, 28) + '违约金 ' + A.canceled[item] + '元')
    }
    arr.push('>小计: ' + (money + money_regret) + '元');
    return {
        str: arr.join('\n'),
        money: money_regret + money
    }
}

exports.getFee = getFee;
exports.total = total;