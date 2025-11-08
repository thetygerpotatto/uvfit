
export interface User {
    email: String
    password: String
}

export interface userEntry {
  Email: string;
  isNew: boolean;
}

export interface userDataEntry {
    name: string | null | undefined
    age: number | null | undefined
    height: number | null | undefined
    weight: number | null | undefined
    gender: string | null | undefined
    activity: string | null | undefined
    laydowntime: string | null | undefined
    isNew: boolean | null | undefined
}
