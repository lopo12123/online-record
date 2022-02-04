function parseDate(ori: string): number
function parseDate(ori: number): string
function parseDate(ori: string | number): number | string {
    switch (typeof ori) {
        case 'string':
            return (new Date(ori)).getTime()
        case 'number':
            const time = new Date()
            time.setTime(ori)

            const part1 = time
                .toLocaleDateString('zh-cn')
                .split('/')
                .map((item) => {
                    return parseInt(item) < 10 ? '0'+item : item
                })
                .join('-')
            const part2 = time
                .toLocaleTimeString('zh-cn', { hour12: false })

            return part1 + ' ' + part2
        default:
            throw new Error('EType')
    }
}

export {
    parseDate
}
