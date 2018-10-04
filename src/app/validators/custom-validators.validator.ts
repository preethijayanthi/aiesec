import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { empty } from 'rxjs/observable/empty';

export class CustomValidators {
    static vaildDuplicate(c: FormArray): ValidationErrors {
            let seenDuplicate = false;
            const testObject = {};
            c.value.map(function(item) {
                if (item['id'] != '') {
                    const itemPropertyName = item['id'];
                    if (itemPropertyName in testObject) {
                        testObject[itemPropertyName].duplicate = true;
                        item.duplicate = true;
                        seenDuplicate = true;
                    } else {
                        testObject[itemPropertyName] = item;
                        delete item.duplicate;
                    }
                }
            });
        const message = {
            'validDuplicate': {
                'message': 'Same Skill cannot be added'
            }
        };
        return seenDuplicate ? message : null;
    }
    static validateBackGroundCount(c: FormArray): ValidationErrors {
        let validateCount = false;
        const message = {
            'validateBackGroundCount': {
                'message': 'Max Length of background is 3'
            }
        };
        if (c.length > 3) {
            validateCount = true;
        } else {
            validateCount = false;
        }
        return validateCount ? message : null;
    }

    static validateEmpty(c: FormArray): ValidationErrors {
        const message = {
            'validateEmpty': {
                'message': 'Cannot have null values'
            }
        };
        let elementEmpty = false;
        c.value.forEach(element => {
            if ((element['id'] == '') || (element['id'] == empty))  {
                elementEmpty = true;
            }
        });
        return elementEmpty ? message : null;
    }


}
