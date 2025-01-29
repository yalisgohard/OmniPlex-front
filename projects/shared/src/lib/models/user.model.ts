export class User {
    first_name: string = '';
    last_name: string = '';
    email: string = '';
    role: string = '';
    allowedApps: [string | null] = [null];
}