import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }
  ngOnInit() {
  }

  public getToaster(message: string, toasterType: string, header: string) {
    if (toasterType.toLowerCase() === "success") {
      this.toastr.success(message, header);
    }
    else if (toasterType.toLowerCase() === "error") {
      this.toastr.error(message, header);
    }
    else if (toasterType.toLowerCase() === "warning") {
      this.toastr.warning(message, header);
    }
    else if (toasterType.toLowerCase() === "info") {
      this.toastr.info(message, header);
    }
  }

}
