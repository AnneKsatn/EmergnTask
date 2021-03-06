import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';


@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if(params['accessDenied']) {
        this.showMessage("Для работы с системой нужно залогиниться")
      }
    })

    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  private showMessage(text: string, type: string = 'danger'){
    this.message = new Message(type, text);
    window.setTimeout(()=> {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(){
    const formData = this.form.value;
    this.usersService.getUserByLogin(formData.login).subscribe((user: User)=> {
      if (user) {
        if(user.password == formData.password){
          this.message.text='';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
            this.router.navigate(['/system/main'], {
              queryParams: {
                login: user.login
              }
            });
        } else {
          this.showMessage("Пароль не верный!");
        }

      } else {
        this.showMessage("Пользователя нет!");
      }
    })
  }

}
