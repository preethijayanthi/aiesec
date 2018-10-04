import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { OpportunityService } from '../../services/opportunity.service';
import { MasterService } from '../../services/master.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { environment } from '../../../environments/environment';
import { FlashService } from '../../flash/flash.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { CustomValidators } from '../../validators/custom-validators.validator';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit, OnChanges {

  @Input() opportunityId;
  opportunity: any = {};
  googlePlaces: any = {};
  skills: any;
  backGrounds: any;
  editOpportunityForm;
  error: any = {};
  myOptions: INgxMyDpOptions = {
    dateFormat: 'mmm dd, yyyy',
    showTodayBtn: false,
    yearSelector: false,
    sunHighlight: false,
    showSelectorArrow: false,
    alignSelectorRight: true,
    firstDayOfWeek: 'su'
  };

  constructor(
    private opportunityService: OpportunityService,
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private flashService: FlashService,
    private spinnerService: Ng4LoadingSpinnerService

  ) {}

  ngOnInit() {
    this.getSkills();
    this.getBackGrounds();
    this.editOpportunityForm = this.formBuilder.group({
      'access_token': environment.accessToken,
      'opportunity': this.formBuilder.group({
        'title': new FormControl('', [Validators.required, Validators.maxLength(100)]),
        'applications_close_date': new FormControl('', Validators.required),
        'earliest_start_date': new FormControl('', Validators.required),
        'latest_end_date': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'skills': this.formBuilder.array([
          this.addSkill()
        ], Validators.compose([CustomValidators.vaildDuplicate, CustomValidators.validateEmpty])),
        'backgrounds': this.formBuilder.array([
          this.addBackGround()
        ], Validators.compose([CustomValidators.vaildDuplicate,  CustomValidators.validateBackGroundCount,
           CustomValidators.validateEmpty])),
        'role_info': this.formBuilder.group({
          'selection_process': new FormControl('', Validators.required),
          'city': new FormControl('', Validators.required)
        }),
        'specifics_info': this.formBuilder.group({
          'salary': new FormControl('', Validators.required)
        })
      })
    });
    $('.date-field').keydown(function(e) {
      e.preventDefault();
      return false;
   });
  }

  ngOnChanges(opportunityId) {
    this.spinnerService.show();
    this.opportunityService.getOpportunity(this.opportunityId).subscribe(
      data => {
        this.spinnerService.hide();
        this.opportunity = data.body;
        this.assignFormValue();
      }, error => {
        this.spinnerService.hide();
        this.flashService.show(error.error.status.message, 'alert-danger');
      }
    );
  }

  addSkill() {
    return this.formBuilder.group({
      'id': new FormControl('', Validators.required),
      'option': new FormControl('preferred', Validators.required),
      'level': new FormControl('0', Validators.required)
    });
  }

  addBackGround() {
    return this.formBuilder.group({
      'id': new FormControl('', Validators.required),
      'option': new FormControl('preferred', Validators.required)
    });
  }

  assignFormValue() {
    this.editOpportunityForm.controls.opportunity.patchValue({
      'title': this.opportunity.title,
      'applications_close_date': this.opportunity.applications_close_date ?
      this.dateConversion(this.opportunity.applications_close_date) : '',
      'earliest_start_date': this.opportunity.earliest_start_date ? this.dateConversion(this.opportunity.earliest_start_date) : '',
      'latest_end_date': this.opportunity.latest_end_date ? this.dateConversion(this.opportunity.latest_end_date) : '',
      'description': this.opportunity.description,
      'role_info': {
        'selection_process': this.opportunity.role_info.selection_process,
        'city': this.opportunity.role_info.city
      },
      'specifics_info': {
        'salary': this.opportunity.specifics_info.salary
      }
    });
    this.opportunity.skills.forEach((skill, index) => {
      if (index > 0 && !this.editOpportunityForm.controls.opportunity.controls.skills.controls[index]) {
        this.createSkill();
       }
      this.editOpportunityForm.controls.opportunity.controls.skills.controls[index].patchValue({
        'id': skill.id,
        'option': skill.option ? skill.option : 'preferred',
        'level': skill.level ? skill.level : 0
      });
    });
    this.opportunity.backgrounds.forEach((backGround, index) => {
      if (index > 0 && !this.editOpportunityForm.controls.opportunity.controls.backgrounds.controls[index]) {
        this.createBackGround();
      }
      this.editOpportunityForm.controls.opportunity.controls.backgrounds.controls[index].patchValue({
        'id': backGround.id,
        'option': backGround.option ? backGround.option : 'preferred'
      });
    });
  }

  getSkills() {
    this.masterService.getSkills().subscribe(
      response => {
        this.skills = response.body;
      }, error => {
        this.flashService.show(error.error.status.message, 'alert-danger');
      }
    );
  }

  getBackGrounds() {
    this.masterService.getBackGrounds().subscribe(
      response => {
        this.backGrounds = response.body;
      }, error => {
        this.flashService.show(error.error.status.message, 'alert-danger');
      }
    );
  }

  getGooglePlaces(searchText) {
    this.masterService.getGooglePlaces(searchText).subscribe(
      data => {
        this.googlePlaces = data.body['predictions'];
      }, error => {
      }
    );
  }

  validateFormGroup(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      const formControl = control instanceof FormControl;
      const formArray = control instanceof FormArray;
      if (formControl || formArray) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateFormGroup(control);
      }
    });
  }

  onSubmit(formGroup: FormGroup) {
    this.validateFormGroup(formGroup);
    const formValue = formGroup.value;
    if (this.dateValid(formValue.opportunity.applications_close_date)) {
      formValue.opportunity.applications_close_date = this.stringConversion(formValue.opportunity.applications_close_date);
      formValue.opportunity.earliest_start_date = this.stringConversion(formValue.opportunity.earliest_start_date);
      formValue.opportunity.latest_end_date = this.stringConversion(formValue.opportunity.latest_end_date);
      this.spinnerService.show();
      this.opportunityService.updateOpportunity(this.opportunityId, formValue).subscribe(
        data => {
          this.spinnerService.hide();
          if (data.status === 200) {
            this.opportunity = data.body;
            this.flashService.show('Opportunity Updated Successfully', 'alert-success');
            window.scrollTo(0, 0);
          }
          this.assignFormValue();
        }, error => {
          this.spinnerService.hide();
          this.flashService.show(error.error['error'], 'alert-danger');
        }
      );
    } else {
      this.flashService.show('Opportunity cannot be updated- please check for error messages', 'alert-danger');
      window.scrollTo(0, 0);
    }

  }

  removeSkill(index) {
    const control = <FormArray>this.editOpportunityForm.controls.opportunity.controls['skills'];
    control.removeAt(index);
  }
  removeBackGround(index) {
    const control = <FormArray>this.editOpportunityForm.controls.opportunity.controls['backgrounds'];
    control.removeAt(index);
  }

  createSkill() {
    const control = <FormArray>this.editOpportunityForm.controls.opportunity.controls['skills'];
    control.push(this.addSkill());
  }

  createBackGround() {
    const control = <FormArray>this.editOpportunityForm.controls.opportunity.controls['backgrounds'];
    control.push(this.addBackGround());
  }

  dateConversion(params) {
    const date = new Date(params);
    return {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }

  stringConversion(params) {
    return params.date.day +
    '/' + (params.date.month) + '/' + params.date.year;
  }

  dateValid(params) {
    const applicationDate = (params.date.month) +
    '/' + params.date.day + '/' + params.date.year;
    const appDate = new Date(applicationDate);
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);
    const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 90);
    if ((appDate >= new Date(minDate.toDateString()) && appDate <= new Date(maxDate.toDateString()))  ) {
      this.error = {};
      if (this.editOpportunityForm.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      this.error['date'] = true;
      return false;
    }
  }

}
