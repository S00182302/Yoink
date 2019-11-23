import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoinkService } from 'src/app/services/yoink.service';
import { Post } from 'src/app/models/post';
import { StoredataService } from 'src/app/services/storedata.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss']
})
export class CommentsPage implements OnInit {
  postId: string;
  post: Post;
  auth: any;
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
        this.post = post;
        console.log('SINGLE POST IN COMMENTS PAGE:', this.post);
        this.postLoaded = true;
      },
      error => {
        console.log(error.message);
      }
    );
  };

  postComment = comment => {
    let newComment = {
      comment,
      user_id: this.auth.id
    };

    this.yoinkService
      .postComment(this.postId, this.auth.token, newComment)
      .subscribe(
        res => {
          console.log(res['message']);
        },
        error => {
          console.log(error);
        }
      );
  };

  async ngOnInit() {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.auth = await this.localStorage.getAuth();

    // this.router.getCurrentNavigation;
    // setTimeout(() => this.commentInputEl.nativeElement.focus());
    this.getSinglePost(this.postId, this.auth.token);
    this.postComment(this.postId);
  }
}
