import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {


  constructor() {

  }

  getConfigDate(): any {
    return localStorage.getItem(config_key_name);
  }

  setConfigDate(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    }

    if (name) {
      config.showSlide = showSlide;
    }

    if (showSlide) {
      config.name = name;
    }

    if (showSlide) {
      config.username = username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }


}
