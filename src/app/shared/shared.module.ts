import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ErrorPopover } from './components/popover/error-popover/error.popover';
import { SocialMediaComponent } from './components/social-media-buttons/social-media-buttons';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        ErrorPopover,
        SocialMediaComponent
    ],
    exports: [
        SocialMediaComponent
    ],
    entryComponents: [
        ErrorPopover,
    ]
})
export class SharedModule { }
