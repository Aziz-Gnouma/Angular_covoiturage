export interface User {
  id: number;
    role: Role;
    password: string;
    username: string;
    enabled: boolean;
    email: string;
    token : string ;
}
export interface Register {
    id: number;
    password: string;
    name: string;
    email: string;
    roleName : string 
}
export interface Role {
  id: number;
  name:string;

}
export interface Login{
  name: string;
  password: string
}












