import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,

    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
