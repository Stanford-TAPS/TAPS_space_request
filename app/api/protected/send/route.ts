import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../../../components/emails/request-recieved";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: "Stanford T&PS <taps_requests@stanford.edu>",
            to: ["lsfowler@stanford.edu"],
            subject: "T&PS Booking Request Received",
            react: EmailTemplate({
                firstName: "John",
                groupName: "Stanford Improvisors",
                location: "TAPS",
                date: "2024-01-01",
                startTime: "10:00",
                endTime: "11:00",
            }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
