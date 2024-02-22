import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from "bcryptjs";
import { segRepository } from '../modules/seguridad/seg.repository';

export const localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username: string, password: string, done: any) => {
    try {
        const user: any = await segRepository.usuarioByUsername(username);
        if (!user) return done(null, false, { message: 'El usuario no se encuentra registrado.' });
        console.log(user);
        

        const contrasena = user[0].password;
        const isMatch = await bcrypt.compareSync(password, contrasena);

        if (!isMatch) {
            // await userRepository.incrementLoginAttempts(username);
            return done(null, false, { message: 'Contraseña incorrecta.' });
        } 
        // else {
        //     await userRepository.resetLoginAttempts(username);
        // }
        return done(null, user);

    } catch (err) {
        return done(err, false);
    }
});

