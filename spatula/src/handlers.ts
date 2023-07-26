import { readFileSync } from 'fs'

// TODO
export const fileReaderHandler = (path: string) => readFileSync(path, { encoding: 'utf8', flag: 'r' })

// TODO
export const proxyCallHandler = (url: string) => url
