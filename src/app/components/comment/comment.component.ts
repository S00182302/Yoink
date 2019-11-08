import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() postId: string;
  constructor() {}

  ngOnInit() {
    console.log('post id in comment component:', this.postId);
  }
}
