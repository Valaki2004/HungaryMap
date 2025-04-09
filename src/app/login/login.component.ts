import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentLang: any;
  email: string = '';
  password: string = '';
  loginError: string = '';
  cursorStyle = 'pointer';

  constructor(
    private translate: TranslateService, 
    private authService: AuthService, 
    private router: Router
  ) {
    const en = {
      "LOGIN": {
        "TITLE": "Login",
        "EMAIL": "Email",
        "EMAIL_PLACEHOLDER": "Enter your email",
        "PASSWORD": "Password",
        "PASSWORD_PLACEHOLDER": "Enter your password",
        "SUBMIT": "Login",
        "REMEMBER_ME": "Remember me",
        "FORGOT_PASSWORD": "Forgot password?",
        "REGISTER": "Don't have an account? Register"
      }
    };

    const hu = {
      "LOGIN": {
        "TITLE": "Bejelentkezés",
        "EMAIL": "Email",
        "EMAIL_PLACEHOLDER": "Add meg a email címed",
        "PASSWORD": "Jelszó",
        "PASSWORD_PLACEHOLDER": "Add meg a jelszavad",
        "SUBMIT": "Bejelentkezés",
        "REMEMBER_ME": "Emlékezz rám",
        "FORGOT_PASSWORD": "Elfelejtetted a jelszavad?",
        "REGISTER": "Nincs még fiókod? Regisztrálj"
      }
    };

    translate.setTranslation('en', en, true);
    translate.setTranslation('hu', hu, true);
    translate.setDefaultLang('hu');
    translate.use('hu');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  login() {
    if (!this.email || !this.password) {
      console.error("Adj meg egy e-mailt és egy jelszót!");
      this.loginError = 'Kérlek, add meg az e-mail címet és a jelszót!';
      return;
    }
  
    this.authService.login(this.email, this.password)
      .then(res => {
        if (res.success) {
          console.log("Sikeres bejelentkezés!");
          this.router.navigate(['/map']);
        } else {
          console.error("Hiba történt:", res.message);
          this.loginError = res.message
        }
      })
      .catch(err => {
        console.error("Hiba történt:", err.message);
        this.loginError = 'Az email cím jelszó páros nem megfelelő';
      });
  }
  

  register() {
    if (!this.email || !this.password) {
      console.error("Adj meg egy e-mailt és egy jelszót!");
      this.loginError = 'Kérlek, add meg az e-mail címet és a jelszót!';
      return;
    }

    const displayName = 'Felhasználó neve';

    this.authService.register(this.email, this.password, displayName)
      .then(res => {
        console.log("Sikeres regisztráció!", res);
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error("Regisztrációs hiba:", err.message);
        this.loginError = 'Regisztrációs hiba történt, próbáld újra!';
      });
  }

  registerWithGoogle()  {
    this.authService.loginWithGoogle()
      .then(res => {
        console.log("Sikeres Google bejelentkezés!", res);
        this.router.navigate(['/shop']);
      })
      .catch(err => {
        console.error("Hiba történt a Google bejelentkezés során!", err.message);
        this.loginError = 'Hiba történt a Google bejelentkezés során.';
      });
  }
  registerWithFacebook() {
    this.authService.loginWithFacebook()
    .then(res => {
      console.log("Sikeres Google bejelentkezés!", res);
      this.router.navigate(['/shop']);
    })
    .catch(err => {
      console.error("Hiba történt a Google bejelentkezés során!", err.message);
      this.loginError = 'Hiba történt a Google bejelentkezés során.';
    });
  }
  registerWithGithub() {
    this.authService.loginWithGithub()
    .then(res => {
      console.log("Sikeres Google bejelentkezés!", res);
      this.router.navigate(['/shop']);
    })
    .catch(err => {
      console.error("Hiba történt a Google bejelentkezés során!", err.message);
      this.loginError = 'Hiba történt a Google bejelentkezés során.';
    });
  }
  private handleLoginError(err: any) {
    switch (err.code) {
      case 'auth/user-not-found':
        this.loginError = 'Nincs ilyen felhasználó regisztrálva ezzel az e-mail címmel.';
        break;
      case 'auth/wrong-password':
        this.loginError = 'Hibás jelszó. Próbáld újra!';
        break;
      default:
        this.loginError = 'Ismeretlen hiba történt. Kérlek próbáld újra!';
        break;
    }
  }
}