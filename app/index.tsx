import { Redirect } from "expo-router";

export default function root() {
    return <Redirect href={"/login"}/>
}
