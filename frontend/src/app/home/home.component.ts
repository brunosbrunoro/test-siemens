import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiEquipmentService} from "../api/equipments.api";
import {EquipmentDto} from "../dto/equipment.dto";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EquipmentDialogComponent} from "./equipment/equipment.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

  list: EquipmentDto[];
  data: EquipmentDto[];


  @ViewChild('equipmentsTable') table: any;
  constructor(private modalService: NgbModal,private apiService: ApiEquipmentService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.load();
  }

  load() {
    this.spinner.show();

    this.apiService.getAll().subscribe({
      next: (data) => {
        this.data = data.body;
        this.list = this.data;
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        if (error) {
          this.toastr.error(error.error.error);
        }
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    if (val === '') {
      this.list = this.data;
    } else {

      const temp = this.data.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });


      // update the rows
      this.list = temp;
    }


  }

  createEquipment() {
    const modalRef = this.modalService.open(EquipmentDialogComponent);
    modalRef.result.then((data) => {
      this.load();
    }, (reason) => {
      this.load();
    });
  }

  updateEquipment(equipmentId: string) {

    const modalRef = this.modalService.open(EquipmentDialogComponent);
    modalRef.componentInstance.equipmentId = equipmentId;
    modalRef.result.then((data) => {
      this.load();
    }, (reason) => {
      this.load();
    });
  }

  deleteEquipment(equipmentId: string) {
    this.apiService.delete(equipmentId).subscribe({
      next: (data) => {
        this.list = this.data;
        this.spinner.hide();
        this.load();
      },
      error: (error) => {
        this.spinner.hide();
        if (error) {
          this.toastr.error(error.error.error);
        }
      }
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
