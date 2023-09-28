"use client"

import React from 'react'
import { getAllCases } from "../../api/supabase/queries/cases";

export default async function page() {

    return (
        <div>
            <tr>
                <th>id</th>
                <th>summary</th>
                <th>languages</th>
                <th>country</th>
                <th>legalServerId</th>
                <th>clientInitials</th>
                <th>timeToComplete</th>
                <th>isRemote</th>
                <th>clientLocation</th>
                <th>program</th>
                <th>upcomingHearingDate</th>
                <th>needsInterpreter</th>
                <th>interestIds</th>
            </tr>

        </div>
    )
}
