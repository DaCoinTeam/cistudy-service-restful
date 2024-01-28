import { appConfig, thirdPartyConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { createTransport } from "nodemailer"
import { InternalServerErrorException } from "@nestjs/common"
import { AuthManagerService } from "../base"

@Injectable()
export default class MailerService {
    constructor(
		private readonly authManagerService: AuthManagerService
	) {}

    private transporter = createTransport({
        service: "gmail",
        auth: {
            user: thirdPartyConfig().mailer.user,
            pass: thirdPartyConfig().mailer.pass,
        },
    })

    private mailOptions = (userId: string, email: string) => {
        const appUrl = appConfig().appUrl
        const token = this.authManagerService.(userId)
        return {
            from: thirdPartyConfig().mailer.user,
            to: email,
            subject: "REGISTRATION CONFIRMATION - CISTUDY",
            html: `
			<p>Dear ${email},</p>
			<p>To complete your registration, please click on the confirmation link below:</p>
			<a href="${appUrl}/auth/verify-registration?&token=${token}">Here</a>
			<p>If you did not sign up for CiStudy, you can ignore this email.</p>
			<p>Best regards,</p>
			<p>Tu Cuong</p>
			<p>C.E.O of CiStudy</p>`,
        }
    }

    async sendMail(userId: string, email: string) {
        try {
            this.transporter.sendMail(this.mailOptions(userId, email))
        } catch (ex) {
            console.error(ex)
            throw new InternalServerErrorException(
                "Unable to deliver email due to a temporary server issue. We apologize for the inconvenience. Please try again later.",
            )
        }
    }
}
