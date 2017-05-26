/**
 * Created by MBENBEN on 2017/5/26.
 */
module.exports = (obj, method) => {
    return function () {
        let params = arguments;
        return new Promise((resolve, reject) => {
            obj[method](...params, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res);
            })
        });
    }
}