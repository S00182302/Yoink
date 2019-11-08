import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss']
})
export class CommentsPage implements OnInit {
  postId: string;
  @ViewChild('inputComment', { static: false }) commentInputEl: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.router.getCurrentNavigation;
    setTimeout(() => this.commentInputEl.nativeElement.focus());

    console.log(this.postId);
  }
}
