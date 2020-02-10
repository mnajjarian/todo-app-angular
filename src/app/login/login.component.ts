import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", Validators.compose([Validators.required])),
    password: new FormControl("", Validators.compose([Validators.required]))
  });

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  login(formData: FormGroup) {
    if (formData.valid) {
      this.authService.login(formData.value.username, formData.value.password);
    }
  }

  signup(email: string, password: string) {
    this.authService.signup(email, password);
  }
}
