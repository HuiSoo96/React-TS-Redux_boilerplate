export const DateFormat1 = (date: string) => {

    const searchCh = date.indexOf('T', 0)

    const YMD = date.substr(2, searchCh - 2)
    const HM = date.substr(searchCh + 1, 5)
    return `${YMD} ${HM}`
}