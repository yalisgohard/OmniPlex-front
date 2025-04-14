export class User {
    id: number = -1;
    first_name: string = '';
    last_name: string = '';
    email: string = '';
    phone: string = '';
    role: EUserRole = EUserRole.USER;
    profile_picture: string = '';
    allowed_apps: EApps[] = [];
    apps: IApp[]= [];
}

export enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum EApps {
  PORTAIL = 'Portail',
  ADMIN = 'Admin',
  MARKET = 'Market',
  TAKE = 'Take',
}

export interface IApp {
  name: string;
  icon: string;
  url: string;
}
