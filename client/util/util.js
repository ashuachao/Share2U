/**
 * 深层次的数据读取
 * @param dataList 数据的读取链  ['a', 'b', 0]
 * @param dataSource 数据源
 */
export function getDataDeep(dataList, dataSource) {
    // dataSource? dataSource[arr[0]]? dataSource[arr[0]][arr[1]]?
    return dataList.reduce((xs, x) => 
        (xs && xs[x]) ? xs[x] : null, dataSource)
}

function parseUrl(url) {
    if (typeof url !== 'string') {
        return {};
    }
    const queryString = decodeURI(url.split('?')[1]);
    const queryArr = queryString.split('&');
    return queryArr.map(function (item1, i) {
        let hashMap = item1.split('=');
        let key = hashMap[0];
        let value = hashMap[1] || true;
        if (/^\d+$/.test(hashMap[1])) {
            value = parseInt(hashMap[1]);
        }
        return { key, value }
    }).reduce(function (queryObj, item) {
        let { key, value } = item;
        if (queryObj[key]) {
            if (queryObj[key] instanceof Array) {
                queryObj[key].push(value)
            } else {
                queryObj[key] = [queryObj[key]];
                queryObj[key].push(value);
            }
        } else {
            queryObj[key] = value;
        }
        // 必须return作为下一个的prev
        return queryObj;
    }, {})
}