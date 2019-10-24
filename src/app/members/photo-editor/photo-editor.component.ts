import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo.model';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifysService } from 'src/app/_services/alertifys.service';
import { UserService } from 'src/app/_services/user.service';



@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMainPhoto = new EventEmitter<string>();
  currentMain : Photo;
  baseUrl = environment.apiURL;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean = false;
 

  constructor(private authService: AuthService, private alertify: AlertifysService, private userService: UserService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader()
  {
    this.uploader = new FileUploader({
      url: this.baseUrl+"users/"+this.authService.decodeToken.nameid+"/photos",
      authToken: "Bearer "+ localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onSuccessItem = (item, response, status, Headers) => {
      if (response) {
        const res : Photo = JSON.parse(response);
        const photo = {
          id : res.id,
          url : res.url,
          dateAdded : res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeUserMainPhoto(photo.url);
      this.authService.currentUser.photoURL = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo)
  {
    this.userService.setMainPhoto(this.authService.decodeToken.nameid, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.authService.changeUserMainPhoto(photo.url);
      this.authService.currentUser.photoURL = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error =>{
      this.alertify.error(" Error Occured!");
    });
  }

  deletePhoto(id: number)
  {
    this.alertify.confirm("Are you sure you want to delete this photo?", () => {
      this.userService.deletePhoto(this.authService.decodeToken.nameid, id).subscribe(()=> {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success("Photo has been deleted successfully!");
      }, error =>{
        this.alertify.error("Failed to delete the photo");
      });
    });
  }

}
