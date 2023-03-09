import { Service } from "typedi";

@Service()
export class DateUtil {
	
	 now(): String { 
		return new Date(Date.now()).toISOString(); 
	}
}
