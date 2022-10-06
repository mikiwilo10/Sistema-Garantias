export const emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const nombreApellidoPattern: string = "([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}";
export const validarPassword      : string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';