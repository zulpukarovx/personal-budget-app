import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
    // clearing localstorage
    deleteItem({key: "userName"})
    deleteItem({key: "budgets"})
    deleteItem({key: "expenses"})
    // notifying user of logging out
    toast.success("You've logged out")
    // redirecting to the main page
    return redirect("/")
}