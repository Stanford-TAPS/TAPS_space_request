import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../../../components/emails/request-recieved";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: "Stanford T&PS <taps_requests@stanford.edu>",
            to: ["emorenoa@stanford.edu"],
            subject: "Hello world",
            react: EmailTemplate({ firstName: "John" }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
