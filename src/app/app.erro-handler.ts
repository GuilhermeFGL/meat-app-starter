import {HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';

export class ErrorHandler {
	
	static handleError(error: HttpErrorResponse | any) {
		let errorMessage: string;

		if (error instanceof HttpErrorResponse) {
			errorMessage = `Error ${error.status} on access URL ${error.url} - ${error.statusText}`;
		} else {
			errorMessage = error.toString();
		}

		console.log(errorMessage);

		return Observable.throw(errorMessage);
	}
}