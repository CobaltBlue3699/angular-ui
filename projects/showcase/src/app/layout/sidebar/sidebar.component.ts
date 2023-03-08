import { Routes } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { routes as defaultMenu } from '../../guide/guide-routing.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input()
  width!: string;

  public routes = defaultMenu
    .flatMap((route) => {
      if (route.children) {
        // 待變成群組
        return [route, ...route.children];
      }
      return [route];
    })
    .filter((route) => route.data && route.data.isMenu);
  public isShrink: boolean = false;

  constructor() {}
  ngOnInit(): void {}
}
