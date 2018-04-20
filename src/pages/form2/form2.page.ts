import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../../common/forms/control-base';
import { ControlsService } from '../../common/forms/controls.service';
import { ConfigService } from '../../services/getConfig.service';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';



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
							public controlsService: ControlsService,
							public alertCtrl: AlertController
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
		let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Your form was successfully submitted!',
      buttons: ['OK']
    });
    alert.present();
		console.log("Success\n", this.submitted);
	}


}
