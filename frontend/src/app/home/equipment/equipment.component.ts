import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {ApiEquipmentService} from "../../api/equipments.api";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {EquipmentDto} from "../../dto/equipment.dto";


@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html'
})
export class EquipmentDialogComponent {

  @Input() equipmentId: string;

  form: UntypedFormGroup;

  data: EquipmentDto;

  constructor(public activeModal: NgbActiveModal,
              private apiService: ApiEquipmentService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private _formBuilder: UntypedFormBuilder,
              private changeDetectorRefs: ChangeDetectorRef){ }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name : ['', Validators.required],
      serialNumber : ['', Validators.required],
    });

    if(this.equipmentId !== undefined && this.equipmentId !== null) {
      this.spinner.show()
      this.apiService.get(this.equipmentId).subscribe({
        next: (data) => {
          this.data = data.body;
          this.spinner.hide()

          this.form.controls['name'].setValue(this.data.name)
          this.form.controls['serialNumber'].setValue(this.data.serialNumber)
          this.changeDetectorRefs.detectChanges();
        },
        error: (error) => {
          this.spinner.hide();
          if (error) {
            this.toastr.error(error.error.error);
          }
        }
      });
    }
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    // Disable the form
    this.form.disable();

    if (this.data === undefined) {
      this.data = new EquipmentDto();
    }

    this.data.name = this.form.value.name;
    this.data.serialNumber = this.form.value.serialNumber;

    this.spinner.show()

    if (this.data._id !== undefined) {

      this.apiService.update(this.data._id, this.data).subscribe({
        next: (response) => {
          this.spinner.hide();

          this.activeModal.close()

        },
        error: (error) => {
          this.form.enable();
          this.spinner.hide();
          if (error) {
            this.toastr.error(error.error.error);
          }
        }
      });
    } else {
      this.apiService.create(this.data).subscribe({
        next: (response) => {
          this.spinner.hide();

          this.activeModal.close()

        },
        error: (error) => {
          this.form.enable();
          this.spinner.hide();
          if (error) {
            this.toastr.error(error.error.error);
          }
        }
      });
    }
  }
}
