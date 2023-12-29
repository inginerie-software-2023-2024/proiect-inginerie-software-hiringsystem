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
            body: JSON.stringify(payload)
        }
    );

    return res;
}

const updateAcademicBackground = async (id: string, payload: string, authorizationHeader: string) => {
    const res = await fetch(
        `http://localhost:8081/api/v1/candidate/profile/update/academic/${id}`,
        {
            method: "POST",
            headers: {
                Authorization: authorizationHeader,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
        }
    );

    return res;
}

const updateWorkExperience = async (id: string, payload: string, authorizationHeader: string) => {
    const res = await fetch(
        `http://localhost:8081/api/v1/candidate/profile/update/work/${id}`,
        {
            method: "POST",
            headers: {
                Authorization: authorizationHeader,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
        }
    );

    return res;
}


const updateProjects = async (id: string, payload: string, authorizationHeader: string) => {
    const res = await fetch(
        `http://localhost:8081/api/v1/candidate/profile/update/projects/${id}`,
        {
            method: "POST",
            headers: {
                Authorization: authorizationHeader,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
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
        const requestBody = await req.json();
        if (args[0] === "update" && args[1] === "details") {
            if (authHeader) {
                return await updatePersonalDetails(args[2], requestBody, authHeader);
            }
            return new NextResponse("error1");
        }
        else if (args[0] === "update" && args[1] === "academic") {
            if (authHeader) {
                return await updateAcademicBackground(args[2], requestBody, authHeader);
            }
            return new NextResponse("error2");
        }
        else if (args[0] === "update" && args[1] === "work") {
            if (authHeader) {
                return await updateWorkExperience(args[2], requestBody, authHeader);
            }
            return new NextResponse("error3");
        }
        else if (args[0] === "update" && args[1] === "projects"){
            if (authHeader) {
                return await updateProjects(args[2], requestBody, authHeader);
            }
            return new NextResponse("error4");
        }
    }
    return new NextResponse("error5"); 
}
