import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { Post } from 'src/app/models/post';
import { StoredataService } from 'src/app/services/storedata.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss']
})
export class CommentsPage implements OnInit {
  postId: string;
  post: Post;
  auth: any;
  user: User;
  postLoaded: boolean = false;
  @ViewChild('inputComment', { static: false }) commentInputEl: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private yoinkService: YoinkService,
    private localStorage: StoredataService
  ) {}

  getSinglePost = (id, token) => {
    this.yoinkService.getSinglePost(id, token).subscribe(
      post => {
        this.post = null;
        this.post = post;
        this.postLoaded = true;
        console.log('SINGLE POST IN COMMENTS PAGE:', this.post);
      },
      error => {
        console.log(error.message);
      }
    );
  };

  postComment = async comment => {
    let newComment = {
      comment,
      user_id: this.auth.id
    };

    await this.yoinkService
      .postComment(this.postId, this.auth.token, newComment)
      .subscribe(
        res => {
          console.log(res['message']);
        },
        error => {
          console.log(error.error.message);
        }
      );

    this.getSinglePost(this.postId, this.auth.token);
  };

  getUser = (user_id, token) => {
    this.yoinkService.getSingleUser(user_id, token).subscribe(user => {
      this.user = user;
    });
  };

  likeComment = () => {
    console.log('liked comment called');
  };

  ionViewWillEnter = async () => {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');

    this.auth = await this.localStorage.getAuth();

    this.getUser(this.auth.id, this.auth.token);

    this.getSinglePost(this.postId, this.auth.token);
  };

  async ngOnInit() {}
}
