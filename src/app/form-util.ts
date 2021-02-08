import { FormControl } from "@angular/forms";

export class FormUtil {
  config = { emitEvent: false };

  reset(control: FormControl, config?: any) {
    control.reset(null, { ...config, ...this.config });
  }

  setValue(control: FormControl, value: any, config?: any) {
    control.setValue(value, { ...config, ...this.config });
  }

  patchValue(control: FormControl, value: any, config?: any) {
    control.patchValue(value, { ...config, ...this.config });
  }

  execWithoutEmit(fn: () => {}) {
    let config = this.config;
    try {
      this.config = { emitEvent: false };
      fn();
    } finally {
      this.config = config;
    }
  }
}
