import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";

import * as _ from "lodash";

@Component({
  selector: "app-profile-editor",
  templateUrl: "./profile-editor.component.html",
  styleUrls: ["./profile-editor.component.css"]
})
export class ProfileEditorComponent implements OnInit {
  aliasSum = 0;

  profileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: [""],
    address: this.fb.group({
      street: [""],
      city: [""],
      state: [""],
      zip: [""]
    }),
    aliases: this.fb.array([this.fb.control(0)])
  });

  get aliases() {
    return this.profileForm.get("aliases") as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm.valueChanges.subscribe(() => {
      this.aliasSum = _.sum(this.profileForm.value.aliases);
    });
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: "Nancy",
      address: {
        street: "123 Drew Street"
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(Math.floor(2 + Math.random() * 10)));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.profileForm.value);
    console.log("submit");
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
