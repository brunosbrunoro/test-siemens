import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {ApiEquipmentService} from "../../api/equipments.api";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {EquipmentDto} from "../../dto/equipment.dto";
import {ApiPointService} from "../../api/point.api";
import {PointDto} from "../../dto/point.dto";


@Component({
  selector: 'point',
  templateUrl: './point.component.html'
})
export class PointDialogComponent {

  @Input() pointId: string;
  @Input() equipmentId: string;

  form: UntypedFormGroup;

  data: PointDto;

  constructor(public activeModal: NgbActiveModal,
              private apiService: ApiPointService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private _formBuilder: UntypedFormBuilder,
              private changeDetectorRefs: ChangeDetectorRef){ }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name : ['', Validators.required],
      value : ['', Validators.required],
      dataType : ['', Validators.required],
    });

    if(this.pointId !== undefined && this.pointId !== null) {
      this.spinner.show()
      this.apiService.get(this.pointId).subscribe({
        next: (data) => {
          this.data = data.body;
          this.spinner.hide()

          this.form.controls['name'].setValue(this.data.name)
          this.form.controls['value'].setValue(this.data.value)
          this.form.controls['dataType'].setValue(this.data.dataType)
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
      this.data = new PointDto();
    }

    this.data.name = this.form.value.name;
    this.data.value = this.form.value.value;
    this.data.dataType = this.form.value.dataType;
    debugger
    if(this.data.equipment === undefined){
      this.data.equipment = new EquipmentDto();
    }
    this.data.equipment._id = this.equipmentId;

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
