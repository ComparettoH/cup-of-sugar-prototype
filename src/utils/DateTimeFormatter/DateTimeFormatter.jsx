import dayjs from "dayjs";

export function DateTimeFormatter() {
    return(
        dayjs().format('MM/DD/YY [at] HH:mm')
    )
}

export function DateFormatter() {
    return(
        dayjs().format('MM/DD/YY')
    )
}
