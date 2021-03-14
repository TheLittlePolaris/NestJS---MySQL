import { Observable } from "rxjs"

export interface IMailService {
  sendEmail: (data: IEmailInput) => Observable<IEmailStatus>;
}

export interface IEmailInput {
  mailTemplateName: string;
  firstName: string;
  lastName: string;
  userId: string;
}

export interface IEmailStatus {
  status: boolean;
  error?: string;
}
