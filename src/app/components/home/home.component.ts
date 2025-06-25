import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
featuredBooks = [
    {
      title: 'The Beginning',
      description: 'An inspiring story of new journeys and adventures.',
      image: 'https://wallpapers.com/images/hd/beginning-book-zvfkhpycnommthcq.jpg'

    },
    {
      title: 'Time Traveler',
      description: 'Explore past and future through exciting time travel.',
      image: 'https://i.pinimg.com/originals/ba/1a/f7/ba1af779097014f2e6b8ede3a665e774.jpg'
    },
    {
      title: 'Learn to Code',
      description: 'Your first step toward becoming a software developer.',
      image: 'https://as2.ftcdn.net/v2/jpg/01/67/48/25/1000_F_167482518_zZXc4YmELigfoIA8fIFZJBNfuH3rqUwg.jpg'
    }
  ];

}
