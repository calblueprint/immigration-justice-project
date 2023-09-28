import { supabase } from "../createClient";

export async function getAllCases() {
    const { data, error } = await supabase.from("cases").select();

    if (error) {
        console.error("An error occurred trying to read cases:", error);
        return;
    }

    return data;
}

