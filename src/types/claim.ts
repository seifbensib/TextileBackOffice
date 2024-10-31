export type Claim = {
  _id:string;
  name: string;
  email: string;
  title: string;
  description: string;
  content: string;
  read: boolean;
  employee: string | { _id: string; username: string; email: string; password: string; role: string; };

};
