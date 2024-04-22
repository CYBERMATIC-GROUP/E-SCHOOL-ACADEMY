export interface ErrorInterface {
    fault: Fault
}

export interface Fault {
    faultcode: string
    faultstring: string
    detail: string
}