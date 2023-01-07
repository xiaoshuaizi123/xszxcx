function istruephone(str) {
    let rule = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!rule.test(str)) {
        return false
    } else {
        return true
    }
}
module.exports = {
    istruephone
}