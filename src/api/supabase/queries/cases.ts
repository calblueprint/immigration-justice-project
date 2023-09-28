import supabase from "../createClient";

export async function getAllCases() {
    const { data, error } = await supabase.from("cases").select();

    if (error) {
        throw new Error(`An error occurred trying to read cases: ${error}`);
    }

    return data;
}

export async function getAllProfiles() {
    const { data, error } = await supabase.from("profiles").select();

    if (error) {
        throw new Error(`An error occurred trying to read cases: ${error}`);
    }

    return data;
}

