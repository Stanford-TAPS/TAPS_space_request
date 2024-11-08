import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    groupName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    location,
    date,
    startTime,
    endTime,
    groupName,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <img
            src={`https://request.taps.stanford.edu/logo.png`}
            alt="Stanford Logo"
            width="100"
            height="100"
            style={{ display: 'block', marginBottom: '24px' }}
        />
        <h1 style={{ color: '#8C1515', marginBottom: '24px' }}>Booking Request Received for {location}!</h1>

        <p>Hello {firstName},</p>
        <p>Your booking request for <b>{groupName}</b> has been received. We will get back to you soon with booking confirmation and final details.</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '24px 0' }}>
            <tbody>
                <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Location:</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{location}</td>
                </tr>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Date:</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{date}</td>
                </tr>
                <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Start Time:</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{startTime}</td>
                </tr>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>End Time:</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{endTime}</td>
                </tr>
            </tbody>
        </table>

        <p>If you wish to cancel your booking, please contact us at <a href="mailto:taps_requests@stanford.edu" style={{ color: '#8C1515' }}>taps_requests@stanford.edu</a> or by replying to this email.</p>
        <p>Thank you!</p>
    </div>
);
