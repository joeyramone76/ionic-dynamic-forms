import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../../common/forms/control-base';
import { ControlsService } from '../../common/forms/controls.service';
import { ConfigService } from '../../services/getConfig.service';
import 'rxjs/add/operator/map';


@Component({
	templateUrl: 'form2.html',
	providers: []
})

export class Form2Page {
	controls: ControlBase<any>[];
	form: FormGroup;
	submitted: any;
	readonly FILENAME = 'form2-conf.json';

	constructor(public configService: ConfigService,
							public controlsService: ControlsService
						){
		this.form = new FormGroup({});
	}

	ionViewWillEnter() {
		this.configService.getConfig(this.FILENAME)
			.map(res => res.json())
			.subscribe(data => {
					this.controls = this.controlsService.getControls(data);
				});
		this.form.valueChanges
			.subscribe(val => {
				this.submitted = val;
			});
	}

	submitForm($event){
		console.log("Success", this.submitted);
	}


}
