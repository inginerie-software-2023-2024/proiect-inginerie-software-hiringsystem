import { NextRequest, NextResponse } from "next/server";

const updatePersonalDetails = async (id: string, payload: string, authorizationHeader: string) => {
    const res = await fetch(
        `http://localhost:8081/api/v1/candidate/profile/update/details/${id}`,
        {
            method: "POST",
            headers: {
                Authorization: authorizationHeader,
                "Content-Type": 'application/json'
            },
            body: payload
        }
    );

    return res;
}

export async function POST(
    req: NextRequest,
    { params }: { params: { args: string[] } }
) {
    const args = params.args;
    if (args.length > 2) {
        const authHeader = req.headers.get("Authorization");
        const requestBody = await req.text();
        console.log(requestBody);
        if (args[0] === "update" && args[1] === "details") {
            if (authHeader) {
                return await updatePersonalDetails(args[2], requestBody, authHeader);
            }
            return new NextResponse("error1");
        }
    }
}
