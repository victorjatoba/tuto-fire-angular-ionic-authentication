import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-social-media-buttons',
    templateUrl: './social-media-buttons.html',
    styleUrls: ['./social-media-buttons.scss'],
})
export class SocialMediaComponent {

    @Output() google: EventEmitter<any> = new EventEmitter<any>();
    @Output() facebook: EventEmitter<any> = new EventEmitter<any>();

    onGoogle() {
        this.google.emit();
    }

    onFacebook() {
        this.facebook.emit();
    }
}
