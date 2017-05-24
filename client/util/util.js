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