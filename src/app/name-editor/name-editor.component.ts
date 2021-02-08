import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormUtil } from "../form-util";

@Component({
  selector: "app-name-editor",
  templateUrl: "./name-editor.component.html",
  styleUrls: ["./name-editor.component.css"]
})
export class NameEditorComponent implements OnInit {
  name = new FormControl("");
  fu = new FormUtil();

  updateName() {
    this.name.setValue("Nancy");
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe(() => {
      console.log("value:", this.name.value);
      this.fu.execWithoutEmit(() => {
        this.fu.setValue(this.name, "peter");
        //this.fu.reset(this.name);
      });
    });
  }
}
