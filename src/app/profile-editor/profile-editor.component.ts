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
  profileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: [""],
    address: this.fb.group({
      street: ["street"],
      city: ["city"],
      state: ["state"],
      zip: ["zip"]
    }),
    aliases: this.fb.group({
      sum: { value: 0, disabled: true },
      entries: this.fb.array([this.fb.control(6)])
    })
  });

  get aliases() {
    return this.profileForm.get("aliases.entries") as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.updateProfile();
    let updateSum = () =>
      this.profileForm
        .get("aliases.sum")
        .setValue(_.sum(this.profileForm.value.aliases.entries), {
          emitEvent: false
        });
    updateSum();
    this.profileForm.valueChanges.subscribe(() => {
      updateSum();
    });
  }

  switchActivation(active: boolean) {
    active ? this.profileForm.disable() : this.profileForm.enable();
  }

  setAddress() {
    this.profileForm.get("address").setValue({
      street: "set street",
      city: "set city",
      state: null,
      zip: null
    });
  }

  patchAddress() {
    this.profileForm.get("address").patchValue({
      street: "patched street",
      city: "patched city"
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
