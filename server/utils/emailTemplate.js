const generateContactEmailTemplate = (name, email, subject, message) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 0; border-radius: 10px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px 32px;">
                <h2 style="color: #fff; margin: 0; font-size: 1.4rem;">📬 New Portfolio Message</h2>
            </div>
            <div style="padding: 28px 32px; background: #ffffff;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #555; width: 90px;"><strong>Name:</strong></td>
                        <td style="padding: 8px 0; color: #222;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #555;"><strong>Email:</strong></td>
                        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #555;"><strong>Subject:</strong></td>
                        <td style="padding: 8px 0; color: #222;">${subject}</td>
                    </tr>
                </table>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;"/>
                <p style="margin: 0 0 8px; color: #555;"><strong>Message:</strong></p>
                <div style="background: #f3f4f6; border-left: 4px solid #8b5cf6; padding: 16px; border-radius: 6px; color: #222; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="padding: 16px 32px; background: #f3f4f6; text-align: center; color: #888; font-size: 0.8rem;">
                Sent via your portfolio contact form • Reply to respond to ${name}
            </div>
        </div>
    `;
};

const generateReceiptEmailTemplate = (name) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 0; border-radius: 10px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px 32px;">
                <h2 style="color: #fff; margin: 0; font-size: 1.4rem;">📬 Message Received</h2>
            </div>
            <div style="padding: 28px 32px; background: #ffffff;">
                <p style="color: #555; font-size: 1.1rem; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
                <p style="color: #555; font-size: 1rem; line-height: 1.6;">
                    Thank you for reaching out! I have successfully received your message and will get back to you as soon as possible.
                </p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;"/>
                <p style="color: #555; font-size: 0.9rem; line-height: 1.6;">
                    Best regards,<br/>
                    <strong>Raushan Kumar</strong>
                </p>
            </div>
            <div style="padding: 16px 32px; background: #f3f4f6; text-align: center; color: #888; font-size: 0.8rem;">
                This is an automated confirmation email. Please do not reply directly to this message.
            </div>
        </div>
    `;
};

module.exports = { generateContactEmailTemplate, generateReceiptEmailTemplate };
