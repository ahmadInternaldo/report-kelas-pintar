export class RequestLoginDto {

  role: string;
  username: string;
  password: string;

}

export class ResponseLoginDto {
  messageDetail: string;
  tokenSession: string;
}