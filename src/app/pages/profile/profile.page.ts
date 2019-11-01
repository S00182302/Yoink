import { Component, OnInit } from '@angular/core';
import { YoinkService } from 'src/app/services/yoink.service';
import { StoredataService } from 'src/app/services/storedata.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/components/post/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  slug = '';
  user: any;
  userLoaded: Boolean = false;
  posts: Post[] = [];
  pageNumber: number = 1;
  postLoaded: Boolean = false;
  numberOfPages: number;

  constructor(
    private yoinkService: YoinkService,
    private storageService: StoredataService,
    private route: ActivatedRoute
  ) {}

  loadData = event => {
    this.pageNumber++;
    setTimeout(async () => {
      await this.storageService.getAuth().then(auth => {
        this.getAllPost(auth['token'], this.pageNumber, 10);
      });
      console.log('page', this.pageNumber);

      event.target.complete();
      console.log('Posts length:', this.posts.length);

      if (this.pageNumber == this.numberOfPages) {
        event.target.disabled = true;
      }
    }, 500);
  };

  getAllPost = async (token, page, perPage) => {
    await this.yoinkService.getFeed(token, page, perPage).subscribe(posts => {
      console.log('Retrived posts in Home page:', posts);
      this.postLoaded = true;
      const array = posts['posts']['docs'];
      this.numberOfPages = posts['posts']['pages'];

      array.forEach(post => {
        this.posts.push(post);
      });
    });
  };

  getUserAuth = () => {
    this.storageService.getAuth().then(auth => {
      this.getSingleUser(auth.id, auth.token);
      this.userLoaded = true;
    });
  };

  getSingleUser = (id, token) => {
    this.yoinkService.getSingleUser(id, token).subscribe(user => {
      this.user = user;
    });
  };

  ngOnInit() {
    this.getUserAuth();
    this.slug = this.route.snapshot.paramMap.get('id');
    if (this.user != null) this.posts = this.user.savedPosts;
  }
}
