import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';

@NgModule({
    declarations: [PostComponent],
    imports: [IonicModule],
    exports: [PostComponent]
})

export class ComponentsModule{}