export function initRecordList(accountId) {
    return JSON.parse(localStorage.getItem(`webchat_recordList_${accountId}`)) || []

    /*
        console.log(accountId);
        return [
            {
                id: '1',
                latestMsg: 'Hi!',
                timestamp: 1,
                isSelected: false
            },
            {
                id: '2',
                latestMsg: 'wwwwwwwwwwwwwwwwwwwwwwwwwwww',
                timestamp: 100000000009,
                isSelected: false
            },
            {
                id: '3',
                latestMsg: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                timestamp: 103,
                isSelected: false
            }
        ]
    */
}

export function storeRecordList(accountId, recordList) {
    localStorage.setItem(`webchat_recordList_${accountId}`, JSON.stringify(recordList))
}