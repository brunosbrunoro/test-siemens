import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PointDto} from "../../dto/point.dto";
import {ApiPointService} from "../../api/point.api";
import {PointDialogComponent} from "../point/point.component";

@Component({
  selector: 'list-point',
  templateUrl: './list-point.component.html'
})
export class ListPointComponent implements OnInit{

  @Input() equipmentId: string;

  list: PointDto[];
  data: PointDto[];


  @ViewChild('pointTable') table: any;
  constructor(private modalService: NgbModal,private apiService: ApiPointService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.load();
  }

  load() {
    this.spinner.show();

    this.apiService.getAllEquipment(this.equipmentId).subscribe({
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

  createPoint() {
    const modalRef = this.modalService.open(PointDialogComponent);
    modalRef.componentInstance.equipmentId = this.equipmentId;
    modalRef.result.then((data) => {
      this.load();
    }, (reason) => {
      this.load();
    });
  }

  updatePoint(pointId: string) {

    const modalRef = this.modalService.open(PointDialogComponent);
    modalRef.componentInstance.equipmentId = this.equipmentId;
    modalRef.componentInstance.pointId = pointId;
    modalRef.result.then((data) => {
      this.load();
    }, (reason) => {
      this.load();
    });
  }

  deletePoint(pointId: string) {
    this.apiService.delete(pointId).subscribe({
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
}
