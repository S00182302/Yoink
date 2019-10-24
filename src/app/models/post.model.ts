import { PostLocation } from './location.model';

export class Post {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public category: string,
    public imageUrl: string,
    public price: number,
    public availableFrom: Date,
    public availableTo: Date,
    public userId: string,
    public location: PostLocation,
    public storeName: string
  ) { }
}
